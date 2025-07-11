import { pwdHasher } from "@/libs/bcrypt/password";
import mongoose, { Document, Schema, Model } from "mongoose";
import { ISchool } from "./School";
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  TEACHER = "teacher",
  GUARDIAN = "guardian",
}
// Define an interface for the User model to use with TypeScript
export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  school?: mongoose.Types.ObjectId | ISchool; // Optional reference to School
  authProvider: "credentials" | "google";
  googleId?: string;
  role: UserRole;
  image?: string;
  createdAt: Date;
}

// Create the User schema
const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: function (this: IUser) {
      return this.authProvider === "credentials";
    },
    default: pwdHasher("123456"),
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: "School", // Reference to the School model
    required: true,
  },
  authProvider: {
    type: String,
    required: true,
    enum: ["credentials", "google"],
    default: "credentials",
  },
  googleId: {
    type: String,
    required: function (this: IUser) {
      return this.authProvider === "google";
    },
  },
  role: {
    type: String,
    enum: [...Object.values(UserRole)],
    default: UserRole.USER,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the User model
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
