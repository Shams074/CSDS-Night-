import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "Register | CSDS Welcome Party & Farewell Night 2026",
  description:
    "Register for the CSDS Department Welcome Party & Farewell Night in Peshawar. Rs. 2,200 per person.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0DC]">
      {/* Top Header Strip */}
      <header className="bg-[#0F3D2B] text-white px-4 sm:px-6 lg:px-10 py-3 border-b-2 border-[#111111] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-[#A3B565] border-2 border-[#111111] flex items-center justify-center font-serif font-black text-[#0F3D2B] text-base shadow-hard-xs">
            C
          </div>
          <div>
            <span className="font-serif font-bold text-base block">
              CSDS Peshawar
            </span>
            <span className="text-[10px] text-[#A3B565] font-semibold tracking-wider uppercase block">
              Welcome & Farewell Night &apos;26
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs font-bold text-white/90 hover:text-white px-3 py-1.5 rounded-full border border-white/30 hover:border-white transition-colors"
        >
          ← Return to Event Info
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow py-6 sm:py-10">
        <RegistrationForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
