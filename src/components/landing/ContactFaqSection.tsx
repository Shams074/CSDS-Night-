"use client";

import React, { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { PillButton } from "../ui/PillButton";
import { CardContainer } from "../ui/CardContainer";
import { EVENT_CONFIG } from "@/config/event";
import {
  MapPin,
  Users,
  CreditCard,
  HelpCircle,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

export function ContactFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const iconMap: Record<string, React.ReactNode> = {
    MapPin: <MapPin className="w-5 h-5 text-[#0F3D2B]" />,
    Users: <Users className="w-5 h-5 text-[#0F3D2B]" />,
    CreditCard: <CreditCard className="w-5 h-5 text-[#0F3D2B]" />,
    HelpCircle: <HelpCircle className="w-5 h-5 text-[#0F3D2B]" />,
  };

  return (
    <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F1F0DC]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="Information & Support"
          pre="Frequently Asked"
          accent="Questions"
          post="& Contacts"
          subtitle="Everything you need to know about payments, dress code, venue logistics, and departmental registration."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* Left Column (5 cols): Stacked Outlined Rows Panel (Exact Reference Design Component) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif font-bold text-2xl text-[#0F3D2B] mb-3">
              Event Directory
            </h3>

            {/* Rounded Outlined Container with Thin Black Outline & Offset Shadow */}
            <CardContainer
              variant="white"
              className="p-2 sm:p-3 overflow-hidden divide-y-2 divide-[#111111]/15"
            >
              {EVENT_CONFIG.contactRows.map((row) => (
                <div
                  key={row.id}
                  className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-[#FAF9F0] transition-colors rounded-xl"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Small circular icon container */}
                    <div className="w-10 h-10 rounded-full bg-[#A3B565] border-2 border-[#111111] shadow-hard-xs flex items-center justify-center shrink-0">
                      {iconMap[row.icon] || <HelpCircle className="w-5 h-5" />}
                    </div>

                    {/* Bold title + one-line detail */}
                    <div className="min-w-0">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#111111] truncate">
                        {row.title}
                      </h4>
                      <p className="text-xs text-[#111111]/70 truncate max-w-[210px] sm:max-w-xs mt-0.5 font-normal">
                        {row.detail}
                      </p>
                    </div>
                  </div>

                  {/* Pill button on right */}
                  <div className="shrink-0">
                    <PillButton
                      variant="secondary"
                      size="sm"
                      href={row.actionHref}
                      external
                      icon={<ExternalLink className="w-3 h-3" />}
                      iconPosition="right"
                    >
                      {row.actionText}
                    </PillButton>
                  </div>
                </div>
              ))}
            </CardContainer>

            {/* Quick Note Card */}
            <div className="p-4 rounded-[20px] bg-[#A3B565]/20 border-2 border-[#111111] shadow-hard-xs">
              <span className="text-xs font-bold text-[#0F3D2B] block uppercase tracking-wider mb-1">
                Student Help Desk
              </span>
              <p className="text-xs text-[#111111]/80 leading-relaxed font-normal">
                Facing an issue uploading your receipt or need special dietary accommodations? Contact the CSDS Student Society help desk directly on WhatsApp.
              </p>
            </div>
          </div>

          {/* Right Column (7 cols): FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif font-bold text-2xl text-[#0F3D2B] mb-3">
              Answers & Guidelines
            </h3>

            <CardContainer
              variant="white"
              className="p-2 sm:p-3 overflow-hidden divide-y-2 divide-[#111111]/15"
            >
              {EVENT_CONFIG.faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="p-3.5 sm:p-4 hover:bg-[#FAF9F0] transition-colors rounded-xl"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full text-left flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-[#111111] hover:text-[#0F3D2B] transition-colors focus:outline-none"
                    >
                      <span>{faq.question}</span>
                      <div
                        className={`w-7 h-7 rounded-full border-2 border-[#111111] bg-[#F1F0DC] flex items-center justify-center shrink-0 transition-transform duration-200 shadow-hard-xs ${
                          isOpen ? "rotate-180 bg-[#A3B565]" : ""
                        }`}
                      >
                        <ChevronDown className="w-4 h-4 text-[#0F3D2B]" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="mt-3 text-sm text-[#111111]/80 font-normal leading-relaxed pr-6 animate-in fade-in duration-150">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
