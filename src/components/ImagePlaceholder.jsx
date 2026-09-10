import React, { useState } from 'react';
import { Heart, Sparkles, Image as ImageIcon } from 'lucide-react';

export const ImagePlaceholder = ({
  src,
  alt = "Wedding Photo",
  className = "",
  aspectRatio = "aspect-square",
  caption = "",
  initials = "❤️",
  overlay = true,
  onClick = null,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden group bg-gradient-to-b from-maroon-900/10 to-maroon-950/20 rounded-2xl border border-gold-300/40 shadow-luxury-card ${aspectRatio} ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
      ) : null}

      {/* Fallback Luxury Artwork when image is missing or loading */}
      {(hasError || !src || !isLoaded) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-cream-100 via-blush-50 to-cream-200">
          <div className="relative mb-3 flex items-center justify-center">
            {/* Ornamental ring */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-gold-400/60 flex items-center justify-center bg-maroon-900/5 group-hover:rotate-45 transition-transform duration-700">
              <span className="font-serif text-2xl sm:text-3xl text-maroon-700 font-bold">{initials}</span>
            </div>
            <Sparkles className="w-4 h-4 text-gold-500 absolute -top-1 -right-1 animate-pulse" />
          </div>

          <p className="font-serif text-maroon-900 font-medium text-base sm:text-lg tracking-wide">
            {alt}
          </p>
          {caption && (
            <p className="text-xs text-maroon-700/70 mt-1 font-light italic">
              {caption}
            </p>
          )}

          <div className="mt-3 flex items-center gap-1.5 text-xs text-gold-600 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-300/40">
            <Heart className="w-3 h-3 fill-gold-500 text-gold-500" />
            <span>Cherished Moment</span>
          </div>
        </div>
      )}

      {/* Subtle gold frame inner border */}
      <div className="pointer-events-none absolute inset-2 border border-gold-400/20 rounded-xl transition-all duration-300 group-hover:border-gold-400/50" />
    </div>
  );
};
