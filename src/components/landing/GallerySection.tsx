import React from "react";
import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";
import { EVENT_CONFIG } from "@/config/event";
import { MapPin } from "lucide-react";

export function GallerySection() {
  return (
    <section id="gallery" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F1F0DC]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tag="Peshawar Heritage"
          pre="Echoes of the"
          accent="Ancient"
          post="City"
          subtitle="A tribute to the centuries of architecture, hospitality, craftsmanship, and soul that define Peshawar."
        />

        {/* Rounded Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {EVENT_CONFIG.gallery.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-[22px] sm:rounded-[24px] overflow-hidden border-2 border-[#111111] shadow-hard hover:shadow-hard-lg hover:-translate-y-1 transition-all bg-black"
            >
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                {/* Top Location Pill */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[#0F3D2B] border-2 border-[#111111] shadow-hard-xs">
                    <MapPin className="w-3 h-3 text-[#D94A3F]" />
                    <span>{item.location}</span>
                  </span>
                </div>

                {/* Bottom Overlay Title & Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                  <h3 className="font-serif font-bold text-lg sm:text-xl leading-tight text-white group-hover:text-[#A3B565] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-white/80 line-clamp-2 font-normal leading-snug">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
