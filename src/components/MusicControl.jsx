import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export const MusicControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio playback note:", err);
          setIsPlaying(false);
        });
    }
  };

  return (
    <div className="fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
      <audio
        ref={audioRef}
        src={weddingData.audio.src}
        loop
        preload="none"
      />

      <button
        onClick={toggleAudio}
        className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] sm:text-xs tracking-ultra-wide uppercase transition-all duration-300 backdrop-blur-md ${
          isPlaying
            ? 'bg-charcoal-900/90 text-ivory-100 border-antiqueGold shadow-lg'
            : 'bg-ivory-100/80 text-charcoal-900/70 border-sand-300/80 hover:text-charcoal-900 hover:bg-ivory-100'
        }`}
        title={isPlaying ? "Mute Background Music" : "Play Background Music"}
        aria-label="Toggle Background Music"
      >
        <span className="text-antiqueGold">♪</span>
        <span>{isPlaying ? 'PAUSE MUSIC' : 'MUSIC'}</span>
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3 ml-1">
            <span className="w-0.5 bg-antiqueGold rounded-full animate-bounce" style={{ height: '10px', animationDuration: '0.6s' }} />
            <span className="w-0.5 bg-antiqueGold rounded-full animate-bounce" style={{ height: '6px', animationDuration: '0.8s' }} />
            <span className="w-0.5 bg-antiqueGold rounded-full animate-bounce" style={{ height: '12px', animationDuration: '0.5s' }} />
          </div>
        )}
      </button>
    </div>
  );
};
