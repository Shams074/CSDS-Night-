import QRCode from "qrcode";
import { EVENT_CONFIG } from "@/config/event";
import { formatShortId } from "@/lib/id";

/**
 * Generate high-contrast QR code for entrance scanner using CC Navy (#0B253A)
 */
export async function generateEntryQrCode(registrationId: string): Promise<string> {
  const shortId = formatShortId(registrationId);
  try {
    return await QRCode.toDataURL(`CC-PASS:${shortId}`, {
      width: 220,
      margin: 1,
      color: {
        dark: "#0B253A",
        light: "#FFFFFF",
      },
    });
  } catch (err) {
    console.error("QR Code generation failed:", err);
    return "";
  }
}

/**
 * Approved Email HTML & Plain text template
 * Minimalist Light Theme: Deep Navy (#0B253A), Warm Gold (#D4A03D), Crisp White (#FFFFFF), Light Slate (#F8FAFC)
 */
export async function getApprovedEmailContent(params: {
  name: string;
  registrationId: string;
  cnic: string;
}): Promise<{ html: string; text: string; subject: string }> {
  const shortId = formatShortId(params.registrationId);
  const qrCodeDataUrl = await generateEntryQrCode(params.registrationId);
  const subject = `🎉 Entry Pass Approved: CSDS Night 2026 [Pass: ${shortId}]`;
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://csds-night.vercel.app").replace(/\/$/, "");
  const logoUrl = `${appUrl}/images/cc-logo.png`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F172A;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; box-shadow: 0 4px 16px rgba(11,37,58,0.06); overflow: hidden;">
          
          <!-- Deep Navy Header -->
          <tr>
            <td style="background-color: #0B253A; padding: 24px 20px; text-align: center; color: #FFFFFF;">
              <table role="presentation" align="center" cellpadding="0" cellspacing="0" style="margin-bottom: 10px;">
                <tr>
                  <td align="center" style="background-color: #FFFFFF; border-radius: 10px; padding: 6px 10px;">
                    <img src="${logoUrl}" alt="Computer Cell Logo" width="34" height="34" style="display: block; border: 0; object-fit: contain;" />
                  </td>
                </tr>
              </table>
              <div style="font-size: 11px; font-weight: 700; color: #D4A03D; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px;">
                COMPUTER CELL (CC) • U.E.T. PESHAWAR
              </div>
              <h1 style="margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.2px; color: #FFFFFF;">
                CSDS Welcome & Farewell Night &apos;26
              </h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #CBD5E1;">
                Official Digital Entry Pass
              </p>
            </td>
          </tr>

          <!-- Gold Accent Divider Line -->
          <tr>
            <td style="height: 3px; background-color: #D4A03D; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 24px 24px 20px 24px; background-color: #FFFFFF;">
              <p style="margin: 0 0 10px 0; font-size: 15px; font-weight: 700; color: #0B253A;">
                Assalamu Alaikum, ${params.name}!
              </p>
              <p style="margin: 0 0 18px 0; font-size: 13px; line-height: 1.6; color: #475569;">
                Your registration and payment of <strong>${EVENT_CONFIG.fee.formatted}</strong> have been <strong>verified and approved</strong> by the Computer Cell organizing committee. Below is your official digital entry pass.
              </p>

              <!-- Entry Ticket Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; border: 1.5px solid #0B253A; border-radius: 12px; margin: 18px 0; padding: 18px 14px;">
                <tr>
                  <td align="center">
                    <span style="display: inline-block; background-color: #0B253A; color: #D4A03D; font-size: 10px; font-weight: 800; padding: 3px 12px; border-radius: 12px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">
                      PASS CODE
                    </span>
                    <div style="font-size: 26px; font-weight: 900; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; color: #0B253A; letter-spacing: 3px; margin: 4px 0 12px 0;">
                      ${shortId}
                    </div>
                    
                    ${
                      qrCodeDataUrl
                        ? `<img src="${qrCodeDataUrl}" alt="Digital Entry QR Code" width="150" height="150" style="display: block; border-radius: 8px; border: 1px solid #E2E8F0; margin-bottom: 10px; background-color: #FFFFFF; padding: 4px;" />`
                        : ""
                    }
                    <p style="margin: 0; font-size: 11px; color: #64748B;">
                      Show this 6-character Pass Code or QR code at Civil Lawn entrance
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Event Details -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 16px 0; font-size: 12px; border: 1px solid #E2E8F0; border-radius: 10px; overflow: hidden;">
                <tr style="background-color: #F8FAFC;">
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E2E8F0; color: #64748B; width: 38%; font-weight: 600;">Date:</td>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E2E8F0; color: #0B253A; font-weight: 700;">12 Nov 2026 (Thursday)</td>
                </tr>
                <tr>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E2E8F0; color: #64748B; font-weight: 600;">Timing:</td>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E2E8F0; color: #0B253A; font-weight: 600;">06:00 PM onwards</td>
                </tr>
                <tr style="background-color: #F8FAFC;">
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E2E8F0; color: #64748B; font-weight: 600;">Venue:</td>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E2E8F0; color: #0B253A; font-weight: 700;">Civil Lawn, UET Peshawar</td>
                </tr>
                <tr>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E2E8F0; color: #64748B; font-weight: 600;">Organizer:</td>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E2E8F0; color: #0B253A; font-weight: 600;">Computer Cell (CC), U.E.T. Peshawar</td>
                </tr>
                <tr style="background-color: #F8FAFC;">
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E2E8F0; color: #64748B; font-weight: 600;">Registered CNIC:</td>
                  <td style="padding: 9px 14px; border-bottom: 1px solid #E2E8F0; color: #0B253A; font-weight: 600;">${params.cnic}</td>
                </tr>
                <tr>
                  <td style="padding: 9px 14px; color: #64748B; font-weight: 600;">Payment Status:</td>
                  <td style="padding: 9px 14px; color: #166534; font-weight: 700;">${EVENT_CONFIG.fee.formatted} (Paid & Verified)</td>
                </tr>
              </table>

              <!-- Notice Box -->
              <div style="background-color: #FFFBEB; border-left: 3px solid #D4A03D; border-radius: 6px; padding: 10px 14px; margin: 16px 0;">
                <p style="margin: 0; font-size: 11px; line-height: 1.5; color: #92400E;">
                  <strong>Important:</strong> Please bring your original <strong>CNIC</strong> (or Student Card) along with this pass on your phone. Admission is non-transferable and strictly checked at the entrance.
                </p>
              </div>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 18px;">
                <tr>
                  <td align="center">
                    <a href="${appUrl}#schedule" style="display: inline-block; background-color: #0B253A; color: #FFFFFF; text-decoration: none; font-size: 12px; font-weight: 700; padding: 10px 22px; border-radius: 20px; border: 1px solid #D4A03D;">
                      View Event Timeline & Guidelines
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; padding: 16px 20px; text-align: center; border-top: 1px solid #E2E8F0; font-size: 11px; color: #64748B; line-height: 1.5;">
              <p style="margin: 0 0 3px 0; font-weight: 600; color: #0B253A;">Computer Cell (CC) • U.E.T. Peshawar</p>
              <p style="margin: 0;">Venue: Civil Lawn • Event Date: 12 Nov 2026</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = `
CSDS Welcome & Farewell Night 2026 - Official Entry Pass
Organized by Computer Cell (CC), U.E.T. Peshawar

Assalamu Alaikum ${params.name},

Your registration and payment of ${EVENT_CONFIG.fee.formatted} have been approved!

ENTRY PASS CODE: ${shortId}
EVENT DATE: 12 Nov 2026 (Thursday)
TIME: 06:00 PM onwards
VENUE: Civil Lawn, UET Peshawar
ORGANIZER: Computer Cell (CC), U.E.T. Peshawar
REGISTERED CNIC: ${params.cnic}

IMPORTANT:
Please present this 6-character Pass Code (${shortId}) and your original CNIC or Student ID card at the Civil Lawn entrance gate.

See you on 12 Nov at Civil Lawn!
- Computer Cell (CC), U.E.T. Peshawar
  `;

  return { html, text, subject };
}

