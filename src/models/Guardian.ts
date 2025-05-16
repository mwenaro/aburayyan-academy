import mongoose, { Model, models, Schema } from "mongoose";
import { IUser, User } from "./User";
import { IStudent } from "./Student";

export interface IGuardian extends IUser {
  students: IStudent[] | mongoose.Schema.Types.ObjectId;
}

// Validate that "class" is required only when role is "classguardian"

// Create the guardian Schema
const guardianSchema = new Schema<IGuardian>({
  students: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

// Create the guardian model as a discriminator of User
export const Guardian: Model<IGuardian> =
  models.Guardian || User.discriminator<IGuardian>("Guardian", guardianSchema);
