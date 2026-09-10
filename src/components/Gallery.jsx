import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Heart } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { ImagePlaceholder } from './ImagePlaceholder';

export const Gallery = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const tags = ['All', 'Moments', 'Pre-Wedding', 'Engagement', 'Mehendi', 'Sangeet', 'Portraits'];

  const filteredPhotos = selectedTag === 'All'
    ? weddingData.gallery
    : weddingData.gallery.filter(item => item.tag === selectedTag);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextPhoto = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev + 1) % filteredPhotos.length);
    }
  }, [lightboxIndex, filteredPhotos.length]);

  const prevPhoto = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  }, [lightboxIndex, filteredPhotos.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextPhoto, prevPhoto]);

  // Prevent background scroll when Lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex]);

  return (
    <section id="gallery" className="relative py-20 sm:py-28 bg-cream-50 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-gold-700 block mb-2">
            Captured Memories
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-maroon-900 tracking-tight">
            Photo Gallery
          </h2>
          <p className="text-sm sm:text-base text-charcoal-800/70 max-w-xl mx-auto mt-3">
            A glimpse into the cherished moments, smiles, and celebrations that tell our story.
          </p>
          <OrnamentalDivider className="my-4" />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                selectedTag === tag
                  ? 'bg-maroon-800 text-gold-200 shadow-md border border-gold-400/60 scale-105'
                  : 'bg-white text-charcoal-800/80 border border-gold-200/60 hover:bg-gold-50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-luxury-card border border-gold-300/40 bg-white"
              onClick={() => openLightbox(index)}
            >
              <ImagePlaceholder
                src={photo.src}
                alt={photo.caption}
                caption={photo.tag}
                aspectRatio={index % 3 === 0 ? "aspect-[4/5]" : "aspect-square"}
                className="w-full h-full"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-maroon-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-cream-50 pointer-events-none">
                <span className="text-[11px] font-semibold text-gold-300 uppercase tracking-widest">
                  {photo.tag}
                </span>
                <p className="font-serif text-lg font-bold text-cream-50">
                  {photo.caption}
                </p>
                <div className="absolute top-4 right-4 p-2 rounded-full bg-maroon-900/60 border border-gold-400/40 text-gold-300">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-maroon-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 select-none"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-maroon-900/80 border border-gold-400/50 text-gold-200 hover:bg-maroon-800 transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-maroon-900/80 border border-gold-400/50 text-gold-200 hover:bg-maroon-800 transition-colors"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-maroon-900/80 border border-gold-400/50 text-gold-200 hover:bg-maroon-800 transition-colors"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Photo Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl border-2 border-gold-400/60 shadow-2xl">
              <ImagePlaceholder
                src={filteredPhotos[lightboxIndex].src}
                alt={filteredPhotos[lightboxIndex].caption}
                aspectRatio="aspect-auto"
                className="w-full max-h-[75vh] object-contain"
              />
            </div>

            {/* Photo Info Bar */}
            <div className="mt-4 text-center text-cream-50">
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-gold-200">
                {filteredPhotos[lightboxIndex].caption}
              </h4>
              <p className="text-xs text-gold-400/80 uppercase tracking-widest mt-1">
                {filteredPhotos[lightboxIndex].tag} • Photo {lightboxIndex + 1} of {filteredPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
