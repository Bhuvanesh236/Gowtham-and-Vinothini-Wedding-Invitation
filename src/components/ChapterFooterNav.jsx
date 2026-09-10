import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

export const ChapterFooterNav = ({
  chapterNumber,
  chapterLabel,
  isLast = false,
  theme = 'dark', // 'dark' text for ivory background, 'light' for dark photographic backgrounds
  onBackToTop = null,
  onNextChapter = null,
}) => {
  const textColor = theme === 'light' ? 'text-ivory-50/90' : 'text-charcoal-900/80';
  const subColor = theme === 'light' ? 'text-ivory-100/70' : 'text-stoneMuted';
  const accentColor = theme === 'light' ? 'text-antiqueGold-light' : 'text-antiqueGold';

  return (
    <footer className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 right-6 sm:right-12 z-20 flex items-end justify-between pointer-events-none">
      {/* Bottom Left: Chapter Number and Label */}
      <div className="flex flex-col items-start">
        <span className={`text-xs sm:text-sm font-serif font-light tracking-widest ${accentColor} mb-0.5`}>
          {chapterNumber}
        </span>
        <span className={`text-[10px] sm:text-xs tracking-ultra-wide uppercase font-medium ${textColor}`}>
          {chapterLabel}
        </span>
      </div>

      {/* Bottom Right: Scroll to Unfold / Back to Beginning */}
      <div className="pointer-events-auto">
        {isLast ? (
          <button
            onClick={onBackToTop}
            className={`group flex items-center gap-2 text-[10px] sm:text-xs tracking-ultra-wide uppercase font-medium ${textColor} hover:${accentColor} transition-colors`}
          >
            <span>BACK TO THE BEGINNING</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform text-antiqueGold" />
          </button>
        ) : (
          <button
            onClick={onNextChapter}
            className={`group flex items-center gap-2 text-[10px] sm:text-xs tracking-ultra-wide uppercase font-medium ${subColor} hover:${textColor} transition-colors`}
          >
            <span>SCROLL TO UNFOLD</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform text-antiqueGold animate-bounce" />
          </button>
        )}
      </div>
    </footer>
  );
};
