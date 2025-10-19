import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IMenteeProfile extends Document {
  userId: Types.ObjectId;
  bio?: string;
  interests: string[];
  goals: string[];
  careerStage: 'student' | 'early-career' | 'career-change' | 'entrepreneur';
  education?: string;
  currentRole?: string;
  linkedinUrl?: string;
  preferredMentorTraits: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MenteeProfileSchema = new Schema<IMenteeProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot be more than 500 characters'],
    },
    interests: {
      type: [String],
      required: [true, 'Please provide at least one interest'],
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one interest is required',
      },
    },
    goals: {
      type: [String],
      required: [true, 'Please provide at least one goal'],
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one goal is required',
      },
    },
    careerStage: {
      type: String,
      enum: ['student', 'early-career', 'career-change', 'entrepreneur'],
      required: [true, 'Please provide your career stage'],
    },
    education: {
      type: String,
      maxlength: [200, 'Education cannot be more than 200 characters'],
    },
    currentRole: {
      type: String,
      maxlength: [100, 'Current role cannot be more than 100 characters'],
    },
    linkedinUrl: {
      type: String,
    },
    preferredMentorTraits: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
MenteeProfileSchema.index({ userId: 1 });
MenteeProfileSchema.index({ interests: 1 });
MenteeProfileSchema.index({ goals: 1 });
MenteeProfileSchema.index({ careerStage: 1 });
MenteeProfileSchema.index({ isActive: 1 });

const MenteeProfile: Model<IMenteeProfile> =
  mongoose.models.MenteeProfile || mongoose.model<IMenteeProfile>('MenteeProfile', MenteeProfileSchema);

export default MenteeProfile;
