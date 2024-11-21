import mongoose, { Schema, Document } from 'mongoose';

interface IContent {
  topic: string;
  subTopic: string;
}

interface IRating {
  rate: number;
  student: mongoose.Schema.Types.ObjectId;  // References Registration
}

export interface ISession extends Document {
  date: Date;
  week: mongoose.Schema.Types.ObjectId;  // References Week
  time: 'morning' | 'afternoon';
  status: 'scheduled' | 'done' | 'cancelled' | 'postponed';
  content: IContent;
  remarks: string;
  ratings?: IRating[];
}

const ContentSchema = new Schema<IContent>({
  topic: { type: String, required: true },
  subTopic: { type: String, required: true }
});

const RatingSchema = new Schema<IRating>({
  rate: { type: Number, required: true },
  student: { type: Schema.Types.ObjectId, ref: 'Registration', required: true }
});

const SessionSchema = new Schema<ISession>({
  date: { type: Date, required: true },
  week: { type: Schema.Types.ObjectId, ref: 'Week', required: true },  // Reference to Week
  time: { 
    type: String, 
    enum: ['morning', 'afternoon'], 
    required: true,
    default:'afternoon'
  },
  status: { 
    type: String, 
    enum: ['scheduled', 'done', 'cancelled', 'postponed'], 
    required: true ,
    default:'scheduled'
  },
  content: { type: ContentSchema, required: true },
  remarks: { type: String, default: 'scheduled' },
  ratings: { type: [RatingSchema], default: [] }
});

export const Session = mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema);

// export { Session, ISession, ContentSchema, RatingSchema };
