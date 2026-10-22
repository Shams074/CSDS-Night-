"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CardContainer } from "@/components/ui/CardContainer";
import { ShieldCheck, Lock, Mail, AlertCircle, Loader2, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@csds.uop.edu.pk");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F1F0DC]">
      {/* Header */}
      <header className="bg-[#0F3D2B] text-white px-4 sm:px-6 lg:px-10 py-3.5 border-b-2 border-[#111111] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#A3B565] border-2 border-[#111111] flex items-center justify-center font-serif font-black text-[#0F3D2B] text-base shadow-hard-xs">
            C
          </div>
          <div>
            <span className="font-serif font-bold text-base block">
              CSDS Peshawar
            </span>
            <span className="text-[10px] text-[#A3B565] font-semibold tracking-wider uppercase block">
              Administrative Portal
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs font-bold text-white/90 hover:text-white px-3 py-1.5 rounded-full border border-white/30 hover:border-white transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Public Site</span>
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-md">
          <CardContainer variant="white" className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#A3B565] border-2 border-[#111111] shadow-hard-xs flex items-center justify-center mx-auto mb-3 text-[#0F3D2B]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#0F3D2B]">
                Staff & Admin Portal
              </h1>
              <p className="text-xs text-[#111111]/70 mt-1 font-normal">
                Sign in to review participant proofs, approve registrations, and manage check-ins.
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border-2 border-rose-600 text-rose-900 text-xs font-semibold flex items-start gap-2.5 shadow-hard-xs">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1">
                  Administrator Email / ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@csds.uop.edu.pk"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#111111] bg-[#FAF9F0] text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3D2B] shadow-hard-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#111111] bg-[#FAF9F0] text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F3D2B] shadow-hard-xs"
                  />
                </div>
              </div>

              {/* Dev / Quick Test Account Hint */}
              <div className="p-3 rounded-xl bg-[#F1F0DC] border border-[#111111]/20 text-[11px] text-[#111111]/80 leading-relaxed">
                <span className="font-bold text-[#0F3D2B] block mb-0.5">
                  Development Credentials:
                </span>
                <span>Email: <code className="font-mono font-bold text-[#0F3D2B]">admin@csds.uop.edu.pk</code></span>
                <br />
                <span>Password: <code className="font-mono font-bold text-[#0F3D2B]">admin12345</code></span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center font-bold text-sm px-6 py-3 rounded-full border-2 border-[#111111] bg-[#D94A3F] text-white hover:bg-[#C53B30] shadow-hard hover:shadow-hard-lg hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <span>Sign In to Dashboard</span>
                  )}
                </button>
              </div>
            </form>
          </CardContainer>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-4 text-center text-xs text-[#111111]/60">
        Department of Computer Science & Data Science, Peshawar
      </footer>
    </div>
  );
}
