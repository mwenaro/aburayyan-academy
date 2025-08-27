import { pwdConfirm } from "@/libs/bcrypt/password";
import { IStudent, Student } from "@/models/Student";
import { LoginActivity, ILoginActivity } from "@/models/LoginActivity";
import { dbCon } from "@/libs/mongoose/dbCon";
import * as jwt from "jsonwebtoken";

export interface StudentLoginResult {
  success: boolean;
  student?: IStudent;
  message: string;
  requiresPasswordReset?: boolean;
  sessionToken?: string;
  loginActivity?: ILoginActivity;
}

export interface LoginAttempt {
  identifier: string;
  password: string;
  loginMethod: "regno" | "kas";
  ipAddress: string;
  userAgent: string;
  deviceInfo?: string;
  location?: string;
}

class StudentAuthService {
  constructor() {
    // Initialize database connection
    (async () => await dbCon())();
  }

  // Find student by registration number or KAS
  async findStudentByCredentials(identifier: string): Promise<IStudent | null> {
    try {
      await dbCon();
      
      // Try to find by registration number first, then by KAS
      let student = await Student.findOne({ regno: identifier }).lean();
      
      if (!student) {
        student = await Student.findOne({ kas: identifier }).lean();
      }
      
      return student;
    } catch (error) {
      console.error("Error finding student:", error);
      return null;
    }
  }

  // Authenticate student login
  async authenticateStudent(loginAttempt: LoginAttempt): Promise<StudentLoginResult> {
    try {
      const { identifier, password, loginMethod, ipAddress, userAgent, deviceInfo, location } = loginAttempt;

      // Find student
      const student = await this.findStudentByCredentials(identifier);
      
      if (!student) {
        return {
          success: false,
          message: "Invalid credentials. Please check your registration number or KAS.",
        };
      }

      // Check if account is locked
      if (this.isAccountLocked(student)) {
        return {
          success: false,
          message: "Account is temporarily locked due to multiple failed login attempts. Please try again later.",
        };
      }

      // Verify password
      let isValidPassword = false;
      let requiresPasswordReset = false;

      if (student.password) {
        // Student has a password set, verify against it
        isValidPassword = await pwdConfirm(password, student.password);
        requiresPasswordReset = student.passwordResetRequired || false;
      } else {
        // Student has no password set, accept default password "2025"
        isValidPassword = password === "2025";
        requiresPasswordReset = true;
      }
      
      if (!isValidPassword) {
        // Record failed login attempt
        await this.recordFailedLogin(String(student._id), loginMethod, identifier, ipAddress, userAgent);
        
        return {
          success: false,
          message: "Invalid password. Please try again.",
        };
      }

      // Generate session token
      const sessionToken = this.generateSessionToken(student);

      // Record successful login activity
      const loginActivity = await this.recordLoginActivity({
        studentId: String(student._id),
        loginMethod,
        identifier,
        ipAddress,
        userAgent,
        deviceInfo,
        location,
      });

      // Update student's last login
      await Student.findByIdAndUpdate(student._id, {
        lastLogin: new Date(),
        failedLoginAttempts: 0, // Reset failed attempts on successful login
      });

      return {
        success: true,
        student,
        sessionToken,
        loginActivity,
        requiresPasswordReset,
        message: requiresPasswordReset 
          ? "Login successful. Please change your password for security."
          : "Login successful. Welcome back!",
      };

    } catch (error) {
      console.error("Authentication error:", error);
      return {
        success: false,
        message: "An error occurred during login. Please try again.",
      };
    }
  }

  // Generate JWT session token
  private generateSessionToken(student: IStudent): string {
    const payload = {
      studentId: String(student._id),
      regno: student.regno,
      name: student.name,
      class: student.class,
      sessionType: "student-portal",
      iat: Math.floor(Date.now() / 1000), // issued at
    };

    const secret = process.env.STUDENT_JWT_SECRET || process.env.NEXTAUTH_SECRET || "student-portal-secret-key";
    
    return jwt.sign(payload, secret, { expiresIn: "24h" });
  }

