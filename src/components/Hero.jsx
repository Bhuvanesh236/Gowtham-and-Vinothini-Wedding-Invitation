import React, { useState, useRef } from 'react';
import { Calendar, ChevronDown, Heart, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { generateGoogleCalendarUrl } from '../utils/calendar';

export const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleSaveTheDate = () => {
    const calendarUrl = generateGoogleCalendarUrl({
      title: `Wedding: ${weddingData.bride.name} & ${weddingData.groom.name}`,
      description: `Wedding celebration of ${weddingData.bride.name} and ${weddingData.groom.name}. Venue: ${weddingData.venueName}`,
      location: `${weddingData.venueName}, ${weddingData.venueAddress}`,
      startDate: weddingData.countdownTarget,
      endDate: weddingData.countdownTarget,
    });
    window.open(calendarUrl, '_blank', 'noopener,noreferrer');
  };

  const handleScrollDown = () => {
    const nextSection = document.querySelector('#welcome');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-maroon-950 text-cream-50 pt-20 pb-16">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-40 sm:opacity-50' : 'opacity-0'
            }`}
          >
            {weddingData.videoSources.map((src, index) => (
              <source key={index} src={src} type="video/mp4" />
            ))}
          </video>
        )}

        {/* Fallback Luxury Background Artwork if video is loading or missing */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-maroon-950 via-maroon-900 to-maroon-950 transition-opacity duration-1000 ${
            videoLoaded && !videoError ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {/* Subtle Indian ornamental mandala backdrop */}
          <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
            <svg className="w-[800px] h-[800px] animate-spin" style={{ animationDuration: '180s' }} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
              <circle cx="50" cy="50" r="38" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2 2" fill="none" />
              <circle cx="50" cy="50" r="28" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Royal Vignette & Luxury Gradient Overlays */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-maroon-950/60 to-maroon-950 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-transparent to-maroon-950/80 pointer-events-none" />
      </div>

      {/* Video Audio Control if Video is playing */}
      {videoLoaded && !videoError && (
        <button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 z-20 p-3 rounded-full bg-maroon-900/60 border border-gold-400/50 text-gold-300 backdrop-blur-md hover:bg-maroon-800 transition-colors shadow-lg"
          title={isMuted ? "Unmute Hero Video" : "Mute Hero Video"}
          aria-label="Toggle Video Sound"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      )}

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center my-auto">
        {/* Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-400/40 bg-maroon-900/50 backdrop-blur-sm mb-6 animate-pulse-subtle">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-gold-200">
            We Are Getting Married
          </span>
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
        </div>

        {/* Subtitle */}
        <p className="font-serif italic text-gold-200/90 text-lg sm:text-2xl tracking-wide mb-3">
          {weddingData.subtitle}
        </p>

        {/* Bride & Groom Dominant Names */}
        <div className="my-3 sm:my-6 flex flex-col items-center">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-cream-50 drop-shadow-lg">
            {weddingData.bride.name}
          </h1>

          <div className="flex items-center justify-center gap-4 my-2 sm:my-4">
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-gold-400" />
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gold-400/60 flex items-center justify-center bg-maroon-900/40 text-gold-300 shadow-gold-glow animate-float-slow">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-gold-400 text-gold-400" />
            </div>
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-gold-400" />
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-cream-50 drop-shadow-lg">
            {weddingData.groom.name}
          </h1>
        </div>

        {/* Ornamental Divider */}
        <OrnamentalDivider light className="my-4 sm:my-6" />

        {/* Wedding Date & City */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-gold-200 font-serif text-lg sm:text-2xl tracking-wider mb-8">
          <span className="font-medium text-cream-100">{weddingData.weddingDate}</span>
          <span className="hidden sm:inline text-gold-400">•</span>
          <span className="text-gold-300/90">{weddingData.city}</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleSaveTheDate}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-widest bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-maroon-950 shadow-lg hover:shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Calendar className="w-4 h-4" />
            Save The Date
          </button>

          <a
            href="#events"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-widest border border-gold-400/60 bg-maroon-900/40 text-gold-200 hover:bg-gold-500/10 hover:border-gold-300 backdrop-blur-sm transition-all duration-300"
          >
            View Celebrations
          </a>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-gold-300/80 hover:text-gold-200 transition-colors cursor-pointer group"
        aria-label="Scroll to welcome section"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-light">Scroll Down</span>
        <div className="w-6 h-10 rounded-full border-2 border-gold-400/50 flex items-start justify-center p-1 group-hover:border-gold-300">
          <div className="w-1.5 h-2.5 rounded-full bg-gold-400 animate-bounce" />
        </div>
      </button>
    </section>
  );
};
