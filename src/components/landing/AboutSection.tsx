import React from "react";
import Image from "next/image";
import { PillButton } from "../ui/PillButton";
import { EVENT_CONFIG } from "@/config/event";
import { Coffee, Music, Award, ShieldCheck, ArrowUpRight } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column: 📸 PHOTO SLOT (matching reference image bottom layout) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative h-[340px] sm:h-[420px] md:h-[480px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#262626] bg-[#121212] group">
              <Image
                src={EVENT_CONFIG.images.about}
                alt="CSDS Department Gathering"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Minimal floating caption */}
              <div className="absolute bottom-5 left-5 right-5 text-xs text-gray-300 font-mono">
                <span className="text-[#B4F23D] font-bold block mb-1">
                  [ PHOTO SLOT: BATCH CELEBRATION ]
                </span>
                <span>Swap this image anytime in src/config/event.ts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Typography matching reference layout */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="font-mono text-xs font-semibold text-[#B4F23D] tracking-widest uppercase">
              [ 01 • THE VISION ]
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-tight">
              THE ROOM COMES FIRST — THEN THE CELEBRATION.
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-body font-normal">
              Every year, the Department of Computer Science & Data Science steps
              away from compilers, debuggers, and deadlines to celebrate two milestone moments: welcoming the new batch of innovators and sending off our graduating seniors with honor.
            </p>

            <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-body font-normal">
              Held in the heart of Peshawar with centuries of Pakhtun hospitality, this night brings together students across all semesters for an alcohol-free, culture-infused evening of music, dining, and memories.
            </p>

            {/* Feature Badges in 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#121212] border border-[#262626] flex items-start gap-3">
                <Coffee className="w-5 h-5 text-[#B4F23D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-xs uppercase text-white">
                    100% Alcohol-Free
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Authentic Peshawari kahwa bar, spiced chai, and mocktails.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#121212] border border-[#262626] flex items-start gap-3">
                <Music className="w-5 h-5 text-[#B4F23D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-xs uppercase text-white">
                    Live Folk Rubab
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Traditional Pashto strings & student indie band performances.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#121212] border border-[#262626] flex items-start gap-3">
                <Award className="w-5 h-5 text-[#B4F23D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-xs uppercase text-white">
                    Farewell Honors
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Department shields, batch titles, and senior tributes.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#121212] border border-[#262626] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#B4F23D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-xs uppercase text-white">
                    All-Inclusive Pass
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Rs. 2,200 covers dinner, concert, awards & photo prints.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <PillButton
                variant="outline"
                size="md"
                href="/register"
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                BOOK YOUR PASS NOW
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
