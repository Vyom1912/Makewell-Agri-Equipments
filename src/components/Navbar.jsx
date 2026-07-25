import { useState, useEffect, useCallback } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/',         label: 'Home',     end: true },
  { to: '/about',    label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/company',  label: 'Company' },
  { to: '/export',   label: 'Export' },
  { to: '/contact',  label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // On non-home pages, always show the light navbar (no transparent phase)
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Close menu when clicking the backdrop overlay
  const handleBackdropClick = useCallback(() => setMenuOpen(false), []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className={`navbar${scrolled || !isHome ? ' scrolled' : ''}`} id="navbar">
        <div className="container">
          <Link to="/" className="brand" aria-label="Go to home">
            <span className="brand-mark">MW</span>
            <span className="brand-text">
              <span className="name">Makewell</span><br />
              <span className="tag">Agri Equipments</span>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contact#form" className="btn nav-cta">
              Get a Quote
            </Link>
          </nav>

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile menu backdrop — click outside to close */}
      {menuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-header">
          <span className="mobile-menu-brand">Makewell</span>
          <button
            className="mobile-menu-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <nav className="mobile-menu-links">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.label}
              <span className="mm-arrow" aria-hidden="true">›</span>
            </NavLink>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <Link to="/contact#form" className="btn btn-primary btn-full" onClick={() => setMenuOpen(false)}>
            Get a Quote
          </Link>
        </div>
      </div>
    </>
  );
}
