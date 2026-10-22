"use client";

import React from "react";
import Image from "next/image";
import { PillButton } from "../ui/PillButton";
import { CountdownTimer } from "./CountdownTimer";
import { EVENT_CONFIG } from "@/config/event";
import { Calendar, MapPin, Sparkles, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="px-3 sm:px-6 lg:px-8 pt-4 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Full-width rounded photo container with dark overlay */}
        <div className="relative rounded-[26px] sm:rounded-[32px] overflow-hidden border-2 border-[#111111] shadow-hard-lg min-h-[580px] sm:min-h-[640px] md:min-h-[700px] flex items-center">
          {/* Background Image - Peshawar Heritage Architecture */}
          <Image
            src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1920&q=85"
            alt="CSDS Peshawar Welcome Party & Farewell Night Venue"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />

          {/* Dark gradient overlay for contrast and depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Hero Content aligned to the left */}
          <div className="relative z-10 w-full p-6 sm:p-10 md:p-14 lg:p-16 max-w-3xl">
            {/* Pill Badge above headline */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#111111] shadow-hard-xs mb-5 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D94A3F] animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-[#0F3D2B] tracking-wide">
                Peshawar • {EVENT_CONFIG.date} • Limited {EVENT_CONFIG.seatCapacity} Seats
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D94A3F]" />
            </div>

            {/* Large White Serif Headline */}
            <h1 className="font-serif font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.08] drop-shadow-md">
              Peshawar Nights. <br />
              <span className="text-[#A3B565] italic font-serif">Honoring Seniors,</span> <br />
              Welcoming Freshers.
            </h1>

            {/* Tagline / Subtitle */}
            <p className="mt-5 text-base sm:text-lg md:text-xl text-white/90 font-normal leading-relaxed max-w-xl drop-shadow">
              The Department of Computer Science & Data Science invites you to an
              unforgettable evening of royal Peshawari dawat, live folk rubab, attan, and farewell honors.
            </p>

            {/* Quick Venue & Fee summary */}
            <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-white/80 font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#A3B565]" />
                <span>{EVENT_CONFIG.venue}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#A3B565]" />
                <span>{EVENT_CONFIG.time}</span>
              </div>
            </div>

            {/* Two Action Buttons below headline */}
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <PillButton
                variant="primary"
                size="lg"
                href="/register"
                icon={<Sparkles className="w-4 h-4" />}
                iconPosition="right"
              >
                Register Now — Rs. 2,200
              </PillButton>
              <PillButton variant="secondary" size="lg" href="#schedule">
                View Schedule
              </PillButton>
            </div>

            {/* Live Countdown Timer */}
            <div className="mt-9 sm:mt-11 pt-6 border-t border-white/20">
              <span className="text-xs font-bold uppercase tracking-widest text-white/70 block mb-3">
                Celebration Commences In
              </span>
              <CountdownTimer targetDate={EVENT_CONFIG.countdownTarget} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
