import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    amount: Number,
    receiptNumber: String,
    phoneNumber: String,
    transactionDate: String,
  },
  { timestamps: true }
);

export const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
