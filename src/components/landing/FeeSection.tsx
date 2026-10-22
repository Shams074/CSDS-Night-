import React from "react";
import Image from "next/image";
import { PillButton } from "../ui/PillButton";
import { EVENT_CONFIG } from "@/config/event";
import { Check, ShieldCheck, ArrowUpRight } from "lucide-react";

export function FeeSection() {
  const fee = EVENT_CONFIG.fee;

  return (
    <section id="fee" className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: 📸 PHOTO SLOT (Student group or venue photo) */}
          <div className="lg:col-span-6 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#262626] bg-[#121212] min-h-[360px] sm:min-h-[460px] group">
            <Image
              src={EVENT_CONFIG.images.feeCard}
              alt="CSDS Students Gathering"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-75"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="font-mono text-xs font-bold text-black bg-[#B4F23D] px-2.5 py-0.5 rounded-full inline-block">
                [ 05 • ENTRY PASS ]
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase leading-tight">
                ONE PASS. ALL-INCLUSIVE CELEBRATION.
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-normal max-w-md">
                Includes your Royal Peshawari Buffet Dinner, concert access, Attan dance, awards shield, and high-res instant photo prints.
              </p>
            </div>
          </div>

          {/* Right Column: Sleek Dark Fee & Accounts Card */}
          <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl bg-[#121212] border border-[#262626] p-6 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#B4F23D] uppercase tracking-wider">
                  REGISTRATION TARIFF
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px] text-gray-400 bg-black/60 px-2.5 py-0.5 rounded-full border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B4F23D]" />
                  <span>VERIFIED ACCESS</span>
                </span>
              </div>

              {/* Price */}
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-4xl sm:text-6xl text-[#B4F23D] tracking-tight">
                    {fee.formatted}
                  </span>
                  <span className="font-display font-bold text-sm sm:text-base text-gray-400 uppercase">
                    / {fee.unit}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1 font-normal">
                  {fee.note}
                </p>
              </div>

              {/* Instructions List */}
              <ul className="space-y-2.5 pt-2 border-t border-[#262626]">
                {fee.instructions.slice(0, 4).map((instruction, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                    <div className="w-4 h-4 rounded-full bg-[#B4F23D] text-black flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>

              {/* Payment Methods Pill Badges */}
              <div className="p-4 rounded-xl bg-[#0c0c0c] border border-[#262626] space-y-2">
                <span className="text-[11px] font-mono text-gray-400 uppercase tracking-widest block">
                  Accepted Accounts:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-[#161616] border border-white/10">
                    <span className="font-bold text-white block">Meezan Bank</span>
                    <span className="text-[10px] text-gray-400 font-mono block">Direct Transfer</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#161616] border border-white/10">
                    <span className="font-bold text-white block">Easypaisa</span>
                    <span className="text-[10px] text-[#B4F23D] font-mono block">0345-9182736</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#161616] border border-white/10">
                    <span className="font-bold text-white block">JazzCash</span>
                    <span className="text-[10px] text-[#B4F23D] font-mono block">0301-8273945</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <PillButton
                variant="primary"
                size="lg"
                href="/register"
                className="w-full"
                icon={<ArrowUpRight className="w-4 h-4" />}
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
