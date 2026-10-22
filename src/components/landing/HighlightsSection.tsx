"use client";

import React from "react";
import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { EVENT_CONFIG } from "@/config/event";

export function HighlightsSection() {
  return (
    <section id="highlights" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-[#E2E8F0] bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="02 • CURATED EXPERIENCES"
          pre="HIGHLIGHTS OF THE"
          accent="NIGHT"
          post=""
          subtitle="Explore the culinary feasts, live performances, and departmental ceremonies designed by Computer Cell (CC) for an unforgettable evening at UET Civil Lawn."
        />

        {/* 6 Numbered Editorial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {EVENT_CONFIG.highlights.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white hover:border-[#D4A03D] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* 📸 CARD IMAGE SLOT */}
              <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30" />

                {/* Top Numbered Tag & Category Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                  <span className="font-mono text-[11px] font-bold text-white bg-[#0B253A] px-2.5 py-0.5 rounded-full shadow-sm">
                    {item.number}
                  </span>
                  {item.badge && (
                    <span className="font-mono text-[10px] font-semibold text-[#0B253A] bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full border border-[#E2E8F0] shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Text Content with compact typography */}
              <div className="p-4 sm:p-5 space-y-1.5">
                <h3 className="font-display font-bold text-sm sm:text-base text-[#0B253A] group-hover:text-[#D4A03D] transition-colors uppercase leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#64748B] font-normal leading-relaxed">
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
