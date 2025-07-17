import { dbCon } from "@/libs/mongoose/dbCon";
import { Exam } from "@/models/Exam";
import { Subject } from "@/models/Subject";
import { ClassModel } from "@/models/Class";
import { Student } from "@/models/Student";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbCon();
    
    // Ensure models are registered
    Subject;
    ClassModel;
    Student;
    
    const { searchParams } = new URL(req.url);
    const examId = searchParams.get("examId");
    const classId = searchParams.get("classId");
    const testingAreaId = searchParams.get("testingAreaId");
    const year = searchParams.get("year");
    const term = searchParams.get("term");
    
    // Build query for exams
    const examQuery: any = {};
    if (examId) examQuery._id = examId;
    if (year) examQuery.year = parseInt(year);
    if (term) examQuery.term = parseInt(term);
    
    const exams = await Exam.find(examQuery)
      .populate("school", "name")
      .populate({
        path: "testingAreas.subject",
        select: "name shortForm"
      })
      .populate({
        path: "testingAreas.class", 
        select: "name grade"
      })
      .populate({
        path: "testingAreas.teacher",
        select: "name"
      })
      .populate({
        path: "testingAreas.marks.student",
        select: "name admissionNumber"
      });

    console.log("Found exams:", exams.length);
    if (exams.length > 0) {
      console.log("First exam testing areas:", exams[0].testingAreas.length);
      if (exams[0].testingAreas.length > 0) {
        console.log("First testing area marks:", exams[0].testingAreas[0].marks.length);
        if (exams[0].testingAreas[0].marks.length > 0) {
          console.log("First mark student:", exams[0].testingAreas[0].marks[0].student);
        }
      }
    }

    let reportData = [];

    for (const exam of exams) {
      for (const testingArea of exam.testingAreas) {
        // Filter by classId if provided
        if (classId && (testingArea.class as any)._id.toString() !== classId) {
          continue;
        }
        
        // Filter by testingAreaId if provided
        if (testingAreaId && testingArea._id?.toString() !== testingAreaId) {
          continue;
        }

        // Calculate statistics
        const marks = testingArea.marks;
        const totalStudents = marks.length;
        const totalScore = marks.reduce((sum, mark) => sum + mark.score, 0);
        const averageScore = totalStudents > 0 ? totalScore / totalStudents : 0;
        const highestScore = Math.max(...marks.map(mark => mark.score), 0);
        const lowestScore = Math.min(...marks.map(mark => mark.score), 0);
        const passedStudents = marks.filter(mark => (mark.score / testingArea.outOf) * 100 >= 50).length;
        const passRate = totalStudents > 0 ? (passedStudents / totalStudents) * 100 : 0;

        // Grade distribution
        const gradeDistribution = {
          E: marks.filter(mark => mark.grade?.name === "E").length,
          M: marks.filter(mark => mark.grade?.name === "M").length,
          A: marks.filter(mark => mark.grade?.name === "A").length,
          B: marks.filter(mark => mark.grade?.name === "B").length,
        };

        reportData.push({
          examId: exam._id,
          examName: exam.name,
          examTerm: exam.term,
          examYear: exam.year,
          school: exam.school,
          testingAreaId: testingArea._id,
          testingAreaName: testingArea.name,
          subject: testingArea.subject,
          class: testingArea.class,
          teacher: testingArea.teacher,
          dueDate: testingArea.dueDate,
          dateDone: testingArea.dateDone,
          status: testingArea.status,
          outOf: testingArea.outOf,
          statistics: {
            totalStudents,
            averageScore: Math.round(averageScore * 100) / 100,
            averagePercentage: Math.round((averageScore / testingArea.outOf) * 10000) / 100,
            highestScore,
            lowestScore,
            passedStudents,
            passRate: Math.round(passRate * 100) / 100,
            gradeDistribution
          },
          marks: marks
            .filter(mark => mark.student) // Filter out marks without student data
            .map(mark => ({
              _id: mark._id,
              student: mark.student,
              score: mark.score,
              percentage: Math.round((mark.score / testingArea.outOf) * 10000) / 100,
              grade: mark.grade,
              remark: mark.remark
            }))
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: reportData,
      count: reportData.length
    });
  } catch (error: any) {
    console.error("Error fetching report data:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
