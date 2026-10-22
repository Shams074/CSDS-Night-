"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CardContainer } from "@/components/ui/CardContainer";
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
    <div className="min-h-screen flex flex-col justify-between bg-[#070707] text-[#EDEDED] font-body">
      {/* Header */}
      <header className="bg-[#0c0c0c] text-white px-4 sm:px-6 lg:px-10 py-3.5 border-b border-[#262626] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#B4F23D]" />
          <span className="font-display font-black text-sm tracking-widest uppercase text-white">
            CSDS ADMIN <span className="text-[#B4F23D]">&apos;26</span>
          </span>
        </Link>

        <Link
          href="/"
          className="text-xs font-display font-semibold tracking-wider uppercase text-gray-400 hover:text-white px-3 py-1.5 rounded-full border border-white/20 hover:border-white transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Public Site</span>
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-md">
          <CardContainer variant="surface" className="p-6 sm:p-8 border border-[#262626]">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#1b2210] border border-[#B4F23D]/40 flex items-center justify-center mx-auto mb-3 text-[#B4F23D]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h1 className="font-display font-black text-2xl text-white uppercase">
                ADMIN PORTAL
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Review registrations, verify payment screenshots, and dispatch passes.
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs font-semibold flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  Admin Email / ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@csds.uop.edu.pk"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#2a2a2a] bg-[#161616] text-sm text-white focus:outline-none focus:border-[#B4F23D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#2a2a2a] bg-[#161616] text-sm text-white focus:outline-none focus:border-[#B4F23D]"
                  />
                </div>
              </div>

              {/* Dev hint */}
              <div className="p-3 rounded-xl bg-[#0c0c0c] border border-white/10 text-[11px] font-mono text-gray-400 leading-relaxed">
                <span className="text-[#B4F23D] block font-bold mb-0.5">
                  [ DEV PREVIEW ACCESS ]
                </span>
                <span>User: <strong>admin@csds.uop.edu.pk</strong></span>
                <br />
                <span>Pass: <strong>admin12345</strong></span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center font-display font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full bg-[#B4F23D] text-black hover:bg-[#A3E635] transition-all cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <span>Sign In to Dashboard</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </div>
            </form>
          </CardContainer>
        </div>
      </main>

      <footer className="py-4 text-center text-xs font-mono text-gray-600">
        CSDS Student Society • Peshawar, Pakistan
      </footer>
    </div>
  );
}
