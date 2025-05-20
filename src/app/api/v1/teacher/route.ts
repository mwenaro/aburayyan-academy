import { dbCon } from "@/libs/mongoose/dbCon";
import { School } from "@/models/School";
import { Teacher } from "@/models/Teacher";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbCon();
    const fetchedTeachers = await Teacher.find({});
    // const fetchedTeachers = await Teacher.find({ });

    return NextResponse.json(fetchedTeachers);
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

    const savedTeachers = await Teacher.create(body);

    return NextResponse.json(
      { success: true, data: savedTeachers },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("Error in post stu " + error.message);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
