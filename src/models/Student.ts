import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./User";


// Define the TypeScript interface for a Student document
export interface IStudent extends Document {
  name: string; // Student's full name
  dob: Date; // Date of Birth
  gen: "Male" | "Female"; // Gender
  class: mongoose.Schema.Types.ObjectId;
  contactDetails: {
    phone: string; // Phone number
  };
  password:string,
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
    dob: { type: Date,  default: Date.now },
    gen: {
      type: String,
      enum: ["male", "female"], // Allow only these values for gender
      required: true,
    },
    password: { type: String, default: "12345", trim: true },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    contactDetails: {
      phone: { type: String, default: "" },
    },
    guardians: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    ],
    address: {
      town: { type: String,  default: "Mombasa" },
      county: { type: String,  default: "Mombasa" },
      nationality: { type: String,  default: "kenyan" },
      street: { type: String,  default: "" },
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Define the Mongoose Model
export const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);
