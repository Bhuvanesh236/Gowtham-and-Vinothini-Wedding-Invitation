import React, { useState, useEffect } from 'react';
import { Sparkles, Eye, EyeOff } from 'lucide-react';

export const FloatingPetals = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Generate 16 subtle randomized petals
    const newPetals = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${(i * 6.25) + (Math.random() * 3)}%`,
      animationDuration: `${8 + (Math.random() * 8)}s`,
      animationDelay: `${Math.random() * 10}s`,
      size: `${14 + (Math.random() * 14)}px`,
      opacity: 0.3 + (Math.random() * 0.4),
      type: i % 3 === 0 ? 'rose' : i % 3 === 1 ? 'marigold' : 'gold',
    }));
    setPetals(newPetals);
  }, []);

  if (!isEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-0 animate-petal"
          style={{
            left: petal.left,
            animationDuration: petal.animationDuration,
            animationDelay: petal.animationDelay,
            width: petal.size,
            height: petal.size,
            opacity: petal.opacity,
          }}
        >
          {petal.type === 'rose' && (
            <svg viewBox="0 0 30 30" fill="none" className="w-full h-full text-maroon-600">
              <path
                d="M15 0 C22 5 30 15 20 25 C10 30 0 20 5 10 C8 5 12 0 15 0 Z"
                fill="currentColor"
              />
            </svg>
          )}

          {petal.type === 'marigold' && (
            <svg viewBox="0 0 30 30" fill="none" className="w-full h-full text-gold-500">
              <path
                d="M15 2 C20 8 28 14 20 24 C14 28 6 22 4 14 C2 8 10 2 15 2 Z"
                fill="currentColor"
              />
            </svg>
          )}

          {petal.type === 'gold' && (
            <div className="w-2 h-2 rounded-full bg-gold-400 shadow-gold-glow animate-pulse" />
          )}
        </div>
      ))}
    </div>
  );
};
