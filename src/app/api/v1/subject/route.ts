import { dbCon } from "@/libs/mongoose/dbCon";
import { School } from "@/models/School";
import { Subject } from "@/models/Subject";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbCon();
    const fetchedSubjects = await Subject.find({});

    return NextResponse.json(fetchedSubjects);
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let body = await req.json();
  try {
    await dbCon();
    body = Array.isArray(body) ? body : [body];
    if (!Object.keys(body[0]).includes("school")) {
      const school = await School.findOne({});
      body = body.map(({ ...others }: any) => {
        return {
          school: school?._id,
          ...others,
        };
      });
    }

    const savedStudents = await Subject.create(body);

    return NextResponse.json(
      { success: true, data: savedStudents },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("Error in post stu " + error.message);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
