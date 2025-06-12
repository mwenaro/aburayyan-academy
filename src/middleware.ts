import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { JWT } from "next-auth/jwt";

type NextAuthRequest = NextRequest & {
  nextauth: {
    token: JWT | null;
  };
};

const ADMIN_API_KEY = process.env.ADMIN_API_KEY || ""; // Set this in your .env file

export default withAuth(
  function middleware(req: NextAuthRequest) {
    const method = req.method;
    const url = req.nextUrl;
    const protectedMethods = ["POST", "PUT", "DELETE"];

    const isApiRequest = url.pathname.startsWith("/api");

    if (isApiRequest && protectedMethods.includes(method)) {
      const token = req.nextauth?.token;
      // const userIsAdmin = ["admin","user"].includes(token?.role||"test");
      const userIsAdmin = "admin" === token?.role || "user" === token?.role

      const requestApiKey = req.headers.get("x-api-key");
      const apiKeyIsValid = requestApiKey === ADMIN_API_KEY;

      if (!userIsAdmin && !apiKeyIsValid) {
        return new NextResponse("Forbidden: Admins only", { status: 403 });
      }
    }

    const res = NextResponse.next();
    res.headers.set("x-url", req.nextUrl.origin);
    return res;
  },
  // {
  //   callbacks: {
  //     authorized: ({ token }) => !!token, // Only enforce login
  //   },
  // }
);

export const config = {
  matcher: ["/dashboard/:path*", "/u-dashboard", "/api/:path*"],
};
