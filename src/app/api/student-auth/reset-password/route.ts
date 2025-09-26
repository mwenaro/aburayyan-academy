import { NextRequest, NextResponse } from "next/server";
import { studentAuthService } from "@/auth/StudentAuthService";
import { pwdHasher } from "@/libs/bcrypt/password";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    // Get session token
    const sessionToken = req.cookies.get("student-session")?.value ||
                         req.headers.get("authorization")?.replace("Bearer ", "");

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
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

    // Validation
    if (!newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "New password and confirmation are required" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "New password and confirmation do not match" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Verify current password if provided (for non-first login)
    if (currentPassword) {
      // You can add current password verification here if needed
      // For now, we'll allow password reset for first-time users
    }

    // Hash new password and update
    const hashedPassword = pwdHasher(newPassword);
    const success = await studentAuthService.resetStudentPassword(session.studentId, hashedPassword);

    if (!success) {
      return NextResponse.json(
        { success: false, message: "Failed to update password" },
        { status: 500 }
      );
    }

    // Log password change activity
    await studentAuthService.logStudentActivity(
      sessionToken,
      "PASSWORD_CHANGED",
      "Student changed their password"
    );

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error: any) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while updating password" },
      { status: 500 }
    );
  }
}
