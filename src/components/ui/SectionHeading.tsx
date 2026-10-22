import React from "react";
import { clsx } from "clsx";

interface SectionHeadingProps {
  pre?: string;
  accent: string;
  post?: string;
  subtitle?: string;
  tag?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  pre = "",
  accent,
  post = "",
  subtitle,
  tag,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "mb-6 sm:mb-9",
        align === "center" ? "text-center max-w-2xl mx-auto" : "text-left",
        className
      )}
    >
      {tag && (
        <div className="font-mono text-[11px] font-bold text-[#D4A03D] tracking-widest uppercase mb-1.5">
          {tag.startsWith("[") ? tag : `[ ${tag} ]`}
        </div>
      )}

      <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight text-[#0B253A] uppercase">
        {pre}{" "}
        <span className="text-[#D4A03D] inline-block">
          {accent}
        </span>{" "}
        {post}
      </h2>

      {subtitle && (
        <p
          className={clsx(
            "mt-2 text-xs sm:text-sm text-[#475569] font-body font-normal leading-relaxed max-w-lg",
            align === "center" ? "mx-auto" : ""
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
