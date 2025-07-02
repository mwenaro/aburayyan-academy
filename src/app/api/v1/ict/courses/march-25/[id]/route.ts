import { dbCon } from "@/libs/mongoose/dbCon";
import { CourseRegistration } from "@/models/CourseRegistration";

import { NextRequest, NextResponse } from "next/server";
type IQuery = {
  params: { id: string; role: string };
};
// GET: Retrieve all Courseregistrations
export async function GET(req: NextRequest, { params: { id } }: IQuery) {
  try {
    await dbCon();
    const fetchedStudent = await CourseRegistration.findById(id);
    if (!fetchedStudent)
      return NextResponse.json(fetchedStudent, { status: 404 });
    return NextResponse.json(fetchedStudent);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error " + error.message },
      { status: 500 }
    );
  }
}

// PUT: Update an existing Courseregistration
export async function PUT(req: NextRequest, { params: { id } }: IQuery) {
  try {
    const body = await req.json();

    await dbCon();
    const updatedCourseRegistration =
      await CourseRegistration.findByIdAndUpdate(id, body, { new: true });
    if (!updatedCourseRegistration)
      return NextResponse.json(
        { message: "CourseRegistration not found" },
        { status: 404 }
      );

    return NextResponse.json(updatedCourseRegistration, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Remove a Courseregistration by ID
export async function DELETE(req: NextRequest, { params: { id } }: IQuery) {
  try {
    if (!id)
      return NextResponse.json({ message: "ID is required" }, { status: 400 });

    await dbCon();
    const deletedCourseRegistration =
      await CourseRegistration.findByIdAndDelete(id);
    if (!deletedCourseRegistration)
      return NextResponse.json(
        { message: "CourseRegistration not found" },
        { status: 404 }
      );

    return NextResponse.json(
      { message: "CourseRegistration deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
