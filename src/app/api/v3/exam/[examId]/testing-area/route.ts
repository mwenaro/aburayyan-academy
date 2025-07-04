import { dbCon } from "@/libs/mongoose/dbCon";
import { Exam } from "@/models/Exam";
import { Subject } from "@/models/Subject";
import { ClassModel } from "@/models/Class";
import { Teacher } from "@/models/Teacher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { examId: string } }
) {
  try {
    await dbCon();
    
    // Ensure models are registered
    Subject;
    ClassModel;
    Teacher;

    const body = await req.json();
    const { name, subject, class: classId, teacher, dueDate, outOf, invigilators } = body;

    // Validate required fields
    if (!name || !subject || !classId || !dueDate || !outOf) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the exam
    const exam = await Exam.findById(params.examId);
    if (!exam) {
      return NextResponse.json(
        { success: false, error: "Exam not found" },
        { status: 404 }
      );
    }

    // Create new testing area
    const newTestingArea = {
      name,
      subject,
      class: classId,
      teacher: teacher || null,
      dueDate: new Date(dueDate),
      outOf: Number(outOf),
      invigilators: invigilators || [],
      marks: []
    };

    // Add testing area to exam
    exam.testingAreas.push(newTestingArea as any);
    await exam.save();

    // Get the newly created testing area (it will be the last one)
    const savedTestingArea = exam.testingAreas[exam.testingAreas.length - 1];

    // Populate the response
    await exam.populate("testingAreas.subject", "name shortForm");
    await exam.populate("testingAreas.class", "name grade");
    await exam.populate("testingAreas.teacher", "firstName lastName");
    await exam.populate("testingAreas.invigilators", "firstName lastName");

    const populatedTestingArea = exam.testingAreas.find(ta => 
      ta._id?.toString() === savedTestingArea._id?.toString()
    );

    return NextResponse.json({
      success: true,
      data: populatedTestingArea,
      message: "Testing area created successfully"
    });

  } catch (error: any) {
    console.error("Error creating testing area:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { examId: string } }
) {
  try {
    await dbCon();
    
    // Ensure models are registered
    Subject;
    ClassModel;
    Teacher;

    const body = await req.json();
    const { testingAreaId, name, subject, class: classId, teacher, dueDate, outOf, invigilators } = body;

    // Validate required fields
    if (!testingAreaId || !name || !subject || !classId || !dueDate || !outOf) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the exam
    const exam = await Exam.findById(params.examId);
    if (!exam) {
      return NextResponse.json(
        { success: false, error: "Exam not found" },
        { status: 404 }
      );
    }

    // Find the testing area to update
    const testingArea = exam.testingAreas.find(ta => ta._id?.toString() === testingAreaId);
    if (!testingArea) {
      return NextResponse.json(
        { success: false, error: "Testing area not found" },
        { status: 404 }
      );
    }

    // Update testing area
    testingArea.name = name;
    testingArea.subject = subject;
    testingArea.class = classId;
    testingArea.teacher = teacher || null;
    testingArea.dueDate = new Date(dueDate);
    testingArea.outOf = Number(outOf);
    testingArea.invigilators = invigilators || [];

    await exam.save();

    // Populate the response
    await exam.populate("testingAreas.subject", "name shortForm");
    await exam.populate("testingAreas.class", "name grade");
    await exam.populate("testingAreas.teacher", "firstName lastName");
    await exam.populate("testingAreas.invigilators", "firstName lastName");

    const updatedTestingArea = exam.testingAreas.find(ta => 
      ta._id?.toString() === testingAreaId
    );

    return NextResponse.json({
      success: true,
      data: updatedTestingArea,
      message: "Testing area updated successfully"
    });

  } catch (error: any) {
    console.error("Error updating testing area:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
