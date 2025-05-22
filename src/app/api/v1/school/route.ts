import { dbCon } from "@/libs/mongoose/dbCon";
import { School } from "@/models/School";


import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbCon();
    const fetchedSchools = await School.find({});

    return NextResponse.json({data:fetchedSchools});
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    await dbCon();
    const savedSchools = await School.create(
      body
    );

    return NextResponse.json(
      { success: true, data: savedSchools },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
