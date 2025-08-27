import { NextRequest, NextResponse } from "next/server";
import { studentAuthService } from "@/auth/StudentAuthService";
import { Exam } from "@/models/Exam";
import { dbCon } from "@/libs/mongoose/dbCon";

export async function GET(req: NextRequest) {
  try {
    // Get session token
    const sessionToken = req.cookies.get("student-session")?.value ||
                         req.headers.get("authorization")?.replace("Bearer ", "");

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    // Verify session
    const session = await studentAuthService.verifySessionToken(sessionToken);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Invalid session" },
        { status: 401 }
      );
    }

    // Get query parameters
    const url = new URL(req.url);
    const term = url.searchParams.get("term");
    const year = url.searchParams.get("year");
    const subject = url.searchParams.get("subject");

    await dbCon();

    // Build aggregation pipeline to get student results
    const matchStage: any = {
      "testingAreas.marks.student": session.studentId,
    };

    if (term) matchStage.term = parseInt(term);
    if (year) matchStage.year = parseInt(year);

    const pipeline = [
      { $match: matchStage },
      { $unwind: "$testingAreas" },
      { $unwind: "$testingAreas.marks" },
      { 
        $match: { 
          "testingAreas.marks.student": session.studentId 
        } 
      },
      {
        $lookup: {
          from: "subjects",
          localField: "testingAreas.subject",
          foreignField: "_id",
          as: "subjectInfo"
        }
      },
      {
        $lookup: {
          from: "classes",
          localField: "testingAreas.class",
          foreignField: "_id",
          as: "classInfo"
        }
      },
      {
        $lookup: {
          from: "teachers",
          localField: "testingAreas.teacher",
          foreignField: "_id",
          as: "teacherInfo"
        }
      },
      {
        $project: {
          examName: "$name",
          term: 1,
          year: 1,
          testingAreaName: "$testingAreas.name",
          subject: { $arrayElemAt: ["$subjectInfo.name", 0] },
          subjectShort: { $arrayElemAt: ["$subjectInfo.shortForm", 0] },
          class: { $arrayElemAt: ["$classInfo.name", 0] },
          teacher: { $arrayElemAt: ["$teacherInfo.name", 0] },
          score: "$testingAreas.marks.score",
          outOf: "$testingAreas.outOf",
          grade: "$testingAreas.marks.grade",
          remark: "$testingAreas.marks.remark",
          percentage: {
            $round: [
              { $multiply: [{ $divide: ["$testingAreas.marks.score", "$testingAreas.outOf"] }, 100] },
              1
            ]
          },
          dueDate: "$testingAreas.dueDate",
          dateDone: "$testingAreas.dateDone",
          gradingSystem: "$testingAreas.gradingSystem",
        }
      },
      { $sort: { year: -1, term: -1, subject: 1 } }
    ];

    // Add subject filter if specified
    if (subject) {
      pipeline.splice(4, 0, {
        $match: {
          "subjectInfo.name": { $regex: subject, $options: "i" }
        }
      });
    }

    const results = await Exam.aggregate(pipeline as any);

    // Group results by term and year for better organization
    const groupedResults = results.reduce((acc: any, result: any) => {
      const key = `${result.year}-Term${result.term}`;
      if (!acc[key]) {
        acc[key] = {
          year: result.year,
          term: result.term,
          results: []
        };
      }
      acc[key].results.push(result);
      return acc;
    }, {});

    // Calculate statistics
    const totalMarks = results.length;
    const totalScore = results.reduce((sum: number, r: any) => sum + r.score, 0);
    const totalOutOf = results.reduce((sum: number, r: any) => sum + r.outOf, 0);
    const averagePercentage = totalOutOf > 0 ? (totalScore / totalOutOf) * 100 : 0;

    const gradeDistribution = results.reduce((acc: any, r: any) => {
      const gradeName = r.grade?.name || "N/A";
      acc[gradeName] = (acc[gradeName] || 0) + 1;
      return acc;
    }, {});

    // Log activity
    await studentAuthService.logStudentActivity(
      sessionToken,
      "VIEW_RESULTS",
      `Viewed results - Term: ${term || "All"}, Year: ${year || "All"}, Subject: ${subject || "All"}`
    );

    return NextResponse.json({
      success: true,
      data: {
        results,
        groupedResults: Object.values(groupedResults),
        statistics: {
          totalMarks,
          totalScore,
          totalOutOf,
          averagePercentage: Math.round(averagePercentage * 10) / 10,
          gradeDistribution,
        },
        filters: {
          term: term || null,
          year: year || null,
          subject: subject || null,
        }
      }
    });

  } catch (error: any) {
    console.error("Get results error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch results" },
      { status: 500 }
    );
  }
}
