import { Resend } from "resend";
import {
  getApprovedEmailContent,
  getRejectionEmailContent,
  getReceivedEmailContent,
} from "./templates";

const resendApiKey = process.env.RESEND_API_KEY || "";
const isResendConfigured =
  Boolean(resendApiKey) &&
  !resendApiKey.includes("placeholder") &&
  resendApiKey.startsWith("re_");

const resendClient = isResendConfigured ? new Resend(resendApiKey) : null;
const fromEmail = process.env.RESEND_FROM_EMAIL || "CSDS Peshawar <onboarding@resend.dev>";

/**
 * Send Approval Email
 */
export async function sendApprovalEmail(params: {
  to: string;
  name: string;
  registrationId: string;
  cnic: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const { html, text, subject } = await getApprovedEmailContent(params);

    if (!resendClient) {
      console.log(`[Email Simulation - Approved] To: ${params.to} | Subject: ${subject}`);
      return { success: true, id: "simulated_approved_id" };
    }

    const { data, error } = await resendClient.emails.send({
      from: fromEmail,
      to: params.to,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Resend error sending approval email:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Error in sendApprovalEmail:", err);
    return { success: false, error: message };
  }
}

/**
 * Send Rejection Email
 */
export async function sendRejectionEmail(params: {
  to: string;
  name: string;
  reason?: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const { html, text, subject } = getRejectionEmailContent(params);

    if (!resendClient) {
      console.log(`[Email Simulation - Rejected] To: ${params.to} | Reason: ${params.reason}`);
      return { success: true, id: "simulated_rejected_id" };
    }

    const { data, error } = await resendClient.emails.send({
      from: fromEmail,
      to: params.to,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Resend error sending rejection email:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Error in sendRejectionEmail:", err);
    return { success: false, error: message };
  }
}

/**
 * Send Registration Received Email
 */
export async function sendRegistrationReceivedEmail(params: {
  to: string;
  name: string;
  registrationId: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const { html, text, subject } = getReceivedEmailContent(params);

    if (!resendClient) {
      console.log(`[Email Simulation - Received] To: ${params.to} | ID: ${params.registrationId}`);
      return { success: true, id: "simulated_received_id" };
    }

    const { data, error } = await resendClient.emails.send({
      from: fromEmail,
      to: params.to,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Resend error sending received email:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Error in sendRegistrationReceivedEmail:", err);
    return { success: false, error: message };
  }
}
