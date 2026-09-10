import React, { useState } from 'react';
import { JourneyStage } from './components/JourneyStage';
import { CelebrationsModal } from './components/CelebrationsModal';
import { RSVPModal } from './components/RSVPModal';
import { MusicControl } from './components/MusicControl';

export default function App() {
  const [isCelebrationsOpen, setIsCelebrationsOpen] = useState(false);
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  return (
    <main id="top" className="relative min-h-screen bg-charcoal-950 text-ivory-100">
      {/* Ambient Floating Music Toggle */}
      <MusicControl />

      {/* Cinematic Journey Stage */}
      <JourneyStage
        onOpenCelebrations={() => setIsCelebrationsOpen(true)}
        onOpenRSVP={() => setIsRSVPOpen(true)}
      />

      {/* Celebrations Itinerary Modal (#wedding-details) */}
      <CelebrationsModal
        isOpen={isCelebrationsOpen}
        onClose={() => setIsCelebrationsOpen(false)}
        onOpenRSVP={() => setIsRSVPOpen(true)}
      />

      {/* RSVP Modal (#rsvp-dialog) */}
      <RSVPModal
        isOpen={isRSVPOpen}
        onClose={() => setIsRSVPOpen(false)}
      />
    </main>
  );
}
