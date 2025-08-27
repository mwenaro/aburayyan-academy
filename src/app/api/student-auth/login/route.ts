import { NextRequest, NextResponse } from "next/server";
import { studentAuthService } from "@/auth/StudentAuthService";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, password, loginMethod } = body;

    // Validation
    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: "Identifier and password are required" },
        { status: 400 }
      );
    }

    if (!loginMethod || !["regno", "kas"].includes(loginMethod)) {
      return NextResponse.json(
        { success: false, message: "Valid login method (regno or kas) is required" },
        { status: 400 }
      );
    }

    // Get client information for security tracking
    const headersList = headers();
    const ipAddress = headersList.get("x-forwarded-for") || 
                     headersList.get("x-real-ip") || 
                     req.ip || 
                     "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";
    const acceptLanguage = headersList.get("accept-language") || "";
    const deviceInfo = `${userAgent}`;

    // Attempt authentication
    const loginResult = await studentAuthService.authenticateStudent({
      identifier: identifier.trim(),
      password: password.trim(),
      loginMethod,
      ipAddress,
      userAgent,
      deviceInfo,
      location: acceptLanguage.split(",")[0] || "", // Simple location based on language
    });

    if (!loginResult.success) {
      return NextResponse.json(
        { success: false, message: loginResult.message },
        { status: 401 }
      );
    }

    // Successful login
    const response = NextResponse.json({
      success: true,
      message: loginResult.message,
      student: {
        _id: loginResult.student?._id,
        name: loginResult.student?.name,
        regno: loginResult.student?.regno,
        kas: loginResult.student?.kas,
        class: loginResult.student?.class,
        photo: loginResult.student?.photo,
        gen: loginResult.student?.gen,
      },
      requiresPasswordReset: loginResult.requiresPasswordReset,
      sessionToken: loginResult.sessionToken,
    });

    // Set session cookie
    if (loginResult.sessionToken) {
      response.cookies.set("student-session", loginResult.sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60, // 24 hours
        path: "/student-portal",
      });
    }

    return response;

  } catch (error: any) {
    console.error("Student login error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during login. Please try again." },
      { status: 500 }
    );
  }
}
