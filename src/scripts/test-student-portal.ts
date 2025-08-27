// Test script to verify student portal functionality
import { Student } from "../models/Student";
import { dbCon } from "../libs/mongoose/dbCon";
import bcrypt from "bcryptjs";

async function testStudentSetup() {
  try {
    await dbCon();
    
    // Find a test student
    const student = await Student.findOne().select("+password");
    
    if (!student) {
      console.log("No students found in database");
      return;
    }
    
    console.log("Found student:", {
      name: student.name,
      regno: student.regno,
      kas: student.kas,
      hasPassword: !!student.password,
      isFirstLogin: student.isFirstLogin,
      passwordResetRequired: student.passwordResetRequired,
    });
    
    // Test password verification with default password "2025"
    if (student.password) {
      const isValid = await bcrypt.compare("2025", student.password);
      console.log("Default password '2025' is valid:", isValid);
    } else {
      console.log("Student has no password set");
    }
    
    console.log("\nStudent Portal URLs to test:");
    console.log("- Login: http://localhost:3000/student-portal/login");
    console.log("- Dashboard: http://localhost:3000/student-portal/dashboard");
    console.log("- Results: http://localhost:3000/student-portal/results");
    console.log("- Profile: http://localhost:3000/student-portal/profile");
    console.log("- Activity: http://localhost:3000/student-portal/activity");
    
  } catch (error) {
    console.error("Test error:", error);
  }
}

testStudentSetup();
