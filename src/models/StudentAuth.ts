import mongoose, { Schema, Document, Model } from "mongoose";
import { IStudent, Student } from "./Student";
import { pwdHasher } from "@/libs/bcrypt/password";

// Define the TypeScript interface for Student Authentication
export interface IStudentAuth extends IStudent {
  password: string;
  isFirstLogin: boolean;
  lastLogin?: Date;
  passwordResetRequired: boolean;
  failedLoginAttempts: number;
  accountLocked: boolean;
  lockUntil?: Date;
  twoFactorEnabled?: boolean;
  sessionToken?: string;
  lastPasswordChange?: Date;
}

// Define additional schema fields for authentication
const studentAuthSchemaFields = {
  password: {
    type: String,
    required: true,
    default: function() {
      return pwdHasher("2025"); // Default password as specified
    }
  },
  isFirstLogin: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
  },
  passwordResetRequired: {
    type: Boolean,
    default: true, // Force password reset on first login
  },
  failedLoginAttempts: {
    type: Number,
    default: 0,
  },
  accountLocked: {
    type: Boolean,
    default: false,
  },
  lockUntil: {
    type: Date,
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },
  sessionToken: {
    type: String,
  },
  lastPasswordChange: {
    type: Date,
    default: Date.now,
  },
};

// Create the StudentAuth schema by extending the Student schema
const studentAuthSchema = new Schema<IStudentAuth>({
  ...(Student.schema.obj as any),
  ...studentAuthSchemaFields,
}, {
  timestamps: true,
});

// Virtual to check if account is currently locked
studentAuthSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil.getTime() > Date.now());
});

// Method to increment login attempts
studentAuthSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil.getTime() < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { failedLoginAttempts: 1 }
    });
  }

  const updates: any = { $inc: { failedLoginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.failedLoginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = {
      accountLocked: true,
      lockUntil: Date.now() + 2 * 60 * 60 * 1000 // 2 hours
    };
  }
  
  return this.updateOne(updates);
};

// Method to reset login attempts
studentAuthSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { lockUntil: 1 },
    $set: { 
      failedLoginAttempts: 0,
      accountLocked: false,
      lastLogin: new Date()
    }
  });
};

// Method to update password
studentAuthSchema.methods.updatePassword = function(newPassword: string) {
  return this.updateOne({
    $set: {
      password: pwdHasher(newPassword),
      lastPasswordChange: new Date(),
      passwordResetRequired: false,
      isFirstLogin: false
    }
  });
};

// Create and export the model
export const StudentAuth: Model<IStudentAuth> =
  mongoose.models.StudentAuth || mongoose.model<IStudentAuth>("StudentAuth", studentAuthSchema);
