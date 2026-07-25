import { useRef } from 'react';
import { Link }    from 'react-router-dom';
import { useReveal }       from '../hooks/useReveal';
import { useProcessSteps } from '../hooks/useProcessSteps';
import PageHero    from '../components/PageHero';
import ArrowIcon   from '../components/ArrowIcon';
import CtaStrip    from '../components/CtaStrip';

const PROCESS = [
  { num: '01', title: 'Steel Selection',     desc: 'High-carbon billet sourced and graded before production begins.' },
  { num: '02', title: 'Drop Forging',        desc: 'Closed-die press forging shapes the head under high impact.' },
  { num: '03', title: 'Heat Treatment',      desc: 'Hardening and tempering for optimal strength-to-toughness ratio.' },
  { num: '04', title: 'Grinding & Shaping',  desc: 'Precision grinding to final edge geometry and surface profile.' },
  { num: '05', title: 'Finishing & Coating', desc: 'Paint, powder coat or lacquer applied per order specification.' },
  { num: '06', title: 'QC & Packing',        desc: 'Dimensional check, hardness test, then export-grade packing.' },
];

const CAPS = [
  { idx: 'CAP / 01', title: 'Modern Forging Plant',     desc: 'Closed-die drop forging presses, heat-treatment furnaces and advanced finishing lines for consistent quality at scale.',  delay: 'delay-1' },
  { idx: 'CAP / 02', title: 'Strict Quality Control',   desc: 'Every batch undergoes hardness testing, dimensional inspection and load-bearing checks before dispatch.',                  delay: 'delay-2' },
  { idx: 'CAP / 03', title: 'Full Customization',       desc: 'Blade geometry, handle length, finish and private-label branding — we build exactly what your market demands.',            delay: 'delay-3' },
  { idx: 'CAP / 04', title: 'Global Export Experience', desc: 'We handle documentation, container packing and international compliance — your import process is seamless.',               delay: 'delay-4' },
  { idx: 'CAP / 05', title: 'Fast Turnaround',          desc: 'Efficient production scheduling ensures your bulk orders are dispatched on time, every time.',                             delay: 'delay-5' },
  { idx: 'CAP / 06', title: 'Dealer-Friendly Terms',    desc: 'Transparent pricing, volume discounts, L/C & T/T payment options and flexible minimum order quantities.',                  delay: 'delay-6' },
];

/* Custom-order steps — same data shape as products for item-row reuse */
const CUSTOM_STEPS = [
  {
    num: '01', icon: '📐',
    title: 'Share Your Requirement',
    desc: 'Send us drawings, a reference sample, or a plain description of what you need. We work from your spec — not ours.',
    specs: ['Drawings / samples accepted', 'WhatsApp or email', 'No minimum for samples'],
  },
  {
    num: '02', icon: '📋',
    title: 'We Design & Quote',
    desc: 'Our engineering team reviews your spec and responds with a detailed design, material grade and firm price within 48 hours.',
    specs: ['48-hour response', 'Full material spec sheet', 'Firm pricing, no surprises'],
  },
  {
    num: '03', icon: '🔬',
    title: 'Prototype Approval',
    desc: 'A physical sample is forged and dispatched to you for hands-on review and sign-off before any bulk run begins.',
    specs: ['Physical sample dispatched', 'Revisions included', 'Sign-off before production'],
  },
  {
    num: '04', icon: '🏭',
    title: 'Production & Dispatch',
    desc: 'Full batch manufactured to your approved spec, branded with your logo and packed to export grade on your schedule.',
    specs: ['Your branding & packaging', 'Export-grade cartons', 'On-schedule dispatch'],
  },
];

const TOOLS = [
  'Shovels & Spades', 'Axes & Hatchets', 'Pickaxes & Mattocks',
  'Hoes & Rakes', 'Crowbars & Iron Bars', 'Any New Design',
];

