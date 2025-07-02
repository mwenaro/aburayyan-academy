import mongoose, { Schema, Document, Model } from "mongoose";
import { ISchool } from "./School"; // Assuming the School model is in the same directory

// Define the TypeScript interface for the Exam document
export interface IExam extends Document {
  name: string;
  term: number;
  year: number;
  school: mongoose.Types.ObjectId | ISchool; // Reference to School
  createdAt?: Date; // Optional as it will be auto-added by Mongoose
  updatedAt?: Date; // Optional as it will be auto-added by Mongoose
}

// Define the schema
const ExamSchema: Schema = new Schema<IExam>(
  {
    name: {
      type: String,
      required: true,
    },
    term: {
      type: Number,
      required: true,
      enum: [1, 2, 3], // Assuming terms are limited to 1, 2, or 3
    },
    year: {
      type: Number,
      required: true,
      min: 2020, // Assuming exams start from 1900 onwards
    },
    school: {
      type: Schema.Types.ObjectId,
      ref: "School", // Reference to the School model
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

// Create and export the model
export const Exam: Model<IExam> = mongoose.models.Exam || mongoose.model<IExam>("Exam", ExamSchema);


