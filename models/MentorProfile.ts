import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IMentorProfile extends Document {
  userId: Types.ObjectId;
  bio: string;
  title: string;
  company?: string;
  experience: string;
  skills: string[];
  expertise: string[];
  yearsOfExperience: number;
  industry: string;
  linkedinUrl?: string;
  availability: {
    hours: number;
    timezone: string;
  };
  rating?: number;
  totalSessions: number;
  sessionsCompleted: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MentorProfileSchema = new Schema<IMentorProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      required: [true, 'Please provide a bio'],
      maxlength: [500, 'Bio cannot be more than 500 characters'],
    },
    title: {
      type: String,
      required: [true, 'Please provide a job title'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    company: {
      type: String,
      maxlength: [100, 'Company name cannot be more than 100 characters'],
    },
    experience: {
      type: String,
      required: [true, 'Please provide experience description'],
    },
    skills: {
      type: [String],
      required: [true, 'Please provide at least one skill'],
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one skill is required',
      },
    },
    expertise: {
      type: [String],
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      required: [true, 'Please provide years of experience'],
      min: [0, 'Years of experience cannot be negative'],
    },
    industry: {
      type: String,
      required: [true, 'Please provide your industry'],
    },
    linkedinUrl: {
      type: String,
    },
    availability: {
      hours: {
        type: Number,
        default: 2,
        min: [1, 'Availability must be at least 1 hour per month'],
      },
      timezone: {
        type: String,
        default: 'UTC',
      },
    },
    rating: {
      type: Number,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5'],
    },
    totalSessions: {
      type: Number,
      default: 0,
    },
    sessionsCompleted: {
      type: Number,
      default: 0,
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
MentorProfileSchema.index({ userId: 1 });
MentorProfileSchema.index({ skills: 1 });
MentorProfileSchema.index({ expertise: 1 });
MentorProfileSchema.index({ industry: 1 });
MentorProfileSchema.index({ rating: -1 });
MentorProfileSchema.index({ isActive: 1 });

// Compound index for common queries
MentorProfileSchema.index({ isActive: 1, rating: -1 });

const MentorProfile: Model<IMentorProfile> =
  mongoose.models.MentorProfile || mongoose.model<IMentorProfile>('MentorProfile', MentorProfileSchema);

export default MentorProfile;
