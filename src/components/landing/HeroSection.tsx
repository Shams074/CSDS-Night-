"use client";

import React from "react";
import Image from "next/image";
import { PillButton } from "../ui/PillButton";
import { CountdownTimer } from "./CountdownTimer";
import { EVENT_CONFIG } from "@/config/event";
import { ArrowUpRight, Calendar, MapPin, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="relative px-3 sm:px-6 lg:px-8 pt-3 pb-10 sm:pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Full-bleed hero container with CC Navy & Gold accent styling */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E2E8F0] bg-[#0B253A] min-h-[500px] sm:min-h-[560px] md:min-h-[600px] flex flex-col justify-between p-6 sm:p-8 md:p-12 shadow-minimal">
          {/* 📸 HERO PHOTO SLOT */}
          <Image
            src={EVENT_CONFIG.images.hero}
            alt="CSDS Peshawar Welcome & Farewell Night"
            fill
            priority
            className="object-cover object-center opacity-35"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />

          {/* Navy & Gold gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B253A] via-[#0B253A]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B253A]/90 via-transparent to-[#0B253A]/80" />

          {/* Top Row: CC Badge, Date, Venue */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A03D]/20 border border-[#D4A03D]/50 text-[#D4A03D] font-mono text-[11px] font-bold tracking-wider uppercase">
                <Sparkles className="w-3 h-3 text-[#D4A03D]" />
                ARRANGED BY COMPUTER CELL (CC) • UET
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-300 font-mono text-[11px]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4A03D]" />
                {EVENT_CONFIG.venue}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4A03D]" />
                {EVENT_CONFIG.date}
              </span>
            </div>
          </div>

          {/* Middle Main Content with refined, compact text scale */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end my-auto py-6">
            {/* Left Big Accent Statement */}
            <div className="lg:col-span-7">
              <span className="font-mono text-xs font-semibold text-slate-300 tracking-widest block uppercase mb-1.5">
                Department of Computer Science & Data Science
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-white uppercase">
                TRADITION <br />
                BECOMES <br />
                <span className="text-[#D4A03D]">LEGACY.</span>
              </h1>
            </div>

            {/* Right Condensed Title & Paragraph */}
            <div className="lg:col-span-5 space-y-3.5">
              <h2 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-white tracking-tight uppercase leading-snug">
                ONE NIGHT FOR FRESHERS, SENIORS AND SOUND.
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-md">
                Organized by Computer Cell (CC) at Civil Lawn, UET Peshawar. Celebrating the graduating seniors and warmly welcoming our new batch with royal dinner, live concert, and traditional Attan.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-2.5">
                <PillButton
                  variant="gold"
                  size="md"
                  href="/register"
                  icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                >
                  GET ENTRY PASS
                </PillButton>

                <PillButton
                  variant="outline"
                  size="md"
                  href="#fee"
                  className="text-white border-white/30 hover:border-[#D4A03D] hover:text-[#D4A03D] hover:bg-white/5"
                >
                  FEE: RS. 2,200
                </PillButton>
              </div>
            </div>
          </div>

          {/* Bottom Countdown & Indicators */}
          <div className="relative z-10 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-slate-300 block mb-1.5">
                TIME REMAINING UNTIL GATES OPEN AT CIVIL LAWN
              </span>
              <CountdownTimer targetDate={EVENT_CONFIG.countdownTarget} />
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D4A03D] animate-ping" />
                <span className="text-white font-bold tracking-wider">LIMITED PASSES</span>
              </div>
              <span>•</span>
              <span>CAPACITY: {EVENT_CONFIG.seatCapacity} SEATS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
