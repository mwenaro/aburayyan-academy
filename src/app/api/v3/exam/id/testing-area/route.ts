import { dbCon } from "@/libs/mongoose/dbCon";
import { Exam } from "@/models/Exam";
import { Subject } from "@/models/Subject";
import { ClassModel } from "@/models/Class";
import { Teacher } from "@/models/Teacher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbCon();
    
    // Ensure models are registered
    Subject;
    ClassModel;
    Teacher;
    
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const subject = searchParams.get("subject");
    const classId = searchParams.get("class");
    
    const exam = await Exam.findById(params.id)
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

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbCon();
    
    // Ensure models are registered
    Subject;
    ClassModel;
    Teacher;
    
    const body = await req.json();

    // Validate required fields (examId is now from params)
    const { name, subject, class: classId, dueDate, outOf } = body;
    if (!name || !subject || !classId || !dueDate || !outOf) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required fields: name, subject, class, dueDate, outOf" 
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

    // Add testing area to exam using params.id
    const updatedExam = await Exam.findByIdAndUpdate(
      params.id,
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
        message: `Testing area created successfully. Add marks using /api/v3/exam/${params.id}/mark`
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

// Update a specific testing area
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbCon();
    
    // Ensure models are registered
    Subject;
    ClassModel;
    Teacher;
    
    const body = await req.json();
    const { testingAreaId } = body;
    
    if (!testingAreaId) {
      return NextResponse.json(
        { success: false, error: "testingAreaId is required in request body" },
        { status: 400 }
      );
    }

    // Only allow updating specific fields, not marks
    const allowedFields = ["name", "teacher", "dueDate", "dateDone", "status", "outOf", "invigilators"];
    const updateFields: any = {};
    
    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        updateFields[`testingAreas.$.${field}`] = field === "dueDate" || field === "dateDone" 
          ? new Date(body[field]) 
          : body[field];
      }
    });

    const updatedExam = await Exam.findOneAndUpdate(
      { 
        _id: params.id, 
        "testingAreas._id": testingAreaId 
      },
      { $set: updateFields },
      { new: true, runValidators: true }
    ).populate("testingAreas.subject", "name shortForm")
     .populate("testingAreas.class", "name grade")
     .populate("testingAreas.teacher", "firstName lastName")
     .populate("testingAreas.invigilators", "firstName lastName");

    if (!updatedExam) {
      return NextResponse.json(
        { success: false, error: "Exam or testing area not found" },
        { status: 404 }
      );
    }

    const updatedTestingArea = updatedExam.testingAreas.find(ta => ta._id?.toString() === testingAreaId);

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

// Delete a specific testing area
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbCon();
    
    const { searchParams } = new URL(req.url);
    const testingAreaId = searchParams.get("testingAreaId");
    
    if (!testingAreaId) {
      return NextResponse.json(
        { success: false, error: "testingAreaId parameter is required" },
        { status: 400 }
      );
    }

    const updatedExam = await Exam.findByIdAndUpdate(
      params.id,
      { $pull: { testingAreas: { _id: testingAreaId } } },
      { new: true }
    );

    if (!updatedExam) {
      return NextResponse.json(
        { success: false, error: "Exam not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Testing area and all associated marks deleted successfully"
    });
  } catch (error: any) {
    console.error("Error deleting testing area:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
