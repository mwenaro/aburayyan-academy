import { dbCon } from "@/libs/mongoose/dbCon";
import { Mark } from "@/models/Mark";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbCon();
    const fetchedMarks = await Mark.find();

    return NextResponse.json(fetchedMarks);
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    await dbCon();
    const savedMarks = await Mark.insertMany(
      Array.isArray(body) ? body : [body]
    );

    return NextResponse.json(
      { success: true, data: savedMarks },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
