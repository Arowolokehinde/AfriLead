import { z } from "zod";

export const mentorProfileSchema = z.object({
  bio: z
    .string()
    .min(50, "Bio must be at least 50 characters")
    .max(500, "Bio cannot exceed 500 characters"),
  title: z.string().min(2, "Job title is required").max(100, "Title is too long"),
  company: z.string().max(100, "Company name is too long").optional(),
  experience: z.string().min(20, "Please provide more details about your experience"),
  skills: z
    .array(z.string())
    .min(1, "Please select at least one skill")
    .max(20, "Maximum 20 skills allowed"),
  expertise: z
    .array(z.string())
    .min(1, "Please select at least one area of expertise")
    .max(10, "Maximum 10 areas of expertise allowed"),
  yearsOfExperience: z
    .number()
    .min(0, "Years of experience cannot be negative")
    .max(70, "Please enter a valid number of years"),
  industry: z.string().min(2, "Please select an industry"),
  linkedinUrl: z
    .string()
    .url("Invalid LinkedIn URL")
    .regex(/linkedin\.com/, "Must be a LinkedIn URL")
    .optional()
    .or(z.literal("")),
  availability: z.object({
    hours: z.number().min(1, "Availability must be at least 1 hour per month").max(40),
    timezone: z.string(),
  }),
});

export type MentorProfileFormData = z.infer<typeof mentorProfileSchema>;
