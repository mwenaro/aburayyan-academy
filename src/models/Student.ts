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
    image?:string
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
    guardians: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    address: {
      town: { type: String, required: true, default: "Mombasa" },
      county: { type: String, required: true, default: "Mombasa" },
      nationality: { type: String, required: true, default: "kenyan" },
      street: { type: String, required: true, default: "" },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Pre-save hook to generate regno
studentSchema.pre("save", async function (next) {
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

// Define the Mongoose Model
export const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>("Student", studentSchema);
