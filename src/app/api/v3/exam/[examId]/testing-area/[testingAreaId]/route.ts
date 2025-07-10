import { dbCon } from "@/libs/mongoose/dbCon";
import { Exam } from "@/models/Exam";
import { Subject } from "@/models/Subject";
import { ClassModel } from "@/models/Class";
import { Teacher } from "@/models/Teacher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { examId: string; testingAreaId: string } }
) {
  try {
    await dbCon();
    
    // Ensure models are registered
    Subject;
    ClassModel;
    Teacher;

    const exam = await Exam.findById(params.examId)
      .populate("testingAreas.subject", "name shortForm")
      .populate("testingAreas.class", "name grade")
      .populate("testingAreas.teacher", "firstName lastName name")
      .populate("testingAreas.invigilators", "firstName lastName name")
      .populate("testingAreas.marks.student", "firstName lastName admissionNumber name");

    if (!exam) {
      return NextResponse.json(
        { success: false, error: "Exam not found" },
        { status: 404 }
      );
    }

    const testingArea = exam.testingAreas.find(ta => ta._id?.toString() === params.testingAreaId);

    if (!testingArea) {
      return NextResponse.json(
        { success: false, error: "Testing area not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: testingArea,
      exam: {
        _id: exam._id,
        name: exam.name,
        term: exam.term,
        year: exam.year
      }
    });
  } catch (error: any) {
    console.error("Error fetching testing area:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { examId: string; testingAreaId: string } }
) {
  try {
    await dbCon();
    
    // Ensure models are registered
    Subject;
    ClassModel;
    Teacher;
    
    const body = await req.json();

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
        _id: params.examId, 
        "testingAreas._id": params.testingAreaId 
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

    const updatedTestingArea = updatedExam.testingAreas.find(ta => ta._id?.toString() === params.testingAreaId);

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { examId: string; testingAreaId: string } }
) {
  try {
    await dbCon();

    const updatedExam = await Exam.findByIdAndUpdate(
      params.examId,
      { $pull: { testingAreas: { _id: params.testingAreaId } } },
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
