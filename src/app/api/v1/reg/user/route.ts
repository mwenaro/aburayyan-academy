import { dbCon } from "@/libs/mongoose/dbCon";
import { TeacherSubject } from "@/models/TeacherSub";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbCon();
    const fetchedTrs = await TeacherSubject.find();

    return NextResponse.json(fetchedTrs);
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    await dbCon();
    const savedTrs = await TeacherSubject.create(
      Array.isArray(body) ? body : [body]
    );

    return NextResponse.json(
      { success: true, data: savedTrs },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
