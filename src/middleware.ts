import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { JWT } from "next-auth/jwt";

type NextAuthRequest = NextRequest & {
  nextauth: {
    token: JWT | null;
  };
};

const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "";

export default withAuth(
  function middleware(req: NextAuthRequest) {
    const method = req.method;
    const url = req.nextUrl;
    const protectedMethods = ["POST", "PUT", "DELETE"];
    const isApiRequest = url.pathname.startsWith("/api");
    // Restrict API mutations to admins or valid API key
    if (isApiRequest && protectedMethods.includes(method)) {
      const token = req.nextauth?.token;
      const userIsAdmin = token?.role === "admin";

      const requestApiKey = req.headers.get("x-api-key");
      const apiKeyIsValid = requestApiKey === ADMIN_API_KEY;

      if (!userIsAdmin && !apiKeyIsValid) {
        return NextResponse.json(
          { message: "Forbidden: Admins only" },
          { status: 403 }
        );
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Allow access so we can handle logic ourselves
    },
  }
);

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*", "/u-dashboard"],
};
