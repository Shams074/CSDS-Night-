import { createClient } from "@supabase/supabase-js";
import { Registration, AdminStats } from "../types";
import { mockStore } from "../mockStore";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "");
const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

export function isSupabaseConfigured(): boolean {
  return (
    Boolean(supabaseUrl) &&
    Boolean(serviceRoleKey) &&
    !supabaseUrl.includes("placeholder-project") &&
    !serviceRoleKey.includes("placeholder-service-role")
  );
}

// Service role client bypassing RLS for server-side administrative actions
export const supabaseAdmin = isSupabaseConfigured()
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

/**
 * Fetch all registrations with signed URLs for screenshots
 */
export async function getRegistrations(): Promise<Registration[]> {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return mockStore.getAll();
  }

  const { data, error } = await supabaseAdmin
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase getRegistrations error:", error);
    return mockStore.getAll();
  }

  // Generate short-lived signed URLs for payment proof screenshots
  const registrationsWithUrls = await Promise.all(
    (data || []).map(async (reg) => {
      let screenshot_url = "";
      if (reg.screenshot_path) {
        const { data: signedData } = await supabaseAdmin!.storage
          .from("payment-proofs")
          .createSignedUrl(reg.screenshot_path, 3600); // 1 hour valid
        screenshot_url = signedData?.signedUrl || "";
      }
      return {
        ...reg,
        screenshot_url,
      } as Registration;
    })
  );

  return registrationsWithUrls;
}

/**
 * Get registration statistics for admin dashboard
 */
export async function getAdminStats(): Promise<AdminStats> {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return mockStore.getStats();
  }

  const { data, error } = await supabaseAdmin
    .from("registrations")
    .select("status");

  if (error) {
    console.error("Supabase getAdminStats error:", error);
    return mockStore.getStats();
  }

  const list = data || [];
  const total = list.length;
  const pending = list.filter((r) => r.status === "pending").length;
  const approved = list.filter((r) => r.status === "approved").length;
  const rejected = list.filter((r) => r.status === "rejected").length;
  const totalCollected = approved * 2200;

  return { total, pending, approved, rejected, totalCollected };
}

/**
 * Check if email or CNIC already registered
 */
export async function checkDuplicateRegistration(
  email: string,
  cnic: string
): Promise<{ exists: boolean; field?: "email" | "cnic" }> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanCnic = cnic.trim();

  if (!isSupabaseConfigured() || !supabaseAdmin) {
    const existing = mockStore.findByEmailOrCnic(cleanEmail, cleanCnic);
    if (existing) {
      if (existing.email.toLowerCase() === cleanEmail) return { exists: true, field: "email" };
      return { exists: true, field: "cnic" };
    }
    return { exists: false };
  }

  // Check email
  const { data: emailData } = await supabaseAdmin
    .from("registrations")
    .select("id")
    .eq("email", cleanEmail)
    .limit(1);

  if (emailData && emailData.length > 0) {
    return { exists: true, field: "email" };
  }

  // Check CNIC
  const { data: cnicData } = await supabaseAdmin
    .from("registrations")
    .select("id")
    .eq("cnic", cleanCnic)
    .limit(1);

  if (cnicData && cnicData.length > 0) {
    return { exists: true, field: "cnic" };
  }

  return { exists: false };
}

/**
 * Insert a registration
 */
export async function insertRegistration(payload: {
  name: string;
  email: string;
  section: string;
  semester: number;
  cnic: string;
  screenshot_path: string;
}): Promise<Registration> {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return mockStore.insert(payload);
  }

  const { data, error } = await supabaseAdmin
    .from("registrations")
    .insert([
      {
        name: payload.name.trim(),
        email: payload.email.trim().toLowerCase(),
        section: payload.section.trim(),
        semester: payload.semester,
        cnic: payload.cnic.trim(),
        screenshot_path: payload.screenshot_path,
        status: "pending",
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error(error.message);
  }

  return data as Registration;
}

/**
 * Update registration status (Approve or Reject)
 */
export async function updateRegistrationStatus(
  id: string,
  status: "approved" | "rejected",
  options?: {
    rejection_reason?: string;
    reviewed_by?: string;
  }
): Promise<Registration | null> {
  const now = new Date().toISOString();

  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return mockStore.updateStatus(
      id,
      status,
      options?.rejection_reason,
      options?.reviewed_by
    );
  }

  const updateFields: Record<string, unknown> = {
    status,
    reviewed_by: options?.reviewed_by || "Admin",
  };

  if (status === "approved") {
    updateFields.approved_at = now;
    updateFields.email_sent_at = now;
    updateFields.rejection_reason = null;
  } else {
    updateFields.rejection_reason = options?.rejection_reason || "Payment verification failed";
  }

  const { data, error } = await supabaseAdmin
    .from("registrations")
    .update(updateFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase update error:", error);
    throw new Error(error.message);
  }

  return data as Registration;
}

/**
 * Record email sent timestamp
 */
export async function recordEmailSentTimestamp(id: string): Promise<void> {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    mockStore.recordEmailSent(id);
    return;
  }

  await supabaseAdmin
    .from("registrations")
    .update({ email_sent_at: new Date().toISOString() })
    .eq("id", id);
}
