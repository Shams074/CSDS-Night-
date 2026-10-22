import { NextRequest, NextResponse } from "next/server";
import { registrationFormSchema } from "@/lib/validation/registrationSchema";
import {
  checkDuplicateRegistration,
  insertRegistration,
  isSupabaseConfigured,
  supabaseAdmin,
} from "@/lib/supabase/admin";
import { sendRegistrationReceivedEmail } from "@/lib/email/sender";

// Rate limiting in-memory store for IP protection
const ipRequests = new Map<string, { count: number; firstRequest: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);

  if (!entry) {
    ipRequests.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  if (now - entry.firstRequest > RATE_LIMIT_WINDOW_MS) {
    ipRequests.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const formData = await req.formData();

    // 1. Check Spam Guard Honeypot
    const honeypot = formData.get("website_honeypot");
    if (honeypot && String(honeypot).trim() !== "") {
      // Quietly reject bots
      return NextResponse.json(
        { error: "Invalid submission detected." },
        { status: 400 }
      );
    }

    // 2. Extract and validate text fields with Zod
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      section: formData.get("section"),
      semester: Number(formData.get("semester")),
      cnic: formData.get("cnic"),
      website_honeypot: formData.get("website_honeypot") || undefined,
    };

    const validation = registrationFormSchema.safeParse(rawData);
    if (!validation.success) {
      const firstError =
        validation.error.issues?.[0]?.message || "Validation failed";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = validation.data;

    // 3. Check Duplicate Email or CNIC
    const duplicate = await checkDuplicateRegistration(data.email, data.cnic);
    if (duplicate.exists) {
      if (duplicate.field === "email") {
        return NextResponse.json(
          {
            error:
              "This email address has already been registered. Please contact the society desk if you need to update your details.",
          },
          { status: 409 }
        );
      } else {
        return NextResponse.json(
          {
            error:
              "This CNIC number is already registered. Each student can register only once.",
          },
          { status: 409 }
        );
      }
    }

    // 4. Validate Screenshot File
    const file = formData.get("screenshot") as File | null;
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Payment screenshot is required." },
        { status: 400 }
      );
    }

    // Validate size (max 5 MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Payment screenshot must be smaller than 5 MB." },
        { status: 400 }
      );
    }

    // Validate MIME type
    const validMimes = ["image/jpeg", "image/png", "image/webp"];
    if (!validMimes.includes(file.type)) {
      return NextResponse.json(
        { error: "Screenshot must be a JPG, PNG, or WebP image." },
        { status: 400 }
      );
    }

    // 5. Upload Screenshot to Private Supabase Storage Bucket
    const fileExt = file.name.split(".").pop() || "png";
    const sanitizedName = data.name.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 20);
    const storagePath = `${Date.now()}_${sanitizedName}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    let finalScreenshotPath = storagePath;

    if (isSupabaseConfigured() && supabaseAdmin) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const { error: uploadError } = await supabaseAdmin.storage
        .from("payment-proofs")
        .upload(storagePath, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Storage upload failed:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload payment proof. Please try again." },
          { status: 500 }
        );
      }
    } else {
      // Mock / local preview mode: store as base64 data URL
      const buffer = Buffer.from(await file.arrayBuffer());
      finalScreenshotPath = `data:${file.type};base64,${buffer.toString("base64")}`;
    }

    // 6. Insert Row with status = 'pending'
    const newRegistration = await insertRegistration({
      name: data.name,
      email: data.email,
      section: data.section,
      semester: data.semester,
      cnic: data.cnic,
      screenshot_path: finalScreenshotPath,
    });

    // 7. Optionally trigger "registration received" email
    try {
      await sendRegistrationReceivedEmail({
        to: data.email,
        name: data.name,
        registrationId: newRegistration.id,
      });
    } catch (mailErr) {
      // Non-blocking: registration is safely recorded even if email fails
      console.warn("Received notification email skipped/failed:", mailErr);
    }

    return NextResponse.json({
      success: true,
      registrationId: newRegistration.id,
      message:
        "We received your registration! You will receive a confirmation email once approved by the admin committee.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "An unexpected server error occurred";
    console.error("Registration endpoint error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
