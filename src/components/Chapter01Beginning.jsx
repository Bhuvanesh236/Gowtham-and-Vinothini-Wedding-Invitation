import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { ChapterFooterNav } from './ChapterFooterNav';

export const Chapter01Beginning = ({ onNextChapter }) => {
  const [imgError, setImgError] = useState(false);
  const data = weddingData.chapter01;

  return (
    <section
      id="chapter-01"
      className="snap-section relative w-full h-screen min-h-screen flex flex-col justify-between overflow-hidden bg-ivory-100 text-charcoal-900 select-none px-6 sm:px-12 pt-24 pb-20"
    >
      {/* Background Architectural Temple Gopuram Layer (Positioned toward the lower portion) */}
      <div className="absolute inset-0 z-0 flex items-end justify-center pointer-events-none overflow-hidden">
        {/* Soft radial wash over sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory-100 via-ivory-100/90 to-transparent z-10" />

        {/* Temple Gopuram Image */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 1.05 }}
          animate={{ opacity: 0.85, y: 0, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl h-[55vh] sm:h-[65vh] relative opacity-85 mix-blend-multiply"
        >
          {!imgError ? (
            <img
              src={data.bgImage}
              alt="South Indian Temple Gopuram"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-bottom filter contrast-[105%] brightness-[98%]"
            />
          ) : (
            /* Elegant architectural SVG fallback if external image fails */
            <div className="w-full h-full flex items-end justify-center text-charcoal-900/20">
              <svg viewBox="0 0 600 400" className="w-full max-w-3xl h-full fill-current" preserveAspectRatio="xMidYMax slice">
                <path d="M250,400 L250,180 L270,180 L270,120 L285,120 L285,70 L295,70 L295,30 L305,30 L305,70 L315,70 L315,120 L330,120 L330,180 L350,180 L350,400 Z" />
                <path d="M180,400 L180,240 L210,240 L210,180 L230,180 L230,400 Z" opacity="0.6"/>
                <path d="M370,400 L370,180 L390,180 L390,240 L420,240 L420,400 Z" opacity="0.6"/>
                <circle cx="300" cy="20" r="5" />
              </svg>
            </div>
          )}

          {/* Bottom fade into background */}
          <div className="absolute inset-0 bg-gradient-to-t from-ivory-100 via-transparent to-transparent" />
        </motion.div>
      </div>

      {/* Main Editorial Text Content */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center my-auto pt-4 sm:pt-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[10px] sm:text-xs tracking-ultra-wide uppercase font-medium text-stoneMuted mb-6 sm:mb-8"
        >
          {data.eyebrow}
        </motion.div>

        {/* Large Elegant High-Contrast Serif Names */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="flex flex-col items-center my-2 sm:my-4"
        >
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-charcoal-900 leading-none">
            {weddingData.groom}
          </h1>

          <span className="font-serif italic text-2xl sm:text-3xl text-antiqueGold my-2 sm:my-3 font-light">
            &amp;
          </span>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-charcoal-900 leading-none">
            {weddingData.bride}
          </h1>
        </motion.div>

        {/* Subtitle Lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-6 sm:mt-8 space-y-1 font-serif text-base sm:text-xl text-charcoal-800/90 font-light italic"
        >
          <p>{data.line1}</p>
          <p>{data.line2}</p>
        </motion.div>

        {/* Date & Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 sm:mt-10 flex flex-col items-center gap-2"
        >
          <div className="text-xs sm:text-sm tracking-ultra-wide uppercase font-medium text-charcoal-900">
            {weddingData.dates}
          </div>
          <div className="text-[10px] sm:text-xs tracking-mega-wide uppercase font-light text-stoneMuted">
            {weddingData.location}
          </div>
        </motion.div>
      </div>

      {/* Chapter Footer Navigation */}
      <ChapterFooterNav
        chapterNumber={data.number}
        chapterLabel={data.label}
        theme="dark"
        onNextChapter={onNextChapter}
      />
    </section>
  );
};
