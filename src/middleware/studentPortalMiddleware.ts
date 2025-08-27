import { NextRequest, NextResponse } from "next/server";
import { StudentJWTUtils } from "@/libs/jwt/studentJWTUtils";

export async function studentPortalMiddleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Public routes that don't require authentication
  const publicRoutes = [
    "/student-portal",
    "/student-portal/login",
  ];

  // Check if the route is public
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for session token
  const sessionToken = req.cookies.get("student-session")?.value ||
                       req.headers.get("authorization")?.replace("Bearer ", "");

  if (!sessionToken) {
    // Redirect to login for protected routes
    if (pathname.startsWith("/student-portal")) {
      return NextResponse.redirect(new URL("/student-portal/login", req.url));
    }
    return NextResponse.json(
      { success: false, message: "Authentication required" },
      { status: 401 }
    );
  }

  // Verify session token
  const session = StudentJWTUtils.verifyToken(sessionToken);
  if (!session) {
    // Clear invalid session cookie
    const response = pathname.startsWith("/student-portal") 
      ? NextResponse.redirect(new URL("/student-portal/login", req.url))
      : NextResponse.json(
          { success: false, message: "Invalid session" },
          { status: 401 }
        );

    response.cookies.set("student-session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/student-portal",
    });

    return response;
  }

  // Add student info to headers for use in API routes
  const response = NextResponse.next();
  response.headers.set("x-student-id", session.studentId);
  response.headers.set("x-student-regno", session.regno);

  return response;
}

// Middleware configuration
export const studentPortalConfig = {
  matcher: [
    "/student-portal/:path*",
    "/api/student-portal/:path*",
  ],
};
