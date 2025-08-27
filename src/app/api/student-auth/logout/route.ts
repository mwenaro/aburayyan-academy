import { NextRequest, NextResponse } from "next/server";
import { studentAuthService } from "@/auth/StudentAuthService";

export async function POST(req: NextRequest) {
  try {
    // Get session token from cookie or header
    const sessionToken = req.cookies.get("student-session")?.value ||
                         req.headers.get("authorization")?.replace("Bearer ", "");

    if (sessionToken) {
      // Log logout activity and end session
      await studentAuthService.logStudentActivity(sessionToken, "LOGOUT", "Student logged out");
      await studentAuthService.endStudentSession(sessionToken);
    }

    // Create response and clear session cookie
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    response.cookies.set("student-session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // Clear the cookie
      path: "/student-portal",
    });

    return response;

  } catch (error: any) {
    console.error("Student logout error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during logout." },
      { status: 500 }
    );
  }
}
