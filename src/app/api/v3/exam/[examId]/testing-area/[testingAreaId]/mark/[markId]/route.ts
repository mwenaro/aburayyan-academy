import { dbCon } from "@/libs/mongoose/dbCon";
import { Exam } from "@/models/Exam";
import { Student } from "@/models/Student";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { examId: string; testingAreaId: string; markId: string } }
) {
  try {
    await dbCon();
    
    // Ensure models are registered
    Student;

    const exam = await Exam.findById(params.examId)
      .populate("testingAreas.marks.student", "firstName lastName admissionNumber");

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

    const mark = testingArea.marks.find(m => m._id?.toString() === params.markId);

    if (!mark) {
      return NextResponse.json(
        { success: false, error: "Mark not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: mark,
      testingArea: {
        _id: testingArea._id,
        name: testingArea.name,
        outOf: testingArea.outOf
      },
      exam: {
        _id: exam._id,
        name: exam.name,
        term: exam.term,
        year: exam.year
      }
    });
  } catch (error: any) {
    console.error("Error fetching mark:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { examId: string; testingAreaId: string; markId: string } }
) {
  try {
    await dbCon();
    
    // Ensure models are registered
    Student;
    
    const body = await req.json();

    // Build update object for allowed fields
    const allowedFields = ["score", "remark"];
    const updateFields: any = {};
    
    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        updateFields[`testingAreas.$[area].marks.$[mark].${field}`] = body[field];
      }
    });

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { success: false, error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const updatedExam = await Exam.findOneAndUpdate(
      { 
        _id: params.examId,
        "testingAreas._id": params.testingAreaId,
        "testingAreas.marks._id": params.markId
      },
      { $set: updateFields },
      { 
        new: true, 
        runValidators: true,
        arrayFilters: [
          { "area._id": params.testingAreaId },
          { "mark._id": params.markId }
        ]
      }
    ).populate("testingAreas.marks.student", "firstName lastName admissionNumber");

    if (!updatedExam) {
      return NextResponse.json(
        { success: false, error: "Exam, testing area, or mark not found" },
        { status: 404 }
      );
    }

    // Find the updated mark
    const testingArea = updatedExam.testingAreas.find(ta => ta._id?.toString() === params.testingAreaId);
    const updatedMark = testingArea?.marks.find(m => m._id?.toString() === params.markId);

    return NextResponse.json({
      success: true,
      data: updatedMark,
      message: "Mark updated successfully"
    });
  } catch (error: any) {
    console.error("Error updating mark:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { examId: string; testingAreaId: string; markId: string } }
) {
  try {
    await dbCon();

    const updatedExam = await Exam.findOneAndUpdate(
      { 
        _id: params.examId,
        "testingAreas._id": params.testingAreaId
      },
      { 
        $pull: { 
          "testingAreas.$.marks": { _id: params.markId } 
        } 
      },
      { new: true }
    );

    if (!updatedExam) {
      return NextResponse.json(
        { success: false, error: "Exam or testing area not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Mark deleted successfully"
    });
  } catch (error: any) {
    console.error("Error deleting mark:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
