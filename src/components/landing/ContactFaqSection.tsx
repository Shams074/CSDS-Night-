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
    MapPin: <MapPin className="w-4 h-4 text-[#B4F23D]" />,
    Users: <Users className="w-4 h-4 text-[#B4F23D]" />,
    CreditCard: <CreditCard className="w-4 h-4 text-[#B4F23D]" />,
    HelpCircle: <HelpCircle className="w-4 h-4 text-[#B4F23D]" />,
  };

  return (
    <section id="faq" className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left Column: Directory & Contact (Matching "'S TALK ABOUT YOUR PROJECT!" from reference) */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              tag="06 • DIRECTORY"
              pre="QUESTIONS? LET'S"
              accent="TALK"
              post="ABOUT THE NIGHT"
              subtitle="Have inquiries regarding payment verification, table reservations, or batch invitations? Contact the organizing committee."
              className="mb-6"
            />

            {/* Stacked Directory Items */}
            <div className="rounded-2xl sm:rounded-3xl bg-[#121212] border border-[#262626] divide-y divide-[#1f1f1f] overflow-hidden">
              {EVENT_CONFIG.contactRows.map((row) => (
                <div
                  key={row.id}
                  className="p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-[#181818] transition-colors"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#1b2210] border border-[#B4F23D]/30 flex items-center justify-center shrink-0">
                      {iconMap[row.icon] || <HelpCircle className="w-4 h-4 text-[#B4F23D]" />}
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-display font-bold text-sm text-white truncate">
                        {row.title}
                      </h4>
                      <p className="text-xs text-gray-400 truncate max-w-[210px] sm:max-w-xs mt-0.5">
                        {row.detail}
                      </p>
                    </div>
                  </div>

                  <a
                    href={row.actionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-white/20 hover:border-[#B4F23D] text-gray-400 hover:text-[#B4F23D] transition-colors shrink-0"
                    title={row.title}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Minimalist FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3 pt-2 lg:pt-14">
            <h3 className="font-display font-black text-xl text-white uppercase mb-4 tracking-wider">
              [ ANSWERS & POLICIES ]
            </h3>

            <div className="rounded-2xl sm:rounded-3xl bg-[#121212] border border-[#262626] divide-y divide-[#1f1f1f] overflow-hidden">
              {EVENT_CONFIG.faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="p-4 sm:p-5 hover:bg-[#161616] transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full text-left flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base text-white hover:text-[#B4F23D] transition-colors focus:outline-none"
                    >
                      <span>{faq.question}</span>
                      <div
                        className={`w-6 h-6 rounded-full border border-white/20 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 border-[#B4F23D] text-[#B4F23D]" : "text-gray-400"
                        }`}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="mt-3 text-xs sm:text-sm text-gray-400 font-normal leading-relaxed pr-6 animate-in fade-in duration-150">
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
