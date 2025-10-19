import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IMentorshipRequest extends Document {
  mentorId: Types.ObjectId;
  menteeId: Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  message?: string;
  requestDate: Date;
  responseDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MentorshipRequestSchema = new Schema<IMentorshipRequest>(
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
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'cancelled'],
      default: 'pending',
    },
    message: {
      type: String,
      maxlength: [500, 'Message cannot be more than 500 characters'],
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    responseDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
MentorshipRequestSchema.index({ mentorId: 1, status: 1 });
MentorshipRequestSchema.index({ menteeId: 1, status: 1 });
MentorshipRequestSchema.index({ requestDate: -1 });

// Compound index for common queries
MentorshipRequestSchema.index({ mentorId: 1, menteeId: 1 }, { unique: true });

const MentorshipRequest: Model<IMentorshipRequest> =
  mongoose.models.MentorshipRequest || mongoose.model<IMentorshipRequest>('MentorshipRequest', MentorshipRequestSchema);

export default MentorshipRequest;
