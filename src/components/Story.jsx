import React from 'react';
import { Sparkles, Heart, Flame, Gem, Crown, CheckCircle2 } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';

const iconMap = {
  Sparkles: Sparkles,
  Heart: Heart,
  Flame: Flame,
  Gem: Gem,
  Crown: Crown,
};

export const Story = () => {
  return (
    <section id="story" className="relative py-20 sm:py-28 bg-cream-100 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-gold-700 block mb-2">
            How Forever Began
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-maroon-900 tracking-tight">
            Our Love Story
          </h2>
          <OrnamentalDivider className="my-4" />
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Vertical Line (Desktop & Mobile) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-300 via-maroon-400 to-gold-400 -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-12 sm:space-y-16">
            {weddingData.story.map((item, index) => {
              const IconComponent = iconMap[item.icon] || Heart;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.year + index}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Content Card */}
                  <div className={`w-full md:w-[calc(50%-40px)] pl-14 md:pl-0 ${
                    isEven ? 'md:text-left' : 'md:text-right'
                  }`}>
                    <div className="group bg-white p-6 sm:p-8 rounded-2xl border border-gold-300/40 shadow-luxury-card hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 relative gold-border-corner">
                      {/* Year Badge */}
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-serif font-bold tracking-wider bg-gold-100 text-maroon-900 border border-gold-300 mb-2">
                        {item.year}
                      </span>

                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-maroon-900 mb-2">
                        {item.title}
                      </h3>

                      <p className="text-sm sm:text-base text-charcoal-800/80 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Central Node / Icon Badge */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-maroon-800 to-maroon-600 border-2 border-gold-300 text-gold-200 shadow-md flex items-center justify-center transition-transform duration-300 hover:scale-110">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Empty Spacer on opposite side for desktop balance */}
                  <div className="hidden md:block w-[calc(50%-40px)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
