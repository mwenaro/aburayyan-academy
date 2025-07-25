import { NextRequest, NextResponse } from "next/server";
import { dbCon } from "@/libs/mongoose/dbCon";
import { ClassModel } from "@/models/Class";

export async function GET() {
  try {
    await dbCon();
    
    const classes = await ClassModel.find({})
      .select('name grade ukey')
      .sort({ grade: 1, name: 1 })
      .lean();

    const formattedClasses = classes.map(cls => ({
      _id: cls._id,
      name: cls.name,
      grade: cls.grade,
      ukey: cls.ukey
    }));

    return NextResponse.json({
      success: true,
      data: formattedClasses
    });

  } catch (error: any) {
    console.error("Error fetching classes:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch classes" },
      { status: 500 }
    );
  }
}
