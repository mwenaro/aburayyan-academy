import mongoose, { Schema, Document, Model } from "mongoose";
import { ISchool } from "./School"; // Import the ISchool interface

export enum SubjectCategory {
  PRE_PRIMARY = "PRE-PREMARY",
  LOWER_PRIMARY = "LOWER_PRIMARY",
  UPPER_PRIMARY = "UPPER_PRIMARY",
  JUNIOR_SECONDARY = "JUNIOR_SECONDARY",
  SENIOR_SECONDARY = "SENIOR_SECONDARY",
}
// Define the TypeScript interface for the Subject document
export interface ISubject extends Document {
  name: string;
  shortForm: string;
  category: SubjectCategory;
  school: mongoose.Types.ObjectId | ISchool; // Reference to a School document
}

// Define the schema
const SubjectSchema: Schema = new Schema<ISubject>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    shortForm: {
      type: String,

      default: "",
    },
    category: {
      type: String,
      enum: [...Object.values(SubjectCategory)],
    },
    school: {
      type: Schema.Types.ObjectId,
      ref: "School", // Reference the School model
      required: true,
    },
  },
  { timestamps: true }
);

// Use a pre-save middleware to compute `shortForm` only if not provided
SubjectSchema.pre<ISubject>("save", function (next) {
  if (!this.shortForm || this.shortForm.trim() === "") {
    this.shortForm = this.name.substring(0, 3).toUpperCase();
  }
  next();
});


// Create and export the model
export const Subject: Model<ISubject> =
  mongoose.models.Subject || mongoose.model<ISubject>("Subject", SubjectSchema);
