import React from 'react';
import { Heart, Sparkles, Feather } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider, FloralCorner } from './OrnamentalDivider';

export const Welcome = () => {
  return (
    <section id="welcome" className="relative py-20 sm:py-28 bg-cream-50 overflow-hidden text-center">
      {/* Background Floral/Motif Accents */}
      <FloralCorner position="top-left" className="top-4 left-4" />
      <FloralCorner position="top-right" className="top-4 right-4" />
      <FloralCorner position="bottom-left" className="bottom-4 left-4" />
      <FloralCorner position="bottom-right" className="bottom-4 right-4" />

      {/* Subtle Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <span className="font-serif text-[18vw] font-bold text-maroon-900 select-none">
          SHUBH VIVAH
        </span>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 z-10">
        {/* Traditional Auspicious Invocation / Shloka */}
        <div className="inline-flex flex-col items-center mb-6">
          <span className="text-maroon-700 text-sm tracking-[0.2em] uppercase font-serif font-semibold">
            ॥ श्री गणेशाय नमः ॥
          </span>
          <p className="text-xs text-gold-700 mt-1 italic">
            "With the divine blessings of our ancestors and elders"
          </p>
        </div>

        {/* Section Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-maroon-900 tracking-tight mb-4">
          {weddingData.tagline}
        </h2>

        {/* Gold Ornamental Divider */}
        <OrnamentalDivider className="my-6" />

        {/* Emotional Welcome Note */}
        <div className="relative bg-white/70 backdrop-blur-sm p-8 sm:p-12 rounded-3xl border border-gold-300/40 shadow-luxury-card max-w-3xl mx-auto gold-border-corner">
          <p className="font-serif text-lg sm:text-2xl leading-relaxed text-charcoal-800 font-normal italic">
            "{weddingData.welcomeMessage}"
          </p>

          {/* Small Heart Badge */}
          <div className="mt-8 flex items-center justify-center gap-3 text-gold-600">
            <span className="h-[1px] w-12 bg-gold-300" />
            <div className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center text-maroon-700 shadow-sm">
              <Heart className="w-4 h-4 fill-maroon-600 text-maroon-600" />
            </div>
            <span className="h-[1px] w-12 bg-gold-300" />
          </div>

          <p className="mt-4 font-serif text-sm tracking-widest uppercase text-maroon-800 font-semibold">
            {weddingData.bride.name} & {weddingData.groom.name}
          </p>
        </div>
      </div>
    </section>
  );
};
