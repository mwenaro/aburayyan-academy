import { strCapitalize } from "@/libs/str_functions";
import mongoose, { Schema, Document, Model } from "mongoose";

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
      phone: { type: String, required: true, default: "" },
    },
    guardians: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    address: {
      town: { type: String, required: true, default: "Mombasa" },
      county: { type: String, required: true, default: "Mombasa" },
      nationality: { type: String, required: true, default: "kenyan" },
      street: { type: String,  default: "" },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Pre-save hook to generate regno
studentSchema.pre("save", async function (next) {
  // capitalize some fields
  if (this.isModified("name") && this.name) {
    this.name = strCapitalize(this.name);
  }

  if (!this.regno) {
    const currentYear = new Date().getFullYear();

    // Explicitly cast `this.constructor` to the Student model
    const StudentModel = this.constructor as typeof Student;

    // Find the most recent student for the current year
    const lastStudent = await StudentModel.findOne({
      regno: new RegExp(`^abu/s/${currentYear}/\\d{3}$`),
    }) // Ensure proper format
      .sort({ $natural: -1 }) // Sort by insertion order, assuming regnos are assigned sequentially
      .exec();

    let nextNumber = 1;
    if (lastStudent) {
      // Extract the numeric part from the last regno
      const match = lastStudent.regno.match(/(\d{3})$/);
      if (match) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }

    // Generate the new regno
    this.regno = `abu/s/${currentYear}/${String(nextNumber).padStart(3, "0")}`;
  }

  next();
});


studentSchema.pre("insertMany", async function (next, docs: IStudent[]) {
  try {
    for (const doc of docs) {
      // Capitalize name
      if (doc.name) {
        doc.name = strCapitalize(doc.name);
      }

      // Assign regno if missing
      if (!doc.regno) {
        const currentYear = new Date().getFullYear();
        const StudentModel = mongoose.model<IStudent>("Student");

        // Find the last student (this is simplified; you may want a more robust strategy)
        const lastStudent = await StudentModel.findOne({
          regno: new RegExp(`^abu/s/${currentYear}/\\d{3}$`),
        }).sort({ $natural: -1 });

        let nextNumber = 1;
        if (lastStudent?.regno) {
          const match = lastStudent.regno.match(/(\d{3})$/);
          if (match) {
            nextNumber = parseInt(match[1], 10) + 1;
          }
        }

        doc.regno = `abu/s/${currentYear}/${String(nextNumber).padStart(3, "0")}`;
        nextNumber++; // Increment for the next doc
      }
    }

    next();
  } catch (err:any) {
    console.error("insertMany hook error:", err);
    next(err);
  }
});

// Define the Mongoose Model
export const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>("Student", studentSchema);
