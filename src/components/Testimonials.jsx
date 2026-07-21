import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

const TESTIMONIALS = [
  {
    initials: 'AR', name: 'Abdul Rahman', role: 'Distributor · Nigeria',
    quote: '"We\'ve been sourcing shovels and pickaxes from Makewell for over six years. The consistency in quality and timely shipment is outstanding. Their tools perform exactly as expected in harsh West African conditions."',
  },
  {
    initials: 'DO', name: 'David Omondi', role: 'Wholesale Dealer · Kenya',
    quote: '"Their custom axe design matched our market requirements exactly. The prototype was perfect and full production was delivered ahead of schedule. No other manufacturer has matched this level of responsiveness."',
  },
  {
    initials: 'RP', name: 'Rajan Perera', role: 'Importer · Sri Lanka',
    quote: '"Competitive pricing, excellent finish and professional communication. Makewell has become our primary supplier for agricultural hand tools across South Asia. Our customers trust the quality."',
  },
];

const TRUST = [
  { num: '50+',  label: 'Countries Supplied' },
  { num: '25+',  label: 'Years in Business' },
  { num: '100%', label: 'Custom-Ready' },
  { num: 'OEM',  label: 'Private Label Available' },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <section className="testimonials section section-dark" id="testimonials" ref={sectionRef}>
      <div className="container">

        <div className="sec-head reveal">
          <div className="eyebrow">
            <span className="idx">Client Feedback</span>
            <span className="rule" />
          </div>
          <h2>Trusted by dealers<br />across the world.</h2>
          <p>
            Our tools have been shipping to distributors and dealers across Africa, the Middle East,
            South Asia and beyond for over two decades.
          </p>
        </div>

        {/* Trust bar */}
        <div className="testi-trust-bar reveal">
          {TRUST.map((t) => (
            <div className="ttb-item" key={t.label}>
              <span className="ttb-num">{t.num}</span>
              <span className="ttb-dot" />
              {t.label}
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="testi-grid reveal">
          {TESTIMONIALS.map((t) => (
            <div className="testi-card" key={t.name}>
              <div className="testi-stars">
                {[...Array(5)].map((_, i) => <span key={i} />)}
              </div>
              <blockquote>{t.quote}</blockquote>
              <div className="testi-divider" />
              <div className="testi-author">
                <div className="testi-avatar">{t.initials}</div>
                <div className="testi-author-info">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
