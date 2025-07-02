import NextAuth from "next-auth/next";
import authConfig from "@/auth/auth.config";

const auth = NextAuth(authConfig)
export {auth as GET, auth as POST}
