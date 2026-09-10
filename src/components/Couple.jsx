import React from 'react';
import { Heart, Instagram, Sparkles, UserCheck } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { ImagePlaceholder } from './ImagePlaceholder';

export const Couple = () => {
  return (
    <section id="couple" className="relative py-20 sm:py-28 bg-gradient-to-b from-cream-50 via-cream-100 to-cream-50 overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-400/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-gold-700 block mb-2">
            The Happy Couple
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-maroon-900 tracking-tight">
            Bride & Groom
          </h2>
          <OrnamentalDivider className="my-4" />
        </div>

        {/* Couple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center relative">
          {/* Central Decorative '&' Icon for Desktop */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-gradient-to-tr from-maroon-800 to-maroon-600 border-2 border-gold-300 text-gold-200 shadow-xl items-center justify-center font-serif text-2xl italic font-bold">
            &
          </div>

          {/* Bride Card */}
          <div className="group relative bg-white rounded-3xl p-6 sm:p-8 border border-gold-300/40 shadow-luxury-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 text-center gold-border-corner">
            <div className="mb-4 inline-block px-4 py-1 rounded-full bg-maroon-50 text-maroon-700 text-xs font-semibold uppercase tracking-widest border border-maroon-200">
              The Bride
            </div>

            {/* Bride Photo / Placeholder */}
            <div className="max-w-xs mx-auto mb-6">
              <ImagePlaceholder
                src={weddingData.bride.photo}
                alt={weddingData.bride.name}
                initials="👰"
                aspectRatio="aspect-[4/5]"
                className="arch-top border-2 border-gold-400/50 shadow-md"
              />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-900 tracking-wide mb-1">
              {weddingData.bride.name}
            </h3>

            <p className="text-sm font-serif italic text-gold-700 font-medium mb-3">
              Daughter of {weddingData.bride.parents}
            </p>

            <p className="text-sm text-charcoal-800/80 leading-relaxed max-w-sm mx-auto mb-6">
              {weddingData.bride.bio}
            </p>

            {weddingData.bride.instagram && (
              <a
                href={weddingData.bride.instagram.startsWith('http') ? weddingData.bride.instagram : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-maroon-700 hover:text-gold-700 transition-colors bg-blush-50 px-4 py-2 rounded-full border border-gold-200"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Connect with the Bride</span>
              </a>
            )}
          </div>

          {/* Groom Card */}
          <div className="group relative bg-white rounded-3xl p-6 sm:p-8 border border-gold-300/40 shadow-luxury-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 text-center gold-border-corner">
            <div className="mb-4 inline-block px-4 py-1 rounded-full bg-maroon-50 text-maroon-700 text-xs font-semibold uppercase tracking-widest border border-maroon-200">
              The Groom
            </div>

            {/* Groom Photo / Placeholder */}
            <div className="max-w-xs mx-auto mb-6">
              <ImagePlaceholder
                src={weddingData.groom.photo}
                alt={weddingData.groom.name}
                initials="🤵"
                aspectRatio="aspect-[4/5]"
                className="arch-top border-2 border-gold-400/50 shadow-md"
              />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-900 tracking-wide mb-1">
              {weddingData.groom.name}
            </h3>

            <p className="text-sm font-serif italic text-gold-700 font-medium mb-3">
              Son of {weddingData.groom.parents}
            </p>

            <p className="text-sm text-charcoal-800/80 leading-relaxed max-w-sm mx-auto mb-6">
              {weddingData.groom.bio}
            </p>

            {weddingData.groom.instagram && (
              <a
                href={weddingData.groom.instagram.startsWith('http') ? weddingData.groom.instagram : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-maroon-700 hover:text-gold-700 transition-colors bg-blush-50 px-4 py-2 rounded-full border border-gold-200"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Connect with the Groom</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
