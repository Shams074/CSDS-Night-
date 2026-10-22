"use client";

import React from "react";
import Image from "next/image";
import { PillButton } from "../ui/PillButton";
import { CountdownTimer } from "./CountdownTimer";
import { EVENT_CONFIG } from "@/config/event";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="relative px-3 sm:px-6 lg:px-8 pt-2 pb-12 sm:pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Full-bleed cinematic hero container matching reference design */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#262626] bg-[#0c0c0c] min-h-[580px] sm:min-h-[660px] md:min-h-[720px] flex flex-col justify-between p-6 sm:p-10 md:p-14">
          {/* 📸 HERO PHOTO SLOT (Easily swapped in src/config/event.ts) */}
          <Image
            src={EVENT_CONFIG.images.hero}
            alt="CSDS Peshawar Welcome & Farewell Night"
            fill
            priority
            className="object-cover object-center opacity-45"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />

          {/* Vignette overlays for high-contrast typography */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/70" />

          {/* Top Row: Department Info & Venue Pill */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[#B4F23D] tracking-widest uppercase font-bold">
                [ PESHAWAR • NOV 14, 2026 ]
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-300 font-mono text-[11px]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#B4F23D]" />
                {EVENT_CONFIG.venue}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#B4F23D]" />
                {EVENT_CONFIG.time}
              </span>
            </div>
          </div>

          {/* Middle & Main Typography Section (Matching reference design layout) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto py-8">
            {/* Left Big Accent Statement (matching "FREQUENCY BECOMES CULTURE") */}
            <div className="lg:col-span-7">
              <span className="font-mono text-xs font-semibold text-gray-400 tracking-widest block uppercase mb-2">
                Department of Computer Science & Data Science
              </span>
              <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-[#B4F23D] uppercase">
                TRADITION <br />
                BECOMES <br />
                LEGACY.
              </h1>
            </div>

            {/* Right Condensed Title & Paragraph (matching "ONE SYSTEM FOR ARTISTS...") */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase leading-tight">
                ONE NIGHT FOR FRESHERS, SENIORS AND SOUND.
              </h2>

              <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed max-w-md">
                We curate nights, honor graduating talent, and welcome the newest
                innovators of CSDS with royal Shinwari dawat, live rubab strings, and the grand Attan dance.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <PillButton
                  variant="outline"
                  size="md"
                  href="/register"
                  icon={<ArrowUpRight className="w-4 h-4" />}
                >
                  ENTER THE NIGHT
                </PillButton>

                <PillButton
                  variant="primary"
                  size="md"
                  href="#fee"
                >
                  FEE: RS. 2,200
                </PillButton>
              </div>
            </div>
          </div>

          {/* Bottom Countdown & Live Indicators */}
          <div className="relative z-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400 block mb-2">
                DOORS OPEN IN:
              </span>
              <CountdownTimer targetDate={EVENT_CONFIG.countdownTarget} />
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
              <span className="w-2 h-2 rounded-full bg-[#B4F23D] animate-ping" />
              <span>LIMITED TO 350 ATTENDEES ONLY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
