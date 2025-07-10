import mongoose, { Schema, Document, Model } from "mongoose";
import { ISchool } from "./School"; // Assuming the School model is in the same directory
import { ISubject } from "./Subject";
import { IClass } from "./Class";
import { ITeacher } from "./Teacher";
import { IStudent } from "./Student";

// Define the MarkScore interface for inline marks within testing areas
export interface IMarkScore {
  _id?: mongoose.Types.ObjectId; // Auto-generated ID for each mark
  student: mongoose.Types.ObjectId | IStudent;
  score: number; // Actual score
  grade?: { name: string; points: number }; // Grade based on CBC grading (auto-calculated)
  remark?: string; // Optional remarks
}

// Define the TestingArea interface
export interface ITestingArea {
  _id?: mongoose.Types.ObjectId; // Auto-generated ID for each testing area
  name: string;
  subject: mongoose.Types.ObjectId | ISubject;
  class: mongoose.Types.ObjectId | IClass;
  teacher?: mongoose.Types.ObjectId | ITeacher; // Optional reference to a Teacher
  dueDate: Date; // Date when the exam is scheduled to be done
  dateDone?: Date; // Date when the exam was actually completed
  status: "DONE" | "PENDING"; // Status of the exam
  outOf: number; // Maximum possible score for this testing area
  invigilators: (mongoose.Types.ObjectId | ITeacher)[]; // Array of teachers who supervised the exam
  marks: IMarkScore[]; // Array of inline mark scores for this specific testing area
}

// Define the TypeScript interface for the Exam document
export interface IExam extends Document {
  name: string;
  term: number;
  year: number;
  school: mongoose.Types.ObjectId | ISchool; // Reference to School
  testingAreas: ITestingArea[]; // Array of testing areas
  createdAt?: Date; // Optional as it will be auto-added by Mongoose
  updatedAt?: Date; // Optional as it will be auto-added by Mongoose
}

// Define the schema
const ExamSchema: Schema = new Schema<IExam>(
  {
    name: {
      type: String,
      required: true,
    },
    term: {
      type: Number,
      required: true,
      enum: [1, 2, 3], // Assuming terms are limited to 1, 2, or 3
    },
    year: {
      type: Number,
      required: true,
      min: 2020, // Assuming exams start from 1900 onwards
    },
    school: {
      type: Schema.Types.ObjectId,
      ref: "School", // Reference to the School model
      required: true,
    },
    testingAreas: [
      {
        name: {
          type: String,
          required: true,
        },
        subject: {
          type: Schema.Types.ObjectId,
          ref: "Subject",
          required: true,
        },
        class: {
          type: Schema.Types.ObjectId,
          ref: "Class",
          required: true,
        },
        teacher: {
          type: Schema.Types.ObjectId,
          ref: "Teacher",
        },
        dueDate: {
          type: Date,
          required: true,
        },
        dateDone: {
          type: Date,
        },
        status: {
          type: String,
          enum: ["DONE", "PENDING"],
          default: "PENDING",
          required: true,
        },
        outOf: {
          type: Number,
          required: true,
          min: 1,
          default: 100,
        },
        invigilators: [
          {
            type: Schema.Types.ObjectId,
            ref: "Teacher",
          },
        ],
        marks: [
          {
            student: {
              type: Schema.Types.ObjectId,
              ref: "Student",
              required: true,
            },
            score: {
              type: Number,
              required: true,
              min: 0,
              default: 0,
            },
            grade: {
              type: { name: String, points: Number },
              default: { name: "B", points: 1 },
            },
            remark: {
              type: String,
              default: "",
              trim: true,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

// Pre-save middleware to calculate grades for marks within testing areas
ExamSchema.pre<IExam>("save", function (next) {
  if (this.testingAreas && this.testingAreas.length > 0) {
    this.testingAreas.forEach((testingArea) => {
      // Auto-set dateDone when status changes to DONE
      if (testingArea.status === "DONE" && !testingArea.dateDone) {
        testingArea.dateDone = new Date();
      }
      
      // Calculate grades for marks
      if (testingArea.marks && testingArea.marks.length > 0) {
        testingArea.marks.forEach((mark) => {
          // Ensure score and outOf are valid numbers
          const score = Number(mark.score);
          const outOf = Number(testingArea.outOf);
          
          if (!isNaN(score) && !isNaN(outOf) && score >= 0 && outOf > 0) {
            const percentage = (score / outOf) * 100;
            
            // Assign grade based on CBC bands
            if (percentage >= 80) {
              mark.grade = { name: "E", points: 4 };
            } else if (percentage >= 70) {
              mark.grade = { name: "M", points: 3 };
            } else if (percentage >= 50) {
              mark.grade = { name: "A", points: 2 };
            } else {
              mark.grade = { name: "B", points: 1 };
            }
          } else {
            // Set default grade if score/outOf is invalid
            mark.grade = { name: "B", points: 1 };
          }
        });
      }
    });
  }
  next();
});

// Utility function to calculate CBC grade based on score and outOf
export const calculateGrade = (score: number, outOf: number): { name: string; points: number } => {
  // Ensure score and outOf are valid numbers
  const numScore = Number(score);
  const numOutOf = Number(outOf);
  
  if (isNaN(numScore) || isNaN(numOutOf) || numScore < 0 || numOutOf <= 0) {
    return { name: "B", points: 1 };
  }
  
  const percentage = (numScore / numOutOf) * 100;
  
  // Assign grade based on CBC bands
  if (percentage >= 80) return { name: "E", points: 4 };
  else if (percentage >= 70) return { name: "M", points: 3 };
  else if (percentage >= 50) return { name: "A", points: 2 };
  else return { name: "B", points: 1 };
};

// Create and export the model
export const Exam: Model<IExam> = mongoose.models.Exam || mongoose.model<IExam>("Exam", ExamSchema);


