import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, Gem, Sun, Flower2, Music, HeartHandshake, PartyPopper, ExternalLink } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { generateGoogleCalendarUrl } from '../utils/calendar';

const iconMap = {
  Gem: Gem,
  Sun: Sun,
  Flower2: Flower2,
  Music: Music,
  HeartHandshake: HeartHandshake,
  PartyPopper: PartyPopper,
};

export const Events = () => {
  const handleAddToCalendar = (event) => {
    const calendarUrl = generateGoogleCalendarUrl({
      title: `${event.name} — ${weddingData.bride.name} & ${weddingData.groom.name}`,
      description: `${event.description}\nDress Code: ${event.dressCode}\nVenue: ${event.venue}`,
      location: `${event.venue}, ${weddingData.city}`,
    });
    window.open(calendarUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="events" className="relative py-20 sm:py-28 bg-cream-50 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-gold-700 block mb-2">
            Wedding Itinerary
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-maroon-900 tracking-tight">
            Ceremonies & Celebrations
          </h2>
          <p className="text-sm sm:text-base text-charcoal-800/70 max-w-xl mx-auto mt-3">
            Join us in the vibrant rituals, soulful music, dance, and joyous festivities leading up to our big day.
          </p>
          <OrnamentalDivider className="my-4" />
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {weddingData.events.map((event) => {
            const IconComponent = iconMap[event.icon] || Sparkles;

            return (
              <div
                key={event.id}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-gold-300/40 shadow-luxury-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between gold-border-corner"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-maroon-800 to-maroon-600 text-gold-200 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-gold-100 text-maroon-900 border border-gold-300">
                      {event.dressCode ? event.dressCode.split('/')[0] : 'Ethnic'}
                    </span>
                  </div>

                  {/* Event Title */}
                  <h3 className="font-serif text-2xl font-bold text-maroon-900 mb-3 tracking-wide">
                    {event.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-charcoal-800/80 leading-relaxed mb-6 font-light">
                    {event.description}
                  </p>

                  {/* Metadata List */}
                  <div className="space-y-2.5 text-xs text-charcoal-800 border-t border-gold-200/50 pt-4 mb-6">
                    <div className="flex items-center gap-2.5 text-maroon-800 font-medium">
                      <Calendar className="w-4 h-4 text-gold-600 flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>

                    <div className="flex items-center gap-2.5 text-maroon-800">
                      <Clock className="w-4 h-4 text-gold-600 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-start gap-2.5 text-charcoal-800/80">
                      <MapPin className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => handleAddToCalendar(event)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gold-50 text-maroon-900 border border-gold-300/80 hover:bg-gold-100 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-gold-700" />
                    <span>Calendar</span>
                  </button>

                  <a
                    href={weddingData.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center p-2.5 rounded-xl bg-maroon-50 text-maroon-700 border border-maroon-200 hover:bg-maroon-100 transition-colors"
                    title="Get Directions on Google Maps"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
