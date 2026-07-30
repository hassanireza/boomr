import { useEffect, useRef } from 'react';

/**
 * useReveal attaches an IntersectionObserver to the returned ref and
 * toggles the `.is-visible` class used by the `.reveal` CSS utility
 * once the element enters the viewport. Mirrors the original site's
 * scroll reveal behaviour without a global MutationObserver.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}
