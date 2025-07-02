import mongoose, { Schema, Document, Model } from "mongoose";
import { IClass } from "./Class";
import { ISubject } from "./Subject";

// Define the TypeScript interface for the ClassSubject document
export interface IClassSubject extends Document {
  name: string;
  class: mongoose.Types.ObjectId | IClass; // Reference to a Class document
  sub: mongoose.Types.ObjectId | ISubject; // Reference to a Subject document
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose Schema
const ClassSubjectSchema: Schema = new Schema<IClassSubject>(
  {
    name: { type: String, required: true }, // Subject name
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    }, // Reference to a Class
    sub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    }, // Reference to a Subject
  },
  {
    timestamps: true, // Automatically includes `createdAt` and `updatedAt`
  }
);

// Define the Mongoose Model
export const ClassSubjectModel: Model<IClassSubject> =
  mongoose.models.ClassSubject ||
  mongoose.model<IClassSubject>("ClassSubject", ClassSubjectSchema);
