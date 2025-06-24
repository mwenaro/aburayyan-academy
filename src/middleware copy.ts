import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { JWT } from "next-auth/jwt";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    // Type assertions to access NextRequest properties
    const method = (req as any).method;
    const url = (req as any).nextUrl;
    const headers = (req as any).headers;
    const res = NextResponse.next();
    res.headers.set("x-url", url.origin);
    const protectedMethods = ["POST", "PUT", "DELETE"];
    const isApiRequest = url.pathname.startsWith("/api");
    if (isApiRequest && protectedMethods.includes(method)) {
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
  matcher: ["/api/:path*", "/dashboard/:path*", "/u-dashboard"],
};