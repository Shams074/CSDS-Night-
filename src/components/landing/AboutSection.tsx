import React from "react";
import Image from "next/image";
import { PillButton } from "../ui/PillButton";
import { EVENT_CONFIG } from "@/config/event";
import { Coffee, Music, Award, ShieldCheck, ArrowUpRight } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-[#E2E8F0] bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column: 📸 PHOTO SLOT */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative h-[320px] sm:h-[380px] md:h-[420px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E2E8F0] bg-[#F1F5F9] group shadow-sm">
              <Image
                src={EVENT_CONFIG.images.about}
                alt="CSDS Department Gathering"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B253A]/80 via-transparent to-transparent" />

              {/* Minimal floating caption */}
              <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-200 font-mono">
                <span className="text-[#D4A03D] font-bold block text-[11px] mb-0.5">
                  [ PHOTO SLOT: BATCH CELEBRATION ]
                </span>
                <span className="text-[11px]">Computer Cell (CC) • UET Peshawar</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Typography */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4 sm:space-y-5">
            <div className="font-mono text-[11px] font-bold text-[#D4A03D] tracking-widest uppercase">
              [ 01 • ORGANIZED BY COMPUTER CELL (CC) ]
            </div>

            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[#0B253A] tracking-tight uppercase leading-snug">
              TRADITION, BROTHERHOOD & ACADEMIC EXCELLENCE.
            </h2>

            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-body font-normal">
              Organized proudly by the <strong>Computer Cell (CC)</strong> at U.E.T. Peshawar, the Welcome & Farewell Night brings together students from sections A, B, C, D, E, F, Artificial Intelligence, Data Science, Cyber Security, and allied disciplines.
            </p>

            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-body font-normal">
              Held under the open evening skies at UET Civil Lawn on <strong>November 12</strong>, this event unites freshers and graduating seniors for an authentic Peshawari dawat feast, live acoustic rubab, and the legendary Attan circle.
            </p>

            {/* Feature Badges in 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-2.5">
                <Coffee className="w-4 h-4 text-[#D4A03D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-xs uppercase text-[#0B253A]">
                    Peshawari Kahwa Bar
                  </h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    Continuous hot green tea with cardamom, rich doodh patti chai & drinks.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-2.5">
                <Music className="w-4 h-4 text-[#D4A03D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-xs uppercase text-[#0B253A]">
                    Live Folk Rubab
                  </h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    Pashto strings & contemporary student musical performances.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-2.5">
                <Award className="w-4 h-4 text-[#D4A03D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-xs uppercase text-[#0B253A]">
                    Farewell Honors
                  </h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    Department crests, senior titles, and graduation tributes.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D4A03D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-xs uppercase text-[#0B253A]">
                    All-Inclusive Pass
                  </h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    Rs. 2,200 covers buffet dinner, concert entry & souvenirs.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <PillButton
                variant="primary"
                size="md"
                href="/register"
                icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              >
                Register For UET Civil Lawn Pass
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
