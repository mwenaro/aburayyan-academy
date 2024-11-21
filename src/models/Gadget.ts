import mongoose, { Schema, Document } from 'mongoose';

export interface IGadget extends Document {
  category: string;
  uid: string;
  station: string;
  department: string;
  condition: 'working' | 'fault';
  remarks: string;
}

const GadgetSchema = new Schema<IGadget>({
  category: { type: String, default: 'computer' },
  uid: { type: String, unique: true, required: true },
  station: { type: String, required: true },
  department: { type: String, default: 'ICT' },
  condition: { 
    type: String, 
    enum: ['working', 'fault'], 
    required: true 
  },
  remarks: { type: String, default: '' }
});

export const Gadget = mongoose.models.Gadget || mongoose.model<IGadget>('Gadget', GadgetSchema);


