import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Our Story', href: '#story' },
    { name: 'Events', href: '#events' },
    { name: 'Rituals', href: '#rituals' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Moments', href: '#video' },
    { name: 'Venue', href: '#venue' },
    { name: 'Dress Code', href: '#dress-code' },
    { name: 'RSVP', href: '#rsvp' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navHeight = 75;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav py-3 shadow-md'
            : 'bg-gradient-to-b from-maroon-950/80 via-maroon-950/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-full border border-gold-400/80 flex items-center justify-center bg-maroon-900/40 backdrop-blur-md group-hover:scale-105 transition-transform duration-300">
              <Heart className="w-4 h-4 text-gold-400 fill-gold-400/80" />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-lg sm:text-xl font-bold tracking-wider transition-colors duration-300 ${
                isScrolled ? 'text-maroon-900' : 'text-gold-100'
              }`}>
                {weddingData.bride.name} <span className="text-gold-400">&</span> {weddingData.groom.name}
              </span>
              <span className={`text-[10px] tracking-widest uppercase -mt-1 font-light ${
                isScrolled ? 'text-gold-700' : 'text-gold-300/80'
              }`}>
                Wedding Celebration
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium tracking-wider uppercase transition-all duration-300 relative py-1 group ${
                  isScrolled
                    ? 'text-charcoal-800 hover:text-maroon-700'
                    : 'text-cream-100 hover:text-gold-300'
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-gold-300 to-gold-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* RSVP CTA Button */}
            <a
              href="#rsvp"
              onClick={(e) => handleNavClick(e, '#rsvp')}
              className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-maroon-950 shadow-md hover:shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Sparkles className="w-3.5 h-3.5" />
              RSVP Now
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg border transition-colors ${
              isScrolled
                ? 'text-maroon-900 border-gold-400/40 bg-cream-50/50'
                : 'text-gold-200 border-gold-400/40 bg-maroon-900/40'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-maroon-950/80 backdrop-blur-md transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-gradient-to-b from-cream-50 via-cream-100 to-blush-50 p-6 shadow-2xl transition-transform duration-500 flex flex-col justify-between border-l border-gold-400/30 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gold-300/40">
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-maroon-900">
                  {weddingData.bride.name} & {weddingData.groom.name}
                </span>
                <span className="text-[11px] text-gold-700 tracking-wider">
                  {weddingData.weddingDate}
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-full text-maroon-800 hover:bg-maroon-100/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-3 mt-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center justify-between text-base font-medium text-maroon-900 hover:text-maroon-700 hover:pl-2 transition-all duration-200 py-2 border-b border-gold-200/30 font-serif"
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-gold-600">❖</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Drawer Footer CTA */}
          <div className="pt-4 border-t border-gold-300/40 text-center">
            <a
              href="#rsvp"
              onClick={(e) => handleNavClick(e, '#rsvp')}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold uppercase tracking-wider bg-maroon-700 text-gold-100 shadow-md hover:bg-maroon-800 transition-colors"
            >
              <Heart className="w-4 h-4 fill-gold-400 text-gold-400" />
              Confirm Attendance
            </a>
            <p className="text-[11px] text-maroon-700/60 mt-3 italic">
              "Together with their families"
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
