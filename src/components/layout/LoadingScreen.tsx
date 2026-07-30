import React, { useEffect, useState } from 'react';

export const LoadingScreen: React.FC = () => {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setFading(true), 700);
    const removeTimer = window.setTimeout(() => setHidden(true), 1300);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div id="loading-screen" className={fading ? 'fade-out' : ''} role="status" aria-label="Loading">
      <div className="loader-logo">
        BOOMR<span>.</span>
      </div>
      <svg className="loader-boomerang" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8a020" />
            <stop offset="100%" stopColor="#b07a10" />
          </linearGradient>
        </defs>
        <path d="M12 64 L40 16 L68 64 L60 64 L40 30 L20 64Z" fill="url(#lg)" />
      </svg>
      <div className="loader-progress">
        <div className="loader-bar" />
      </div>
    </div>
  );
};
