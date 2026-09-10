import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { ChapterFooterNav } from './ChapterFooterNav';

export const Chapter04Gathering = ({ onNextChapter }) => {
  const [imgError, setImgError] = useState(false);
  const data = weddingData.chapter04;

  return (
    <section
      id="chapter-04"
      className="snap-section relative w-full h-screen min-h-screen flex flex-col justify-between overflow-hidden bg-ivory-100 text-charcoal-900 select-none px-6 sm:px-12 pt-24 pb-20"
    >
      {/* Background Architectural Texture with Soft Ivory Wash */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30 mix-blend-multiply">
        {!imgError ? (
          <img
            src={data.bgImage}
            alt="Temple Hall"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover filter contrast-[105%] brightness-[100%]"
          />
        ) : null}
      </div>

      {/* Main Editorial Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center my-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-[10px] sm:text-xs tracking-ultra-wide uppercase font-medium text-stoneMuted mb-4"
        >
          {data.eyebrow}
        </motion.div>

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="font-serif leading-tight mb-8 sm:mb-12"
        >
          <span className="block text-3xl sm:text-5xl md:text-6xl font-light text-charcoal-900 tracking-tight">
            {data.heading}
          </span>
          <span className="block text-3xl sm:text-5xl md:text-6xl font-light italic text-antiqueGold mt-1">
            {data.italicLine}
          </span>
        </motion.div>

        {/* Minimalist Editorial Events Layout (Thin dividers & clean typography) */}
        <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6">
          {data.events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4 + idx * 0.15 }}
              className="py-3 sm:py-4 border-b border-charcoal-900/15 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 text-left"
            >
              {/* Event Badge & Date/Time */}
              <div className="flex items-baseline gap-3">
                <span className="text-[10px] sm:text-xs tracking-ultra-wide uppercase font-semibold text-antiqueGold">
                  {event.label}
                </span>
                <span className="text-[10px] sm:text-xs tracking-wider uppercase text-stoneMuted">
                  {event.date} · {event.time}
                </span>
              </div>

              {/* Event Title */}
              <div className="font-serif text-lg sm:text-2xl font-light text-charcoal-900 tracking-wide sm:text-right">
                {event.title}
              </div>
            </motion.div>
          ))}
        </div>
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
