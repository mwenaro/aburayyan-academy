import { NextResponse } from "next/server";
import { Student } from "@/models/Student";
import { Teacher } from "@/models/Teacher";
import { Subject } from "@/models/Subject";
import { ClassModel } from "@/models/Class";
import { Exam } from "@/models/Exam";
import { User } from "@/models/User";

export async function GET() {
  try {
    const [
      totalStudents,
      totalTeachers,
      totalSubjects,
      totalClasses,
      totalExams,
      totalUsers
    ] = await Promise.all([
      Student.countDocuments(),
      Teacher.countDocuments(),
      Subject.countDocuments(),
      ClassModel.countDocuments(),
      Exam.countDocuments(),
      User.countDocuments()
    ]);
    console.log("Dashboard stats fetched successfully", {
      totalStudents,
      totalTeachers,
      totalSubjects,
      totalClasses,
      totalExams,
      totalUsers
    });
    return NextResponse.json({
      totalStudents,
      totalTeachers,
      totalSubjects,
      totalClasses,
      totalExams,
      totalUsers
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch dashboard stats" }, { status: 500 });
  }
}
