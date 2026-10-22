import { NextRequest, NextResponse } from "next/server";
import {
  getRegistrations,
  getAdminStats,
  updateRegistrationStatus,
  recordEmailSentTimestamp,
} from "@/lib/supabase/admin";
import { sendApprovalEmail, sendRejectionEmail } from "@/lib/email/sender";

export async function GET(req: NextRequest) {
  try {
    // Check admin session
    const adminSession = req.cookies.get("csds_admin_session")?.value;
    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [registrations, stats] = await Promise.all([
      getRegistrations(),
      getAdminStats(),
    ]);

    return NextResponse.json({ registrations, stats });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error fetching registrations";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const adminSession = req.cookies.get("csds_admin_session")?.value;
    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, id, ids, reason } = body;

    // Handle Bulk Approval
    if (action === "bulk_approve" && Array.isArray(ids)) {
      const results = [];
      for (const targetId of ids) {
        const updated = await updateRegistrationStatus(targetId, "approved", {
          reviewed_by: adminSession,
        });

        if (updated) {
          // Send approval email
          await sendApprovalEmail({
            to: updated.email,
            name: updated.name,
            registrationId: updated.id,
            cnic: updated.cnic,
          });
          results.push(updated);
        }
      }

      return NextResponse.json({
        success: true,
        message: `Successfully approved ${results.length} registrations.`,
      });
    }

    // Handle Single Action (Approve, Reject, Resend Email)
    if (!id) {
      return NextResponse.json({ error: "Registration ID is required." }, { status: 400 });
    }

    if (action === "approve") {
      const updated = await updateRegistrationStatus(id, "approved", {
        reviewed_by: adminSession,
      });

      if (!updated) {
        return NextResponse.json({ error: "Registration not found" }, { status: 404 });
      }

      // Send approval confirmation email
      const emailResult = await sendApprovalEmail({
        to: updated.email,
        name: updated.name,
        registrationId: updated.id,
        cnic: updated.cnic,
      });

      return NextResponse.json({
        success: true,
        registration: updated,
        emailSent: emailResult.success,
        emailError: emailResult.error,
        message: emailResult.success
          ? "Registration approved and confirmation pass emailed!"
          : `Registration approved, but email failed: ${emailResult.error}`,
      });
    }

    if (action === "reject") {
      const updated = await updateRegistrationStatus(id, "rejected", {
        rejection_reason: reason || "Payment verification failed",
        reviewed_by: adminSession,
      });

      if (!updated) {
        return NextResponse.json({ error: "Registration not found" }, { status: 404 });
      }

      // Send rejection notice
      await sendRejectionEmail({
        to: updated.email,
        name: updated.name,
        reason: reason,
      });

      return NextResponse.json({
        success: true,
        registration: updated,
        message: "Registration marked as rejected. Notice emailed.",
      });
    }

    if (action === "resend_email") {
      const all = await getRegistrations();
      const target = all.find((r) => r.id === id);

      if (!target) {
        return NextResponse.json({ error: "Registration not found" }, { status: 404 });
      }

      const emailResult = await sendApprovalEmail({
        to: target.email,
        name: target.name,
        registrationId: target.id,
        cnic: target.cnic,
      });

      if (emailResult.success) {
        await recordEmailSentTimestamp(id);
        return NextResponse.json({
          success: true,
          message: "Confirmation email resent successfully!",
        });
      } else {
        return NextResponse.json(
          { error: `Failed to resend email: ${emailResult.error}` },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error updating registration";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
