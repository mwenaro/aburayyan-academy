import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    // Log the current request pathname for debugging
    const res = NextResponse.next();
    // You can perform additional checks here if needed
    res.headers.set("x-url", req.nextUrl.origin);
    return res; // Continue if the user is authenticated
  },
  {
    // You can specify additional next-auth options here (optional)
  }
);

// Define the routes that need to be protected
export const config = {
  matcher: ["/dashboard/:path*"],
//   matcher: ["/dashboard/:path*", "/api/:path*"],
};