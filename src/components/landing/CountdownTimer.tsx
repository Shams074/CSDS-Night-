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
      <div className="flex items-center gap-2 sm:gap-3 opacity-0">
        <div className="w-16 h-16 bg-white rounded-2xl" />
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
    <div className="flex items-center gap-2 sm:gap-3.5" suppressHydrationWarning>
      {units.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-white/95 backdrop-blur-sm rounded-[16px] border-2 border-[#111111] shadow-hard-xs flex items-center justify-center">
              <span className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-[#0F3D2B]">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-white mt-1.5 drop-shadow-sm">
              {unit.label}
            </span>
          </div>
          {index < units.length - 1 && (
            <span className="font-serif text-white/80 text-xl font-bold -mt-5">
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
