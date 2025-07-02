// models/Transaction.ts

import  { Schema, Document, model, models } from 'mongoose';

export interface ITransaction extends Document {
  phone: string;
  amount: number;
  productId?: string; // stored as string (optional)
  productName?: string;
  checkoutRequestID?: string;
  merchantRequestID?: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  response?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    phone: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    productId: {
      type: String,
    },
    productName: {
      type: String,
    },
    checkoutRequestID: {
      type: String,
    },
    merchantRequestID: {
      type: String,
    },
    status: {
      type: String,
      enum: ['PENDING', 'SUCCESS', 'FAILED'],
      default: 'PENDING',
    },
    response: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

export const Transaction =
  models.Transaction || model<ITransaction>('Transaction', TransactionSchema);
