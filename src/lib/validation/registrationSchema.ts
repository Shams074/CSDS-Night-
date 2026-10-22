import { z } from "zod";

// 13 digits CNIC regex with hyphens: 12345-1234567-1
export const CNIC_REGEX = /^\d{5}-\d{7}-\d{1}$/;

export const registrationFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Full Name must be at least 3 characters")
    .max(80, "Full Name must not exceed 80 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Full Name can only contain letters and spaces"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid university or personal email address")
    .toLowerCase(),
  section: z.string().min(1, "Please select your section"),
  semester: z
    .number()
    .int()
    .min(1, "Semester must be between 1 and 8")
    .max(8, "Semester must be between 1 and 8"),
  cnic: z
    .string()
    .trim()
    .regex(CNIC_REGEX, "CNIC must follow the format 12345-1234567-1 (13 digits)"),
  website_honeypot: z.string().max(0, "Bot submission detected").optional(),
});

export type RegistrationFormInput = z.infer<typeof registrationFormSchema>;
