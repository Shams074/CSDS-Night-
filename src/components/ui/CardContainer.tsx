import React from "react";
import { clsx } from "clsx";

interface CardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "surface" | "black" | "highlight";
  className?: string;
}

export function CardContainer({
  children,
  variant = "surface",
  className,
  ...props
}: CardContainerProps) {
  const variantStyles = {
    surface: "bg-[#121212] border border-[#262626] text-[#EDEDED]",
    black: "bg-[#070707] border border-[#1e1e1e] text-[#EDEDED]",
    highlight: "bg-[#14180d] border border-[#B4F23D]/30 text-[#EDEDED]",
  };

  return (
    <div
      className={clsx(
        "rounded-2xl sm:rounded-3xl p-5 sm:p-8 transition-all duration-200",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
