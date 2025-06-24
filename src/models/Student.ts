import { strCapitalize } from "@/libs/str_functions";
import mongoose, { Schema, Document, Model } from "mongoose";
import { Counter } from "./Counter";

// Define the TypeScript interface for a Student document
export interface IStudent extends Document {
  name: string;
  dob: Date;
  gen: "male" | "female";
  photo?: string;
  class: mongoose.Schema.Types.ObjectId;
  regno: string;
  contactDetails: { phone: string };
  guardians: mongoose.Types.ObjectId[];
  address: {
    town: string;
    county: string;
    nationality: string;
    street: string;
    image?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
  kas?: string;
  birthCertificate?: string;
}

// Define the Mongoose Schema for a Student
const studentSchema: Schema<IStudent> = new Schema(
  {
    name: { type: String, required: true },
    dob: { type: Date, required: true, default: Date.now },
    photo: { type: String },
    gen: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    regno: { type: String, unique: true }, // Unique Registration Number
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    contactDetails: {
      phone: { type: String, default: "07xxxxxxxx" },
    },
    guardians: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    address: {
      town: { type: String, required: true, default: "Mombasa" },
      county: { type: String, required: true, default: "Mombasa" },
      nationality: { type: String, required: true, default: "kenyan" },
      street: { type: String, default: "" },
    },
    kas: { type: String },
    birthCertificate: { type: String },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

studentSchema.pre("save", async function (next) {
  if (this.isModified("name") && this.name) {
    this.name = strCapitalize(this.name);
  }

  if (!this.regno) {
    const currentYear = new Date().getFullYear();
    const counterKey = `student_regno_${currentYear}`;

    // Atomically increment counter
    const counter = await Counter.findOneAndUpdate(
      { key: counterKey },
      { $inc: { seq: 1 } },
      { upsert: true, new: true }
    );

    this.regno = `abu/s/${currentYear}/${String(counter.seq).padStart(3, "0")}`;
  }

  next();
});

// studentSchema.pre("insertMany", async function (next, docs: IStudent[]) {
//   try {
//     const currentYear = new Date().getFullYear();
//     const StudentModel = mongoose.model<IStudent>("Student");

//     let nextNumber = 1;

//     for (const doc of docs) {
//       // Capitalize name
//       if (doc.name) {
//         doc.name = strCapitalize(doc.name);
//       }

//       // Assign regno if missing
//       if (!doc.regno) {
//         let newRegno = "";
//         let regnoExists = true;

//         // Loop until an unused regno is found
//         while (regnoExists) {
//           newRegno = `abu/s/${currentYear}/${String(nextNumber).padStart(3, "0")}`;
//           const existing = await StudentModel.findOne({ regno: newRegno }).lean();
//           if (!existing && !docs.some(d => d.regno === newRegno)) {
//             regnoExists = false;
//           } else {
//             nextNumber++;
//           }
//         }

//         doc.regno = newRegno;
//         nextNumber++;
//       }
//     }

//     next();
//   } catch (err: any) {
//     console.error("insertMany hook error:", err);
//     next(err);
//   }
// });

// Define the Mongoose Model
export const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>("Student", studentSchema);
