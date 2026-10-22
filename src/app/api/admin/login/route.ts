import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();

    // 1. Admin Allowlist Check (with default fallback for project administrators)
    const defaultAdmins = "eliaj3618@gmail.com,admin@csds.uop.edu.pk,president.csds@gmail.com";
    const adminAllowlist = (process.env.ADMIN_EMAILS ? `${process.env.ADMIN_EMAILS},${defaultAdmins}` : defaultAdmins)
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);

    // Allow wildcard '*' to grant access to all authenticated Supabase users, or check specific email
    const isAllowed = adminAllowlist.includes("*") || adminAllowlist.includes(cleanEmail);
    if (!isAllowed) {
      return NextResponse.json(
        {
          error: `Access denied. "${cleanEmail}" is not listed in ADMIN_EMAILS inside your .env.local file. Add your email to ADMIN_EMAILS in .env.local and restart the server.`,
        },
        { status: 403 }
      );
    }

    // 2. Authenticate
    if (isSupabaseConfigured()) {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error || !data.user) {
        return NextResponse.json(
          { error: error?.message || "Invalid email or password" },
          { status: 401 }
        );
      }
    } else {
      // Local dev / fallback mock authentication
      // Default dev password is 'admin12345'
      if (password !== "admin12345" && password !== "admin123") {
        return NextResponse.json(
          { error: "Invalid password for administrator account." },
          { status: 401 }
        );
      }
    }

    // 3. Create session cookie
    const response = NextResponse.json({
      success: true,
      user: { email: cleanEmail, role: "admin" },
    });

    response.cookies.set("csds_admin_session", cleanEmail, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Authentication error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
