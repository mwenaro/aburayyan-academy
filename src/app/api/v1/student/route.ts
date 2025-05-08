import { studentsData } from "@/lib/data";
import { dbCon } from "@/libs/mongoose/dbCon";
import { School } from "@/models/School";
import { Student } from "@/models/Student";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbCon();
    const fetchedStudents = await Student.find({}).populate('class');
console.log({fetchedStudents})
    return NextResponse.json(fetchedStudents);
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
      body = body.map((stud: any) => {
        return {
          ...stud,
          school: school?._id,
        };
      });
    }
    const savedStudents = await Student.insertMany(body);

    return NextResponse.json(
      { success: true, data: savedStudents },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
