import { Resend } from "resend";
import nodemailer from "nodemailer";
import {
  getApprovedEmailContent,
  getRejectionEmailContent,
  getReceivedEmailContent,
} from "./templates";

interface SendResult {
  success: boolean;
  id?: string;
  error?: string;
  provider?: "resend" | "smtp" | "none";
}

/**
 * Send an email via configured provider (Resend or SMTP/Gmail)
 */
async function dispatchEmail(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<SendResult> {
  const resendApiKey = (process.env.RESEND_API_KEY || "").trim();
  const smtpUser = (process.env.SMTP_USER || "").trim();
  const smtpPass = (process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "").trim();
  const fromEmail = (process.env.RESEND_FROM_EMAIL || "CSDS Peshawar <onboarding@resend.dev>").trim();

  // 1. Try SMTP / Gmail Transporter if configured
  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || `CSDS Society <${smtpUser}>`,
        to: params.to,
        subject: params.subject,
        html: params.html,
        text: params.text,
      });

      console.log(`[Email Sent via SMTP] To: ${params.to} | MessageId: ${info.messageId}`);
      return { success: true, id: info.messageId, provider: "smtp" };
    } catch (smtpErr: unknown) {
      const msg = smtpErr instanceof Error ? smtpErr.message : "SMTP sending error";
      console.error("[SMTP Error]:", msg);
      // Fall through to Resend if available, else return error
      if (!resendApiKey) {
        return { success: false, error: `SMTP Error: ${msg}`, provider: "smtp" };
      }
    }
  }

  // 2. Try Resend if configured
  if (resendApiKey && resendApiKey.startsWith("re_")) {
    try {
      const resendClient = new Resend(resendApiKey);
      const { data, error } = await resendClient.emails.send({
        from: fromEmail,
        to: params.to,
        subject: params.subject,
        html: params.html,
        text: params.text,
      });

      if (error) {
        let errorMsg = error.message;
        if (errorMsg.includes("You can only send testing emails to your own email address")) {
          errorMsg = `Resend Free Tier Restriction: You can only send to your own registered email (${params.to} is different). To send to any student, verify a domain in Resend or configure SMTP_USER & SMTP_PASS.`;
        }
        console.error("[Resend Error]:", errorMsg);
        return { success: false, error: errorMsg, provider: "resend" };
      }

      console.log(`[Email Sent via Resend] To: ${params.to} | Id: ${data?.id}`);
      return { success: true, id: data?.id, provider: "resend" };
    } catch (resendErr: unknown) {
      const msg = resendErr instanceof Error ? resendErr.message : "Resend API error";
      console.error("[Resend Exception]:", msg);
      return { success: false, error: msg, provider: "resend" };
    }
  }

  // 3. Neither configured
  const missingMsg =
    "No email service configured. Please add RESEND_API_KEY (from resend.com) or SMTP_USER & SMTP_PASS (Gmail App Password) to your Vercel Environment Variables.";
  console.warn(`[Email Simulation] To: ${params.to} | Reason: ${missingMsg}`);
  return { success: false, error: missingMsg, provider: "none" };
}

/**
 * Send Approval Email
 */
export async function sendApprovalEmail(params: {
  to: string;
  name: string;
  registrationId: string;
  cnic: string;
}): Promise<SendResult> {
  try {
    const { html, text, subject } = await getApprovedEmailContent(params);
    return await dispatchEmail({
      to: params.to,
      subject,
      html,
      text,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error preparing approval email";
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
}): Promise<SendResult> {
  try {
    const { html, text, subject } = getRejectionEmailContent(params);
    return await dispatchEmail({
      to: params.to,
      subject,
      html,
      text,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error preparing rejection email";
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
}): Promise<SendResult> {
  try {
    const { html, text, subject } = getReceivedEmailContent(params);
    return await dispatchEmail({
      to: params.to,
      subject,
      html,
      text,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error preparing received email";
    return { success: false, error: message };
  }
}
