import { z } from "zod";

export const menteeProfileSchema = z.object({
  bio: z
    .string()
    .max(500, "Bio cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),
  interests: z
    .array(z.string())
    .min(1, "Please select at least one interest")
    .max(15, "Maximum 15 interests allowed"),
  goals: z
    .array(z.string())
    .min(1, "Please select at least one goal")
    .max(10, "Maximum 10 goals allowed"),
  careerStage: z.enum(["student", "early-career", "career-change", "entrepreneur"], {
    errorMap: () => ({ message: "Please select your career stage" }),
  }),
  education: z.string().max(200, "Education is too long").optional().or(z.literal("")),
  currentRole: z.string().max(100, "Current role is too long").optional().or(z.literal("")),
  linkedinUrl: z
    .string()
    .url("Invalid LinkedIn URL")
    .regex(/linkedin\.com/, "Must be a LinkedIn URL")
    .optional()
    .or(z.literal("")),
  preferredMentorTraits: z.array(z.string()).max(10, "Maximum 10 traits allowed").optional(),
});

export type MenteeProfileFormData = z.infer<typeof menteeProfileSchema>;
