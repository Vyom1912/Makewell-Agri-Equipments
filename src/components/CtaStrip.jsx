import { Link } from "react-router-dom";
import ArrowIcon from "./ArrowIcon";

/**
 * Reusable full-width CTA strip.
 *
 * For internal routes use `primaryTo` / `secondTo`.
 * For external links (mailto:, https://) use `primaryHref` / `secondHref`.
 */
export default function CtaStrip({
  title,
  subtitle,
  primaryLabel = "Contact Us",
  primaryTo,
  primaryHref,
  secondLabel,
  secondTo,
  secondHref,
}) {
  return (
    <section className='cta-strip'>
      <div className='container'>
        <div className='cta-strip-inner'>
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <div className='cta-strip-actions'>
            {primaryHref ? (
              <a href={primaryHref} className='btn btn-on-dark' target={primaryHref.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                {primaryLabel} <ArrowIcon />
              </a>
            ) : (
              <Link to={primaryTo ?? '/contact'} className='btn btn-on-dark'>
                {primaryLabel} <ArrowIcon />
              </Link>
            )}
            {secondLabel && (secondTo || secondHref) && (
              secondHref ? (
                <a href={secondHref} className='btn btn-outline-white' target={secondHref.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                  {secondLabel}
                </a>
              ) : (
                <Link to={secondTo} className='btn btn-outline-white'>
                  {secondLabel}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
