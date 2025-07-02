import mongoose, { Schema, Document, Model } from "mongoose";

// Define the TypeScript interface for the RegistrationInvitation document
export interface IRegistrationInvitation extends Document {
  name: string;
  email: string;
  link: string;
  token: string;
  expiresAt: Date; // Expiration date
}

// Define the schema
const RegistrationInvitationSchema: Schema =
  new Schema<IRegistrationInvitation>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      token: {
        type: String
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
          validator: function (value: string) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Simple email validation
          },
          message: "Invalid email format",
        },
      },
      link: {
        type: String,
        required: true,
      },
      expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // One week from now
        index: { expires: "1s" }, // TTL index for automatic deletion
      },
    },
    { timestamps: true }
  );

// Create and export the model
export const RegistrationInvitation: Model<IRegistrationInvitation> =
  mongoose.models.RegistrationInvitation ||
  mongoose.model<IRegistrationInvitation>(
    "RegistrationInvitation",
    RegistrationInvitationSchema
  );
