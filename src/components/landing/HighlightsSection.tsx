"use client";

import React from "react";
import Image from "next/image";
import { WaveDivider } from "../ui/WaveDivider";
import { SectionHeading } from "../ui/SectionHeading";
import { EVENT_CONFIG } from "@/config/event";

export function HighlightsSection() {
  return (
    <section id="highlights" className="relative bg-[#A3B565] pt-0 pb-16 sm:pb-24">
      {/* Wave top edge transitioning from cream into sage */}
      <WaveDivider fillColor="#A3B565" bgColor="#F1F0DC" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Centered heading with coral accent word */}
        <SectionHeading
          tag="Curated Experience"
          pre="Why CSDS Night Hits"
          accent="Different"
          post=""
          subtitle="Step into a rich evening where Pakhtun hospitality meets culinary mastery, folk strings, and celebration."
          theme="sage"
        />

        {/* Grid of rounded image cards: 4 columns on desktop, 2 on tablet and mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {EVENT_CONFIG.highlights.map((item, index) => (
            <div
              key={item.id}
              className={`group relative rounded-[22px] sm:rounded-[24px] overflow-hidden border-2 border-[#111111] shadow-hard transition-all duration-200 hover:-translate-y-1 hover:shadow-hard-lg bg-black ${
                index >= 4 ? "lg:col-span-2" : ""
              }`}
            >
              {/* Card Image */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

                {/* Top Badge */}
                {item.badge && (
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/95 text-[#0F3D2B] border-2 border-[#111111] shadow-hard-xs">
                      {item.badge}
                    </span>
                  </div>
                )}

                {/* Bottom Overlay Title & Description */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                  <h3 className="font-serif font-bold text-lg sm:text-xl leading-tight group-hover:text-[#A3B565] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-white/85 line-clamp-2 font-normal leading-snug">
                    {item.subtitle}
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
