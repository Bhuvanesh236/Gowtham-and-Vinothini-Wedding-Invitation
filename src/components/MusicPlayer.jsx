import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Pause, Play, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => setAudioLoaded(true);
    const handleError = () => {
      setAudioError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setAudioError(false);
        })
        .catch((err) => {
          console.warn("Audio autoplay or file loading was restricted:", err);
          setAudioError(true);
          setIsPlaying(false);
        });
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={weddingData.musicSource}
        loop
        preload="auto"
      />

      {/* Floating Music Button */}
      <button
        onClick={toggleMusic}
        className={`relative group p-3.5 sm:p-4 rounded-full border-2 transition-all duration-300 shadow-2xl flex items-center justify-center ${
          isPlaying
            ? 'bg-gradient-to-tr from-maroon-800 to-maroon-600 border-gold-300 text-gold-200 shadow-gold-glow animate-pulse-subtle'
            : 'bg-white/90 backdrop-blur-md border-gold-400/50 text-maroon-900 hover:bg-gold-50'
        }`}
        title={isPlaying ? "Pause Wedding Melody" : "Play Wedding Melody"}
        aria-label="Toggle Wedding Music"
      >
        {/* Animated soundwaves when playing */}
        {isPlaying ? (
          <div className="flex items-end gap-1 h-5 px-1">
            <span className="w-1 bg-gold-300 rounded-full animate-bounce" style={{ height: '18px', animationDuration: '0.6s' }} />
            <span className="w-1 bg-gold-300 rounded-full animate-bounce" style={{ height: '12px', animationDuration: '0.8s' }} />
            <span className="w-1 bg-gold-300 rounded-full animate-bounce" style={{ height: '20px', animationDuration: '0.5s' }} />
            <span className="w-1 bg-gold-300 rounded-full animate-bounce" style={{ height: '10px', animationDuration: '0.7s' }} />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Music className="w-5 h-5" />
          </div>
        )}

        {/* Tooltip on hover */}
        <span className="absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-maroon-950/90 text-gold-200 text-xs font-serif tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-gold-400/30 shadow-lg hidden sm:inline-block">
          {isPlaying ? "Pause Music 🎵" : "Play Wedding Music 🎵"}
        </span>
      </button>
    </div>
  );
};
