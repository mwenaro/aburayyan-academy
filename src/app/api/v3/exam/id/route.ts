import { dbCon } from "@/libs/mongoose/dbCon";
import { Exam } from "@/models/Exam";
import { School } from "@/models/School";
import { Subject } from "@/models/Subject";
import { ClassModel } from "@/models/Class";
import { Teacher } from "@/models/Teacher";
import { Student } from "@/models/Student";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbCon();
    
    // Ensure models are registered
    School;
    Subject;
    ClassModel;
    Teacher;
    Student;
    
    const exam = await Exam.findById(params.id)
      .populate("school", "name")
      .populate("testingAreas.subject", "name shortForm")
      .populate("testingAreas.class", "name grade")
      .populate("testingAreas.teacher", "firstName lastName")
      .populate("testingAreas.invigilators", "firstName lastName")
      .populate("testingAreas.marks.student", "firstName lastName admissionNumber");

    if (!exam) {
      return NextResponse.json(
        { success: false, error: "Exam not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: exam
    });
  } catch (error: any) {
    console.error("Error fetching exam:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbCon();
    
    // Ensure models are registered
    School;
    
    const body = await req.json();

    // Only allow updating basic exam fields, not testing areas
    const allowedFields = ["name", "term", "year"];
    const updateData: any = {};
    
    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    });

    const updatedExam = await Exam.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate("school", "name");

    if (!updatedExam) {
      return NextResponse.json(
        { success: false, error: "Exam not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedExam,
      message: "Exam updated successfully"
    });
  } catch (error: any) {
    console.error("Error updating exam:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbCon();
    
    const deletedExam = await Exam.findByIdAndDelete(params.id);

    if (!deletedExam) {
      return NextResponse.json(
        { success: false, error: "Exam not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Exam and all associated testing areas and marks deleted successfully"
    });
  } catch (error: any) {
    console.error("Error deleting exam:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
