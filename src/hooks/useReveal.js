import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to all .reveal elements inside
 * the given containerRef, adding the .in class when they scroll into view.
 */
export function useReveal(containerRef) {
  useEffect(() => {
    const container = containerRef ? containerRef.current : document;
    if (!container) return;

    const elements = container.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}
