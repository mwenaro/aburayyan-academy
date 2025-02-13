import mongoose, { Schema, Document } from "mongoose";

// ITestMark Interface
export interface ITestMark extends Document {
  amd: number;
  name: string;
  grade: number;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const textmarkSchema = new Schema<ITestMark>(
  {
    name: { type: String, required: true },
    amd: Number,
    grade: Number,
    score: Number,
   
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);

// Mongoose Model
export const TestMark =
  mongoose.models.TestMark || mongoose.model<ITestMark>("TestMark", textmarkSchema);
