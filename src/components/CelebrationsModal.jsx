import React, { useEffect } from 'react';
import { weddingData } from '../data/weddingData';
import { downloadIcsFile } from '../utils/calendar';

export const CelebrationsModal = ({ isOpen, onClose, onOpenRSVP }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadCalendar = () => {
    downloadIcsFile({
      title: `Wedding of ${weddingData.groom} & ${weddingData.bride}`,
      description: `Wedding celebration of ${weddingData.groom} & ${weddingData.bride} in ${weddingData.locationFormatted}.`,
      location: weddingData.locationFormatted,
      startDate: "2026-11-14T09:00:00",
      endDate: "2026-11-15T15:00:00",
      filename: weddingData.icsFilename,
    });
  };

  return (
    <div className="editorial-dialog-backdrop" onClick={onClose}>
      <div
        className="editorial-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className="dialog-close"
          onClick={onClose}
          aria-label="Close wedding details"
        >
          ×
        </button>

        <p className="small-label">
          {weddingData.groom} &amp; {weddingData.bride} · {weddingData.locationFormatted.split(',')[0]}
        </p>

        <h2>
          A celebration <em>with you.</em>
        </h2>

        <p className="details-intro">
          {weddingData.details.intro}
        </p>

        <div className="events-list">
          {weddingData.details.events.map((evt) => (
            <article key={evt.number} className="event-item">
              <span className="event-item-number">{evt.number} /</span>
              <div>
                <p className="small-label">{evt.dateString}</p>
                <h3>{evt.title}</h3>
                <p className="text-xs text-charcoal-700/80 mb-2">{evt.label}</p>
                <div className="text-xs text-stoneMuted-dark">
                  <p className="font-medium text-charcoal-900">{evt.venue}</p>
                  <span>{evt.note}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="venue-note">
          {weddingData.details.venueNote}
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-6 pt-2">
          <button
            type="button"
            onClick={handleDownloadCalendar}
            className="text-link text-xs tracking-wider uppercase inline-flex items-center gap-2"
          >
            Save the dates <span aria-hidden="true">↗</span>
          </button>

          <button
            type="button"
            className="rsvp-button text-xs font-medium"
            onClick={() => {
              onClose();
              onOpenRSVP();
            }}
          >
            Share your RSVP <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </div>
  );
};
