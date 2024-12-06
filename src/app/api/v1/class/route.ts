import { dbCon } from "@/libs/mongoose/dbCon";
import { ClassModel, IClass } from "@/models/Class";
import { School } from "@/models/School";

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
  let body = await req.json();
  await dbCon();
  body = Array.isArray(body) ? body : [body];
  if (!Object.keys(body[0]).includes("school")) {
    const school = await School.findOne({});
    body = body.map((cls: any) => {
      const { year, name,isGraduated, ...others } = cls;
      return {
        ...others,
        name,
        school: school?._id,
        isGraduated:['true', true].includes(isGraduated)? true:false,
        steps: [
          {
            year: year,
            grade: +name.split(" ")[1].trim(),
          },
        ],
      };
    });
  }
  // return NextResponse.json({body})
  try {
    const savedClasses = await ClassModel.insertMany(body);

    return NextResponse.json(
      { success: true, data: savedClasses },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
