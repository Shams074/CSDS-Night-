import React from "react";
import Link from "next/link";
import { clsx } from "clsx";

export interface PillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "secondary" | "limeOutline" | "ghost";
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
    "inline-flex items-center justify-center font-display font-bold uppercase tracking-wider rounded-full transition-all duration-200 select-none text-center";

  const sizeClasses = {
    sm: "px-4 py-1.5 text-xs gap-1.5",
    md: "px-6 py-2.5 text-xs sm:text-sm gap-2",
    lg: "px-8 py-3.5 text-sm sm:text-base gap-2.5",
  };

  const variantClasses = {
    primary:
      "bg-[#B4F23D] text-black hover:bg-[#A3E635] shadow-lg hover:shadow-[#B4F23D]/20 active:scale-95",
    outline:
      "bg-transparent text-white border border-white/30 hover:border-[#B4F23D] hover:text-[#B4F23D] hover:bg-[#B4F23D]/5 active:scale-95",
    limeOutline:
      "bg-transparent text-[#B4F23D] border border-[#B4F23D] hover:bg-[#B4F23D] hover:text-black active:scale-95",
    secondary:
      "bg-white text-black hover:bg-gray-200 active:scale-95",
    ghost:
      "bg-transparent text-white/80 hover:text-white hover:bg-white/5",
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
