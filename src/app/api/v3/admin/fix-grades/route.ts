import { NextRequest, NextResponse } from "next/server";
import { dbCon } from "@/libs/mongoose/dbCon";
import { Exam, calculateGrade } from "@/models/Exam";

export async function POST(req: NextRequest) {
  try {
    await dbCon();
    
    console.log("Starting grade correction process...");
    
    // Get all exams
    const exams = await Exam.find({});
    
    let totalMarksUpdated = 0;
    const updatedExams = [];
    
    for (const exam of exams) {
      let examUpdated = false;
      
      for (const testingArea of exam.testingAreas) {
        if (testingArea.marks && testingArea.marks.length > 0) {
          for (const mark of testingArea.marks) {
            // Recalculate grade
            const correctGrade = calculateGrade(mark.score, testingArea.outOf);
            
            // Check if grade needs updating
            if (!mark.grade || 
                mark.grade.name !== correctGrade.name || 
                mark.grade.points !== correctGrade.points) {
              
              mark.grade = correctGrade;
              examUpdated = true;
              totalMarksUpdated++;
            }
          }
        }
      }
      
      // Save exam if any marks were updated
      if (examUpdated) {
        await exam.save();
        updatedExams.push(exam.name);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Grade correction complete. Total marks updated: ${totalMarksUpdated}`,
      data: {
        marksUpdated: totalMarksUpdated,
        examsUpdated: updatedExams.length,
        examNames: updatedExams
      }
    });
    
  } catch (error: any) {
    console.error("Error fixing grades:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
