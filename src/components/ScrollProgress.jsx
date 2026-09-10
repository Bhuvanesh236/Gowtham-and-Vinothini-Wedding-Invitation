import React from 'react';

export const ScrollProgress = ({ activeChapter = 1, onSelectChapter }) => {
  const chapters = [
    { num: 1, id: 'chapter-01', label: '01' },
    { num: 2, id: 'chapter-02', label: '02' },
    { num: 3, id: 'chapter-03', label: '03' },
    { num: 4, id: 'chapter-04', label: '04' },
    { num: 5, id: 'chapter-05', label: '05' },
    { num: 6, id: 'chapter-06', label: '06' },
  ];

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-4 pointer-events-auto">
      {chapters.map((ch) => (
        <button
          key={ch.id}
          onClick={() => onSelectChapter(ch.id)}
          className="group relative flex items-center justify-center p-1.5 focus:outline-none"
          aria-label={`Jump to Chapter ${ch.label}`}
        >
          {/* Subtle line dot */}
          <span
            className={`w-1.5 rounded-full transition-all duration-300 ${
              activeChapter === ch.num
                ? 'h-6 bg-antiqueGold shadow-sm'
                : 'h-1.5 bg-charcoal-900/30 group-hover:bg-charcoal-900/60'
            }`}
          />

          {/* Hover Chapter Tooltip */}
          <span className="absolute right-6 px-2 py-1 bg-charcoal-900 text-ivory-100 text-[9px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow">
            {ch.label}
          </span>
        </button>
      ))}
    </div>
  );
};
