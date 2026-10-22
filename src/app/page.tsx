import React from "react";
import { TopBar } from "@/components/landing/TopBar";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { HighlightsSection } from "@/components/landing/HighlightsSection";
import { DetailTabsSection } from "@/components/landing/DetailTabsSection";
import { ScheduleSection } from "@/components/landing/ScheduleSection";
import { FeeSection } from "@/components/landing/FeeSection";
import { ContactFaqSection } from "@/components/landing/ContactFaqSection";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0B253A] font-body selection:bg-[#D4A03D] selection:text-white">
      {/* 1. Minimalist Top Navigation */}
      <TopBar />

      {/* Main Landing Sections */}
      <main className="flex-grow">
        {/* a) Hero with dark cinematic photo, bold lime typography, countdown */}
        <HeroSection />

        {/* b) About: Numbered layout [01] with photo slot & Pakhtun hospitality */}
        <AboutSection />

        {/* c) Highlights: 6 numbered cards with photo slots */}
        <HighlightsSection />

        {/* Detail Tabs: Feast, Concert & Entertainment switcher */}
        <DetailTabsSection />

        {/* d) Schedule: 3 tall poster cards with dark photography */}
        <ScheduleSection />

        {/* e) Fee: Split layout with group photo slot & Rs. 2,200 tariff */}
        <FeeSection />

        {/* f) Contact & FAQ directory */}
        <ContactFaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
