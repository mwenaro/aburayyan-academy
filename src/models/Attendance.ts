import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
  session: mongoose.Schema.Types.ObjectId;  // References Session
  student: mongoose.Schema.Types.ObjectId;   // References Registration
  status: boolean;
  remarks: string;
}

const AttendanceSchema = new Schema<IAttendance>({
  session: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'Registration', required: true },
  status: { type: Boolean, default: false },
  remarks: { type: String, default: '' }
});

export const Attendance = mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', AttendanceSchema);

