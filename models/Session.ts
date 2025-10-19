import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface ISession extends Document {
  mentorId: Types.ObjectId;
  menteeId: Types.ObjectId;
  scheduledAt: Date;
  duration: number; // in minutes
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  topic: string;
  notes?: string;
  meetingLink?: string;
  rating?: number;
  feedback?: string;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new Schema<ISession>(
  {
    mentorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    menteeId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    scheduledAt: {
      type: Date,
      required: [true, 'Please provide a scheduled time'],
    },
    duration: {
      type: Number,
      required: [true, 'Please provide a session duration'],
      min: [15, 'Session must be at least 15 minutes'],
      max: [180, 'Session cannot exceed 3 hours'],
      default: 30,
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
      default: 'scheduled',
    },
    topic: {
      type: String,
      required: [true, 'Please provide a session topic'],
      maxlength: [200, 'Topic cannot be more than 200 characters'],
    },
    notes: {
      type: String,
      maxlength: [1000, 'Notes cannot be more than 1000 characters'],
    },
    meetingLink: {
      type: String,
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    feedback: {
      type: String,
      maxlength: [1000, 'Feedback cannot be more than 1000 characters'],
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
SessionSchema.index({ mentorId: 1, status: 1 });
SessionSchema.index({ menteeId: 1, status: 1 });
SessionSchema.index({ scheduledAt: 1 });
SessionSchema.index({ status: 1, scheduledAt: 1 });

const Session: Model<ISession> =
  mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema);

export default Session;
