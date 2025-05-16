import { dbCon } from "@/libs/mongoose/dbCon";
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
  const body = await req.json();
  try {
    await dbCon();
    const savedTeachers = await Teacher.create(
      body
    );

    return NextResponse.json(
      { success: true, data: savedTeachers },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
