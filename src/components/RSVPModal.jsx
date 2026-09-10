import React, { useState, useEffect } from 'react';
import { weddingData } from '../data/weddingData';

export const RSVPModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('yes');
  const [guests, setGuests] = useState('2 guests');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const storageKey = 'gowtham-vinothini-rsvp-preview-v1';

  // Load existing preview reply on open
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved) {
        if (saved.name) setName(saved.name);
        if (saved.attendance) setAttendance(saved.attendance);
        if (saved.guests) setGuests(saved.guests);
        if (saved.message) setMessage(saved.message);
      }
    } catch {
      // ignore
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const payload = {
      name: name.trim(),
      attendance,
      guests,
      message: message.trim(),
      updatedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(storageKey, JSON.stringify(payload));
      setStatusMessage(
        `Thank you, ${name.trim()}. Your preview reply is saved on this device. Nothing has been sent to the couple.`
      );
    } catch {
      setStatusMessage(
        "Your browser couldn’t save this preview. Nothing has been sent to the couple."
      );
    }
  };

  return (
    <div className="editorial-dialog-backdrop" onClick={onClose}>
      <div
        className="editorial-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rsvp-title"
      >
        <button
          type="button"
          className="dialog-close"
          onClick={onClose}
          aria-label="Close RSVP"
        >
          ×
        </button>

        <p className="small-label">{weddingData.groom} &amp; {weddingData.bride}</p>

        <h2 id="rsvp-title">
          A place <em>for you.</em>
        </h2>

        <p className="demo-note">
          Preview invitation: your reply is saved on this device only and isn’t sent to the couple.
        </p>

        <form onSubmit={handleSubmit} id="rsvp-form" className="space-y-4">
          <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-900">
            Your name
            <input
              name="name"
              required
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="mt-2 block w-full px-3 py-2.5 bg-[#faf7f0] border border-[#c5bbaa] text-sm text-charcoal-900 focus:outline-none focus:border-[#aa8752]"
            />
          </label>

          <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-900">
            Will you join us?
            <select
              name="attendance"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className="mt-2 block w-full px-3 py-2.5 bg-[#faf7f0] border border-[#c5bbaa] text-sm text-charcoal-900 focus:outline-none focus:border-[#aa8752]"
            >
              <option value="yes">Joyfully accept</option>
              <option value="no">Sending love from afar</option>
            </select>
          </label>

          {attendance === 'yes' && (
            <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-900">
              Number of guests
              <select
                name="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="mt-2 block w-full px-3 py-2.5 bg-[#faf7f0] border border-[#c5bbaa] text-sm text-charcoal-900 focus:outline-none focus:border-[#aa8752]"
              >
                <option value="1 guest">1 guest</option>
                <option value="2 guests">2 guests</option>
                <option value="3 guests">3 guests</option>
                <option value="4 guests">4 guests</option>
                <option value="5 guests">5 guests</option>
                <option value="6 guests">6 guests</option>
              </select>
            </label>
          )}

          <label className="block text-xs font-medium uppercase tracking-wider text-charcoal-900">
            A little note
            <textarea
              name="message"
              rows={3}
              maxLength={500}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="A blessing, dietary needs, or anything you’d like us to know"
              className="mt-2 block w-full px-3 py-2.5 bg-[#faf7f0] border border-[#c5bbaa] text-sm text-charcoal-900 focus:outline-none focus:border-[#aa8752]"
            />
          </label>

          <button
            type="submit"
            className="rsvp-button w-full mt-4"
          >
            Save my preview reply <span aria-hidden="true">↗</span>
          </button>

          {statusMessage && (
            <p id="rsvp-status" className="text-xs text-[#486147] mt-3 font-medium leading-relaxed" role="status">
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
