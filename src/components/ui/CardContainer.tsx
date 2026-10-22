import React from "react";
import { clsx } from "clsx";

interface CardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "surface" | "navy" | "black" | "highlight" | "gold";
  className?: string;
}

export function CardContainer({
  children,
  variant = "surface",
  className,
  ...props
}: CardContainerProps) {
  const variantStyles = {
    surface: "bg-white border border-[#E2E8F0] text-[#0B253A] shadow-sm",
    navy: "bg-[#0B253A] border border-[#0B253A] text-white shadow-md",
    black: "bg-[#071927] border border-[#0B253A] text-white",
    highlight: "bg-[#FEF9EE] border border-[#D4A03D]/40 text-[#0B253A]",
    gold: "bg-[#FEF9EE] border border-[#D4A03D]/40 text-[#0B253A]",
  };

  return (
    <div
      className={clsx(
        "rounded-2xl sm:rounded-3xl p-5 sm:p-7 transition-all duration-200",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
