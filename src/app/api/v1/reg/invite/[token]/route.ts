import { dbCon } from "@/libs/mongoose/dbCon";
import { registrationInviteManager } from "@/libs/nodemailer/RegistrationInviteManager";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { param: { token } }: any) {
  try {
    await dbCon();
    let confirmedInvite = await registrationInviteManager.confirmInvitation(
      token
    );
    if (!confirmedInvite) throw Error("Invalid token");
    // delete the confirmed invite
    await registrationInviteManager.removeConfirmedInvites(
      confirmedInvite._id as string
    );
    return NextResponse.json({ success: true, data: confirmedInvite });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error " + error.message },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest, { param: { token } }: any) {
  try {
    await dbCon();
    let confirmedInvite = await registrationInviteManager.confirmInvitation(
      token
    );
    if (!confirmedInvite) throw Error("Invalid token");
    // delete the confirmed invite
    await registrationInviteManager.removeConfirmedInvites(
      confirmedInvite._id as string
    );
    return NextResponse.json({ success: true, data: confirmedInvite });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error " + error.message },
      { status: 500 }
    );
  }
}

// regitsre
// export async function POST(req: NextRequest) {
//   try {
//     const { name, email } = await req.json();
//     await dbCon();

//     const baseUrl = `${req.nextUrl.origin}`;
//     await registrationInviteManager.createAndSendInvite(name, email, baseUrl);

//     return NextResponse.json(
//       { success: true, message: "Invitation Sent successfully!" },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.log({ regError: error.message });
//     return NextResponse.json(
//       { success: false, error: `Error: ${error.message}` },
//       { status: 500 }
//     );
//   }
// }
