import QRCode from "qrcode";
import { EVENT_CONFIG } from "@/config/event";

export async function generateEntryQrCode(registrationId: string): Promise<string> {
  try {
    return await QRCode.toDataURL(`CSDS-PASS:${registrationId}`, {
      width: 220,
      margin: 1,
      color: {
        dark: "#0F3D2B",
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
 */
export async function getApprovedEmailContent(params: {
  name: string;
  registrationId: string;
  cnic: string;
}): Promise<{ html: string; text: string; subject: string }> {
  const qrCodeDataUrl = await generateEntryQrCode(params.registrationId);
  const subject = `🎉 Approved: Your Entry Pass for CSDS Night 2026 (${params.registrationId})`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F1F0DC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111111;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F1F0DC; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 20px; border: 2px solid #111111; box-shadow: 4px 4px 0px #111111; overflow: hidden;">
          
          <!-- Forest Green Header -->
          <tr>
            <td style="background-color: #0F3D2B; padding: 30px 24px; text-align: center; color: #FFFFFF;">
              <div style="display: inline-block; width: 44px; height: 44px; line-height: 44px; border-radius: 50%; background-color: #A3B565; color: #0F3D2B; font-weight: bold; font-size: 22px; border: 2px solid #111111; margin-bottom: 12px;">C</div>
              <h1 style="margin: 0; font-size: 24px; font-weight: bold; letter-spacing: -0.5px; font-family: Georgia, serif;">CSDS Welcome & Farewell Night</h1>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: #A3B565; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">Official Entry Pass & Confirmation</p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 28px; background-color: #FFFFFF;">
              <h2 style="margin: 0 0 12px 0; font-size: 20px; color: #0F3D2B; font-family: Georgia, serif;">Assalamu Alaikum, ${params.name}!</h2>
              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #333333;">
                Your payment and registration of <strong>${EVENT_CONFIG.fee.formatted}</strong> for the <strong>CSDS Department Welcome Party & Farewell Night 2026</strong> have been <strong>approved</strong> by the organizing committee.
              </p>

              <!-- Entry Ticket Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F1F0DC; border: 2px solid #111111; border-radius: 16px; margin: 24px 0; padding: 20px;">
                <tr>
                  <td align="center">
                    <span style="display: inline-block; background-color: #D94A3F; color: #FFFFFF; font-size: 11px; font-weight: bold; padding: 3px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Official Entry Ticket</span>
                    <div style="font-size: 22px; font-weight: bold; font-family: monospace; color: #0F3D2B; letter-spacing: 1px; margin-bottom: 14px;">${params.registrationId}</div>
                    
                    ${
                      qrCodeDataUrl
                        ? `<img src="${qrCodeDataUrl}" alt="Digital Entry QR Code" width="160" height="160" style="display: block; border-radius: 12px; border: 2px solid #111111; margin-bottom: 14px;" />`
                        : ""
                    }
                    <p style="margin: 0; font-size: 12px; color: #555555;">Present this QR code or Registration ID at the venue entrance</p>
                  </td>
                </tr>
              </table>

              <!-- Event Logistics List -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #EEEEEE; color: #666666; width: 35%;">Date & Time:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #EEEEEE; color: #111111; font-weight: 600;">${EVENT_CONFIG.date} • ${EVENT_CONFIG.time}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #EEEEEE; color: #666666;">Venue:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #EEEEEE; color: #111111; font-weight: 600;">${EVENT_CONFIG.venue}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #EEEEEE; color: #666666;">Fee Confirmed:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #EEEEEE; color: #0F3D2B; font-weight: bold;">${EVENT_CONFIG.fee.formatted} (Paid & Verified)</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666666;">Registered CNIC:</td>
                  <td style="padding: 8px 0; color: #111111; font-weight: 600;">${params.cnic}</td>
                </tr>
              </table>

              <!-- What to Bring Notice -->
              <div style="background-color: #A3B565; background-opacity: 0.2; border: 2px solid #111111; border-radius: 12px; padding: 14px 18px; margin: 24px 0;">
                <h4 style="margin: 0 0 6px 0; font-size: 13px; color: #0F3D2B; text-transform: uppercase; font-weight: bold;">Important: What to Bring</h4>
                <p style="margin: 0; font-size: 13px; color: #111111; line-height: 1.5;">
                  Please bring your original <strong>CNIC</strong> (or Student ID Card) along with this digital pass on your phone. Entrance will be validated against your registered CNIC.
                </p>
              </div>

              <!-- Coral CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 24px;">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}#schedule" style="display: inline-block; background-color: #D94A3F; color: #FFFFFF; text-decoration: none; font-size: 14px; font-weight: bold; padding: 12px 28px; border-radius: 50px; border: 2px solid #111111; box-shadow: 3px 3px 0px #111111;">
                      View Event Schedule & Highlights
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #FAF9F0; padding: 20px 24px; text-align: center; border-top: 2px solid #111111; font-size: 12px; color: #777777;">
              <p style="margin: 0 0 4px 0;">Department of Computer Science & Data Science, Peshawar</p>
              <p style="margin: 0;">Alcohol-free student community event. For inquiries, email society.csds@uop.edu.pk</p>
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
CSDS Welcome Party & Farewell Night 2026 - Registration Approved

Assalamu Alaikum ${params.name},

Your registration and payment of ${EVENT_CONFIG.fee.formatted} have been approved!

REGISTRATION ID: ${params.registrationId}
DATE: ${EVENT_CONFIG.date}
TIME: ${EVENT_CONFIG.time}
VENUE: ${EVENT_CONFIG.venue}
REGISTERED CNIC: ${params.cnic}

WHAT TO BRING:
Please bring your original CNIC or Student ID card along with this registration ID for venue entry.

We look forward to welcoming you to an unforgettable night!
- CSDS Student Society, Peshawar
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
  const subject = `Update regarding your CSDS Night 2026 Registration`;
  const reasonText = params.reason || "The uploaded payment screenshot could not be verified (amount or transaction ID unclear).";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>${subject}</title></head>
<body style="margin:0; padding:0; background-color: #F1F0DC; font-family: sans-serif; color: #111111;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" style="max-width: 600px; background-color: #FFFFFF; border-radius: 20px; border: 2px solid #111111; box-shadow: 4px 4px 0px #111111; overflow: hidden;">
          <tr>
            <td style="background-color: #0F3D2B; padding: 24px; text-align: center; color: white;">
              <h2 style="margin:0; font-family: Georgia, serif;">CSDS Welcome & Farewell Night</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px;">Assalamu Alaikum ${params.name},</p>
              <p style="font-size: 14px; line-height: 1.6; color: #333;">
                Thank you for submitting your registration. Unfortunately, your submission could not be approved at this time due to the following reason:
              </p>
              <div style="background-color: #FFF3F2; border-left: 4px solid #D94A3F; padding: 12px 16px; margin: 16px 0; font-size: 14px; color: #8C1D18;">
                ${reasonText}
              </div>
              <p style="font-size: 14px; line-height: 1.6; color: #333;">
                You are welcome to re-submit your registration with a clear screenshot showing your transaction ID and transfer timestamp.
              </p>
              <p style="text-align: center; margin-top: 24px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/register" style="background-color: #D94A3F; color: white; padding: 12px 24px; border-radius: 30px; text-decoration: none; font-weight: bold; border: 2px solid #111111; display: inline-block;">
                  Submit Corrected Registration
                </a>
              </p>
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

Assalamu Alaikum ${params.name},

Your registration could not be approved due to:
${reasonText}

Please visit ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/register to re-submit with a clear payment receipt.
- CSDS Student Society, Peshawar
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
  const subject = `Registration Received: CSDS Welcome & Farewell Night (${params.registrationId})`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>${subject}</title></head>
<body style="margin:0; padding:0; background-color: #F1F0DC; font-family: sans-serif; color: #111111;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" style="max-width: 600px; background-color: #FFFFFF; border-radius: 20px; border: 2px solid #111111; box-shadow: 4px 4px 0px #111111; overflow: hidden;">
          <tr>
            <td style="background-color: #0F3D2B; padding: 24px; text-align: center; color: white;">
              <h2 style="margin:0; font-family: Georgia, serif;">Registration Received</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <p style="font-size: 16px;">Assalamu Alaikum ${params.name},</p>
              <p style="font-size: 14px; line-height: 1.6; color: #333;">
                We have received your registration and proof of payment for the <strong>CSDS Welcome & Farewell Night 2026</strong>.
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #333;">
                Your Reference ID is <strong>${params.registrationId}</strong>.
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #333;">
                The student organizing committee will verify your payment receipt within 12–24 hours. Once verified, you will automatically receive an official confirmation email containing your digital entry pass and QR code.
              </p>
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
Registration Received: CSDS Welcome & Farewell Night
Reference ID: ${params.registrationId}

Assalamu Alaikum ${params.name},
We have received your registration. The student organizing committee will verify your payment within 12-24 hours and send your official entry pass upon approval.
- CSDS Student Society, Peshawar
  `;

  return { html, text, subject };
}
