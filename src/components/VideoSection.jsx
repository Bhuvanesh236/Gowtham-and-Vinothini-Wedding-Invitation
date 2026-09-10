import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Film, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => setVideoError(true));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * (videoRef.current?.duration || 0);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setProgress(e.target.value);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

  return (
    <section id="video" className="relative py-20 sm:py-28 bg-maroon-950 text-cream-50 overflow-hidden">
      {/* Background Mandala and Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-950 via-maroon-900/60 to-maroon-950 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-400/40 bg-maroon-900/50 mb-3">
            <Film className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-gold-200">
              Cinematic Highlights
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream-50 tracking-tight">
            Our Beautiful Moments
          </h2>
          <p className="text-sm sm:text-base text-gold-200/80 max-w-xl mx-auto mt-3">
            Relive the emotions, laughter, and timeless memories framed in motion.
          </p>
          <OrnamentalDivider light className="my-4" />
        </div>

        {/* Video Theater Frame */}
        <div className="relative bg-gradient-to-b from-maroon-900 to-maroon-950 p-3 sm:p-5 rounded-3xl border-2 border-gold-400/60 shadow-2xl overflow-hidden group">
          {/* Inner video wrapper */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center">
            {!videoError ? (
              <video
                ref={videoRef}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                onError={() => setVideoError(true)}
                playsInline
                className="w-full h-full object-cover"
                poster={weddingData.videoPoster}
              >
                {weddingData.videoSources.map((src, idx) => (
                  <source key={idx} src={src} type="video/mp4" />
                ))}
              </video>
            ) : (
              /* Fallback if video file is not found */
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-maroon-950 via-maroon-900 to-maroon-950">
                <div className="w-20 h-20 rounded-full border border-gold-400/50 bg-maroon-800/60 flex items-center justify-center mb-4">
                  <Film className="w-8 h-8 text-gold-400" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-gold-200 mb-1">
                  {weddingData.weddingTitle}
                </h3>
                <p className="text-xs sm:text-sm text-gold-300/70 max-w-md">
                  Wedding Video Trailer will play here once <code>1000138134.mp4</code> is loaded in <code>public/assets/</code>.
                </p>
              </div>
            )}

            {/* Big Center Play/Pause Overlay Button */}
            {!isPlaying && !videoError && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-gold-500 to-gold-300 text-maroon-950 flex items-center justify-center shadow-gold-glow hover:scale-110 active:scale-95 transition-all duration-300 z-20 group/btn"
                aria-label="Play Wedding Video"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-maroon-950 translate-x-1" />
              </button>
            )}

            {/* Bottom Controls Bar */}
            {!videoError && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 z-20 transition-opacity duration-300 opacity-90 group-hover:opacity-100">
                {/* Progress bar */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-white/30 accent-gold-400 rounded-lg cursor-pointer"
                />

                <div className="flex items-center justify-between text-gold-200 text-xs">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 hover:text-gold-400 transition-colors"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-1.5 hover:text-gold-400 transition-colors"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>

                    <span className="font-serif tracking-wider text-xs hidden sm:inline text-cream-200/80">
                      {weddingData.bride.name} & {weddingData.groom.name} — Trailer
                    </span>
                  </div>

                  <button
                    onClick={handleFullscreen}
                    className="p-1.5 hover:text-gold-400 transition-colors"
                    aria-label="Fullscreen"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
