import { dbCon } from "@/libs/mongoose/dbCon";
import { sendAdminNotification } from "@/libs/nodemailer/domain-mailer";
import { CourseRegistration } from "@/models/CourseRegistration";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbCon();
    const fetchedStudents = await CourseRegistration.find({
      $nor: [{ isDeleted: true }],
    });
    if (!fetchedStudents.length)
      return NextResponse.json(fetchedStudents, { status: 404 });
    return NextResponse.json(fetchedStudents);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error " + error.message },
      { status: 500 }
    );
  }
}

// regitsre
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, residence, dob, gender, purpose } = body;
  
    // Basic validation
    if (!fullName || !email || !phone || !residence || !dob || !gender || !purpose) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    await dbCon();

    const newCourseRegistration = new CourseRegistration(body);
    const savedCourseRegistration = await newCourseRegistration.save();

    if (!savedCourseRegistration) throw Error("CourseRegistration failed");
    const url = `${req.nextUrl.host}/registrations/march-25`;
    const studentDetails = `${fullName}(${phone})`;
    const parentDetails = null;
    const registeredStudents = await CourseRegistration.countDocuments({
      $nor: [{ isDeleted: true }],
    });
    console.log({ url });
    // console.log({ registeredStudents });

    // Uncomment this if email notifications are required
   await sendAdminNotification(studentDetails, parentDetails, registeredStudents, url);

    return NextResponse.json(savedCourseRegistration, { status: 201 });
  } catch (error: any) {
    console.log({ regError: error.message });
    return NextResponse.json(
      { success: false, error: `Error: ${error.message}` },
      { status: 500 }
    );
  }
}


