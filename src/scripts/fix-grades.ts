// Script to fix grades for existing marks that may not have been calculated correctly
import { dbCon } from "@/libs/mongoose/dbCon";
import { Exam, calculateGrade } from "@/models/Exam";

export async function fixAllGrades() {
  try {
    await dbCon();
    
    console.log("Starting grade correction process...");
    
    // Get all exams
    const exams = await Exam.find({});
    
    let totalMarksUpdated = 0;
    
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
              
              console.log(`Updated mark for student ${mark.student}: ${mark.score}/${testingArea.outOf} = ${correctGrade.name} (${correctGrade.points} points)`);
            }
          }
        }
      }
      
      // Save exam if any marks were updated
      if (examUpdated) {
        await exam.save();
        console.log(`Updated exam: ${exam.name}`);
      }
    }
    
    console.log(`Grade correction complete. Total marks updated: ${totalMarksUpdated}`);
    return { success: true, marksUpdated: totalMarksUpdated };
    
  } catch (error:any) {
    console.error("Error fixing grades:", error);
    return { success: false, error: error.message };
  }
}

// Uncomment the line below to run the script
// fixAllGrades();
