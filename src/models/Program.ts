import mongoose, { Schema, Document } from 'mongoose';

interface IWeek {
    startDate: Date;
    endDate: Date;
    title: string;
}

export interface IProgram extends Document {
    title: string;
    weeks: IWeek[];
    school: string;
    department: string;
}

const WeekSchema = new Schema<IWeek>({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    title: { type: String, required: true }
}, { _id: true });

const ProgramSchema = new Schema<IProgram>({
    title: { type: String, required: true },
    weeks: { type: [WeekSchema], required: true },
    school: { type: String, default: 'aburayyan academy' },
    department: { type: String, default: 'ICT' }
}, { timestamps: true });

export const Program = mongoose.models.Program || mongoose.model<IProgram>('Program', ProgramSchema);


