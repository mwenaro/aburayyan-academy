import { dbCon } from "@/libs/mongoose/dbCon";
import { Exam } from "@/models/Exam";
import { School } from "@/models/School";
import { NextRequest, NextResponse } from "next/server";
import { findWithQuery, getQueryOptions } from "@/contollers/fetchService";

export async function GET(req: NextRequest) {
  try {
    await dbCon();

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
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let body = await req.json();
  try {
    await dbCon();
    body = Array.isArray(body) ? body : [body];
    if (!Object.keys(body[0]).includes("school")) {
      const school = await School.findOne({});
      body = body.map((exam: any) => ({
        school: school?._id,
        ...exam,
      }));
    }

    const savedExams = await Exam.create(body);
    return NextResponse.json(
      { success: true, data: savedExams },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("Error in post exam " + error.message);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
