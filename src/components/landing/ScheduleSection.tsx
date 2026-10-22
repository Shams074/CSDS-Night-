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
    <section id="schedule" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-[#E2E8F0] bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <SectionHeading
            tag="04 • THE TIMELINE"
            pre="EVENING"
            accent="SCHEDULE"
            post="& PHASES"
            subtitle="Three distinct phases marking the grand arrival at Civil Lawn, the musical dawat, and the farewell ceremony."
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
              className="group relative rounded-2xl overflow-hidden border border-[#0B253A] bg-[#0B253A] hover:border-[#D4A03D] hover:shadow-lg transition-all p-5 sm:p-7 flex flex-col justify-between min-h-[380px] sm:min-h-[420px]"
            >
              {/* Photo Background */}
              <Image
                src={poster.image}
                alt={poster.title}
                fill
                className="object-cover object-center opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B253A] via-[#0B253A]/70 to-[#0B253A]/30" />

              {/* Top Header Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#D4A03D]">
                  {poster.phase}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-300 bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
                  {poster.category}
                </span>
              </div>

              {/* Bottom Info with compact typography */}
              <div className="relative z-10 space-y-2 pt-16">
                <div className="flex items-center gap-1.5 font-mono text-xs text-[#D4A03D]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{poster.time}</span>
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight uppercase leading-snug group-hover:text-[#D4A03D] transition-colors">
                  {poster.title}
                </h3>

                <p className="text-xs text-slate-300 font-normal leading-relaxed">
                  {poster.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Full Schedule Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-xl bg-white text-[#0B253A] rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full border border-[#E2E8F0] hover:border-[#0B253A] text-[#64748B] hover:text-[#0B253A] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs text-[#D4A03D] font-bold">
                  [ OFFICIAL PROGRAMME ]
                </span>
                <span className="text-xs text-[#64748B] font-mono">
                  {EVENT_CONFIG.date} • Civil Lawn
                </span>
              </div>

              <h3 className="font-display font-bold text-xl uppercase mb-5 text-[#0B253A]">
                EVENING TIMELINE
              </h3>

              <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E2E8F0]">
                {EVENT_CONFIG.fullSchedule.map((item, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 pl-8 group">
                    <div className="absolute left-2.5 top-1.5 w-2 h-2 rounded-full bg-[#D4A03D] border-2 border-white shadow-sm" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 w-full">
                      <span className="font-mono text-xs font-bold text-[#D4A03D] shrink-0">
                        {item.time}
                      </span>
                      <span className="text-xs sm:text-sm text-[#0B253A] font-medium leading-relaxed">
                        {item.event}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex justify-end">
                <PillButton
                  variant="primary"
                  size="sm"
                  onClick={() => setModalOpen(false)}
                >
                  Close Schedule
                </PillButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
