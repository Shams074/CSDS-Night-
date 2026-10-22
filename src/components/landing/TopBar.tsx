"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PillButton } from "../ui/PillButton";
import { Menu, X, ArrowUpRight, ShieldCheck } from "lucide-react";

export function TopBar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Gallery section removed as requested
  const navLinks = [
    { label: "ABOUT", href: "#about" },
    { label: "HIGHLIGHTS", href: "#highlights" },
    { label: "DETAILS", href: "#details" },
    { label: "SCHEDULE", href: "#schedule" },
    { label: "PASS & FEE", href: "#fee" },
    { label: "FAQ", href: "#faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ["home", "about", "highlights", "details", "schedule", "fee", "faq"];
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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#070707]/95 backdrop-blur-md border-b border-[#262626] py-3"
          : "bg-[#070707] border-b border-[#1c1c1c] py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Minimalist Logo */}
        <Link href="#home" className="flex items-center gap-2.5 group">
          <span className="w-2.5 h-2.5 rounded-full bg-[#B4F23D] group-hover:scale-125 transition-transform" />
          <span className="font-display font-black text-sm sm:text-base tracking-widest uppercase text-white group-hover:text-[#B4F23D] transition-colors">
            CSDS NIGHT <span className="text-[#B4F23D]">&apos;26</span>
          </span>
        </Link>

        {/* Minimalist Desktop Navigation Links (widely spaced uppercase) */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-xs tracking-widest uppercase transition-colors py-1 ${
                  isActive
                    ? "text-[#B4F23D] font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <PillButton
            variant="outline"
            size="sm"
            href="/register"
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            className="hidden sm:inline-flex"
          >
            Register Pass — Rs. 2,200
          </PillButton>

          {/* Quick Register on small screens */}
          <Link
            href="/register"
            className="sm:hidden px-3 py-1.5 rounded-full bg-[#B4F23D] text-black font-display font-bold text-xs flex items-center gap-1"
          >
            <span>Pass</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>

          {/* Admin link icon */}
          <Link
            href="/admin/login"
            className="hidden md:flex p-2 rounded-full border border-white/20 text-gray-400 hover:text-white hover:border-white/50 transition-colors"
            title="Admin Login"
          >
            <ShieldCheck className="w-4 h-4" />
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full border border-white/20 text-white hover:border-[#B4F23D] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-[#B4F23D]" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Minimalist full-width overlay) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0a] border-b border-[#262626] px-5 py-6 space-y-4 animate-in slide-in-from-top-3 duration-200">
          <div className="space-y-3 pb-4 border-b border-[#1f1f1f]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block font-display text-sm font-semibold tracking-wider text-gray-300 hover:text-[#B4F23D] py-1.5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <PillButton
              variant="primary"
              size="md"
              href="/register"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              Register Now — Rs. 2,200
            </PillButton>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center text-xs text-gray-500 hover:text-gray-300 py-1"
            >
              Admin Dashboard Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
