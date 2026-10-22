"use client";

import React from "react";
import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { EVENT_CONFIG } from "@/config/event";

export function HighlightsSection() {
  return (
    <section id="highlights" className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="02 • CURATED EXPERIENCES"
          pre="HIGHLIGHTS OF THE"
          accent="NIGHT"
          post=""
          subtitle="Explore the culinary feasts, live performances, and departmental ceremonies designed for an unforgettable evening in Peshawar."
        />

        {/* 6 Numbered Editorial Cards Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {EVENT_CONFIG.highlights.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#262626] bg-[#121212] hover:border-[#B4F23D]/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* 📸 CARD IMAGE SLOT */}
              <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-black">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-85"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/30 to-transparent" />

                {/* Top Numbered Tag */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-black bg-[#B4F23D] px-2.5 py-0.5 rounded-full">
                    {item.number}
                  </span>
                  {item.badge && (
                    <span className="font-mono text-[11px] text-white/80 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/15">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Text Content */}
              <div className="p-5 sm:p-6 space-y-2">
                <h3 className="font-display font-black text-lg sm:text-xl text-white group-hover:text-[#B4F23D] transition-colors uppercase leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-normal leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
