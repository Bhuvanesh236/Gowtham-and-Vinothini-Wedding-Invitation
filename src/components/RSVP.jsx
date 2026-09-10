import React, { useState } from 'react';
import { Heart, Send, CheckCircle2, MessageSquare, Phone, Users, CalendarCheck, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { triggerLuxuryConfetti } from '../utils/confetti';

export const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guestsCount: '2',
    attendingEvents: ['wedding', 'reception'],
    dietary: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCheckboxChange = (eventId) => {
    setFormData((prev) => {
      const exists = prev.attendingEvents.includes(eventId);
      const updated = exists
        ? prev.attendingEvents.filter((id) => id !== eventId)
        : [...prev.attendingEvents, eventId];
      return { ...prev, attendingEvents: updated };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your contact phone number.';
    } else if (!/^[0-9+ \-()]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (formData.attendingEvents.length === 0) {
      newErrors.events = 'Please select at least one event you will attend.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      existing.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem('wedding_rsvps', JSON.stringify(existing));
    } catch {
      // ignore storage errors
    }

    triggerLuxuryConfetti();
    setIsSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const eventsAttended = formData.attendingEvents.join(', ');
    const text = encodeURIComponent(
      `💍 *Wedding RSVP Confirmation*\n\n` +
      `*Guest Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Total Guests:* ${formData.guestsCount}\n` +
      `*Attending Events:* ${eventsAttended}\n` +
      (formData.message ? `*Wishes:* ${formData.message}\n` : '') +
      `\nWe are looking forward to celebrating with ${weddingData.bride.name} & ${weddingData.groom.name}!`
    );

    const cleanNumber = weddingData.rsvpWhatsapp.replace(/[^0-9]/g, '');
    const url = cleanNumber
      ? `https://wa.me/${cleanNumber}?text=${text}`
      : `https://wa.me/?text=${text}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="rsvp" className="relative py-20 sm:py-28 bg-gradient-to-b from-cream-50 via-blush-50/40 to-cream-100 overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-gold-700 block mb-2">
            Celebrate With Us
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-maroon-900 tracking-tight">
            Will You Join Us?
          </h2>
          <p className="text-sm sm:text-base text-charcoal-800/70 max-w-lg mx-auto mt-3">
            Kindly confirm your presence so we can make the most wonderful arrangements for you and your family.
          </p>
          <OrnamentalDivider className="my-4" />
        </div>

        {/* RSVP Form Card */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gold-300/40 shadow-luxury-card gold-border-corner">
          {isSubmitted ? (
            /* Success State */
            <div className="text-center py-12 px-4 space-y-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-maroon-800 to-maroon-600 text-gold-200 border-2 border-gold-300 mx-auto flex items-center justify-center shadow-lg animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="font-serif text-3xl font-bold text-maroon-900">
                Thank you, {formData.name}!
              </h3>

              <p className="text-base text-charcoal-800/80 max-w-md mx-auto italic font-serif leading-relaxed">
                "We can't wait to celebrate our special day with you. Your presence will make our union truly memorable."
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send Confirmation via WhatsApp
                </button>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full sm:w-auto inline-flex items-center justify-center py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider bg-cream-100 text-maroon-900 border border-gold-300 hover:bg-cream-200 transition-colors"
                >
                  Submit Another RSVP
                </button>
              </div>
            </div>
          ) : (
            /* RSVP Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Guest Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-maroon-900 mb-2">
                    Your Full Name <span className="text-maroon-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aditi Sharma & Family"
                    className={`w-full px-4 py-3 rounded-xl border bg-cream-50/50 text-charcoal-800 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 ${
                      errors.name ? 'border-red-400 bg-red-50/20' : 'border-gold-300/60'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-maroon-900 mb-2">
                    Contact Phone / WhatsApp <span className="text-maroon-600">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full px-4 py-3 rounded-xl border bg-cream-50/50 text-charcoal-800 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 ${
                      errors.phone ? 'border-red-400 bg-red-50/20' : 'border-gold-300/60'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-maroon-900 mb-2">
                  Number of Guests Attending
                </label>
                <div className="grid grid-cols-5 gap-2 sm:gap-4">
                  {['1', '2', '3', '4', '5+'].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({ ...formData, guestsCount: num })}
                      className={`py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                        formData.guestsCount === num
                          ? 'bg-maroon-800 text-gold-200 border-maroon-900 shadow-md scale-105'
                          : 'bg-cream-50/70 text-charcoal-800 border-gold-200 hover:bg-gold-50'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Events Attending */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-maroon-900 mb-3">
                  Events You Will Attend <span className="text-maroon-600">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {weddingData.events.map((event) => {
                    const isChecked = formData.attendingEvents.includes(event.id);
                    return (
                      <label
                        key={event.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                          isChecked
                            ? 'bg-maroon-50/80 border-maroon-400 text-maroon-900 shadow-sm'
                            : 'bg-white border-gold-200/80 text-charcoal-800/80 hover:bg-cream-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(event.id)}
                          className="w-4 h-4 text-maroon-700 rounded accent-maroon-700"
                        />
                        <span className="text-xs font-medium font-serif">{event.name}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.events && <p className="text-xs text-red-600 mt-2">{errors.events}</p>}
              </div>

              {/* Warm Wishes / Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-maroon-900 mb-2">
                  Warm Wishes & Blessings for the Couple (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Leave a heartfelt message or note..."
                  className="w-full px-4 py-3 rounded-xl border border-gold-300/60 bg-cream-50/50 text-charcoal-800 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-full text-sm font-semibold uppercase tracking-widest bg-gradient-to-r from-maroon-800 via-maroon-700 to-maroon-900 text-gold-100 shadow-maroon-glow hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <Heart className="w-4 h-4 fill-gold-400 text-gold-400" />
                  <span>Confirm Attendance ❤️</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
