import React from 'react';
import { Phone, MessageSquare, Mail, Instagram, HelpCircle, HeartHandshake } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';

export const Contact = () => {
  return (
    <section id="contact" className="relative py-20 sm:py-28 bg-cream-50 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-gold-700 block mb-2">
            Here To Assist You
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-maroon-900 tracking-tight">
            Need Help & Coordination?
          </h2>
          <p className="text-sm sm:text-base text-charcoal-800/70 max-w-lg mx-auto mt-3">
            Have queries regarding stay, venue directions, or event schedules? Feel free to reach out to our family coordinators.
          </p>
          <OrnamentalDivider className="my-4" />
        </div>

        {/* Coordinators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {weddingData.coordinators.map((coordinator, idx) => (
            <div
              key={coordinator.side + idx}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-gold-300/40 shadow-luxury-card gold-border-corner text-center flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-maroon-50 text-maroon-800 border border-maroon-200 mb-3">
                  {coordinator.side}
                </span>

                <h3 className="font-serif text-2xl font-bold text-maroon-900 mb-1">
                  {coordinator.name}
                </h3>

                <p className="text-xs sm:text-sm text-gold-700 font-serif italic mb-6">
                  {coordinator.relation}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3">
                <a
                  href={`tel:${coordinator.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider bg-maroon-800 text-gold-100 hover:bg-maroon-900 transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-300" />
                  Call
                </a>

                <a
                  href={`https://wa.me/${coordinator.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* General Contact Quick Bar */}
        <div className="bg-gradient-to-r from-maroon-900 via-maroon-950 to-maroon-900 p-6 sm:p-8 rounded-3xl text-cream-50 text-center border border-gold-400/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="text-left">
            <h4 className="font-serif text-xl font-bold text-gold-200">
              General Inquiries & Wishes
            </h4>
            <p className="text-xs sm:text-sm text-cream-200/80">
              {weddingData.rsvpEmail} • {weddingData.city}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${weddingData.rsvpEmail}`}
              className="p-3 rounded-full bg-maroon-800 border border-gold-400/50 text-gold-300 hover:bg-maroon-700 transition-colors"
              title="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            {weddingData.instagramLink && (
              <a
                href={weddingData.instagramLink.startsWith('http') ? weddingData.instagramLink : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-maroon-800 border border-gold-400/50 text-gold-300 hover:bg-maroon-700 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
