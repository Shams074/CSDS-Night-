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
        <div className="w-14 h-14 bg-[#121212] rounded-xl" />
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
    <div className="flex items-center gap-2 sm:gap-3" suppressHydrationWarning>
      {units.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center">
            <div className="w-13 h-13 sm:w-16 sm:h-16 bg-[#121212]/90 backdrop-blur-md rounded-xl sm:rounded-2xl border border-[#2a2a2a] flex items-center justify-center">
              <span className="font-display font-black text-xl sm:text-2xl text-[#B4F23D]">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono font-semibold tracking-widest text-gray-400 mt-1 uppercase">
              {unit.label}
            </span>
          </div>
          {index < units.length - 1 && (
            <span className="font-mono text-gray-600 text-lg sm:text-xl font-bold -mt-4">
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
