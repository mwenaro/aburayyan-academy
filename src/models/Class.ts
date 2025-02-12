import mongoose, { Schema, Document } from "mongoose";
import { ISchool } from "./School";

// IClass Interface
export interface IClass extends Document {
  name: string;
  ukey: string;
  school: mongoose.Types.ObjectId | ISchool; // Reference to a School document
  steps: { grade: string; year: number }[]; // Array of steps
  isGraduated: boolean; // Graduation status
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const ClassSchema = new Schema<IClass>(
  {
    name: { type: String, required: true },
    ukey: {
      type: String,
      default: function () {
        if (!this.steps || this.steps.length === 0) return this.name;
        return this.name.toLowerCase().includes("grade")
          ? `Grade 1`
          : `PP 1 ${Math.min(...this.steps.map((step) => step.year))}`;
      },
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
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
export const ClassModel =
  mongoose.models.Class || mongoose.model<IClass>("Class", ClassSchema);
