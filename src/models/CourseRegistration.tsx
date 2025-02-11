import mongoose, { Schema, Document, Model } from "mongoose";

// Define TypeScript interface for the registration
export interface ICourseRegistration extends Document {
  fullName: string;
  email: string;
  phone: string;
  residence: string;
  dob: string;
  gender: "Male" | "Female";
  purpose:
    | "Preparing for tertiary studies"
    | "Starting a cyber café or ICT business"
    | "Gaining essential digital skills for work or daily life";
}

// Define Mongoose schema
const CourseRegistrationSchema: Schema<ICourseRegistration> = new Schema(
  {
    fullName: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    phone: {
      type: String,
      required: true,
      match: [/^((\+254|0)7\d{8})$/, "Invalid Kenyan phone number"],
    },
    residence: { type: String, required: true, minlength: 3 },
    dob: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    purpose: {
      type: String,
      enum: [
        "Preparing for tertiary studies",
        "Starting a cyber café or ICT business",
        "Gaining essential digital skills for work or daily life",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define and export Mongoose model
export const CourseRegistration: Model<ICourseRegistration> =
  mongoose.models.CourseRegistration ||
  mongoose.model<ICourseRegistration>("CourseRegistration", CourseRegistrationSchema);


