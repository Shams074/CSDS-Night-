import React from "react";
import Link from "next/link";
import { EVENT_CONFIG } from "@/config/event";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#050505] text-[#EDEDED] border-t border-[#1c1c1c] pt-14 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-[#1f1f1f]">
          {/* Col 1: Branding */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B4F23D]" />
              <span className="font-display font-black text-lg tracking-widest uppercase text-white">
                CSDS NIGHT <span className="text-[#B4F23D]">&apos;26</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 max-w-md font-normal leading-relaxed">
              {EVENT_CONFIG.tagline}. An official annual community celebration organized by the {EVENT_CONFIG.society}, Peshawar.
            </p>

            <div className="font-mono text-[11px] text-gray-500">
              Grand Marquee, University Town, Peshawar • 100% Alcohol-Free Campus Event
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#B4F23D]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-display tracking-wider uppercase text-gray-400">
              {EVENT_CONFIG.footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Portal Access */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#B4F23D]">
              Administration
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed font-normal">
              For event committee coordinators and faculty reviewers to verify student payments.
            </p>

            <div>
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 hover:border-[#B4F23D] text-xs font-display tracking-wider uppercase text-white hover:text-[#B4F23D] transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#B4F23D]" />
                <span>Admin Login Portal</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal Links (Matching reference image) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>{EVENT_CONFIG.footer.copyright}</div>
          <div className="flex items-center gap-6">
            <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            <span className="text-[#B4F23D]">Peshawar, Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
