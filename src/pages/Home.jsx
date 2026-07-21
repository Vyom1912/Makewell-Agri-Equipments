import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Testimonials from '../components/Testimonials';
import ArrowIcon    from '../components/ArrowIcon';
import SectionHead  from '../components/SectionHead';
import CtaStrip     from '../components/CtaStrip';
import { useReveal } from '../hooks/useReveal';

function animateCounter(el, target, suffix) {
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 50));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, 28);
}

const HIGHLIGHTS = [
  {
    icon: '⚒️',
    title: 'Five Tool Families',
    desc: 'Shovels, axes, mattocks, hoes and crowbars — engineered for real-world field use.',
    to: '/products',
    cta: 'Browse Products',
  },
  {
    icon: '🎨',
    title: 'Custom Manufacturing',
    desc: 'Your blade shape, handle length, finish and brand — manufactured to your exact spec.',
    to: '/contact',
    cta: 'Start Custom Order',
  },
  {
    icon: '🌐',
    title: 'Global Export',
    desc: 'Trusted by dealers and distributors in 50+ countries across 4 continents.',
    to: '/export',
    cta: 'View Reach',
  },
];

export default function Home() {
  const rulerRef   = useRef(null);
  const pageRef    = useRef(null);
  useReveal(pageRef);

  useEffect(() => {
    if (!rulerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-num[data-target]').forEach((el) => {
              const target = parseInt(el.getAttribute('data-target'), 10);
              const suffix = el.getAttribute('data-suffix') || '';
              if (!isNaN(target)) animateCounter(el, target, suffix);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(rulerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef}>
      {/* ── Hero ── */}
      <section className="hero" id="home">
        <div className="hero-pattern" aria-hidden="true" />
        <div className="container">
          <div className="hero-topline">
            <span className="idx">MW / 2026</span>
            <span className="rule" />
            <span className="loc">Vaktapur, Himatnagar, Gujarat, India</span>
          </div>
          <div className="hero-content">
            <h1>
              Precision-forged tools<br />
              <span className="thin">for the world&apos;s fields.</span>
            </h1>
            <p className="lead">
              Makewell Agri Equipments manufactures and exports shovels, axes, mattocks, hoes
              and spades — built to standard specification or forged to a dealer&apos;s exact drawing.
              Trusted by dealers and distributors across 50+ countries worldwide.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">
                Explore Products <ArrowIcon />
              </Link>
              <Link to="/contact" className="btn btn-on-dark">
                Become a Dealer
              </Link>
            </div>
          </div>

          <div className="hero-ruler-row" ref={rulerRef}>
            <div className="item">
              <span className="stat-num" data-target="25" data-suffix="+">25+</span>
              <span className="stat-label">Years of Excellence</span>
            </div>
            <div className="item">
              <span className="stat-num" data-target="50" data-suffix="+">50+</span>
              <span className="stat-label">Countries Served</span>
            </div>
            <div className="item">
              <span className="stat-num">100%</span>
              <span className="stat-label">Custom Spec Ready</span>
            </div>
            <div className="item">
              <span className="stat-num">OEM</span>
              <span className="stat-label">Private Label Available</span>
            </div>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span className="line" />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Why Makewell"
            title={<>Built for dealers.<br />Designed for the world.</>}
            className="reveal"
          />
          <div className="highlights-grid">
            {HIGHLIGHTS.map((h, i) => (
              <div className={`highlight-card reveal delay-${i + 1}`} key={h.title}>
                <div className="hc-icon">{h.icon}</div>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
                <Link to={h.to} className="row-link">
                  {h.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About snippet ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="about-snippet-grid">
            <div className="reveal">
              <div className="line-illustration">
                <svg viewBox="0 0 200 200" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M60 170 L155 62"/>
                  <path d="M136 34c22 0 40 18 40 40l-36 7-22-22 18-25z"/>
                  <circle cx="60" cy="170" r="3" fill="var(--ink-950)" stroke="none"/>
                  <path d="M20 30h30M35 15v30" strokeWidth="1"/>
                  <path d="M170 150h20M180 140v20" strokeWidth="1"/>
                  <path d="M50 90 L90 50" strokeDasharray="3 4" strokeWidth="0.8" opacity="0.4"/>
                  <path d="M40 140 L80 100" strokeDasharray="3 4" strokeWidth="0.8" opacity="0.4"/>
                </svg>
                <span className="tag">MW — LINE 01 / FORGED HEAD DETAIL</span>
              </div>
            </div>
            <div className="reveal delay-2">
              <div className="eyebrow">
                <span className="idx">About Us</span>
                <span className="rule" />
              </div>
              <h2>A forging tradition from Gujarat, shipped to the world.</h2>
              <p>
                Makewell Agri Equipments operates out of <strong>Vaktapur, Himatnagar, Sabarkantha district, Gujarat</strong> —
                one of India&apos;s principal manufacturing hubs for hand-forged agricultural implements.
              </p>
              <p>
                Every shovel, axe, mattock, hoe and spade that leaves our unit is shaped, hardened and finished
                by people who understand what a farmer, a forestry crew or a construction gang needs from a tool.
              </p>
              <div className="badge-group">
                <span className="badge">🔩 Forged High-Carbon Steel</span>
                <span className="badge">📦 Bulk &amp; Container Orders</span>
                <span className="badge">🎨 Custom Branding</span>
                <span className="badge">🌐 Global Export</span>
              </div>
              <div style={{ marginTop: '32px' }}>
                <Link to="/about" className="btn btn-primary">
                  Our Story <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── CTA strip ── */}
      <CtaStrip
        title="Ready to source quality tools?"
        subtitle="Tell us your requirement and we'll respond within 24 hours."
        primaryLabel="Send an Inquiry"
        primaryTo="/contact"
        secondLabel="View Products"
        secondTo="/products"
      />
    </div>
  );
}
