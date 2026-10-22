"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { EVENT_CONFIG } from "@/config/event";
import { Utensils, Music2, PartyPopper } from "lucide-react";

export function DetailTabsSection() {
  const [activeTab, setActiveTab] = useState<"food" | "music" | "activities">(
    "food"
  );

  const tabs = [
    { id: "food", label: "FEAST & DINING", icon: Utensils },
    { id: "music", label: "CONCERT & ATTAN", icon: Music2 },
    { id: "activities", label: "ROAST & AWARDS", icon: PartyPopper },
  ] as const;

  const currentCards = EVENT_CONFIG.detailTabs[activeTab] || [];

  return (
    <section id="details" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-[#E2E8F0] bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <SectionHeading
            tag="03 • PROGRAMME ELEMENTS"
            pre="FEAST, MELODIES &"
            accent="MOMENTS"
            post=""
            subtitle="Switch between the authentic Peshawari dishes, musical performances, and batch awards planned for the night."
            className="mb-0 sm:mb-0"
          />

          {/* Minimalist Switcher Pills */}
          <div className="inline-flex p-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] self-start md:self-auto shrink-0 shadow-inner">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full font-display text-[11px] font-bold tracking-wider uppercase transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-[#0B253A] text-white shadow-sm"
                      : "text-[#64748B] hover:text-[#0B253A]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Card Row with 📸 Photo Slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {currentCards.map((card, idx) => (
            <div
              key={`${activeTab}-${idx}`}
              className="group rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white hover:border-[#D4A03D] hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Card Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#0B253A] bg-[#D4A03D] px-2.5 py-0.5 rounded-full shadow-sm">
                    {card.tag}
                  </span>
                </div>
              </div>

              {/* Card Description */}
              <div className="p-4 sm:p-5 space-y-1.5">
                <h4 className="font-display font-bold text-sm sm:text-base text-[#0B253A] group-hover:text-[#D4A03D] transition-colors leading-snug">
                  {card.title}
                </h4>
                <p className="text-xs text-[#64748B] font-normal leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
