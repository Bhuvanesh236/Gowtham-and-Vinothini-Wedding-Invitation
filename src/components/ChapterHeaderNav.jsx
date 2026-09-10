import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export const ChapterHeaderNav = ({ onOpenRSVP, currentChapter = 1 }) => {
  const scrollToEvents = () => {
    const el = document.getElementById('chapter-04');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-6 sm:px-12 py-6 sm:py-8 flex items-center justify-between pointer-events-none">
      {/* Couple Monogram / Subtitle */}
      <div className="pointer-events-auto flex items-center gap-3">
        <span className="text-[11px] sm:text-xs tracking-ultra-wide uppercase font-medium text-charcoal-900/80">
          {weddingData.groom} &amp; {weddingData.bride}
        </span>
      </div>

      {/* Top Right: "THE CELEBRATIONS" with subtle arrow */}
      <button
        onClick={scrollToEvents}
        className="pointer-events-auto group flex items-center gap-1.5 text-[10px] sm:text-xs tracking-ultra-wide uppercase text-charcoal-900/80 hover:text-charcoal-900 transition-colors"
      >
        <span>THE CELEBRATIONS</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-antiqueGold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </header>
  );
};
