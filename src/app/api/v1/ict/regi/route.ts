import { dbCon } from "@/libs/mongoose/dbCon";
import { sendAdminNotification } from "@/libs/nodemailer/domain-mailer";
import { Registration } from "@/models/RegistrationForm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbCon();
    const fetchedStudents = await Registration.find({
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
    const { studentName, phoneNumber, parentName, parentPhoneNumber } = body;

    // Basic validation
    if (!studentName || !phoneNumber || !parentName || !parentPhoneNumber) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    await dbCon();

    const newRegistration = new Registration(body);
    const savedRegistration = await newRegistration.save();

    if (!savedRegistration) throw Error("Registration failed");
    const url = `${req.nextUrl.host}/registrations`;
    const studentDetails = `${studentName}(${phoneNumber})`;
    const parentDetails = `${parentName}(${parentPhoneNumber})`;
    const registeredStudents = await Registration.countDocuments({
      $nor: [{ isDeleted: true }],
    });
    console.log({ url });
    // console.log({ registeredStudents });

    // Uncomment this if email notifications are required
   await sendAdminNotification(studentDetails, parentDetails, registeredStudents, url);

    return NextResponse.json(savedRegistration, { status: 201 });
  } catch (error: any) {
    console.log({ regError: error.message });
    return NextResponse.json(
      { success: false, error: `Error: ${error.message}` },
      { status: 500 }
    );
  }
}
