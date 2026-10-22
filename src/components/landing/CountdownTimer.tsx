"use client";

import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isMounted) {
    return (
      <div className="flex items-center gap-2 opacity-0">
        <div className="w-12 h-12 bg-white rounded-xl" />
      </div>
    );
  }

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center gap-1.5 sm:gap-2.5" suppressHydrationWarning>
      {units.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center">
            <div className="w-11 h-11 sm:w-13 sm:h-13 bg-white/90 backdrop-blur-md rounded-xl border border-[#E2E8F0] shadow-sm flex items-center justify-center">
              <span className="font-display font-bold text-base sm:text-lg text-[#0B253A]">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-[9px] font-mono font-semibold tracking-wider text-[#64748B] mt-1 uppercase">
              {unit.label}
            </span>
          </div>
          {index < units.length - 1 && (
            <span className="font-mono text-[#CBD5E1] text-sm sm:text-base font-bold -mt-3">
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
