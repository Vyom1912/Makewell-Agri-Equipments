import { useEffect } from 'react';

/**
 * Animates .process-step dots to brass color on viewport entry.
 */
export function useProcessSteps() {
  useEffect(() => {
    const steps = document.querySelectorAll('.process-step');
    if (!steps.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  });
}
