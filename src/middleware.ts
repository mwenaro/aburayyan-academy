import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { JWT } from "next-auth/jwt"; // Optional, for typing
type NextAuthRequest = NextRequest & {
  nextauth: {
    token: JWT | null;
  };
};
export default withAuth(
  function middleware(req: NextAuthRequest, event) {
    const method = req.method;
    const url = req.nextUrl;
    const protectedMethods = ["POST", "PUT", "DELETE"];

    // Check if it's an API route and a protected method
    if (url.pathname.startsWith("/api") && protectedMethods.includes(method)) {
      const token = req?.nextauth.token as JWT | null;

      if (!token || token.role !== "admin") {
        return NextResponse.json(
          { message: "Forbidden: Admins only" },
          { status: 403 }
        );
      }
    }

    const res = NextResponse.next();
    res.headers.set("x-url", req.nextUrl.origin);
    return res;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Only allow authenticated users
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/u-dashboard", "/api/:path*"],
};
