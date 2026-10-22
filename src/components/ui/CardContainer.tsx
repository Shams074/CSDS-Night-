import React from "react";
import { clsx } from "clsx";

interface CardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "cream" | "white" | "sage" | "forest";
  className?: string;
  hasShadow?: boolean;
}

export function CardContainer({
  children,
  variant = "white",
  className,
  hasShadow = true,
  ...props
}: CardContainerProps) {
  const variantStyles = {
    white: "bg-white text-[#111111]",
    cream: "bg-[#F1F0DC] text-[#111111]",
    sage: "bg-[#A3B565] text-[#111111]",
    forest: "bg-[#0F3D2B] text-white",
  };

  return (
    <div
      className={clsx(
        "rounded-[22px] md:rounded-[26px] border-2 border-[#111111] transition-all",
        hasShadow && "shadow-hard md:shadow-hard-lg",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
