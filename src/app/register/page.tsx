import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { Footer } from "@/components/landing/Footer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Register Pass | Computer Cell CSDS Night 2026",
  description:
    "Register for the CSDS Department Welcome Party & Farewell Night organized by Computer Cell (CC), U.E.T. Peshawar. Civil Lawn, 12 Nov. Rs. 2,200 per person.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0B253A] font-body selection:bg-[#D4A03D] selection:text-white">
      {/* Sleek Top Header Strip */}
      <header className="bg-white text-[#0B253A] px-4 sm:px-6 lg:px-10 py-3 border-b border-[#E2E8F0] shadow-sm flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 shrink-0">
            <Image
              src="/images/cc-logo.png"
              alt="Computer Cell Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xs sm:text-sm tracking-wide uppercase text-[#0B253A] group-hover:text-[#D4A03D] transition-colors leading-tight">
              CSDS NIGHT <span className="text-[#D4A03D]">&apos;26</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest uppercase text-[#64748B]">
              COMPUTER CELL • UET PESHAWAR
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs font-display font-semibold tracking-wider uppercase text-[#475569] hover:text-[#0B253A] px-3 py-1.5 rounded-full border border-[#CBD5E1] hover:border-[#0B253A] transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Site</span>
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
