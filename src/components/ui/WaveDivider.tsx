import React from "react";
import { clsx } from "clsx";

interface WaveDividerProps {
  fillColor?: string; // color of the section entering
  bgColor?: string; // color of the section exiting
  inverted?: boolean;
  className?: string;
}

export function WaveDivider({
  fillColor = "#A3B565",
  bgColor = "#F1F0DC",
  inverted = false,
  className,
}: WaveDividerProps) {
  return (
    <div
      className={clsx(
        "w-full overflow-hidden leading-none select-none pointer-events-none -mb-[1px]",
        className
      )}
      style={{ backgroundColor: bgColor }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(
          "w-full block h-8 sm:h-12 md:h-16 lg:h-20",
          inverted && "rotate-180"
        )}
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C320,65 520,76 720,76 C920,76 1120,65 1440,0 L1440,76 L0,76 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