export default function Company() {
  const processRef = useRef(null);
  const capsRef    = useRef(null);
  const customRef  = useRef(null);
  useReveal(processRef);
  useReveal(capsRef);
  useReveal(customRef);
  useProcessSteps();

  return (
    <>
      <PageHero
        title="Our Company"
        subtitle="How we forge, finish and deliver — and why dealers trust us season after season."
        breadcrumb={[{ label: 'Company' }]}
      />

      {/* ── Manufacturing Process — light bg ── */}
      <section className="section" ref={processRef}>
        <div className="container">
          <div className="sec-head sec-head--row reveal">
            <div>
              <div className="eyebrow"><span className="idx">Manufacturing Process</span><span className="rule" /></div>
              <h2>From raw steel to a dealer&apos;s shelf.</h2>
            </div>
            <p className="sec-sub">Every tool follows a fixed six-stage process — ensuring the same hardness, finish and dimensional tolerance across every batch, every season.</p>
          </div>

          <div className="process-rail reveal">
            <div className="track" />
            <div className="process-rail-inner">
              {PROCESS.map((step) => (
                <div className="process-step" data-step={step.num} key={step.num}>
                  <span className="step-num">{step.num}</span>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities — dark bg ── */}
      <section className="section section-dark" ref={capsRef}>
        <div className="container">
          <div className="sec-head sec-head--row reveal">
            <div>
              <div className="eyebrow"><span className="idx">Why Choose Us</span><span className="rule" /></div>
              <h2>Built for dealers<br />who demand consistency.</h2>
            </div>
            <p className="sec-sub">Six reasons exporters and bulk buyers keep coming back — from the forge floor to the final carton.</p>
          </div>

          <div className="caps-grid">
            {CAPS.map((cap) => (
              <div className={`caps-item reveal ${cap.delay}`} key={cap.idx}>
                <span className="caps-item-idx">{cap.idx}</span>
                <h4 className="caps-item-title">{cap.title}</h4>
                <p className="caps-item-desc">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Custom Manufacturing — alt bg ── */}
      <section className="section section-alt" ref={customRef}>
        <div className="container">
          <div className="sec-head sec-head--row reveal">
            <div>
              <div className="eyebrow"><span className="idx">Custom Manufacturing</span><span className="rule" /></div>
              <h2>Your requirement,<br />our expertise.</h2>
            </div>
            <p className="sec-sub">Dealers and bulk buyers often need tools that match their local market — a specific blade angle, handle length, regional finish or their own brand name.</p>
          </div>

          {/* Steps use the same item-list / item-row pattern as Products */}
          <div className="item-list reveal">
            {CUSTOM_STEPS.map((s) => (
              <div className="item-row" key={s.num}>
                <span className="row-num">{s.num}</span>
                <div className="icon-box">{s.icon}</div>
                <div className="info">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <ul className="specs-list">
                    {s.specs.map((sp) => <li className="tag-chip" key={sp}>{sp}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Panel + CTA row */}
          <div className="col-2 reveal" style={{ marginTop: '60px' }}>
            <div className="panel">
              <span className="panel-label">Custom Order Catalogue — Active</span>
              <div className="list-ruled">
                {TOOLS.map((tool) => (
                  <div className="tool-row-item" key={tool}>
                    <span className="item-name">{tool}</span>
                    <span className="item-status">Customisable</span>
                  </div>
                ))}
              </div>
              <p className="panel-note">
                Private label branding, custom packaging and OEM manufacturing available on all product
                lines. Minimum order quantities are flexible.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: 'clamp(22px, 2.6vw, 32px)', marginBottom: '16px', lineHeight: 1.15 }}>
                Every detail,<br />exactly as you need it.
              </h3>
              <p style={{ color: 'var(--ink-600)', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
                We work from your drawings, reference samples or a written spec sheet.
                No middlemen, no guesswork — direct manufacturing to your standard.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--line)', paddingTop: '22px', marginBottom: '28px' }}>
                {['Blade shape, weight & steel grade', 'Handle material, length & grip style', 'Surface finish: paint, lacquer or powder coat', 'Private label logo & branded packaging', 'Export-grade cartons or bulk pallet packing'].map((pt) => (
                  <li key={pt} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: 'var(--ink-800)', fontWeight: 500 }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--brass)', flexShrink: 0, display: 'block' }} />
                    {pt}
                  </li>
                ))}
              </ul>
              <Link to="/contact#form" className="btn btn-primary">
                Start a Custom Order <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip
        title="Ready to place an order?"
        subtitle="Standard catalogue or full-custom — we'll get it right."
        primaryLabel="Contact Us"
        primaryTo="/contact#form"
        secondLabel="Browse Products"
        secondTo="/products"
      />
    </>
  );
}
