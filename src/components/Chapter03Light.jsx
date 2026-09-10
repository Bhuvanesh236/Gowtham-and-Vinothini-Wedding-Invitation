import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { ChapterFooterNav } from './ChapterFooterNav';

export const Chapter03Light = ({ onNextChapter }) => {
  const [imgError, setImgError] = useState(false);
  const data = weddingData.chapter03;

  return (
    <section
      id="chapter-03"
      className="snap-section relative w-full h-screen min-h-screen flex flex-col justify-between overflow-hidden bg-sand-100 text-charcoal-900 select-none px-6 sm:px-12 pt-24 pb-20"
    >
      {/* Background Bright Courtyard & Stone Pillars */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08, opacity: 0.7 }}
          whileInView={{ scale: 1, opacity: 0.85 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          {!imgError ? (
            <img
              src={data.bgImage}
              alt="South Indian Temple Courtyard"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover filter contrast-[102%] brightness-[105%]"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-sand-100 via-ivory-200 to-sand-100" />
          )}
        </motion.div>

        {/* Soft Sunlit Warm Ivory Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory-100/75 via-ivory-100/40 to-ivory-100/85" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-3xl mx-auto w-full text-center flex flex-col items-center my-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[10px] sm:text-xs tracking-ultra-wide uppercase font-medium text-stoneMuted mb-6"
        >
          {data.eyebrow}
        </motion.div>

        {/* Large Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-serif leading-tight mb-6"
        >
          <span className="block text-4xl sm:text-6xl md:text-7xl font-light text-charcoal-900 tracking-tight">
            {data.heading}
          </span>
          <span className="block text-4xl sm:text-6xl md:text-7xl font-light italic text-antiqueGold mt-1">
            {data.italicLine}
          </span>
        </motion.div>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-serif text-base sm:text-xl text-charcoal-800/90 font-light leading-relaxed max-w-lg mx-auto"
        >
          {data.supportingText}
        </motion.p>
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
