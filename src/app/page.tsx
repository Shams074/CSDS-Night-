import React from "react";
import { TopBar } from "@/components/landing/TopBar";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { HighlightsSection } from "@/components/landing/HighlightsSection";
import { DetailTabsSection } from "@/components/landing/DetailTabsSection";
import { ScheduleSection } from "@/components/landing/ScheduleSection";
import { FeeSection } from "@/components/landing/FeeSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { ContactFaqSection } from "@/components/landing/ContactFaqSection";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F0DC]">
      {/* 1. Sticky Navigation Top Bar */}
      <TopBar />

      {/* Main Landing Sections */}
      <main className="flex-grow">
        {/* a) Hero with Peshawar photo, serif headline, buttons, countdown */}
        <HeroSection />

        {/* b) About: Welcoming new batch & honoring graduating seniors */}
        <AboutSection />

        {/* c) Highlights: Sage section with wave top, 4-col image cards */}
        <HighlightsSection />

        {/* Detail Tabs: Food, Music, Activities switcher */}
        <DetailTabsSection />

        {/* d) Schedule: 3 tall poster-style cards with truck art borders */}
        <ScheduleSection />

        {/* e) Registration Fee: Split layout with group photo and sage pricing card */}
        <FeeSection />

        {/* f) Gallery of Peshawar culture and heritage */}
        <GallerySection />

        {/* g) FAQ & Contact directory panel */}
        <ContactFaqSection />
      </main>

      {/* h) Footer */}
      <Footer />
    </div>
  );
}
