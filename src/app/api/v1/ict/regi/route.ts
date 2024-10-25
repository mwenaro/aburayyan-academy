import { dbCon } from "@/libs/mongoose/dbCon";
import { sendAdminNotification } from "@/libs/nodemailer/domain-mailer";
import { Registration } from "@/models/RegistrationForm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbCon();
    const fetchedStudents = await Registration.find();
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
    const body = await req.json(),
      { studentName, phoneNumber, parentName, parentPhoneNumber } = body;
    await dbCon();
    const newREgistration = new Registration(body);
    const savedRegistration = await newREgistration.save();
    if (!savedRegistration) throw Error("Regitsration failed");
    const studentDeatils = `${studentName}(${phoneNumber})`,
      parentDeatils = `${parentName}(${parentPhoneNumber})`;
    // send Notification to admin
    await sendAdminNotification(studentDeatils, parentDeatils);
    return NextResponse.json(savedRegistration, { status: 201 });
  } catch (error: any) {
    console.log({ regError: error.message });
    return new NextResponse(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
