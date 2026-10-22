"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, AlertCircle, Loader2, ArrowLeft, ArrowUpRight } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("eliaj3618@gmail.com");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("error") === "unauthorized") {
        setError("Your account does not have administrator privileges.");
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      // Hard redirect ensures all browser cookies and server credentials reload fresh
      window.location.href = "/admin";
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setError(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-[#0B253A] text-white px-4 sm:px-8 py-3 border-b border-slate-700/50 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
            <Image
              src="/images/cc-logo.png"
              alt="CC Logo"
              width={22}
              height={22}
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-bold text-xs tracking-wider uppercase text-white">
              COMPUTER CELL <span className="text-[#D4A03D]">ADMIN</span>
            </span>
            <span className="text-[10px] text-slate-300 block font-normal">
              CSDS Night &apos;26 • U.E.T. Peshawar
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-[11px] font-semibold text-slate-300 hover:text-white px-3 py-1 rounded-full border border-white/20 hover:border-white transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Public Site</span>
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7">
            <div className="text-center mb-5">
              <div className="w-11 h-11 rounded-full bg-[#0B253A]/5 border border-[#0B253A]/15 flex items-center justify-center mx-auto mb-2.5 text-[#0B253A]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h1 className="font-extrabold text-lg text-[#0B253A] tracking-tight uppercase">
                ADMIN PORTAL
              </h1>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Review registrations, verify receipts, and send passes.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@uetpeshawar.edu.pk"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0B253A] focus:border-[#0B253A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0B253A] focus:border-[#0B253A]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg bg-[#0B253A] text-white hover:bg-[#123854] transition-all cursor-pointer disabled:opacity-60 shadow-sm"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin text-[#D4A03D]" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <span>Sign In to Dashboard</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#D4A03D]" />
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-[11px] text-slate-400">
        Computer Cell (CC) • U.E.T. Peshawar
      </footer>
    </div>
  );
}
