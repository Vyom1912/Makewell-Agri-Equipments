import { Link } from 'react-router-dom';
import ArrowIcon from './ArrowIcon';

/**
 * Reusable page-top banner for inner pages.
 * Props: title, subtitle, breadcrumb (array of {label, to})
 *        ctaLabel, ctaHref — optional external link button shown below subtitle
 *        ctaTo — optional internal route button
 */
export default function PageHero({ title, subtitle, breadcrumb = [], ctaLabel, ctaHref, ctaTo }) {
  return (
    <section className="page-hero" aria-label="Page header">
      <div className="page-hero-pattern" aria-hidden="true" />
      <div className="container">
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb.label}>
                <span className="bc-sep" aria-hidden="true">/</span>
                {crumb.to ? (
                  <Link to={crumb.to}>{crumb.label}</Link>
                ) : (
                  <span className="bc-current" aria-current="page">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1>{title}</h1>
        {subtitle && <p className="page-hero-sub">{subtitle}</p>}

        {/* Optional CTA button */}
        {ctaLabel && (ctaHref || ctaTo) && (
          <div className="page-hero-cta">
            {ctaHref ? (
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-on-dark"
              >
                {ctaLabel} <ArrowIcon />
              </a>
            ) : (
              <Link to={ctaTo} className="btn btn-on-dark">
                {ctaLabel} <ArrowIcon />
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
