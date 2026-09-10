import React from 'react';

export const OrnamentalDivider = ({ className = "", color = "#D4AF37", light = false }) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
      {/* Left decorative line */}
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-gold-400 to-gold-600 opacity-70" />
      
      {/* Central Indian Mandala / Lotus motif */}
      <div className="flex items-center gap-1.5 text-gold-500">
        <span className="text-xs opacity-75">❖</span>
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse-subtle"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6"/>
          <circle cx="50" cy="50" r="30" stroke={color} strokeWidth="1.5" />
          <path
            d="M50 20 C45 35 35 45 20 50 C35 55 45 65 50 80 C55 65 65 55 80 50 C65 45 55 35 50 20 Z"
            fill={light ? "#FAF3DE" : "#D4AF37"}
            opacity="0.85"
          />
          <circle cx="50" cy="50" r="6" fill={light ? "#7B1B2F" : "#5F1122"} />
        </svg>
        <span className="text-xs opacity-75">❖</span>
      </div>

      {/* Right decorative line */}
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-gold-400 to-gold-600 opacity-70" />
    </div>
  );
};

export const FloralCorner = ({ position = "top-left", className = "" }) => {
  const rotation = {
    "top-left": "rotate-0",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90",
  }[position] || "rotate-0";

  return (
    <div className={`pointer-events-none absolute w-12 h-12 sm:w-16 sm:h-16 text-gold-400 opacity-40 ${rotation} ${className}`}>
      <svg viewBox="0 0 100 100" fill="currentColor">
        <path d="M0,0 Q50,0 50,50 Q0,50 0,0 Z" />
        <path d="M0,0 Q0,50 50,50 Q50,0 0,0 Z" opacity="0.5" />
        <circle cx="15" cy="15" r="4" fill="#5F1122" />
      </svg>
    </div>
  );
};
