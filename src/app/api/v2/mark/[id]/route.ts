import { dbCon } from "@/libs/mongoose/dbCon";
import { Exam } from "@/models/Exam";
import { Student } from "@/models/Student";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbCon();
    
    // Ensure models are registered
    Student;
    
    const { searchParams } = new URL(req.url);
    const examId = searchParams.get("examId");
    const testingAreaId = searchParams.get("testingAreaId");
    
    if (!examId || !testingAreaId) {
      return NextResponse.json(
        { success: false, error: "examId and testingAreaId parameters are required" },
        { status: 400 }
      );
    }

    const exam = await Exam.findById(examId)
      .populate("testingAreas.marks.student", "firstName lastName admissionNumber");

    if (!exam) {
      return NextResponse.json(
        { success: false, error: "Exam not found" },
        { status: 404 }
      );
    }

    const testingArea = exam.testingAreas.find(ta => ta._id?.toString() === testingAreaId);

    if (!testingArea) {
      return NextResponse.json(
        { success: false, error: "Testing area not found" },
        { status: 404 }
      );
    }

    const mark = testingArea.marks.find(m => m._id?.toString() === params.id);

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
  { params }: { params: { id: string } }
) {
  try {
    await dbCon();
    
    // Ensure models are registered
    Student;
    
    const body = await req.json();
    
    const { examId, testingAreaId } = body;
    if (!examId || !testingAreaId) {
      return NextResponse.json(
        { success: false, error: "examId and testingAreaId are required in request body" },
        { status: 400 }
      );
    }

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
        _id: examId,
        "testingAreas._id": testingAreaId,
        "testingAreas.marks._id": params.id
      },
      { $set: updateFields },
      { 
        new: true, 
        runValidators: true,
        arrayFilters: [
          { "area._id": testingAreaId },
          { "mark._id": params.id }
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
    const testingArea = updatedExam.testingAreas.find(ta => ta._id?.toString() === testingAreaId);
    const updatedMark = testingArea?.marks.find(m => m._id?.toString() === params.id);

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
  { params }: { params: { id: string } }
) {
  try {
    await dbCon();
    
    const { searchParams } = new URL(req.url);
    const examId = searchParams.get("examId");
    const testingAreaId = searchParams.get("testingAreaId");
    
    if (!examId || !testingAreaId) {
      return NextResponse.json(
        { success: false, error: "examId and testingAreaId parameters are required" },
        { status: 400 }
      );
    }

    // First, remove the mark
    const updatedExam = await Exam.findOneAndUpdate(
      { 
        _id: examId,
        "testingAreas._id": testingAreaId
      },
      { 
        $pull: { 
          "testingAreas.$.marks": { _id: params.id } 
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

    // Check if this testing area now has no marks, if so, revert status to PENDING
    const testingArea = updatedExam.testingAreas.find(ta => ta._id?.toString() === testingAreaId);
    
    if (testingArea && testingArea.marks.length === 0) {
      // Update status back to PENDING and remove dateDone
      await Exam.findOneAndUpdate(
        { 
          _id: examId,
          "testingAreas._id": testingAreaId
        },
        { 
          $set: {
            "testingAreas.$.status": "PENDING"
          },
          $unset: {
            "testingAreas.$.dateDone": ""
          }
        }
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
