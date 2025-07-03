import { dbCon } from "@/libs/mongoose/dbCon";
import { Exam } from "@/models/Exam";
import { School } from "@/models/School";
import { NextRequest, NextResponse } from "next/server";
import { findWithQuery, getQueryOptions } from "@/contollers/fetchService";

export async function GET(req: NextRequest) {
  try {
    await dbCon();
    
    // Ensure models are registered
    School;

    const queryOptions = getQueryOptions(req, {
      searchableFields: ["name", "year", "term"],
      allowedFilters: ["school", "year", "term"],
      defaultSortBy: "createdAt",
      defaultSortOrder: "desc",
      populate: ["school"],
    });

    const result = await findWithQuery(Exam, queryOptions);
    console.log("Exams fetched:", result);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error fetching exams:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  let body = await req.json();
  try {
    await dbCon();
    
    // Ensure models are registered
    School;
    
    const isArray = Array.isArray(body);
    body = isArray ? body : [body];
    
    // Auto-assign school if not provided
    if (!Object.keys(body[0]).includes("school")) {
      const school = await School.findOne({});
      body = body.map((exam: any) => ({
        school: school?._id,
        ...exam,
      }));
    }

    // Validate required fields for first exam (assuming all have same structure)
    const { name, term, year, school } = body[0];
    if (!name || !term || !year || !school) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required fields: name, term, year, school" 
        },
        { status: 400 }
      );
    }

    // Add empty testingAreas array to all exams
    const examData = body.map((exam: any) => ({
      ...exam,
      testingAreas: [] // Initialize with empty array
    }));

    const savedExams = await Exam.create(examData);
    
    // Ensure savedExams is always an array for consistent handling
    const examsArray = Array.isArray(savedExams) ? savedExams : [savedExams];
    
    // If single exam was sent, populate and return single object
    if (!isArray && examsArray.length === 1) {
      await examsArray[0].populate("school", "name");
      
      return NextResponse.json(
        { 
          success: true, 
          data: examsArray[0],
          message: "Exam created successfully. Add testing areas using /api/v3/exam/{id}/testing-area"
        },
        { status: 201 }
      );
    }

    // For multiple exams, return array
    return NextResponse.json(
      { 
        success: true, 
        data: examsArray,
        message: `${examsArray.length} exam${examsArray.length > 1 ? 's' : ''} created successfully`
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating exam:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
