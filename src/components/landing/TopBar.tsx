"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PillButton } from "../ui/PillButton";
import { EVENT_CONFIG } from "@/config/event";
import { Menu, X, Sparkles, ShieldCheck } from "lucide-react";

export function TopBar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Highlights", href: "#highlights" },
    { label: "Menu & Music", href: "#details" },
    { label: "Schedule", href: "#schedule" },
    { label: "Fee & Details", href: "#fee" },
    { label: "Gallery", href: "#gallery" },
    { label: "FAQ & Contact", href: "#faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple intersection check for active anchor
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-shadow duration-200">
      {/* 1. Forest Green Strip */}
      <div className="bg-[#0F3D2B] text-white px-4 sm:px-6 lg:px-10 py-2.5 flex items-center justify-between border-b-2 border-[#111111]">
        {/* Logo / Society Branding */}
        <Link href="#home" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-[#A3B565] border-2 border-[#111111] flex items-center justify-center font-serif font-black text-[#0F3D2B] text-lg shadow-hard-xs group-hover:scale-105 transition-transform">
            C
          </div>
          <div className="leading-tight">
            <span className="font-serif font-bold text-base sm:text-lg tracking-wide block">
              CSDS Peshawar
            </span>
            <span className="text-[11px] text-[#A3B565] font-medium tracking-wider uppercase block">
              Welcome & Farewell Night &apos;26
            </span>
          </div>
        </Link>

        {/* Right Buttons on Forest Green Strip */}
        <div className="flex items-center gap-2 sm:gap-3">
          <PillButton
            variant="secondary"
            size="sm"
            href="#highlights"
            className="hidden md:inline-flex"
          >
            Event Details
          </PillButton>
          <PillButton variant="primary" size="sm" href="/register">
            Register Now
          </PillButton>

          {/* Admin link pill */}
          <Link
            href="/admin/login"
            className="hidden lg:flex items-center gap-1 text-xs text-white/70 hover:text-white px-2 py-1 rounded-full border border-white/20 hover:border-white/50 transition-colors"
            title="Admin Login"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </Link>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full border-2 border-[#111111] bg-white text-[#111111] shadow-hard-xs focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* 2. White Navigation Row with Underline Indicator */}
      <nav
        className={`bg-white border-b-2 border-[#111111] px-4 sm:px-6 lg:px-10 hidden md:block transition-all ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <ul className="flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative inline-block py-3 px-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-[#D94A3F] font-bold"
                        : "text-[#111111] hover:text-[#0F3D2B]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#D94A3F] rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F3D2B] bg-[#F1F0DC] px-3 py-1 rounded-full border border-[#111111]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#D94A3F]" />
            <span>Rs. 2,200 All-Inclusive</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b-2 border-[#111111] shadow-hard p-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[#111111] hover:bg-[#F1F0DC] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <PillButton
              variant="primary"
              size="md"
              href="/register"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Register Now — Rs. 2,200
            </PillButton>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-xs text-gray-500 py-1 hover:text-[#0F3D2B]"
            >
              Admin Dashboard Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
