import React from "react";
import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { PillButton } from "../ui/PillButton";
import { CardContainer } from "../ui/CardContainer";
import { Heart, Award, Music, Coffee, Sparkles } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="Department Tradition"
          pre="Two Batches. One Unforgettable"
          accent="Peshawar"
          post="Night."
          subtitle="A treasured annual tradition honoring our graduating innovators while welcoming the newest talent into the CSDS family."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left Column: Story & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-base sm:text-lg text-[#111111]/85 leading-relaxed font-normal">
              Every year, the Department of Computer Science & Data Science pauses
              the compilations, late-night hackathons, and lab deadlines to gather
              under the starlit sky of historic Peshawar.
            </p>

            <p className="text-base sm:text-lg text-[#111111]/85 leading-relaxed font-normal">
              For our freshers, this evening marks the threshold into an inspiring
              academic journey filled with camaraderie, mentorship, and discovery.
              For our graduating seniors, it is a grand, heartfelt tribute to four
              years of resilience, laughter, thesis milestones, and lasting bonds.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border-2 border-[#111111] shadow-hard-xs">
                <div className="w-10 h-10 rounded-full bg-[#A3B565] border-2 border-[#111111] flex items-center justify-center shrink-0">
                  <Coffee className="w-5 h-5 text-[#0F3D2B]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#0F3D2B]">
                    Pure Pakhtun Hospitality
                  </h4>
                  <p className="text-xs text-[#111111]/70 mt-0.5">
                    100% alcohol-free gathering with authentic Peshawari kahwa and gourmet mocktails.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border-2 border-[#111111] shadow-hard-xs">
                <div className="w-10 h-10 rounded-full bg-[#D94A3F] border-2 border-[#111111] flex items-center justify-center shrink-0">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#0F3D2B]">
                    Rubab & Attan Circle
                  </h4>
                  <p className="text-xs text-[#111111]/70 mt-0.5">
                    Live Pashto strings, Urdu acoustic sets, and the ceremonial Attan dance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border-2 border-[#111111] shadow-hard-xs">
                <div className="w-10 h-10 rounded-full bg-[#0F3D2B] border-2 border-[#111111] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#A3B565]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#0F3D2B]">
                    Farewell Honors & Titles
                  </h4>
                  <p className="text-xs text-[#111111]/70 mt-0.5">
                    Personalized senior crests, batch superlatives, and faculty blessings.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border-2 border-[#111111] shadow-hard-xs">
                <div className="w-10 h-10 rounded-full bg-[#FAF9F0] border-2 border-[#111111] flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 text-[#D94A3F]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#0F3D2B]">
                    Lifelong Memories
                  </h4>
                  <p className="text-xs text-[#111111]/70 mt-0.5">
                    High-res photo pavilion, batch documentaries, and keepsakes.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-4">
              <PillButton variant="primary" size="md" href="/register">
                Register Your Seat
              </PillButton>
              <PillButton variant="secondary" size="md" href="#fee">
                Review Payment Steps
              </PillButton>
            </div>
          </div>

          {/* Right Column: Visual Feature Card */}
          <div className="lg:col-span-5">
            <CardContainer
              variant="white"
              className="p-3 sm:p-4 relative overflow-hidden"
            >
              <div className="relative h-[380px] sm:h-[440px] rounded-[18px] sm:rounded-[22px] overflow-hidden border-2 border-[#111111]">
                <Image
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80"
                  alt="CSDS Department students celebrating together"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                
                {/* Floating pill tag */}
                <div className="absolute top-4 left-4 bg-white/95 px-3.5 py-1.5 rounded-full border-2 border-[#111111] shadow-hard-xs text-xs font-bold text-[#0F3D2B] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D94A3F]" />
                  <span>Batch 2022 – 2026</span>
                </div>

                {/* Bottom narrative overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs uppercase tracking-widest text-[#A3B565] font-bold block mb-1">
                    Student Community
                  </span>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl leading-snug">
                    United by Code, Connected by Culture.
                  </h3>
                  <p className="text-xs text-white/80 mt-1">
                    From first-year &quot;Hello World&quot; to graduating data science thesis presentations.
                  </p>
                </div>
              </div>
            </CardContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
