import React from "react";
import Link from "next/link";
import { EVENT_CONFIG } from "@/config/event";
import { ShieldCheck, ArrowUpRight, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0F3D2B] text-white border-t-2 border-[#111111] pt-14 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/20">
          {/* Col 1: Department Branding */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#A3B565] border-2 border-[#111111] flex items-center justify-center font-serif font-black text-[#0F3D2B] text-xl shadow-hard-xs">
                C
              </div>
              <div>
                <span className="font-serif font-bold text-xl block">
                  CSDS Peshawar
                </span>
                <span className="text-xs text-[#A3B565] font-semibold tracking-wider uppercase block">
                  Welcome Party & Farewell Night 2026
                </span>
              </div>
            </div>

            <p className="text-sm text-white/80 max-w-sm font-normal leading-relaxed">
              {EVENT_CONFIG.tagline}. Organized with dedication and Pakhtun
              hospitality by the {EVENT_CONFIG.society}.
            </p>

            <div className="text-xs text-white/60">
              <span className="font-semibold text-white/90">Venue:</span>{" "}
              {EVENT_CONFIG.venue}, {EVENT_CONFIG.city}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A3B565]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              {EVENT_CONFIG.footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    {link.href.startsWith("http") && (
                      <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Society & Administration */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A3B565]">
              Portal Administration
            </h4>
            <p className="text-xs text-white/75 leading-relaxed font-normal">
              For event committee coordinators and faculty reviewers. Access registration approvals, payment verification, and attendee exports.
            </p>

            <div>
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-xs font-semibold text-white transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#A3B565]" />
                <span>Admin Login Portal</span>
              </Link>
            </div>

            <div className="pt-2 text-[11px] text-white/60">
              <span>Alcohol-Free Campus Event • 100% Student Verified</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>{EVENT_CONFIG.footer.copyright}</div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#D94A3F] fill-current" />
            <span>for CSDS Students in Peshawar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
