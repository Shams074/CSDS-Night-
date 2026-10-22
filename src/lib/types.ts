export type RegistrationStatus = "pending" | "approved" | "rejected";

export interface Registration {
  id: string;
  created_at: string;
  name: string;
  email: string;
  section: string;
  semester: number;
  cnic: string;
  screenshot_path: string;
  status: RegistrationStatus;
  rejection_reason?: string | null;
  approved_at?: string | null;
  email_sent_at?: string | null;
  reviewed_by?: string | null;
  // Signed or public preview URL generated for display
  screenshot_url?: string;
}

export interface RegistrationFormData {
  name: string;
  email: string;
  section: string;
  semester: number;
  cnic: string;
  website_honeypot?: string; // spam protection honeypot
}

export interface AdminStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  totalCollected: number;
}
