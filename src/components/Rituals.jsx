import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';

export const Rituals = () => {
  return (
    <section id="rituals" className="relative py-20 sm:py-28 bg-cream-100 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-gold-700 block mb-2">
            Sacred Traditions
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-maroon-900 tracking-tight">
            Auspicious Wedding Rituals
          </h2>
          <p className="text-sm sm:text-base text-charcoal-800/70 max-w-xl mx-auto mt-3">
            Every timeless Indian wedding custom holds deep symbolic meaning, blessing the couple with lifelong happiness, prosperity, and spiritual bond.
          </p>
          <OrnamentalDivider className="my-4" />
        </div>

        {/* Rituals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {weddingData.rituals.map((ritual, idx) => (
            <div
              key={ritual.name + idx}
              className="group relative bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-gold-300/40 shadow-luxury-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 gold-border-corner flex flex-col justify-between"
            >
              <div>
                {/* Traditional Ritual Emoji / Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-100 to-blush-100 border border-gold-300/60 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  {ritual.icon}
                </div>

                {/* Ritual Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon-900 mb-2">
                  {ritual.name}
                </h3>

                {/* Ritual Significance */}
                <p className="text-xs sm:text-sm text-charcoal-800/80 leading-relaxed font-light">
                  {ritual.significance}
                </p>
              </div>

              {/* Bottom Decorative Motif */}
              <div className="pt-4 mt-4 border-t border-gold-200/40 flex items-center justify-between text-gold-600 text-xs">
                <span className="italic font-serif">Sacred Rite</span>
                <span>❖</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
