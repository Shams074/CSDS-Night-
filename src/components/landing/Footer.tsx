import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EVENT_CONFIG } from "@/config/event";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0B253A] text-white border-t border-[#0B253A] pt-12 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-10 border-b border-white/10">
          {/* Col 1: Branding & CC Logo */}
          <div className="md:col-span-6 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/images/cc-logo.png"
                  alt="Computer Cell UET Peshawar Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-wide uppercase text-white">
                  CSDS NIGHT <span className="text-[#D4A03D]">&apos;26</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#D4A03D]">
                  COMPUTER CELL (CC) • U.E.T. PESHAWAR
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 max-w-md font-normal leading-relaxed">
              Official annual celebration uniting graduating seniors and welcoming freshers of CSDS. Arranged with pride by Computer Cell (CC), U.E.T. Peshawar.
            </p>

            <div className="font-mono text-[11px] text-slate-400">
              Civil Lawn, UET Peshawar • 12 November 2026 • 100% Alcohol-Free Student Event
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#D4A03D]">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs font-display tracking-wider uppercase text-slate-300">
              {EVENT_CONFIG.footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#D4A03D] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Portal Access */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#D4A03D]">
              Administration
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              For Computer Cell committee coordinators to review student receipts and issue entry passes.
            </p>

            <div>
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 hover:border-[#D4A03D] text-[11px] font-display tracking-wider uppercase text-white hover:text-[#D4A03D] transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4A03D]" />
                <span>Admin Login Portal</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
          <div>© 2026 Computer Cell (CC), U.E.T. Peshawar. All rights reserved.</div>
          <div className="flex items-center gap-5">
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="text-[#D4A03D]">Civil Lawn, UET Peshawar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
