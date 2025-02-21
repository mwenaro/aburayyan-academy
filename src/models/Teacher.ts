import mongoose, { Model, models, Schema } from "mongoose";
import { IUser, User } from "./User";

export enum ITrRole {
  classTeacher = "classTeacher",
  subjectTeacher = "subjectTeacher",
}

// Define responsibility as a discriminated union type
export type IResponsibility =
  | {
      role: ITrRole.classTeacher;
      class: string; // classId is required for class teachers
      startDate: Date;
      to?: Date;
    }
  | {
      role: ITrRole.subjectTeacher;
      subject: string; // subject is required for subject teachers
      startDate: Date;
      to?: Date;
    };

export interface ITeacher extends IUser {
  subjects: string[];
  qualification: string;
  responsibilities: IResponsibility[];
}

// Define the Mongoose schema for responsibilities
const responsibilitySchema = new Schema<IResponsibility>(
  {
    role: {
      type: String, // Fix: Use String explicitly
      enum: Object.values(ITrRole), // Fix: Extract enum values
      required: true,
    },
    class: { type: String },
    subject: { type: String },
    startDate: { type: Date, required: true },
    to: { type: Date },
  },
  { _id: false } // Prevents Mongoose from generating an _id for each responsibility
);

// Validate that "class" is required only when role is "classTeacher"
responsibilitySchema.pre("validate", function (next) {
  const responsibility = this as unknown as IResponsibility; // Type assertion

  if (
    responsibility.role === ITrRole.classTeacher &&
    (!responsibility.class || "subject" in responsibility) // class is required, subject should be absent
  ) {
    return next(new Error('"class" is required for role "classTeacher"'));
  }

  if (
    responsibility.role === ITrRole.subjectTeacher &&
    (!responsibility.subject || "class" in responsibility) // subject is required, class should be absent
  ) {
    return next(new Error('"subject" is required for role "subjectTeacher"'));
  }

  next();
});

// Create the Teacher Schema
const teacherSchema = new Schema<ITeacher>({
  subjects: { type: [String], required: true },
  qualification: { type: String, required: true },
  responsibilities: [responsibilitySchema], // Use the responsibility schema
});

// Create the Teacher model as a discriminator of User
export const Teacher: Model<ITeacher> =
  models.Teacher || User.discriminator<ITeacher>("Teacher", teacherSchema);
