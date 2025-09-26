// Setup script to ensure all students have default password "2025"
import { Student } from "../models/Student";
import { dbCon } from "../libs/mongoose/dbCon";
import bcrypt from "bcryptjs";

async function setupStudentPasswords() {
  try {
    await dbCon();
    
    // Find students without password or with password reset required
    const studentsToUpdate = await Student.find({
      $or: [
        { password: { $exists: false } },
        { password: null },
        { password: "" },
        { passwordResetRequired: true }
      ]
    });
    
    console.log(`Found ${studentsToUpdate.length} students that need password setup`);
    
    const defaultPassword = "2025";
    const hashedPassword = await bcrypt.hash(defaultPassword, 12);
    
    // Update students with default password
    for (const student of studentsToUpdate) {
      await Student.findByIdAndUpdate(student._id, {
        $set: {
          password: hashedPassword,
          isFirstLogin: true,
          passwordResetRequired: true,
          failedLoginAttempts: 0,
          accountLocked: false,
          lockUntil: undefined
        }
      });
      
      console.log(`Updated password for student: ${student.name} (${student.regno})`);
    }
    
    // Show summary of all students
    const allStudents = await Student.find().select("name regno kas password isFirstLogin");
    console.log(`\nAll students (${allStudents.length} total):`);
    
    allStudents.forEach(student => {
      console.log(`- ${student.name} | Regno: ${student.regno} | KAS: ${student.kas} | Has Password: ${!!student.password} | First Login: ${student.isFirstLogin}`);
    });
    
    console.log(`\nSetup completed! Students can now login with:`);
    console.log(`- Registration Number OR KAS Number`);
    console.log(`- Default Password: "${defaultPassword}"`);
    console.log(`- They will be required to change password on first login`);
    
  } catch (error) {
    console.error("Setup error:", error);
  }
}

setupStudentPasswords();
