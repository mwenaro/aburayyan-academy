import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { JWT } from "next-auth/jwt";
import { studentPortalMiddleware } from "./middleware/studentPortalMiddleware";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    // Type assertions to access NextRequest properties
    const method = (req as any).method;
    const url = (req as any).nextUrl;
    const headers = (req as any).headers;
    
    // Handle student portal routes separately
    if (url.pathname.startsWith("/student-portal") || url.pathname.startsWith("/api/student-portal") || url.pathname.startsWith("/api/student-auth")) {
      return await studentPortalMiddleware(req as any);
    }
    
    const res = NextResponse.next();
    res.headers.set("x-url", url.origin);
    const protectedMethods = ["POST", "PUT", "DELETE"];
    const isApiRequest = url.pathname.startsWith("/api");
    const isProtectedRoute = !isApiRequest; // All non-API routes matched by the middleware
    
    // Public API endpoints that don't require authentication
    const publicApiEndpoints = [
      "/api/v1/students/public",
      "/api/v1/classes/public", 
      "/api/v1/downloads/template",
      "/api/student-auth/login", // Allow login endpoint
    ];
    const isPublicApiEndpoint = publicApiEndpoints.some(endpoint => url.pathname.startsWith(endpoint));

    // Redirect unauthenticated users to NextAuth sign-in for protected routes
    if (isProtectedRoute && !(req as any).nextauth?.token) {
      const signinUrl = new URL("/api/auth/signin", url.origin);
      signinUrl.searchParams.set("callbackUrl", url.pathname + url.search);
      return NextResponse.redirect(signinUrl);
    }

    if (isApiRequest && protectedMethods.includes(method) && !isPublicApiEndpoint) {
      const token = req.nextauth?.token as JWT | undefined;
      const userIsAdmin = token?.role === "admin";
      const requestApiKey = headers.get("x-api-key");
      const apiKeyIsValid = requestApiKey === ADMIN_API_KEY;
      if (!userIsAdmin && !apiKeyIsValid) {
        return NextResponse.json(
          { message: "Forbidden: Admins only" },
          { status: 403 }
        );
      }
    }
    res.headers.set("x-url", url.origin);
    return res;
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*", "/u-dashboard", "/student-portal/:path*"],
};