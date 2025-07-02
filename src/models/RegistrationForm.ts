import mongoose from "mongoose";

export type IRegistrationForm = {
  studentName: string;
  phoneNumber: string;
  dob: Date;
  gender: "Male" | "Female";
  address: string;
  city: string;
  county: string;
  citizenship: string;
  school: string;
  grade: string;
  previousComputerTraining: "YES" | "NO"; // Either "YES" or "NO"
  medicalCondition: "YES" | "NO";
  preferredHospital?: string; // Optional field
  parentName: string;
  parentPhoneNumber: string;
  session: "Morning" | "Afternoon";
  isDeleted?:boolean
};

const registrationSchema = new mongoose.Schema<IRegistrationForm>(
  {
    studentName: {
      type: String,
      required: true,
      minlength: 1,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 10,
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    address: {
      type: String,
      required: true,
      minlength: 1,
    },
    city: {
      type: String,
      required: true,
      minlength: 1,
    },
    county: {
      type: String,
      required: true,
      minlength: 1,
    },
    citizenship: {
      type: String,
      required: true,
      minlength: 1,
    },
    school: {
      type: String,
      required: true,
      minlength: 1,
    },
    grade: {
      type: String,
      required: true,
      minlength: 1,
    },
    previousComputerTraining: {
      type: String,
      enum: ["YES", "NO"],

      default: "NO",
    },
    medicalCondition: {
      type: String,
      enum: ["YES", "NO"],
      required: true,
    },
    preferredHospital: {
      type: String,
      required: function () {
        return this.medicalCondition === "YES";
      },
    },
    parentName: {
      type: String,
      required: true,
      minlength: 1,
    },
    parentPhoneNumber: {
      type: String,
      required: true,
      minlength: 10,
    },
    session: {
      type: String,
      enum: ["Morning", "Afternoon"],
      required: true,
    },
    isDeleted:{type:Boolean, default:false}
  },
  {
    timestamps: true,
  }
);

export const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);
