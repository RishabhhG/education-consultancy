import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(15, "Phone number is too long")
    .regex(/^[+\d\s\-()]+$/, "Enter a valid phone number"),
  email: z
    .string()
    .email("Enter a valid email address")
    .max(120, "Email is too long"),
  course: z.string().min(1, "Please select a course or area of interest"),
  message: z
  .string()
  .trim()
  .max(1000, "Message is too long")
  .optional()
  .or(z.literal(""))
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const COURSE_OPTIONS = [
  "Admission Counselling & Career Guidance",
  "Full Stack Development",
  "AI & Machine Learning",
  "Cloud Computing",
  "Cyber Security",
  "Data Analytics",
  "AWS Certification",
  "Microsoft Azure Certification",
  "Google Cloud Certification",
  "Cisco CCNA",
  "CompTIA Security+",
  "German Language",
  "French Language",
  "Japanese Language",
  "IELTS Coaching",
  "TOEFL Preparation",
  "Placement Assistance",
  "IT Incubation for Schools",
  "Corporate Training",
  "Project 999",
  "Other / General Enquiry",
] as const;
