import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * Subject Interface
 * Represents a subject taught by a teacher
 */
export interface ISub {
  subjectName: string; // e.g., "Maths", "All"
  grade: string; // e.g., "Grade 4", "Grade 1", etc.
}

/**
 * Teacher Interface
 * Represents a teacher with their name and subjects
 */
export interface ITr extends Document {
  name: string; // e.g., "Mr. Tom Nathan"
  subjects: ISub[]; // Array of subjects handled by the teacher
}

/**
 * Subject Schema
 */
const SubjectSchema = new Schema<ISub>(
  {
    subjectName: { type: String, required: true },
    grade: { type: String, required: true },
  },
  { _id: false } // Prevents _id generation for each subject
);

/**
 * Teacher Schema
 */
const TeacherSchema = new Schema<ITr>({
  name: { type: String, required: true },
  subjects: { type: [SubjectSchema], required: true },
});

/**
 * Teacher Model
 */
export const TeacherSubject: Model<ITr> = mongoose.models.Tr || mongoose.model<ITr>(
  "Tr",
  TeacherSchema
);
