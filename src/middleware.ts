import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const method = req.method;
    const protectedMethods = ["POST", "PUT", "DELETE"];

    // Check if the request is to an API route
    const isApiRoute = url.pathname.startsWith("/api");

    // Restrict mutations to admin users only
    if (isApiRoute && protectedMethods.includes(method)) {
      const role = req.nextauth?.token?.role;

      if (role !== "admin") {
        return NextResponse.json(
          { message: "Forbidden: Admins only" },
          { status: 403 }
        );
      }
    }

    // Continue to route handler
    const res = NextResponse.next();
    res.headers.set("x-url", req.nextUrl.origin);
    return res;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Require authentication
    },
  }
);


export const config = {
  matcher: [
    "/dashboard/:path*",
    "/u-dashboard",
    "/api/:path*", 
  ],
};
