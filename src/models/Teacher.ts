import mongoose, { Schema, Document, Model } from "mongoose";

// Define the TypeScript interface for a Teacher document
export interface ITeacher extends Document {
  name: string; // Teacher's full name
  dob: Date; // Date of Birth
  gen: "male" | "female"; // Gender
  subjects: string[]; // Subjects the teacher teaches
  phone: string; // Phone number
  email: string; // Email address
  password: string;
  address: {
    town: string; // Town name
    county: string; // County name
    nationality: string; // Nationality
    street: string; // Street name
  };
  assignedClasses: mongoose.Schema.Types.ObjectId[]; // Classes assigned to the teacher
  createdAt: Date; // Automatically generated
  updatedAt: Date; // Automatically generated
}

// Define the Mongoose Schema for a Teacher
const TeacherSchema: Schema<ITeacher> = new Schema(
  {
    name: { type: String, required: true, lowercase: true, trim: true },
    dob: { type: Date, default: Date.now },
    gen: {
      type: String,
      lowercase:true,
      enum: ["male", "female"], // Allow only these values for gender
      required: true,
    },
    password: { type: String, default: "12345", trim: true },
    subjects: [{ type: String, required: true }],
    phone: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    address: {
      town: { type: String, default: "Mombasa" },
      county: { type: String, default: "Mombasa" },
      nationality: { type: String, default: "Kenyan" },
      street: { type: String, default: "" },
    },
    assignedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Define the Mongoose Model
export const Teacher: Model<ITeacher> =
  mongoose.models.Teacher || mongoose.model<ITeacher>("Teacher", TeacherSchema);
