import { useState, useEffect } from "react";
import "./PageLoader.css";

/**
 * Full-screen loading overlay shown until the page is interactive.
 * Fades out once the window "load" event fires (all assets ready),
 * with a minimum display time so it doesn't flash on fast connections.
 */
export default function PageLoader() {
  const [hidden, setHidden] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    const MIN_MS = 800; // always show for at least 800ms
    const start = Date.now();

    const hide = () => {
      const elapsed = Date.now() - start;
      const delay = Math.max(0, MIN_MS - elapsed);
      setTimeout(() => {
        setHidden(true);
        // remove from DOM after fade finishes
        setTimeout(() => setUnmounted(true), 520);
      }, delay);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
      return () => window.removeEventListener("load", hide);
    }
  }, []);

  if (unmounted) return null;

  return (
    <div className={`page-loader${hidden ? " hidden" : ""}`} aria-hidden="true">
      <div className="pl-brand">
        <span className="pl-brand-mark">MW</span>
        <span>
          Makewell
          <span className="pl-brand-sub">Agri Equipments</span>
        </span>
      </div>

      <div className="loader" />

      <span className="pl-tagline">Himatnagar · Gujarat · India</span>
    </div>
  );
}
