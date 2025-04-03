import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./User";

// Define the TypeScript interface for a Student document
export interface IStudent extends Document {
  name: string; // Student's full name
  dob: Date; // Date of Birth
  gen: "male" | "female"; // Gender
  photo?: string;
  class: mongoose.Schema.Types.ObjectId;
  regno: string; // Unique Registration Number
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
const studentSchema: Schema<IStudent> = new Schema(
  {
    name: { type: String, required: true },
    dob: { type: Date, required: true, default: Date.now },
    photo: { type: String },
    gen: {
      type: String,
      enum: ["male", "female"], // Allow only these values for gender
      required: true,
    },
    regno: { type: String, unique: true }, // Unique Registration Number
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    contactDetails: {
      phone: { type: String, required: true, default: "" },
    },
    guardians: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
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


// Pre-save hook to generate regno
studentSchema.pre("save", async function (next) {
  if (!this.regno) {
    const currentYear = new Date().getFullYear();
    const lastStudent = await this.constructor()
      .findOne({ regno: new RegExp(`abu/s/${currentYear}/`) }) // Find last student of the year
      .sort({ regno: -1 })
      .exec();
    let nextNumber = 1;
    if (lastStudent) {
      const lastNumber = parseInt(lastStudent.regno.split("/").pop(), 10);
      nextNumber = lastNumber + 1;
    }

    this.regno = `abu/s/${currentYear}/${String(nextNumber).padStart(3, "0")}`;
  }
  next();
});

// Define the Mongoose Model
export const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>("Student", studentSchema);
