import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Clock } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(weddingData.countdownTarget).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isCompleted: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isCompleted: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-maroon-950 text-cream-50 overflow-hidden">
      {/* Subtle mandala background */}
      <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border border-gold-400/40" />
        <div className="w-[380px] h-[380px] rounded-full border border-dashed border-gold-300/30" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center z-10">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-400/40 bg-maroon-900/50 mb-4">
          <Clock className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-gold-200">
            Counting Down To Forever
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream-50 tracking-tight">
          The Big Day
        </h2>

        <OrnamentalDivider light className="my-4" />

        {timeLeft.isCompleted ? (
          <div className="py-8 animate-bounce">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-3xl bg-gold-400/20 border-2 border-gold-400 text-gold-200 shadow-gold-glow">
              <Heart className="w-8 h-8 fill-gold-400 text-gold-400" />
              <span className="font-serif text-2xl sm:text-4xl font-bold tracking-wide">
                Today is the day! ❤️
              </span>
              <Heart className="w-8 h-8 fill-gold-400 text-gold-400" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto mt-8">
            {timeUnits.map((unit) => (
              <div
                key={unit.label}
                className="relative bg-gradient-to-b from-maroon-900/80 to-maroon-950 p-5 sm:p-7 rounded-2xl border border-gold-400/40 shadow-xl backdrop-blur-md group hover:border-gold-300 transition-all duration-300"
              >
                {/* Numeric value */}
                <div className="font-serif text-4xl sm:text-6xl font-bold text-gold-300 tracking-tight drop-shadow-md">
                  {String(unit.value).padStart(2, '0')}
                </div>

                {/* Unit label */}
                <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-cream-200/80 font-medium mt-2">
                  {unit.label}
                </div>

                {/* Corner decorative accent */}
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-gold-400/40" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-gold-400/40" />
              </div>
            ))}
          </div>
        )}

        <p className="mt-8 font-serif text-sm sm:text-base text-gold-200/80 italic">
          {weddingData.weddingDate} • {weddingData.weddingTime}
        </p>
      </div>
    </section>
  );
};
