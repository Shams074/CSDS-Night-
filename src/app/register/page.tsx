import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { Footer } from "@/components/landing/Footer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Register Pass | CSDS Welcome & Farewell Night 2026",
  description:
    "Register for the CSDS Department Welcome Party & Farewell Night in Peshawar. Rs. 2,200 per person.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#070707] text-[#EDEDED] font-body selection:bg-[#B4F23D] selection:text-black">
      {/* Sleek Top Header Strip */}
      <header className="bg-[#0c0c0c] text-white px-4 sm:px-6 lg:px-10 py-3.5 border-b border-[#262626] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-2.5 h-2.5 rounded-full bg-[#B4F23D]" />
          <span className="font-display font-black text-sm tracking-widest uppercase text-white">
            CSDS NIGHT <span className="text-[#B4F23D]">&apos;26</span>
          </span>
        </Link>

        <Link
          href="/"
          className="text-xs font-display font-semibold tracking-wider uppercase text-gray-400 hover:text-white px-3 py-1.5 rounded-full border border-white/20 hover:border-white transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Event Info</span>
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
