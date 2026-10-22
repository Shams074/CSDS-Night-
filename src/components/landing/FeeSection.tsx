import React from "react";
import Image from "next/image";
import { PillButton } from "../ui/PillButton";
import { EVENT_CONFIG } from "@/config/event";
import { Check, ShieldCheck, ArrowUpRight } from "lucide-react";

export function FeeSection() {
  const fee = EVENT_CONFIG.fee;

  return (
    <section id="fee" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-[#E2E8F0] bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: 📸 PHOTO SLOT */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#E2E8F0] bg-[#0B253A] min-h-[340px] sm:min-h-[420px] group shadow-sm">
            <Image
              src={EVENT_CONFIG.images.feeCard}
              alt="CSDS Students Gathering"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B253A] via-[#0B253A]/40 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5">
              <span className="font-mono text-[11px] font-bold text-[#0B253A] bg-[#D4A03D] px-2.5 py-0.5 rounded-full inline-block">
                [ 05 • ENTRY PASS ]
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl uppercase leading-snug">
                ONE PASS. ALL-INCLUSIVE CELEBRATION.
              </h3>
              <p className="text-xs text-slate-200 font-normal max-w-md">
                Arranged by Computer Cell (CC) at Civil Lawn, UET Peshawar. Covers buffet dinner, concert access, Attan dance, crests & souvenirs.
              </p>
            </div>
          </div>

          {/* Right Column: Clean Light Fee & Accounts Card */}
          <div className="lg:col-span-6 rounded-2xl bg-white border border-[#E2E8F0] p-5 sm:p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-[#D4A03D] uppercase tracking-wider">
                  REGISTRATION TARIFF
                </span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-[#0B253A] bg-[#FEF9EE] px-2.5 py-0.5 rounded-full border border-[#D4A03D]/30 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4A03D]" />
                  <span>VERIFIED ACCESS</span>
                </span>
              </div>

              {/* Price */}
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-3xl sm:text-5xl text-[#0B253A] tracking-tight">
                    {fee.formatted}
                  </span>
                  <span className="font-display font-semibold text-xs sm:text-sm text-[#64748B] uppercase">
                    / {fee.unit}
                  </span>
                </div>
                <p className="text-xs text-[#64748B] mt-1 font-normal">
                  {fee.note}
                </p>
              </div>

              {/* Instructions List */}
              <ul className="space-y-2 pt-2 border-t border-[#E2E8F0]">
                {fee.instructions.slice(0, 4).map((instruction, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#334155]">
                    <div className="w-4 h-4 rounded-full bg-[#D4A03D] text-[#0B253A] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>

              {/* Payment Methods Pill Badges */}
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-widest block font-bold">
                  Payment Accounts (Treasurer & President CC):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-[#E2E8F0]">
                    <span className="font-bold text-[#0B253A] block text-xs">Meezan Bank</span>
                    <span className="text-[10px] text-[#64748B] font-mono block">Direct Transfer</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-[#E2E8F0]">
                    <span className="font-bold text-[#0B253A] block text-xs">Easypaisa</span>
                    <span className="text-[10px] text-[#D4A03D] font-mono block font-bold">0345-9182736</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-[#E2E8F0]">
                    <span className="font-bold text-[#0B253A] block text-xs">JazzCash</span>
                    <span className="text-[10px] text-[#D4A03D] font-mono block font-bold">0301-8273945</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <PillButton
                variant="gold"
                size="md"
                href="/register"
                icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                className="w-full justify-center"
              >
                PROCEED TO REGISTRATION FORM
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
