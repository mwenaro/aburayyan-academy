// models/Counter.ts
import mongoose, { Schema, Document } from "mongoose";

interface ICounter extends Document {
  key: string;
  seq: number;
}

const counterSchema = new Schema<ICounter>({
  key: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

export const Counter = mongoose.models.Counter || mongoose.model<ICounter>("Counter", counterSchema);
