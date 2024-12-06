import mongoose, { Schema, Document } from "mongoose";
import { ISchool } from "./School";

// IClass Interface
export interface IClass {
  _id:mongoose.Types.ObjectId
  name: string;
  school: mongoose.Types.ObjectId | ISchool; // Reference to a School document
  steps: { grade: string; year: number }[]; // Array of steps
  isGraduated: boolean; // Graduation status
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const ClassSchema = new Schema<IClass & Document>(
  {
    name: { type: String, required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    steps: [
      {
        grade: { type: String, required: true },
        year: { type: Number, required: true },
      },
    ],
    isGraduated: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);

// Mongoose Model
export const ClassModel = mongoose.models.Class || mongoose.model<IClass & Document>("Class", ClassSchema);
