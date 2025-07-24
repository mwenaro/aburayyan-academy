import { NextRequest, NextResponse } from "next/server";
import { dbCon } from "@/libs/mongoose/dbCon";
import { Student } from "@/models/Student";
import { ClassModel } from "@/models/Class";

export async function GET() {
  try {
    await dbCon();
    
    const students = await Student.find({})
      .populate('class', 'name grade')
      .select('name regno class')
      .sort({ name: 1 })
      .lean();

    const formattedStudents = students.map(student => ({
      _id: student._id,
      name: student.name,
      regno: student.regno,
      class: student.class
    }));

    return NextResponse.json({
      success: true,
      data: formattedStudents
    });

  } catch (error: any) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}
