import { dbCon } from "@/libs/mongoose/dbCon";
import { Exam, GradingSystemType, regradeTestingArea } from "@/models/Exam";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { examId: string; testingAreaId: string } }
) {
  try {
    await dbCon();

    const body = await req.json();
    const { gradingSystem } = body;

    // Validate grading system
    const validGradingSystems: GradingSystemType[] = ["general", "lower", "cbc"];
    if (!gradingSystem || !validGradingSystems.includes(gradingSystem)) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid grading system. Must be one of: general, lower, cbc" 
        },
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

    // Find the testing area
    const testingAreaIndex = exam.testingAreas.findIndex(
      ta => ta._id?.toString() === params.testingAreaId
    );
    
    if (testingAreaIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Testing area not found" },
        { status: 404 }
      );
    }

    // Re-grade the testing area
    const testingArea = exam.testingAreas[testingAreaIndex];
    const regradedTestingArea = regradeTestingArea(testingArea, gradingSystem);
    
    // Update the testing area in the exam
    exam.testingAreas[testingAreaIndex] = regradedTestingArea;
    
    // Save the exam (this will trigger pre-save middleware to recalculate grades)
    await exam.save();

    // Populate the response
    await exam.populate("testingAreas.subject", "name shortForm");
    await exam.populate("testingAreas.class", "name grade");
    await exam.populate("testingAreas.teacher", "firstName lastName name");
    await exam.populate("testingAreas.invigilators", "firstName lastName name");
    await exam.populate("testingAreas.marks.student", "firstName lastName name");

    const updatedTestingArea = exam.testingAreas[testingAreaIndex];

    return NextResponse.json({
      success: true,
      data: updatedTestingArea,
      message: `Testing area re-graded successfully using ${gradingSystem} grading system`
    });

  } catch (error: any) {
    console.error("Error re-grading testing area:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