/**
 * Rejection Email Template
 */
export function getRejectionEmailContent(params: {
  name: string;
  reason?: string;
}): { html: string; text: string; subject: string } {
  const subject = `Registration Update: CSDS Welcome & Farewell Night 2026`;
  const reasonText = params.reason || "The uploaded payment screenshot could not be verified (amount or transaction ID was unclear).";
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://csds-night.vercel.app").replace(/\/$/, "");
  const logoUrl = `${appUrl}/images/cc-logo.png`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>${subject}</title></head>
<body style="margin:0; padding:0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F172A;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 24px 12px; background-color: #F8FAFC;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 16px rgba(11,37,58,0.06);">
          <tr>
            <td style="background-color: #0B253A; padding: 20px; text-align: center; color: white;">
              <table role="presentation" align="center" cellpadding="0" cellspacing="0" style="margin-bottom: 8px;">
                <tr>
                  <td align="center" style="background-color: #FFFFFF; border-radius: 8px; padding: 5px 8px;">
                    <img src="${logoUrl}" alt="CC Logo" width="30" height="30" style="display: block; border: 0;" />
                  </td>
                </tr>
              </table>
              <div style="font-size: 11px; color: #D4A03D; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">Computer Cell (CC) • U.E.T. Peshawar</div>
              <h2 style="margin: 4px 0 0 0; font-size: 18px; color: #FFFFFF;">CSDS Night Registration Update</h2>
            </td>
          </tr>
          <tr>
            <td style="height: 3px; background-color: #D4A03D;"></td>
          </tr>
          <tr>
            <td style="padding: 24px;">
              <p style="font-size: 14px; font-weight: 700; color: #0B253A; margin: 0 0 10px 0;">Assalamu Alaikum ${params.name},</p>
              <p style="font-size: 13px; line-height: 1.6; color: #475569; margin: 0 0 14px 0;">
                Thank you for submitting your registration for the CSDS Welcome & Farewell Night (12 Nov, Civil Lawn). Unfortunately, your submission could not be approved at this time:
              </p>
              <div style="background-color: #FEF2F2; border-left: 3px solid #EF4444; padding: 12px 14px; margin: 14px 0; font-size: 12px; color: #991B1B; border-radius: 6px;">
                <strong>Reason:</strong> ${reasonText}
              </div>
              <p style="font-size: 12px; line-height: 1.6; color: #475569;">
                Please re-submit your registration with a clear screenshot showing the transaction ID, amount (Rs. 2,200), and transfer timestamp.
              </p>
              <div style="text-align: center; margin-top: 20px;">
                <a href="${appUrl}/register" style="background-color: #0B253A; color: #FFFFFF; padding: 10px 22px; border-radius: 20px; text-decoration: none; font-size: 12px; font-weight: 700; border: 1px solid #D4A03D; display: inline-block;">
                  Re-submit Registration
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #F8FAFC; padding: 14px; text-align: center; border-top: 1px solid #E2E8F0; font-size: 11px; color: #64748B;">
              Computer Cell (CC) • U.E.T. Peshawar
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = `
Update regarding your CSDS Night 2026 Registration
Organized by Computer Cell (CC), U.E.T. Peshawar

Assalamu Alaikum ${params.name},

Your registration could not be verified due to:
${reasonText}

Please visit ${appUrl}/register to submit a clear payment receipt.
- Computer Cell (CC), U.E.T. Peshawar
  `;

  return { html, text, subject };
}

