import React from "react";
import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { PillButton } from "../ui/PillButton";
import { EVENT_CONFIG } from "@/config/event";
import { Check, ShieldCheck, CreditCard, ArrowRight } from "lucide-react";

export function FeeSection() {
  const fee = EVENT_CONFIG.fee;

  return (
    <section id="fee" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F1F0DC]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="Registration Pass"
          pre="Join the"
          accent="Gathering"
          post="in Peshawar"
          subtitle="All-inclusive departmental access pass for current CSDS students and graduating seniors."
        />

        {/* Split Layout: Large rounded photo on left, Rounded sage card on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: Large Rounded Group Photo */}
          <div className="lg:col-span-6 relative rounded-[26px] overflow-hidden border-2 border-[#111111] shadow-hard min-h-[380px] sm:min-h-[460px]">
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
              alt="Students enjoying event together"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Bottom Photo Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D94A3F] text-white border-2 border-[#111111] shadow-hard-xs inline-block mb-2">
                All-Inclusive Access
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl leading-snug">
                One Pass. Zero Extra Charges.
              </h3>
              <p className="text-sm text-white/80 mt-1 max-w-md">
                Covers your grand buffet dinner, live concerts, attan dance, departmental awards, and instant high-res photo prints.
              </p>
            </div>
          </div>

          {/* Right Column: Rounded Sage Card (Matching reference design membership block) */}
          <div className="lg:col-span-6 rounded-[26px] bg-[#A3B565] border-2 border-[#111111] shadow-hard p-6 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Header Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F3D2B] text-white text-xs font-bold uppercase tracking-wider mb-4 border border-[#111111]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A3B565]" />
                <span>Verified Student Registration</span>
              </div>

              {/* Price in Large Type */}
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-black text-4xl sm:text-5xl md:text-6xl text-[#0F3D2B] tracking-tight">
                  {fee.formatted}
                </span>
                <span className="text-base sm:text-lg font-bold text-[#111111]/70">
                  {fee.unit}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#0F3D2B] font-semibold mt-2 pb-4 border-b-2 border-[#111111]/20">
                {fee.note}
              </p>

              {/* 3 to 4 Short Payment Instruction Lines */}
              <ul className="mt-5 space-y-3 sm:space-y-3.5">
                {fee.instructions.slice(0, 4).map((instruction, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0F3D2B] text-white flex items-center justify-center shrink-0 mt-0.5 border border-[#111111]">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-sm text-[#111111] font-medium leading-snug">
                      {instruction}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Quick Accounts Pill List */}
              <div className="mt-6 p-4 rounded-2xl bg-white/70 border-2 border-[#111111] shadow-hard-xs space-y-2">
                <span className="text-xs font-bold text-[#0F3D2B] uppercase tracking-wider block">
                  Accepted Payment Methods:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="bg-white p-2 rounded-lg border border-[#111111]/20">
                    <span className="font-bold text-[#0F3D2B] block">Meezan Bank</span>
                    <span className="text-[11px] text-gray-600 truncate block">Account Transfer</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-[#111111]/20">
                    <span className="font-bold text-[#0F3D2B] block">Easypaisa</span>
                    <span className="text-[11px] text-gray-600 block">0345-9182736</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-[#111111]/20">
                    <span className="font-bold text-[#0F3D2B] block">JazzCash</span>
                    <span className="text-[11px] text-gray-600 block">0301-8273945</span>
                  </div>
                </div>
              </div>
            </div>

            {/* White Outlined "Register Now" Button (matching reference) */}
            <div className="mt-8 pt-4">
              <PillButton
                variant="secondary"
                size="lg"
                href="/register"
                className="w-full sm:w-auto"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Proceed to Registration Form
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
