import mongoose, { Schema, Document, Model } from "mongoose";
import { ISchool } from "./School"; // Import the ISchool interface

// Define the TypeScript interface for the Responsibility document
export interface IResponsibility extends Document {
  title: string;
  shortForm: string;
  school: mongoose.Types.ObjectId | ISchool; // Reference to a School document
}

// Define the schema
const ResponsibilitySchema: Schema = new Schema<IResponsibility>({
  title: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  shortForm: {
    type: String,
    required: true,
    unique: true,
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: "School", // Reference the School model
    required: true,
  },
}, { timestamps: true });

// Use a pre-save middleware to compute `shortForm` only if not provided
ResponsibilitySchema.pre<IResponsibility>("save", function (next) {
  if (!this.shortForm || this.shortForm.trim() === "") {
    this.shortForm = this.title.substring(0, 3);
  }
  next();
});

// Create and export the model
export const ResponsibilityModel: Model<IResponsibility> = mongoose.model<IResponsibility>("Responsibility", ResponsibilitySchema);