/**
 * Received notification email (acknowledging submission)
 */
export function getReceivedEmailContent(params: {
  name: string;
  registrationId: string;
}): { html: string; text: string; subject: string } {
  const shortId = formatShortId(params.registrationId);
  const subject = `Registration Received: CSDS Welcome & Farewell Night [Ref: ${shortId}]`;
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://csds-night.vercel.app").replace(/\/$/, "");
  const logoUrl = `${appUrl}/images/cc-logo.png`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>${subject}</title></head>
<body style="margin:0; padding:0; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F172A;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 24px 12px; background-color: #F8FAFC;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 16px rgba(11,37,58,0.06);">
          <tr>
            <td style="background-color: #0B253A; padding: 20px; text-align: center; color: white;">
              <table role="presentation" align="center" cellpadding="0" cellspacing="0" style="margin-bottom: 8px;">
                <tr>
                  <td align="center" style="background-color: #FFFFFF; border-radius: 8px; padding: 5px 8px;">
                    <img src="${logoUrl}" alt="CC Logo" width="30" height="30" style="display: block; border: 0;" />
                  </td>
                </tr>
              </table>
              <div style="font-size: 11px; color: #D4A03D; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">Computer Cell (CC) • U.E.T. Peshawar</div>
              <h2 style="margin: 4px 0 0 0; font-size: 18px; color: #FFFFFF;">Registration Received</h2>
            </td>
          </tr>
          <tr>
            <td style="height: 3px; background-color: #D4A03D;"></td>
          </tr>
          <tr>
            <td style="padding: 24px;">
              <p style="font-size: 14px; font-weight: 700; color: #0B253A; margin: 0 0 10px 0;">Assalamu Alaikum ${params.name},</p>
              <p style="font-size: 13px; line-height: 1.6; color: #475569; margin: 0 0 12px 0;">
                We have received your registration and payment proof for the <strong>CSDS Welcome & Farewell Night 2026</strong> (12 Nov, Civil Lawn).
              </p>
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px; margin: 14px 0; text-align: center;">
                <span style="font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 1px;">Your Reference ID</span>
                <div style="font-size: 22px; font-weight: 800; font-family: monospace; color: #0B253A; letter-spacing: 2px; margin-top: 4px;">
                  ${shortId}
                </div>
              </div>
              <p style="font-size: 12px; line-height: 1.6; color: #64748B;">
                The Computer Cell organizing team will verify your receipt within 12–24 hours. Once approved, your official QR entry pass will be automatically dispatched to this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #F8FAFC; padding: 14px; text-align: center; border-top: 1px solid #E2E8F0; font-size: 11px; color: #64748B;">
              Computer Cell (CC) • U.E.T. Peshawar
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = `
Registration Received: CSDS Welcome & Farewell Night 2026
Organized by Computer Cell (CC), U.E.T. Peshawar

Reference ID: ${shortId}

Assalamu Alaikum ${params.name},
We have received your registration. The Computer Cell committee will verify your payment within 12-24 hours and send your official entry pass upon approval.

Event Date: 12 Nov 2026
Venue: Civil Lawn, UET Peshawar
- Computer Cell (CC), U.E.T. Peshawar
  `;

  return { html, text, subject };
}
