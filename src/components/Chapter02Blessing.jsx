import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { ChapterFooterNav } from './ChapterFooterNav';

export const Chapter02Blessing = ({ onNextChapter }) => {
  const [imgError, setImgError] = useState(false);
  const data = weddingData.chapter02;

  return (
    <section
      id="chapter-02"
      className="snap-section relative w-full h-screen min-h-screen flex flex-col justify-between overflow-hidden bg-charcoal-950 text-ivory-50 select-none px-6 sm:px-12 pt-24 pb-20"
    >
      {/* Background South Indian Temple Corridor & Pillars */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, y: 30 }}
          whileInView={{ scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          {!imgError ? (
            <img
              src={data.bgImage}
              alt="South Indian Temple Corridor"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover filter brightness-[75%] contrast-[110%]"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-charcoal-900 via-charcoal-950 to-charcoal-900 flex items-center justify-center">
              <div className="w-full h-full opacity-20 bg-[radial-gradient(#B29A6A_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>
          )}
        </motion.div>

        {/* Cinematic Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/40 via-transparent to-charcoal-950/85" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-charcoal-950/30 to-charcoal-950/70" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-3xl mx-auto w-full text-center flex flex-col items-center my-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[10px] sm:text-xs tracking-ultra-wide uppercase font-medium text-antiqueGold-light mb-6"
        >
          {data.eyebrow}
        </motion.div>

        {/* Large Statement Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-serif leading-tight mb-6"
        >
          <span className="block text-4xl sm:text-6xl md:text-7xl font-light text-ivory-50 tracking-tight">
            {data.heading}
          </span>
          <span className="block text-4xl sm:text-6xl md:text-7xl font-light italic text-antiqueGold-light mt-1">
            {data.italicLine}
          </span>
        </motion.div>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-serif text-base sm:text-xl text-ivory-100/80 font-light leading-relaxed max-w-xl mx-auto"
        >
          {data.supportingText}
        </motion.p>
      </div>

      {/* Chapter Footer Navigation */}
      <ChapterFooterNav
        chapterNumber={data.number}
        chapterLabel={data.label}
        theme="light"
        onNextChapter={onNextChapter}
      />
    </section>
  );
};
