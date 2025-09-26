import { NextRequest, NextResponse } from "next/server";
import { studentAuthService } from "@/auth/StudentAuthService";
import { Student } from "@/models/Student";
import { dbCon } from "@/libs/mongoose/dbCon";

export async function GET(req: NextRequest) {
  try {
    // Get session token
    const sessionToken = req.cookies.get("student-session")?.value ||
                         req.headers.get("authorization")?.replace("Bearer ", "");

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: "No session found" },
        { status: 401 }
      );
    }

    // Verify session
    const session = await studentAuthService.verifySessionToken(sessionToken);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Invalid session" },
        { status: 401 }
      );
    }

    // Get student data
    await dbCon();
    const student = await Student.findById(session.studentId)
      .populate("class", "name grade")
      .select("-password")
      .lean();

    if (!student) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    // Log session verification activity
    await studentAuthService.logStudentActivity(
      sessionToken,
      "SESSION_VERIFIED",
      "Session token verified successfully"
    );

    return NextResponse.json({
      success: true,
      student: {
        _id: student._id,
        name: student.name,
        regno: student.regno,
        kas: student.kas,
        class: student.class,
        photo: student.photo,
        gen: student.gen,
        dob: student.dob,
        contactDetails: student.contactDetails,
        address: student.address,
        lastLogin: student.lastLogin,
        isFirstLogin: student.isFirstLogin,
        passwordResetRequired: student.passwordResetRequired,
      },
      session: {
        studentId: session.studentId,
        regno: session.regno,
        sessionType: session.sessionType,
      },
    });

  } catch (error: any) {
    console.error("Session verification error:", error);
    return NextResponse.json(
      { success: false, message: "Session verification failed" },
      { status: 500 }
    );
  }
}
