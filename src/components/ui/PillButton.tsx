import React from "react";
import Link from "next/link";
import { clsx } from "clsx";

export interface PillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "secondary" | "gold" | "goldOutline" | "ghost";
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
  iconPosition = "right",
  className,
  ...props
}: PillButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-display font-semibold uppercase tracking-wider rounded-full transition-all duration-200 select-none text-center cursor-pointer";

  const sizeClasses = {
    sm: "px-3.5 py-1 text-[11px] gap-1.5",
    md: "px-5 py-2 text-xs gap-2",
    lg: "px-6 py-2.5 text-xs sm:text-sm gap-2",
  };

  const variantClasses = {
    primary:
      "bg-[#0B253A] text-white hover:bg-[#163B59] active:scale-95 shadow-sm border border-[#0B253A]",
    gold:
      "bg-[#D4A03D] text-[#0B253A] hover:bg-[#BA8A2C] hover:text-white active:scale-95 shadow-sm font-bold",
    outline:
      "bg-transparent text-[#0B253A] border border-[#CBD5E1] hover:border-[#0B253A] hover:bg-slate-100 active:scale-95",
    goldOutline:
      "bg-transparent text-[#D4A03D] border border-[#D4A03D] hover:bg-[#D4A03D] hover:text-[#0B253A] active:scale-95",
    secondary:
      "bg-white text-[#0B253A] border border-[#E2E8F0] hover:bg-slate-50 hover:border-[#CBD5E1] active:scale-95 shadow-sm",
    ghost:
      "bg-transparent text-[#475569] hover:text-[#0B253A] hover:bg-slate-100",
  };

  const combinedClasses = clsx(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && <span>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span>{icon}</span>}
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
