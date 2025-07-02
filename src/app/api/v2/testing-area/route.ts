import { dbCon } from "@/libs/mongoose/dbCon";
import { Exam } from "@/models/Exam";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbCon();
    
    const { searchParams } = new URL(req.url);
    const examId = searchParams.get("examId");
    const status = searchParams.get("status");
    const subject = searchParams.get("subject");
    const classId = searchParams.get("class");
    
    if (!examId) {
      return NextResponse.json(
        { success: false, error: "examId parameter is required" },
        { status: 400 }
      );
    }

    const exam = await Exam.findById(examId)
      .populate("testingAreas.subject", "name shortForm")
      .populate("testingAreas.class", "name grade")
      .populate("testingAreas.teacher", "firstName lastName")
      .populate("testingAreas.invigilators", "firstName lastName");

    if (!exam) {
      return NextResponse.json(
        { success: false, error: "Exam not found" },
        { status: 404 }
      );
    }

    let testingAreas = exam.testingAreas;

    // Apply filters
    if (status) {
      testingAreas = testingAreas.filter(ta => ta.status === status);
    }
    if (subject) {
      testingAreas = testingAreas.filter(ta => (ta.subject as any)._id.toString() === subject);
    }
    if (classId) {
      testingAreas = testingAreas.filter(ta => (ta.class as any)._id.toString() === classId);
    }

    return NextResponse.json({
      success: true,
      data: testingAreas,
      count: testingAreas.length,
      exam: {
        _id: exam._id,
        name: exam.name,
        term: exam.term,
        year: exam.year
      }
    });
  } catch (error: any) {
    console.error("Error fetching testing areas:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbCon();
    const body = await req.json();

    // Validate required fields
    const { examId, name, subject, class: classId, dueDate, outOf } = body;
    if (!examId || !name || !subject || !classId || !dueDate || !outOf) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required fields: examId, name, subject, class, dueDate, outOf" 
        },
        { status: 400 }
      );
    }

    // Create testing area data (without marks initially)
    const testingAreaData = {
      name,
      subject,
      class: classId,
      teacher: body.teacher,
      dueDate: new Date(dueDate),
      status: "PENDING",
      outOf,
      invigilators: body.invigilators || [],
      marks: [] // Initialize with empty marks array
    };

    // Add testing area to exam
    const updatedExam = await Exam.findByIdAndUpdate(
      examId,
      { $push: { testingAreas: testingAreaData } },
      { new: true, runValidators: true }
    ).populate("testingAreas.subject", "name shortForm")
     .populate("testingAreas.class", "name grade")
     .populate("testingAreas.teacher", "firstName lastName")
     .populate("testingAreas.invigilators", "firstName lastName");

    if (!updatedExam) {
      return NextResponse.json(
        { success: false, error: "Exam not found" },
        { status: 404 }
      );
    }

    // Get the newly added testing area
    const newTestingArea = updatedExam.testingAreas[updatedExam.testingAreas.length - 1];

    return NextResponse.json(
      { 
        success: true, 
        data: newTestingArea,
        message: "Testing area created successfully. Add marks using the mark endpoint."
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating testing area:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
