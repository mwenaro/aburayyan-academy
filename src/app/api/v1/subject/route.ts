import { dbCon } from "@/libs/mongoose/dbCon";
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
  const body = await req.json();
  try {
    await dbCon();
    const savedSubjects = await Subject.create(body); // handles both single and array
    return NextResponse.json(
      { success: true, data: savedSubjects },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || error },
      { status: 500 }
    );
  }
}
