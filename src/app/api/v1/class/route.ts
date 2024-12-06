import { dbCon } from "@/libs/mongoose/dbCon";
import { ClassModel } from "@/models/Class";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbCon();
    const fetchedClasses = await ClassModel.find({});

    return NextResponse.json(fetchedClasses);
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    await dbCon();
    const savedClasses = await ClassModel.insertMany(
      Array.isArray(body) ? body : [body]
    );

    return NextResponse.json(
      { success: true, data: savedClasses },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
