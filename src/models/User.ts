import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface for the User model to use with TypeScript
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  authProvider: "credentials" | "google";
  googleId?: string;
  role: "user" | "admin";
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
  },
  password: {
    type: String,
    required: function (this: IUser) {
      return this.authProvider === "credentials";
    },
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
    enum: ["user", "admin"],
    default: "user",
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
