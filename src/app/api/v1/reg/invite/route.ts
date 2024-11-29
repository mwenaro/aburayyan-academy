import { dbCon } from "@/libs/mongoose/dbCon";
import { registrationInviteManager } from "@/libs/nodemailer/RegistrationInviteManager";
import { RegistrationInvitation } from "@/models/RegistrationInvite";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbCon();
    const fetchedInvitations = await RegistrationInvitation.find({});
    if (!fetchedInvitations.length)
      return NextResponse.json(fetchedInvitations, { status: 404 });
    return NextResponse.json(fetchedInvitations);
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
    const { name, email } = await req.json();
    await dbCon();

    const baseUrl = `${req.nextUrl.host}`;
    await registrationInviteManager.createAndSendInvite(name, email, baseUrl);

    return NextResponse.json(
      { success: true, message: "Invitation Sent successfully!" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log({ regError: error.message });
    return NextResponse.json(
      { success: false, error: `Error: ${error.message}` },
      { status: 500 }
    );
  }
}
