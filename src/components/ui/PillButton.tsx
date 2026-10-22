import React from "react";
import Link from "next/link";
import { clsx } from "clsx";

export interface PillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "forest" | "sage" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function PillButton({
  variant = "primary",
  size = "md",
  href,
  external,
  children,
  icon,
  iconPosition = "left",
  className,
  ...props
}: PillButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-full border-2 border-[#111111] transition-all duration-150 cursor-pointer select-none text-center";

  const sizeClasses = {
    sm: "px-4 py-1.5 text-xs shadow-hard-xs hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
    md: "px-6 py-2.5 text-sm shadow-hard-sm hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#111111]",
    lg: "px-8 py-3.5 text-base shadow-hard hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#111111]",
  };

  const variantClasses = {
    primary:
      "bg-[#D94A3F] text-white hover:bg-[#C53B30] focus-visible:ring-2 focus-visible:ring-[#D94A3F] focus-visible:ring-offset-2",
    secondary:
      "bg-white text-[#111111] hover:bg-[#F8F7EE] focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2",
    forest:
      "bg-[#0F3D2B] text-white hover:bg-[#18523C] focus-visible:ring-2 focus-visible:ring-[#0F3D2B] focus-visible:ring-offset-2",
    sage:
      "bg-[#A3B565] text-[#111111] hover:bg-[#92A355] focus-visible:ring-2 focus-visible:ring-[#A3B565] focus-visible:ring-offset-2",
    outline:
      "bg-transparent text-[#111111] hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2",
    ghost:
      "border-transparent shadow-none hover:bg-black/5 text-[#111111] focus-visible:ring-2 focus-visible:ring-[#111111]",
  };

  const combinedClasses = clsx(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
