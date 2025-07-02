import { findWithQuery, getQueryOptions } from "@/contollers/fetchService";
import { dbCon } from "@/libs/mongoose/dbCon";
import { School } from "@/models/School";
import { Subject } from "@/models/Subject";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbCon();
   
       const queryOptions = getQueryOptions(req, {
         searchableFields: ["name", "shortName", "category"],
         allowedFilters: ["name", "category"],
         defaultSortBy: "createdAt",
         defaultSortOrder: "desc",
        //  populate: ["class"],
       });
   
       const result = await findWithQuery(Subject, queryOptions);
   // console.log(result)
       return NextResponse.json(result);
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

    const savedSubjects = await Subject.create(body);

    return NextResponse.json(
      { success: true, data: savedSubjects },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("Error in post stu " + error.message);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
