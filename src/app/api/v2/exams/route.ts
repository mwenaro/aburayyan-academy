import { dbCon } from "@/libs/mongoose/dbCon";
import { Exam } from "@/models/Exam";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbCon();
    
    const { searchParams } = new URL(req.url);
    const school = searchParams.get("school");
    const term = searchParams.get("term");
    const year = searchParams.get("year");
    
    // Build query object
    const query: any = {};
    if (school) query.school = school;
    if (term) query.term = parseInt(term);
    if (year) query.year = parseInt(year);

    const exams = await Exam.find(query)
      .populate("school", "name")
      .sort({ year: -1, term: -1, name: 1 });

    return NextResponse.json({
      success: true,
      data: exams,
      count: exams.length
    });
  } catch (error: any) {
    console.error("Error fetching exams:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbCon();
    const body = await req.json();

    // Validate required fields
    const { name, term, year, school } = body;
    if (!name || !term || !year || !school) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required fields: name, term, year, school" 
        },
        { status: 400 }
      );
    }

    // Create exam without testing areas (they'll be added separately)
    const examData = {
      name,
      term,
      year,
      school,
      testingAreas: [] // Initialize with empty array
    };

    const savedExam = await Exam.create(examData);
    
    // Populate the school field for response
    await savedExam.populate("school", "name");

    return NextResponse.json(
      { 
        success: true, 
        data: savedExam,
        message: "Exam created successfully. Add testing areas using the testing-area endpoint."
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
