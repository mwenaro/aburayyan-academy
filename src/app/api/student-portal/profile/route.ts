import { NextRequest, NextResponse } from "next/server";
import { studentAuthService } from "@/auth/StudentAuthService";
import { Student } from "@/models/Student";
import { LoginActivity } from "@/models/LoginActivity";
import { dbCon } from "@/libs/mongoose/dbCon";

export async function GET(req: NextRequest) {
  try {
    // Get session token
    const sessionToken = req.cookies.get("student-session")?.value ||
                         req.headers.get("authorization")?.replace("Bearer ", "");

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    // Verify session
    const session = await studentAuthService.verifySessionToken(sessionToken);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Invalid session" },
        { status: 401 }
      );
    }

    await dbCon();

    // Get student data with populated relationships
    const student = await Student.findById(session.studentId)
      .populate("class", "name grade ukey")
      .populate("guardians", "name email phone")
      .select("-password")
      .lean();

    if (!student) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    // Get recent login activity with detailed activity logs
    const recentLogins = await LoginActivity.find({ studentId: session.studentId })
      .sort({ loginTime: -1 })
      .limit(20)
      .select("loginMethod identifier ipAddress loginTime logoutTime sessionDuration deviceInfo location activityLog isActive")
      .lean();

    // Get current active sessions
    const activeSessions = await LoginActivity.find({ 
      studentId: session.studentId,
      isActive: true 
    })
      .sort({ loginTime: -1 })
      .select("loginTime ipAddress deviceInfo")
      .lean();

    // Calculate profile statistics
    const totalLogins = await LoginActivity.countDocuments({ studentId: session.studentId });
    const lastLogin = recentLogins[1]?.loginTime; // Second most recent (first is current)
    
    // Calculate total time spent (in minutes)
    const completedSessions = await LoginActivity.find({
      studentId: session.studentId,
      sessionDuration: { $exists: true }
    }).select("sessionDuration").lean();
    
    const totalTimeSpent = completedSessions.reduce((sum, session) => 
      sum + (session.sessionDuration || 0), 0);

    // Log profile view activity
    await studentAuthService.logStudentActivity(
      sessionToken,
      "VIEW_PROFILE",
      "Student viewed their profile"
    );

    return NextResponse.json({
      success: true,
      data: {
        student: {
          _id: student._id,
          name: student.name,
          regno: student.regno,
          kas: student.kas,
          dob: student.dob,
          gen: student.gen,
          photo: student.photo,
          class: student.class,
          contactDetails: student.contactDetails,
          guardians: student.guardians,
          address: student.address,
          createdAt: student.createdAt,
          lastLogin: student.lastLogin,
          isFirstLogin: student.isFirstLogin,
          passwordResetRequired: student.passwordResetRequired,
        },
        loginHistory: recentLogins,
        activeSessions,
        statistics: {
          totalLogins,
          lastLogin,
          totalTimeSpent, // in minutes
          averageSessionTime: completedSessions.length > 0 ? 
            Math.round(totalTimeSpent / completedSessions.length) : 0,
          accountCreated: student.createdAt,
        }
      }
    });

  } catch (error: any) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Get session token
    const sessionToken = req.cookies.get("student-session")?.value ||
                         req.headers.get("authorization")?.replace("Bearer ", "");

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    // Verify session
    const session = await studentAuthService.verifySessionToken(sessionToken);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Invalid session" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { contactDetails, address } = body;

    // Validate updatable fields (students can only update certain fields)
    const updateData: any = {};
    
    if (contactDetails?.phone) {
      updateData["contactDetails.phone"] = contactDetails.phone;
    }
    
    if (address) {
      if (address.street) updateData["address.street"] = address.street;
      if (address.town) updateData["address.town"] = address.town;
      if (address.county) updateData["address.county"] = address.county;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid fields to update" },
        { status: 400 }
      );
    }

    await dbCon();

    // Update student profile
    const updatedStudent = await Student.findByIdAndUpdate(
      session.studentId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password").lean();

    if (!updatedStudent) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    // Log profile update activity
    await studentAuthService.logStudentActivity(
      sessionToken,
      "UPDATE_PROFILE",
      `Updated profile fields: ${Object.keys(updateData).join(", ")}`
    );

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedStudent
    });

  } catch (error: any) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