  // Verify session token
  async verifySessionToken(token: string): Promise<any> {
    try {
      const secret = process.env.STUDENT_JWT_SECRET || process.env.NEXTAUTH_SECRET || "student-portal-secret-key";
      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (error) {
      console.error("Token verification failed:", error);
      return null;
    }
  }

  // Record successful login activity
  private async recordLoginActivity(activityData: {
    studentId: string;
    loginMethod: "regno" | "kas";
    identifier: string;
    ipAddress: string;
    userAgent: string;
    deviceInfo?: string;
    location?: string;
  }): Promise<ILoginActivity> {
    const loginActivity = new LoginActivity({
      ...activityData,
      activityLog: [
        {
          action: "LOGIN_SUCCESS",
          timestamp: new Date(),
          details: `Student logged in using ${activityData.loginMethod}: ${activityData.identifier}`,
        },
      ],
    });

    return await loginActivity.save();
  }

  // Record failed login attempt
  private async recordFailedLogin(
    studentId: string,
    loginMethod: "regno" | "kas",
    identifier: string,
    ipAddress: string,
    userAgent: string
  ): Promise<void> {
    // Increment failed login attempts for the student
    await Student.findByIdAndUpdate(studentId, {
      $inc: { failedLoginAttempts: 1 },
    });

    // Record the failed attempt
    const loginActivity = new LoginActivity({
      studentId,
      loginMethod,
      identifier,
      ipAddress,
      userAgent,
      isActive: false,
      activityLog: [
        {
          action: "LOGIN_FAILED",
          timestamp: new Date(),
          details: `Failed login attempt using ${loginMethod}: ${identifier}`,
        },
      ],
    });

    await loginActivity.save();
  }

  // Check if account is locked
  private isAccountLocked(student: any): boolean {
    const maxAttempts = 5;
    const lockDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

    if (student.failedLoginAttempts >= maxAttempts) {
      const lastFailedAttempt = student.updatedAt || student.createdAt;
      const lockExpiry = new Date(lastFailedAttempt.getTime() + lockDuration);
      
      return new Date() < lockExpiry;
    }

    return false;
  }

  // Log student activity
  async logStudentActivity(
    sessionToken: string,
    action: string,
    details?: string
  ): Promise<boolean> {
    try {
      const decoded = await this.verifySessionToken(sessionToken);
      if (!decoded) return false;

      // Find the current active session
      const activeSession = await LoginActivity.findOne({
        studentId: decoded.studentId,
        isActive: true,
      }).sort({ loginTime: -1 });

      if (activeSession) {
        await (activeSession as ILoginActivity).logActivity(action, details);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error logging activity:", error);
      return false;
    }
  }

  // End student session
  async endStudentSession(sessionToken: string): Promise<boolean> {
    try {
      const decoded = await this.verifySessionToken(sessionToken);
      if (!decoded) return false;

      // Find and end the active session
      const activeSession = await LoginActivity.findOne({
        studentId: decoded.studentId,
        isActive: true,
      }).sort({ loginTime: -1 });

      if (activeSession) {
        await (activeSession as ILoginActivity).endSession();
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error ending session:", error);
      return false;
    }
  }

  // Get student login history
  async getStudentLoginHistory(studentId: string, limit: number = 10): Promise<ILoginActivity[]> {
    try {
      return await LoginActivity.find({ studentId })
        .sort({ loginTime: -1 })
        .limit(limit)
        .lean();
    } catch (error) {
      console.error("Error fetching login history:", error);
      return [];
    }
  }

  // Reset student password
  async resetStudentPassword(studentId: string, newPassword: string): Promise<boolean> {
    try {
      await Student.findByIdAndUpdate(studentId, {
        password: newPassword, // This should be hashed in the Student model
        lastPasswordChange: new Date(),
        passwordResetRequired: false,
        isFirstLogin: false,
      });

      return true;
    } catch (error) {
      console.error("Error resetting password:", error);
      return false;
    }
  }
}

export const studentAuthService = new StudentAuthService();
