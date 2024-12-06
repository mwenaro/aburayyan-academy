import { dbCon } from "@/libs/mongoose/dbCon";
import { Student } from "@/models/Student";


import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbCon();
    const fetchedStudents = await Student.find({});

    return NextResponse.json(fetchedStudents);
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    await dbCon();
    const savedStudents = await Student.insertMany(
      Array.isArray(body) ? body : [body]
    );

    return NextResponse.json(
      { success: true, data: savedStudents },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
