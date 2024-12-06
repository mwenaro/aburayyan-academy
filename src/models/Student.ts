import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./User";

// Define the TypeScript interface for a Student document
export interface IStudent extends Document {
  name: string; // Student's full name
  dob: Date; // Date of Birth
  gen: "Male" | "Female" | "Other"; // Gender
  contactDetails: {
    phone: string; // Phone number
  };
  guardians: (mongoose.Types.ObjectId | IUser)[];
  address: {
    town: string; // Town name
    county: string; // County name
    nationality: string; // Nationality
    street: string; // Street name
  };
  createdAt: Date; // Automatically generated
  updatedAt: Date; // Automatically generated
}

// Define the Mongoose Schema for a Student
const StudentSchema: Schema<IStudent> = new Schema(
  {
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gen: {
      type: String,
      enum: ["Male", "Female", "Other"], // Allow only these values for gender
      required: true,
    },
    contactDetails: {
      phone: { type: String, required: true, default: "" },
    },
    guardians: [
      { type: mongoose.Schema.Types.ObjectId, ref: "IUser", required: true },
    ],
    address: {
      town: { type: String, required: true, default: "Mombasa" },
      county: { type: String, required: true, default: "Mombasa" },
      nationality: { type: String, required: true, default: "kenyan" },
      street: { type: String, required: true, default: "" },
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Define the Mongoose Model
export const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);
