import mongoose, { Schema, Document, Model } from "mongoose";
import { ISubject } from "./Subject"; // Import the ISubject interface

// Define the TypeScript interface for the Mark document
export interface IMark extends Document {
    subject: mongoose.Types.ObjectId | ISubject; // Reference to a Subject document
    exam: string; // Exam name or identifier
    score: number; // Actual score
    outOf: number; // Maximum possible score
    grade?: {name:string, points:number}; // Grade based on CBC grading
    remark?: string; // Optional remarks
}

// Define the schema
const MarkSchema: Schema = new Schema<IMark>({
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject", // Reference the Subject model
        required: true,
    },
    exam: {
        type: String,
        required: true,
        trim: true,
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        default:0
    },
    outOf: {
        type: Number,
        required: true,
        min: 1, // Ensure outOf is at least 1
        default: 100
    },
    grade: {
        type: {name:String, points:Number},
        default: {name:'B', points:1}, // Computed field for CBC grading
    },
    remark: {
        type: String,
        default: "", // Optional remarks
        trim: true,
    },
}, { timestamps: true });

// Use a pre-save middleware to calculate grade based on CBC grading
MarkSchema.pre<IMark>("save", function (next) {
    if (this.score >= 0 && this.outOf > 0) {
        const percentage = (this.score / this.outOf) * 100;

        // Assign grade based on CBC bands
        // if (percentage >= 80) this.grade = "Exceeding Expectations (E)";
        // else if (percentage >= 70) this.grade = "Meeting Expectations (M)";
        // else if (percentage >= 50) this.grade = "Approaching Expectations (A)";
        // else this.grade = "Below Expectations (B)";
        if (percentage >= 80) this.grade = {name:'E', points:4} ;
        else if (percentage >= 70) this.grade = {name:'M', points:3};
        else if (percentage >= 50) this.grade = {name:'A', points:2};
        else this.grade = {name:'B', points:1};
    }
    next();
});

// Create and export the model
export const MarkModel: Model<IMark> = mongoose.model<IMark>("Mark", MarkSchema);
