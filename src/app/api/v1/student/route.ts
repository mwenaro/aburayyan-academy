import { dbCon } from "@/libs/mongoose/dbCon";
import { School } from "@/models/School";
import { Student } from "@/models/Student";
import "@/models/Class"; // import without leaving unsed imports
import { NextRequest, NextResponse } from "next/server";
import { findWithQuery, getQueryOptions } from "@/contollers/fetchService";

export async function GET(req: NextRequest) {
  try {
    await dbCon();

    const queryOptions = getQueryOptions(req, {
      searchableFields: ["name", "contactDetails.phone", "class.name"],
      allowedFilters: ["class", "gen", "class.name"],
      defaultSortBy: "createdAt",
      defaultSortOrder: "desc",
      populate: ["class"],
    });

    const result = await findWithQuery(Student, queryOptions);
    // console.log({ result });
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let body = await req.json();
  try {
    // console.log({ body });
    await dbCon();
    body = Array.isArray(body) ? body : [body];
    if (!Object.keys(body[0]).includes("school")) {
      const school = await School.findOne({});
      body = body.map(({ ...stud }: any) => {
        return {
          // contactDetails: { phone },
          // adress: { town, nationality, county, street },
          school: school?._id,
          ...stud,
        };
      });
    }

    const savedStudents = await Student.create(body);

    return NextResponse.json(
      { success: true, data: savedStudents },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("Error in post stu " + error.message);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
