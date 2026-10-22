"use client";

import React, { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { EVENT_CONFIG } from "@/config/event";
import {
  MapPin,
  Users,
  CreditCard,
  HelpCircle,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";

export function ContactFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const iconMap: Record<string, React.ReactNode> = {
    MapPin: <MapPin className="w-4 h-4 text-[#D4A03D]" />,
    Users: <Users className="w-4 h-4 text-[#D4A03D]" />,
    CreditCard: <CreditCard className="w-4 h-4 text-[#D4A03D]" />,
    HelpCircle: <HelpCircle className="w-4 h-4 text-[#D4A03D]" />,
  };

  return (
    <section id="faq" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-[#E2E8F0] bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left Column: Directory & Contact */}
          <div className="lg:col-span-5 space-y-5">
            <SectionHeading
              tag="06 • DIRECTORY"
              pre="QUESTIONS? LET'S"
              accent="TALK"
              post="ABOUT THE NIGHT"
              subtitle="Have inquiries regarding payment verification, table reservations, or batch invitations? Contact Computer Cell (CC)."
              className="mb-4"
            />

            {/* Stacked Directory Items */}
            <div className="rounded-2xl bg-white border border-[#E2E8F0] divide-y divide-[#F1F5F9] overflow-hidden shadow-sm">
              {EVENT_CONFIG.contactRows.map((row) => (
                <div
                  key={row.id}
                  className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#FEF9EE] border border-[#D4A03D]/40 flex items-center justify-center shrink-0">
                      {iconMap[row.icon] || <HelpCircle className="w-4 h-4 text-[#D4A03D]" />}
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-display font-bold text-xs sm:text-sm text-[#0B253A] truncate">
                        {row.title}
                      </h4>
                      <p className="text-[11px] text-[#64748B] truncate max-w-[210px] sm:max-w-xs mt-0.5">
                        {row.detail}
                      </p>
                    </div>
                  </div>

                  <a
                    href={row.actionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full border border-[#E2E8F0] hover:border-[#D4A03D] text-[#64748B] hover:text-[#D4A03D] transition-colors shrink-0"
                    title={row.title}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Minimalist FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3 pt-2 lg:pt-8">
            <h3 className="font-display font-bold text-sm sm:text-base text-[#0B253A] uppercase mb-3 tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4A03D]" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </h3>

            <div className="rounded-2xl bg-white border border-[#E2E8F0] divide-y divide-[#F1F5F9] overflow-hidden shadow-sm">
              {EVENT_CONFIG.faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="p-4 hover:bg-slate-50/70 transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full text-left flex items-center justify-between gap-4 font-display font-bold text-xs sm:text-sm text-[#0B253A] hover:text-[#D4A03D] transition-colors focus:outline-none cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <div
                        className={`w-5 h-5 rounded-full border border-[#E2E8F0] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 border-[#D4A03D] text-[#D4A03D]" : "text-[#94A3B8]"
                        }`}
                      >
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="mt-2.5 pt-2 border-t border-[#F1F5F9] text-xs text-[#64748B] leading-relaxed font-normal animate-in fade-in duration-150">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
