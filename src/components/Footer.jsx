import React from 'react';
import { Heart, ChevronUp, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-maroon-950 text-cream-100 pt-16 pb-12 overflow-hidden border-t-2 border-gold-400/30">
      {/* Background Mandala Watermark */}
      <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
        <svg className="w-[600px] h-[600px]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" stroke="#D4AF37" strokeWidth="1" fill="none" />
          <circle cx="50" cy="50" r="36" stroke="#D4AF37" strokeWidth="1" fill="none" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center z-10 flex flex-col items-center">
        {/* Monogram Seal */}
        <div className="w-16 h-16 rounded-full border-2 border-gold-400/80 bg-maroon-900/60 flex items-center justify-center text-gold-300 shadow-gold-glow mb-6">
          <Heart className="w-7 h-7 fill-gold-400 text-gold-400" />
        </div>

        {/* Closing Signature */}
        <h3 className="font-serif text-2xl sm:text-4xl font-bold text-gold-200 tracking-wide mb-2">
          With Love, {weddingData.bride.name} & {weddingData.groom.name}
        </h3>

        <p className="font-serif text-sm sm:text-base text-gold-300/80 tracking-widest uppercase">
          {weddingData.subtitle}
        </p>

        <p className="text-xs sm:text-sm text-cream-200/70 mt-1">
          {weddingData.weddingDate} • {weddingData.city}
        </p>

        <OrnamentalDivider light className="my-6" />

        {/* Heartfelt Note */}
        <p className="text-xs text-gold-300/60 tracking-wider">
          Made with ❤️ for our special day
        </p>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-maroon-900/80 text-gold-300 border border-gold-400/40 hover:bg-maroon-800 hover:text-gold-200 transition-all shadow-md group"
          aria-label="Back to top"
        >
          <span>Back To Top</span>
          <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
