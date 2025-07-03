import { dbCon } from "@/libs/mongoose/dbCon";
import { Exam } from "@/models/Exam";
import { Student } from "@/models/Student";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { examId: string; testingAreaId: string } }
) {
  try {
    await dbCon();
    
    // Ensure models are registered
    Student;
    
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");

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

    let marks = testingArea.marks;

    // Filter by student if provided
    if (studentId) {
      marks = marks.filter(mark => (mark.student as any)._id.toString() === studentId);
    }

    return NextResponse.json({
      success: true,
      data: marks,
      count: marks.length,
      testingArea: {
        _id: testingArea._id,
        name: testingArea.name,
        outOf: testingArea.outOf,
        status: testingArea.status
      },
      exam: {
        _id: exam._id,
        name: exam.name,
        term: exam.term,
        year: exam.year
      }
    });
  } catch (error: any) {
    console.error("Error fetching marks:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { examId: string; testingAreaId: string } }
) {
  try {
    await dbCon();
    
    // Ensure models are registered
    Student;
    
    const body = await req.json();

    // Validate required fields (examId and testingAreaId are from params)
    const { student, score } = body;
    if (!student || score === undefined) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required fields: student, score" 
        },
        { status: 400 }
      );
    }

    // Check if student already has a mark in this testing area
    const existingExam = await Exam.findOne({
      _id: params.examId,
      "testingAreas._id": params.testingAreaId,
      "testingAreas.marks.student": student
    });

    if (existingExam) {
      return NextResponse.json(
        { success: false, error: "Student already has a mark in this testing area" },
        { status: 409 }
      );
    }

    // Create mark data
    const markData = {
      student,
      score,
      remark: body.remark || ""
      // grade will be auto-calculated by middleware
    };

    // Add mark to testing area
    const updatedExam = await Exam.findOneAndUpdate(
      { 
        _id: params.examId, 
        "testingAreas._id": params.testingAreaId 
      },
      { 
        $push: { 
          "testingAreas.$.marks": markData 
        } 
      },
      { new: true, runValidators: true }
    ).populate("testingAreas.marks.student", "firstName lastName admissionNumber");

    if (!updatedExam) {
      return NextResponse.json(
        { success: false, error: "Exam or testing area not found" },
        { status: 404 }
      );
    }

    // Find the testing area and the newly added mark
    const testingArea = updatedExam.testingAreas.find(ta => ta._id?.toString() === params.testingAreaId);
    const newMark = testingArea?.marks[testingArea.marks.length - 1];

    return NextResponse.json(
      { 
        success: true, 
        data: newMark,
        message: "Mark added successfully"
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating mark:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Bulk create marks for multiple students
export async function PATCH(
  req: NextRequest,
  { params }: { params: { examId: string; testingAreaId: string } }
) {
  try {
    await dbCon();
    
    // Ensure models are registered
    Student;
    
    const body = await req.json();

    const { marks } = body;
    if (!marks || !Array.isArray(marks)) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required field: marks (array)" 
        },
        { status: 400 }
      );
    }

    // Validate marks array
    const invalidMarks = marks.filter(mark => !mark.student || mark.score === undefined);
    if (invalidMarks.length > 0) {
      return NextResponse.json(
        { success: false, error: "Each mark must have student and score fields" },
        { status: 400 }
      );
    }

    // Process marks data
    const marksData = marks.map(mark => ({
      student: mark.student,
      score: mark.score,
      remark: mark.remark || ""
      // grade will be auto-calculated by middleware
    }));

    // Add all marks to testing area
    const updatedExam = await Exam.findOneAndUpdate(
      { 
        _id: params.examId, 
        "testingAreas._id": params.testingAreaId 
      },
      { 
        $push: { 
          "testingAreas.$.marks": { $each: marksData }
        } 
      },
      { new: true, runValidators: true }
    ).populate("testingAreas.marks.student", "firstName lastName admissionNumber");

    if (!updatedExam) {
      return NextResponse.json(
        { success: false, error: "Exam or testing area not found" },
        { status: 404 }
      );
    }

    const testingArea = updatedExam.testingAreas.find(ta => ta._id?.toString() === params.testingAreaId);

    return NextResponse.json({
      success: true,
      data: testingArea?.marks,
      message: `${marks.length} marks added successfully`
    });
  } catch (error: any) {
    console.error("Error bulk creating marks:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
