import { dbCon } from "@/libs/mongoose/dbCon";
import { ClassModel } from "@/models/Class";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbCon();

    // Get all classes with their grades
    const classes = await ClassModel.find({})
      .select('name grade ukey')
      .sort({ grade: 1, name: 1 })
      .lean();

    // Extract unique grades
    const uniqueGrades = new Set(classes.map(cls => cls.grade));
    const grades = Array.from(uniqueGrades).filter(Boolean).sort();

    // Group classes by grade
    const classesByGrade = grades.reduce((acc, grade) => {
      acc[grade] = classes.filter(cls => cls.grade === grade)
        .sort((a, b) => a.name.localeCompare(b.name)); // Sort classes alphabetically within each grade
      return acc;
    }, {} as Record<string, any[]>);

    return NextResponse.json({
      success: true,
      data: {
        grades: grades.map(grade => ({
          value: grade,
          label: typeof grade === 'number' ? `Grade ${grade}` : grade,
          classes: classesByGrade[grade]
        })),
        classes: classes.map(cls => ({
          _id: cls._id,
          name: cls.name,
          grade: cls.grade,
          ukey: cls.ukey
        })),
        classesByGrade
      }
    });

  } catch (error: any) {
    console.error("Error fetching filter options:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch filter options" },
      { status: 500 }
    );
  }
}
