// Lightweight JWT utility for middleware (no Mongoose dependencies)
import * as jwt from "jsonwebtoken";

export interface StudentJWTPayload {
  studentId: string;
  regno: string;
  name: string;
  class: any;
  sessionType: string;
  iat: number;
  exp: number;
}

export class StudentJWTUtils {
  private static getSecret(): string {
    return process.env.STUDENT_JWT_SECRET || process.env.NEXTAUTH_SECRET || "student-portal-secret-key";
  }

  static verifyToken(token: string): StudentJWTPayload | null {
    try {
      const decoded = jwt.verify(token, this.getSecret()) as StudentJWTPayload;
      
      // Verify it's a student portal token
      if (decoded.sessionType !== "student-portal") {
        return null;
      }
      
      return decoded;
    } catch (error) {
      console.error("JWT verification failed:", error);
      return null;
    }
  }

  static isTokenExpired(token: string): boolean {
    try {
      const decoded = jwt.decode(token) as StudentJWTPayload;
      if (!decoded || !decoded.exp) return true;
      
      return Date.now() >= decoded.exp * 1000;
    } catch (error) {
      return true;
    }
  }
}
