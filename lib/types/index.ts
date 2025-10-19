// User types
export type UserRole = "mentor" | "mentee";

export type Interest =
  | "Tech"
  | "Business"
  | "Design"
  | "Marketing"
  | "Finance"
  | "Education"
  | "Healthcare"
  | "Engineering"
  | "Arts"
  | "Science"
  | "Entrepreneurship"
  | "Product Management";

export type Goal =
  | "Learning"
  | "Career Guidance"
  | "Networking"
  | "Skill Development"
  | "Job Search"
  | "Entrepreneurship";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  country: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MentorProfile extends User {
  role: "mentor";
  skills: Interest[];
  bio?: string;
  experience?: string;
  availability?: string;
  sessionsCompleted: number;
  rating?: number;
}

export interface MenteeProfile extends User {
  role: "mentee";
  interests: Interest[];
  goals: Goal[];
  bio?: string;
  sessionsCompleted: number;
}

// Mentorship connection types
export interface MentorshipRequest {
  id: string;
  menteeId: string;
  mentorId: string;
  status: "pending" | "accepted" | "rejected";
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MentorshipConnection {
  id: string;
  mentorId: string;
  menteeId: string;
  status: "active" | "completed" | "inactive";
  createdAt: Date;
}

// Session types
export interface Session {
  id: string;
  connectionId: string;
  mentorId: string;
  menteeId: string;
  scheduledAt?: Date;
  duration?: number; // in minutes
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface SessionFeedback {
  id: string;
  sessionId: string;
  rating: number; // 1-5
  comment?: string;
  createdBy: string; // user id
  createdAt: Date;
}

// Message types
export interface Message {
  id: string;
  connectionId: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

// Match types
export interface Match {
  mentor: MentorProfile;
  matchScore: number;
  matchReasons: string[];
}
