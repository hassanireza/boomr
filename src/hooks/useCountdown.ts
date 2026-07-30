import { useEffect, useState } from 'react';

function nextMidnight(): number {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  return midnight.getTime();
}

/** Counts down to the next local midnight, used for the daily deal timer. */
export function useCountdown() {
  const [remaining, setRemaining] = useState(() => nextMidnight() - Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(nextMidnight() - Date.now());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const totalSeconds = Math.max(0, Math.floor(remaining / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  return { hours, minutes, seconds };
}
