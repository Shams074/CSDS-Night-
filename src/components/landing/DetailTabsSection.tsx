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
    { id: "food", label: "Peshawari Dawat", icon: Utensils },
    { id: "music", label: "Concert & Attan", icon: Music2 },
    { id: "activities", label: "Activities & Awards", icon: PartyPopper },
  ] as const;

  const currentCards = EVENT_CONFIG.detailTabs[activeTab] || [];

  return (
    <section id="details" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F1F0DC]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="Evening Elements"
          pre="Feast, Melodies &"
          accent="Moments"
          post=""
          subtitle="Explore the flavors, folk tunes, and student entertainment planned for the night."
        />

        {/* Segmented Pill Group inside an Outlined Pill */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-white border-2 border-[#111111] shadow-hard">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-[#0F3D2B] text-white shadow-sm"
                      : "bg-transparent text-[#111111] hover:text-[#0F3D2B]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Card Row Swapping Based on Active Tab */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {currentCards.map((card, idx) => (
            <div
              key={`${activeTab}-${idx}`}
              className="group rounded-[22px] sm:rounded-[24px] overflow-hidden border-2 border-[#111111] shadow-hard hover:shadow-hard-lg hover:-translate-y-1 transition-all bg-white flex flex-col"
            >
              {/* Card Image */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden border-b-2 border-[#111111]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3.5 right-3.5">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#A3B565] text-[#0F3D2B] border-2 border-[#111111] shadow-hard-xs">
                    {card.tag}
                  </span>
                </div>
              </div>

              {/* Card Text Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-xl text-[#0F3D2B] group-hover:text-[#D94A3F] transition-colors leading-snug">
                    {card.title}
                  </h4>
                  <p className="mt-2 text-sm text-[#111111]/75 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
