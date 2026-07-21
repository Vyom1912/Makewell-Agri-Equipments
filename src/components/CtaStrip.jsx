import { Link } from 'react-router-dom';
import ArrowIcon from './ArrowIcon';

/**
 * Reusable full-width CTA strip used at the bottom of inner pages.
 *
 * Props:
 *   title        {string}
 *   subtitle     {string}
 *   primaryLabel {string}  – label for the primary (solid) button
 *   primaryTo    {string}  – route for primary button
 *   secondLabel  {string}  – label for the ghost/outline button (optional)
 *   secondTo     {string}  – route for secondary button (optional)
 */
export default function CtaStrip({
  title,
  subtitle,
  primaryLabel = 'Contact Us',
  primaryTo   = '/contact',
  secondLabel,
  secondTo,
}) {
  return (
    <section className="cta-strip">
      <div className="container">
        <div className="cta-strip-inner reveal">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <div className="cta-strip-actions">
            <Link to={primaryTo} className="btn btn-on-dark">
              {primaryLabel} <ArrowIcon />
            </Link>
            {secondLabel && secondTo && (
              <Link to={secondTo} className="btn btn-outline-white">
                {secondLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
