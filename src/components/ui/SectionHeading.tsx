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
  theme?: "cream" | "sage" | "forest";
}

export function SectionHeading({
  pre = "",
  accent,
  post = "",
  subtitle,
  tag,
  align = "center",
  className,
  theme = "cream",
}: SectionHeadingProps) {
  const isDark = theme === "forest";

  return (
    <div
      className={clsx(
        "mb-10 md:mb-14",
        align === "center" ? "text-center max-w-3xl mx-auto" : "text-left",
        className
      )}
    >
      {tag && (
        <div
          className={clsx(
            "inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 border-2 border-[#111111]",
            theme === "sage"
              ? "bg-[#F1F0DC] text-[#0F3D2B] shadow-hard-xs"
              : isDark
              ? "bg-[#A3B565] text-[#0F3D2B] shadow-hard-xs"
              : "bg-white text-[#0F3D2B] shadow-hard-xs"
          )}
        >
          <span>{tag}</span>
        </div>
      )}

      <h2
        className={clsx(
          "font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-5xl tracking-tight leading-[1.15]",
          isDark ? "text-white" : "text-[#111111]"
        )}
      >
        {pre}{" "}
        <span className="text-[#D94A3F] italic font-serif relative inline-block">
          {accent}
        </span>{" "}
        {post}
      </h2>

      {subtitle && (
        <p
          className={clsx(
            "mt-3.5 md:mt-4 text-base sm:text-lg font-normal max-w-2xl",
            align === "center" ? "mx-auto" : "",
            isDark ? "text-white/80" : "text-[#111111]/75"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
