import React from "react";
import { clsx } from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "forest" | "sage" | "amber" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "neutral",
  size = "md",
  className,
}: BadgeProps) {
  const variantStyles = {
    neutral: "bg-[#FAF9F0] text-[#111111] border-[#111111]",
    primary: "bg-[#D94A3F] text-white border-[#111111]",
    forest: "bg-[#0F3D2B] text-white border-[#111111]",
    sage: "bg-[#A3B565] text-[#111111] border-[#111111]",
    amber: "bg-[#F59E0B] text-[#111111] border-[#111111]",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[11px] shadow-hard-xs",
    md: "px-3.5 py-1 text-xs shadow-hard-xs",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 font-bold rounded-full border-2 tracking-wide uppercase select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
