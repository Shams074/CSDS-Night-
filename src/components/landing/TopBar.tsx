"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PillButton } from "../ui/PillButton";
import { Menu, X, ArrowUpRight, ShieldCheck } from "lucide-react";

export function TopBar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "HIGHLIGHTS", href: "#highlights" },
    { label: "DETAILS", href: "#details" },
    { label: "SCHEDULE", href: "#schedule" },
    { label: "FEE & REGISTRATION", href: "#fee" },
    { label: "FAQ", href: "#faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["home", "about", "highlights", "details", "schedule", "fee", "faq"];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-sm py-2.5"
          : "bg-white border-b border-[#E2E8F0] py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Computer Cell Logo & Department Brand */}
        <Link href="#home" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0">
            <Image
              src="/images/cc-logo.png"
              alt="Computer Cell UET Peshawar Logo"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xs sm:text-sm tracking-wide uppercase text-[#0B253A] group-hover:text-[#D4A03D] transition-colors leading-tight">
              CSDS NIGHT <span className="text-[#D4A03D]">&apos;26</span>
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#64748B] leading-none mt-0.5">
              COMPUTER CELL • UET
            </span>
          </div>
        </Link>

        {/* Minimalist Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-[11px] tracking-widest uppercase transition-colors py-1 ${
                  isActive
                    ? "text-[#D4A03D] font-bold"
                    : "text-[#475569] hover:text-[#0B253A]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin link icon */}
          <Link
            href="/admin/login"
            className="flex p-1.5 rounded-full border border-[#E2E8F0] text-[#64748B] hover:text-[#0B253A] hover:border-[#CBD5E1] transition-colors"
            title="Admin Login"
          >
            <ShieldCheck className="w-4 h-4" />
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#0B253A] hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2E8F0] px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-xs tracking-wider uppercase text-[#475569] hover:text-[#0B253A] hover:bg-slate-50 py-2 px-3 rounded-lg"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E2E8F0] flex flex-col gap-2">
            <PillButton
              variant="gold"
              size="md"
              href="/register"
              icon={<ArrowUpRight className="w-4 h-4" />}
              className="w-full justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Entry Pass (Rs. 2,200)
            </PillButton>

            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center font-display text-xs text-[#64748B] hover:text-[#0B253A] py-1.5"
            >
              Administrator Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
