import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getRegistrations, getAdminStats } from "@/lib/supabase/admin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | CSDS Welcome & Farewell Night 2026",
  description:
    "Administrative dashboard for reviewing participant payments, registrations, and gate check-in.",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("csds_admin_session")?.value;

  if (!adminSession) {
    redirect("/admin/login");
  }

  // Verify allowlist on server side
  const adminAllowlist = (process.env.ADMIN_EMAILS || "admin@csds.uop.edu.pk")
    .split(",")
    .map((e) => e.trim().toLowerCase());

  if (!adminAllowlist.includes(adminSession.toLowerCase())) {
    redirect("/admin/login?error=unauthorized");
  }

  const [registrations, stats] = await Promise.all([
    getRegistrations(),
    getAdminStats(),
  ]);

  return (
    <AdminDashboard
      initialRegistrations={registrations}
      initialStats={stats}
      adminEmail={adminSession}
    />
  );
}
