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
        "mb-8 sm:mb-12",
        align === "center" ? "text-center max-w-3xl mx-auto" : "text-left",
        className
      )}
    >
      {tag && (
        <div className="font-mono text-xs font-semibold text-[#B4F23D] tracking-widest uppercase mb-2">
          {tag.startsWith("[") ? tag : `[ ${tag} ]`}
        </div>
      )}

      <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white uppercase">
        {pre}{" "}
        <span className="text-[#B4F23D] inline-block">
          {accent}
        </span>{" "}
        {post}
      </h2>

      {subtitle && (
        <p
          className={clsx(
            "mt-3 sm:mt-4 text-sm sm:text-base text-gray-400 font-body font-normal leading-relaxed max-w-xl",
            align === "center" ? "mx-auto" : ""
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
