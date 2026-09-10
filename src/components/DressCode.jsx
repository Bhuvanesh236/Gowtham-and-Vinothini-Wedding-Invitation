import React from 'react';
import { Sparkles, Shirt, Crown, Palette } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';

export const DressCode = () => {
  const { men, women, title, subtitle } = weddingData.dressCode;

  return (
    <section id="dress-code" className="relative py-20 sm:py-28 bg-cream-100 overflow-hidden text-center">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 z-10">
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-gold-700 block mb-2">
            Attire Inspiration
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-maroon-900 tracking-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-charcoal-800/70 max-w-xl mx-auto mt-3">
            {subtitle}
          </p>
          <OrnamentalDivider className="my-4" />
        </div>

        {/* Dress Code Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Men's Card */}
          <div className="bg-white p-8 rounded-3xl border border-gold-300/40 shadow-luxury-card gold-border-corner text-left flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gold-100 text-maroon-900 flex items-center justify-center mb-6 border border-gold-300">
                <Shirt className="w-6 h-6 text-maroon-800" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-maroon-900 mb-2">
                {men.title}
              </h3>

              <p className="text-sm text-charcoal-800/80 leading-relaxed mb-6 font-light">
                {men.recommendations}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gold-700 uppercase tracking-wider mb-2">
                <Palette className="w-3.5 h-3.5" />
                <span>Suggested Color Palette</span>
              </div>
              <div className="flex items-center gap-2.5">
                {men.palette.map((color, index) => (
                  <div
                    key={index}
                    className="w-7 h-7 rounded-full border border-gold-400/40 shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Women's Card */}
          <div className="bg-white p-8 rounded-3xl border border-gold-300/40 shadow-luxury-card gold-border-corner text-left flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blush-100 text-maroon-900 flex items-center justify-center mb-6 border border-gold-300">
                <Crown className="w-6 h-6 text-maroon-800" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-maroon-900 mb-2">
                {women.title}
              </h3>

              <p className="text-sm text-charcoal-800/80 leading-relaxed mb-6 font-light">
                {women.recommendations}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gold-700 uppercase tracking-wider mb-2">
                <Palette className="w-3.5 h-3.5" />
                <span>Suggested Color Palette</span>
              </div>
              <div className="flex items-center gap-2.5">
                {women.palette.map((color, index) => (
                  <div
                    key={index}
                    className="w-7 h-7 rounded-full border border-gold-400/40 shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
