"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { PillButton } from "../ui/PillButton";
import { EVENT_CONFIG } from "@/config/event";
import { Clock, Calendar, Sparkles, X } from "lucide-react";

export function ScheduleSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="schedule" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0F3D2B] text-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="Timeline of the Night"
          pre="An Unfolding"
          accent="Symphony"
          post="of Celebration"
          subtitle="Three distinct acts marking the arrival, the concert & feast, and the emotional farewell finale."
          theme="forest"
        />

        {/* Row of Three Tall Poster-Style Cards with dark photographic backgrounds and truck art border */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {EVENT_CONFIG.schedulePosters.map((poster) => (
            <div
              key={poster.id}
              className="group relative rounded-[24px] overflow-hidden border-2 border-white/30 shadow-hard-lg bg-black flex flex-col justify-between min-h-[440px] sm:min-h-[480px] p-6 sm:p-7"
            >
              {/* Background Photographic Layer with dark mood */}
              <Image
                src={poster.image}
                alt={poster.title}
                fill
                className="object-cover object-center opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Truck-Art Pattern Accent Frame (thin decorative border) */}
              <div className="absolute inset-2 rounded-[18px] border-2 border-dashed border-[#A3B565]/40 pointer-events-none" />

              {/* Top Header: Phase & Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#A3B565] bg-black/60 px-3 py-1 rounded-full border border-white/20">
                  {poster.period}
                </span>
                <span className="text-xs font-serif italic text-white/70">
                  {poster.category}
                </span>
              </div>

              {/* Middle & Bottom: Big Bold Poster Title + Time + Description */}
              <div className="relative z-10 space-y-3 pt-24">
                <div className="flex items-center gap-2 text-xs font-bold text-[#A3B565] bg-black/70 w-fit px-3 py-1 rounded-full border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-[#D94A3F]" />
                  <span>{poster.time}</span>
                </div>

                <h3 className="font-poster font-black text-3xl sm:text-4xl text-white tracking-wider uppercase leading-none drop-shadow-md">
                  {poster.title}
                </h3>

                <p className="text-sm text-white/85 font-normal leading-relaxed">
                  {poster.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Small "See full schedule" outlined button centered under row */}
        <div className="mt-12 text-center">
          <PillButton
            variant="secondary"
            size="md"
            onClick={() => setModalOpen(true)}
            icon={<Calendar className="w-4 h-4" />}
          >
            See Full Evening Schedule
          </PillButton>
        </div>

        {/* Full Schedule Modal Dialog */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl bg-[#F1F0DC] text-[#111111] rounded-[26px] border-2 border-[#111111] shadow-hard-lg p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full border-2 border-[#111111] bg-white text-[#111111] hover:bg-gray-100 shadow-hard-xs transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0F3D2B] text-white">
                  Event Programme
                </span>
                <span className="text-xs font-semibold text-[#D94A3F]">
                  {EVENT_CONFIG.date}
                </span>
              </div>

              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#0F3D2B] mb-2">
                Official Programme & Timeline
              </h3>
              <p className="text-sm text-[#111111]/70 mb-6">
                Gates open at 5:30 PM. Please arrive promptly with your digital entry pass and CNIC.
              </p>

              {/* Timeline Items */}
              <div className="space-y-4 border-l-2 border-[#0F3D2B] pl-4 sm:pl-6 ml-2 sm:ml-3">
                {EVENT_CONFIG.fullSchedule.map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[23px] sm:-left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#D94A3F] border-2 border-[#111111]" />
                    <div className="bg-white p-3.5 rounded-xl border-2 border-[#111111] shadow-hard-xs">
                      <span className="text-xs font-bold text-[#0F3D2B] tracking-wider block mb-0.5">
                        {item.time}
                      </span>
                      <h4 className="font-serif font-bold text-base text-[#111111]">
                        {item.event}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t-2 border-[#111111]/20 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0F3D2B]">
                  <Sparkles className="w-4 h-4 text-[#D94A3F]" />
                  <span>Grand Marquee, University Town</span>
                </div>
                <PillButton
                  variant="primary"
                  size="sm"
                  href="/register"
                  onClick={() => setModalOpen(false)}
                >
                  Register Now
                </PillButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
