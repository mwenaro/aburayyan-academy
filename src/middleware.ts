// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware
// interface AuthRequest extends NextRequest {
//   auth: any;
// }
// import authConfig from "@/auth/auth.config";
// import NextAuth from "next-auth";
// import { NextRequest } from "next/server";

// const { auth } = NextAuth(authConfig);

// export default auth((req: AuthRequest) => {
//   if (!req?.auth) {
//     const url = req.url.replace(req.nextUrl.pathname, "/");
//     return Response.redirect(url);
//   }
// });

// export const config = { matcher: ["/dashboard/:path*"] };
export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard(.*)"] }
