"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { PillButton } from "../ui/PillButton";
import { EVENT_CONFIG } from "@/config/event";
import { Clock, Calendar, X, ArrowUpRight } from "lucide-react";

export function ScheduleSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="schedule" className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <SectionHeading
            tag="04 • THE TIMELINE"
            pre="EVENING"
            accent="SCHEDULE"
            post="& PHASES"
            subtitle="Three distinct phases marking the grand arrival, the musical dawat, and the farewell ceremony."
            className="mb-0 sm:mb-0"
          />

          <PillButton
            variant="outline"
            size="sm"
            onClick={() => setModalOpen(true)}
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            className="self-start md:self-auto shrink-0"
          >
            Full Timeline
          </PillButton>
        </div>

        {/* 3 Tall Poster Cards with 📸 Photo Slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {EVENT_CONFIG.schedulePosters.map((poster) => (
            <div
              key={poster.id}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#262626] bg-[#0c0c0c] hover:border-[#B4F23D]/50 transition-all p-6 sm:p-8 flex flex-col justify-between min-h-[420px] sm:min-h-[460px]"
            >
              {/* Photo Background */}
              <Image
                src={poster.image}
                alt={poster.title}
                fill
                className="object-cover object-center opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

              {/* Top Header Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#B4F23D]">
                  {poster.phase}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-gray-400 bg-black/60 px-2.5 py-0.5 rounded-full border border-white/10">
                  {poster.category}
                </span>
              </div>

              {/* Bottom Info */}
              <div className="relative z-10 space-y-3 pt-20">
                <div className="flex items-center gap-1.5 font-mono text-xs text-[#B4F23D]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{poster.time}</span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-tight group-hover:text-[#B4F23D] transition-colors">
                  {poster.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed">
                  {poster.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Full Schedule Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl bg-[#121212] text-[#EDEDED] rounded-2xl sm:rounded-3xl border border-[#262626] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full border border-white/20 hover:border-[#B4F23D] text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-[#B4F23D] font-bold">
                  [ OFFICIAL PROGRAMME ]
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {EVENT_CONFIG.date}
                </span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase mb-2">
                EVENING TIMELINE
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-6">
                Gates open at 5:30 PM. Please arrive with your digital QR entry pass and student CNIC.
              </p>

              {/* Timeline list */}
              <div className="space-y-3 border-l border-[#262626] pl-4 sm:pl-6 ml-2">
                {EVENT_CONFIG.fullSchedule.map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[21px] sm:-left-[29px] top-1.5 w-2 h-2 rounded-full bg-[#B4F23D]" />
                    <div className="bg-[#171717] p-3 rounded-xl border border-[#242424]">
                      <span className="font-mono text-xs font-bold text-[#B4F23D] block mb-0.5">
                        {item.time}
                      </span>
                      <h4 className="font-display font-semibold text-sm text-white">
                        {item.event}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-[#262626] flex items-center justify-between">
                <span className="text-xs text-gray-400 font-mono">
                  Venue: {EVENT_CONFIG.venue}
                </span>
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
