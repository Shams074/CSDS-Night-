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
    <section id="details" className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <SectionHeading
            tag="03 • PROGRAMME ELEMENTS"
            pre="FEAST, MELODIES &"
            accent="MOMENTS"
            post=""
            subtitle="Switch between the authentic Peshawari dishes, musical performances, and batch awards planned for the night."
            className="mb-0 sm:mb-0"
          />

          {/* Minimalist Switcher Pills */}
          <div className="inline-flex p-1 rounded-full bg-[#121212] border border-[#262626] self-start md:self-auto shrink-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-full font-display text-xs font-bold tracking-wider uppercase transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-[#B4F23D] text-black shadow-sm"
                      : "text-gray-400 hover:text-white"
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
              className="group rounded-2xl sm:rounded-3xl overflow-hidden border border-[#262626] bg-[#121212] hover:border-[#B4F23D]/50 transition-all flex flex-col justify-between"
            >
              {/* Card Image */}
              <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-black">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-75 group-hover:opacity-90"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/20 to-transparent" />
                <div className="absolute top-3.5 right-3.5">
                  <span className="font-mono text-[10px] uppercase font-bold text-black bg-[#B4F23D] px-2.5 py-0.5 rounded-full">
                    {card.tag}
                  </span>
                </div>
              </div>

              {/* Card Description */}
              <div className="p-5 sm:p-6 space-y-2">
                <h4 className="font-display font-bold text-lg text-white group-hover:text-[#B4F23D] transition-colors leading-snug">
                  {card.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-400 font-normal leading-relaxed">
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
