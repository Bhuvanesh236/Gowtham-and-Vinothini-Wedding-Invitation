import React, { useState } from 'react';
import { Copy, Check, Sparkles, Instagram, Heart } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { triggerLuxuryConfetti } from '../utils/confetti';

export const Hashtag = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(weddingData.weddingHashtag);
    setCopied(true);
    triggerLuxuryConfetti();
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-br from-cream-100 via-blush-50 to-cream-100 overflow-hidden text-center">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-400/40 bg-white shadow-sm mb-4">
          <Instagram className="w-3.5 h-3.5 text-maroon-700" />
          <span className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-maroon-900">
            Share Your Moments
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-maroon-900 tracking-tight mb-3">
          Tag Our Memories
        </h2>

        <p className="text-sm sm:text-base text-charcoal-800/70 max-w-lg mx-auto mb-8 font-light">
          Help us capture every candid smile and dance move. Tag your photos and stories with our official wedding hashtag!
        </p>

        {/* Big Hashtag Pill */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white p-3 sm:p-4 rounded-3xl border-2 border-gold-300/80 shadow-luxury-card max-w-full">
          <span className="font-serif text-2xl sm:text-4xl font-bold text-maroon-900 tracking-wider px-4">
            {weddingData.weddingHashtag}
          </span>

          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              copied
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-950 hover:shadow-gold-glow hover:scale-105 active:scale-95'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Hashtag copied! ❤️</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Hashtag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
