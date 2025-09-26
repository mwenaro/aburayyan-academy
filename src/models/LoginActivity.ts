import mongoose, { Schema, Document, Model } from "mongoose";

// Define the TypeScript interface for Login Activity tracking
export interface ILoginActivity extends Document {
  studentId: mongoose.Types.ObjectId;
  loginMethod: "regno" | "kas"; // Track what method was used to login
  identifier: string; // Store the actual regno or kas used
  ipAddress: string;
  userAgent: string;
  deviceInfo?: string;
  location?: string;
  loginTime: Date;
  logoutTime?: Date;
  sessionDuration?: number; // in minutes
  activityLog: Array<{
    action: string;
    timestamp: Date;
    details?: string;
  }>;
  isActive: boolean; // Track if session is still active
  createdAt?: Date;
  updatedAt?: Date;
  
  // Methods
  logActivity(action: string, details?: string): Promise<this>;
  endSession(): Promise<this>;
}

// Define the Mongoose Schema for Login Activity
const loginActivitySchema: Schema<ILoginActivity> = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },
    loginMethod: {
      type: String,
      enum: ["regno", "kas"],
      required: true,
    },
    identifier: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    deviceInfo: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    loginTime: {
      type: Date,
      default: Date.now,
      required: true,
    },
    logoutTime: {
      type: Date,
    },
    sessionDuration: {
      type: Number, // in minutes
    },
    activityLog: [
      {
        action: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        details: {
          type: String,
          default: "",
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better performance
loginActivitySchema.index({ studentId: 1, loginTime: -1 });
loginActivitySchema.index({ isActive: 1 });

// Method to log activity
loginActivitySchema.methods.logActivity = function(action: string, details?: string) {
  this.activityLog.push({
    action,
    timestamp: new Date(),
    details: details || "",
  });
  return this.save();
};

// Method to end session
loginActivitySchema.methods.endSession = function() {
  this.logoutTime = new Date();
  this.isActive = false;
  this.sessionDuration = Math.round((this.logoutTime.getTime() - this.loginTime.getTime()) / (1000 * 60));
  return this.save();
};

// Create and export the model
export const LoginActivity: Model<ILoginActivity> =
  mongoose.models.LoginActivity || mongoose.model<ILoginActivity>("LoginActivity", loginActivitySchema);
