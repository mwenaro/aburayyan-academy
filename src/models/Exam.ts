import mongoose, { Schema, Document, Model } from "mongoose";
import { ISchool } from "./School"; // Assuming the School model is in the same directory
import { ISubject } from "./Subject";
import { IClass } from "./Class";
import { ITeacher } from "./Teacher";
import { IStudent } from "./Student";

// Define grading system types
export type GradingSystemType = "general" | "lower" | "cbc";

// Define grading system interface
export interface IGradingSystem {
  name: string;
  type: GradingSystemType;
  bands: {
    min: number;
    max: number;
    grade: { name: string; points: number };
  }[];
}

// Define the available grading systems
export const GRADING_SYSTEMS: Record<GradingSystemType, IGradingSystem> = {
  general: {
    name: "General Grading System",
    type: "general",
    bands: [
      { min: 75, max: 100, grade: { name: "E.E", points: 4 } },
      { min: 50, max: 74, grade: { name: "M.E", points: 3 } },
      { min: 25, max: 49, grade: { name: "A.E", points: 2 } },
      { min: 0, max: 24, grade: { name: "B.E", points: 1 } }
    ]
  },
  lower: {
    name: "Lower Grading System",
    type: "lower",
    bands: [
      { min: 80, max: 100, grade: { name: "E.E", points: 4 } },
      { min: 60, max: 79, grade: { name: "M.E", points: 3 } },
      { min: 50, max: 59, grade: { name: "A.E", points: 2 } },
      { min: 0, max: 49, grade: { name: "B.E", points: 1 } }
    ]
  },
  cbc: {
    name: "CBC Grading System",
    type: "cbc",
    bands: [
      { min: 80, max: 100, grade: { name: "E.E", points: 4 } },
      { min: 70, max: 79, grade: { name: "M.E", points: 3 } },
      { min: 50, max: 69, grade: { name: "A.E", points: 2 } },
      { min: 0, max: 49, grade: { name: "B.E", points: 1 } }
    ]
  }
};

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
  gradingSystem: GradingSystemType; // Grading system to use for this testing area
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
        gradingSystem: {
          type: String,
          enum: ["general", "lower", "cbc"],
          default: "general",
          required: true,
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
              default: { name: "B.E", points: 1 },
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

// Pre-save middleware to calculate grades and update status for testing areas
ExamSchema.pre<IExam>("save", function (next) {
  if (this.testingAreas && this.testingAreas.length > 0) {
    this.testingAreas.forEach((testingArea) => {
      // Auto-update status based on marks presence
      const hasMarks = testingArea.marks && testingArea.marks.length > 0;
      if (hasMarks && testingArea.status === "PENDING") {
        testingArea.status = "DONE";
        if (!testingArea.dateDone) {
          testingArea.dateDone = new Date();
        }
      } else if (!hasMarks && testingArea.status === "DONE") {
        testingArea.status = "PENDING";
        testingArea.dateDone = undefined;
      }
      
      // Auto-set dateDone when status changes to DONE (if not already set)
      if (testingArea.status === "DONE" && !testingArea.dateDone) {
        testingArea.dateDone = new Date();
      }
      
      // Calculate grades for marks
      if (testingArea.marks && testingArea.marks.length > 0) {
        testingArea.marks.forEach((mark) => {
          // Calculate grade using the testing area's grading system
          mark.grade = calculateGradeWithSystem(mark.score, testingArea.outOf, testingArea.gradingSystem || "general");
        });
      }
    });
  }
  next();
});

// Utility function to calculate grade based on grading system
export const calculateGradeWithSystem = (
  score: number, 
  outOf: number, 
  gradingSystemType: GradingSystemType = "general"
): { name: string; points: number } => {
  // Ensure score and outOf are valid numbers
  const numScore = Number(score);
  const numOutOf = Number(outOf);
  
  if (isNaN(numScore) || isNaN(numOutOf) || numScore < 0 || numOutOf <= 0) {
    return { name: "B.E", points: 1 };
  }
  
  const percentage = (numScore / numOutOf) * 100;
  const gradingSystem = GRADING_SYSTEMS[gradingSystemType];
  
  // Find the appropriate grade band
  for (const band of gradingSystem.bands) {
    if (percentage >= band.min && percentage <= band.max) {
      return band.grade;
    }
  }
  
  // Default fallback
  return { name: "B.E", points: 1 };
};

// Utility function to re-grade a testing area with a new grading system
export const regradeTestingArea = (
  testingArea: ITestingArea, 
  newGradingSystem: GradingSystemType
): ITestingArea => {
  const updatedTestingArea = { ...testingArea };
  updatedTestingArea.gradingSystem = newGradingSystem;
  
  // Recalculate all marks with the new grading system
  if (updatedTestingArea.marks && updatedTestingArea.marks.length > 0) {
    updatedTestingArea.marks.forEach((mark) => {
      mark.grade = calculateGradeWithSystem(mark.score, updatedTestingArea.outOf, newGradingSystem);
    });
  }
  
  return updatedTestingArea;
};

// Utility function to update testing area status based on marks
export const updateTestingAreaStatus = async (
  examId: string, 
  testingAreaId: string
): Promise<void> => {
  const exam = await Exam.findById(examId);
  if (!exam) return;

  const testingArea = exam.testingAreas.find(ta => ta._id?.toString() === testingAreaId);
  if (!testingArea) return;

  const hasMarks = testingArea.marks && testingArea.marks.length > 0;
  const currentStatus = testingArea.status;

  // Update status based on marks presence
  if (hasMarks && currentStatus === "PENDING") {
    // Has marks but status is PENDING - update to DONE
    await Exam.findOneAndUpdate(
      { 
        _id: examId,
        "testingAreas._id": testingAreaId
      },
      { 
        $set: {
          "testingAreas.$.status": "DONE",
          "testingAreas.$.dateDone": new Date()
        }
      }
    );
  } else if (!hasMarks && currentStatus === "DONE") {
    // No marks but status is DONE - update to PENDING
    await Exam.findOneAndUpdate(
      { 
        _id: examId,
        "testingAreas._id": testingAreaId
      },
      { 
        $set: {
          "testingAreas.$.status": "PENDING"
        },
        $unset: {
          "testingAreas.$.dateDone": ""
        }
      }
    );
  }
};

// Legacy function for backward compatibility (now uses CBC system)
export const calculateGrade = (score: number, outOf: number): { name: string; points: number } => {
  return calculateGradeWithSystem(score, outOf, "cbc");
};

// Create and export the model
export const Exam: Model<IExam> = mongoose.models?.Exam || mongoose.model<IExam>("Exam", ExamSchema);


