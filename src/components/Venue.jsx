import React from 'react';
import { MapPin, Navigation, Calendar, Clock, Sparkles, Building2, Car } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { generateGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

export const Venue = () => {
  const handleCalendar = () => {
    const calendarUrl = generateGoogleCalendarUrl({
      title: `Wedding: ${weddingData.bride.name} & ${weddingData.groom.name}`,
      description: `Wedding celebration at ${weddingData.venueName}.\nAddress: ${weddingData.venueAddress}`,
      location: `${weddingData.venueName}, ${weddingData.venueAddress}`,
      startDate: weddingData.countdownTarget,
      endDate: weddingData.countdownTarget,
    });
    window.open(calendarUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadIcs = () => {
    downloadIcsFile({
      title: `Wedding: ${weddingData.bride.name} & ${weddingData.groom.name}`,
      description: `Wedding celebration at ${weddingData.venueName}. Address: ${weddingData.venueAddress}`,
      location: `${weddingData.venueName}, ${weddingData.venueAddress}`,
      startDate: weddingData.countdownTarget,
      endDate: weddingData.countdownTarget,
      filename: `${weddingData.bride.name}-and-${weddingData.groom.name}-wedding.ics`,
    });
  };

  return (
    <section id="venue" className="relative py-20 sm:py-28 bg-cream-50 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-gold-700 block mb-2">
            Location & Directions
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-maroon-900 tracking-tight">
            Join Us in Celebration
          </h2>
          <OrnamentalDivider className="my-4" />
        </div>

        {/* Venue Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Venue Details Cards */}
          <div className="lg:col-span-6 space-y-6">
            {/* Main Wedding Venue Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gold-300/40 shadow-luxury-card gold-border-corner">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-maroon-50 text-maroon-700 flex items-center justify-center border border-maroon-200">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-700">
                    Main Ceremony Venue
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-maroon-900">
                    {weddingData.venueName}
                  </h3>
                </div>
              </div>

              <div className="space-y-3 text-sm text-charcoal-800/80 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{weddingData.venueAddress}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gold-600 flex-shrink-0" />
                  <p className="font-medium text-maroon-900">{weddingData.weddingDate}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gold-600 flex-shrink-0" />
                  <p>{weddingData.weddingTime}</p>
                </div>

                <div className="flex items-center gap-3 text-xs text-charcoal-800/60 pt-2 border-t border-gold-200/50">
                  <Car className="w-4 h-4 text-gold-600" />
                  <span>Valet parking available at premises</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={weddingData.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-maroon-800 to-maroon-900 text-gold-100 shadow-md hover:bg-maroon-700 transition-all duration-300"
                >
                  <Navigation className="w-4 h-4 text-gold-400" />
                  Get Directions
                </a>

                <button
                  onClick={handleCalendar}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-50 text-maroon-900 border border-gold-300 hover:bg-gold-100 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-gold-700" />
                  Add To Calendar
                </button>
              </div>
            </div>

            {/* Reception Venue Mini Card */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gold-300/40 shadow-sm">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-700 block mb-1">
                Grand Reception
              </span>
              <h4 className="font-serif text-xl font-bold text-maroon-900 mb-1">
                {weddingData.receptionVenue}
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-800/70">
                {weddingData.receptionDate} • {weddingData.receptionTime}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Map Preview */}
          <div className="lg:col-span-6 bg-white p-3 sm:p-4 rounded-3xl border border-gold-300/40 shadow-luxury-card">
            <div className="relative w-full h-[380px] sm:h-[440px] rounded-2xl overflow-hidden border border-gold-200">
              <iframe
                title="Wedding Venue Map"
                src={weddingData.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[20%] contrast-[105%]"
              />

              {/* Floating map button overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-gold-300/60 shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-maroon-700" />
                  <span className="text-xs font-medium text-maroon-900">{weddingData.venueName}</span>
                </div>
                <a
                  href={weddingData.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-gold-700 hover:text-maroon-800 underline uppercase"
                >
                  Open in Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
