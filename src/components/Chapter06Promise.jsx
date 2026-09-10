import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { ChapterFooterNav } from './ChapterFooterNav';

export const Chapter06Promise = ({ onOpenRSVP, onBackToTop }) => {
  const [imgError, setImgError] = useState(false);
  const data = weddingData.chapter06;

  const scrollToGathering = () => {
    const el = document.getElementById('chapter-04');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="chapter-06"
      className="snap-section relative w-full h-screen min-h-screen flex flex-col justify-between overflow-hidden bg-charcoal-950 text-ivory-50 select-none px-6 sm:px-12 pt-24 pb-20"
    >
      {/* Background Temple Pillars & Horizon Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, y: 15 }}
          whileInView={{ scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          {!imgError ? (
            <img
              src={data.bgImage}
              alt="Temple Architecture Horizon"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover filter brightness-[65%] contrast-[110%]"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-charcoal-900 via-charcoal-950 to-charcoal-900" />
          )}
        </motion.div>

        {/* Cinematic Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/50 via-charcoal-950/20 to-charcoal-950/90" />
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
          className="font-serif text-base sm:text-xl text-ivory-100/80 font-light leading-relaxed max-w-lg mx-auto mb-10"
        >
          {data.supportingText}
        </motion.p>

        {/* Primary Action Button: "Join our celebration" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col items-center gap-6"
        >
          <button
            onClick={onOpenRSVP}
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-ivory-100 text-charcoal-900 text-xs sm:text-sm font-medium tracking-ultra-wide uppercase shadow-2xl hover:bg-white active:scale-95 transition-all duration-300"
          >
            <span>{data.ctaButton}</span>
            <ArrowRight className="w-4 h-4 text-antiqueGold group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Subtitle / Details link */}
          <button
            onClick={scrollToGathering}
            className="group inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-mega-wide uppercase text-ivory-100/60 hover:text-ivory-100 transition-colors"
          >
            <span>{data.detailsLink}</span>
            <ArrowDown className="w-3 h-3 text-antiqueGold group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Chapter Footer Navigation */}
      <ChapterFooterNav
        chapterNumber={data.number}
        chapterLabel={data.label}
        isLast={true}
        theme="light"
        onBackToTop={onBackToTop}
      />
    </section>
  );
};
