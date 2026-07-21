import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import PageHero  from '../components/PageHero';
import ArrowIcon from '../components/ArrowIcon';

/* ── Inline SVG tool silhouettes ── */
const SvgShovel = () => (
  <svg viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="27" y="0" width="6" height="60" rx="3" fill="currentColor" opacity=".9"/>
    <rect x="20" y="55" width="20" height="5" rx="2" fill="currentColor"/>
    <path d="M18 60 Q10 75 12 92 Q15 108 30 112 Q45 108 48 92 Q50 75 42 60Z" fill="currentColor" opacity=".85"/>
    <ellipse cx="30" cy="60" rx="12" ry="3" fill="currentColor"/>
  </svg>
);

const SvgAxe = () => (
  <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="37" y="30" width="6" height="90" rx="3" fill="currentColor" opacity=".9"/>
    <path d="M40 30 L14 8 Q8 2 12 8 L22 32 Q30 38 40 36Z" fill="currentColor" opacity=".85"/>
    <path d="M40 30 L62 15 Q70 10 67 16 L56 34 Q48 40 40 36Z" fill="currentColor" opacity=".7"/>
    <line x1="14" y1="8" x2="22" y2="32" stroke="currentColor" strokeWidth="1.5" opacity=".6"/>
  </svg>
);

const SvgMattock = () => (
  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="47" y="35" width="6" height="85" rx="3" fill="currentColor" opacity=".9"/>
    <path d="M50 38 L12 22 Q6 18 10 24 L26 42 Q36 46 50 42Z" fill="currentColor" opacity=".85"/>
    <rect x="50" y="22" width="36" height="14" rx="4" fill="currentColor" opacity=".75"/>
    <path d="M86 22 Q94 18 93 26 L86 36Z" fill="currentColor" opacity=".65"/>
  </svg>
);

const SvgHoe = () => (
  <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="20" y1="5" x2="60" y2="75" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity=".9"/>
    <rect x="8" y="68" width="36" height="10" rx="3" fill="currentColor" opacity=".85"/>
    <rect x="8" y="62" width="8" height="22" rx="2" fill="currentColor" opacity=".7"/>
  </svg>
);

const SvgCrowbar = () => (
  <svg viewBox="0 0 40 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="17" y="5" width="6" height="95" rx="3" fill="currentColor" opacity=".9"/>
    <path d="M17 100 Q10 108 8 115 L17 112Z" fill="currentColor" opacity=".8"/>
    <path d="M23 100 Q30 108 32 115 L23 112Z" fill="currentColor" opacity=".65"/>
    <rect x="14" y="2" width="12" height="8" rx="2" fill="currentColor" opacity=".7"/>
  </svg>
);

/* ── Tool family browser data ── */
const TOOL_FAMILIES = [
  {
    id: 'axes',
    label: 'Axes',
    SvgComp: SvgAxe,
    color: '#C2743A',
    headline: 'Axes & Hatchets',
    tagline: 'Drop-forged for every cut.',
    desc: 'From single-bit felling axes to compact hatchets — each head is closed-die forged from high-carbon steel and precision-ground.',
    variants: [
      { name: 'Single-Bit Felling Axe',  detail: '1.4 – 2.2 kg · Hickory or fibreglass handle' },
      { name: 'Double-Bit Felling Axe',  detail: '1.8 – 2.6 kg · Straight handle' },
      { name: 'Splitting Axe',           detail: '2.0 – 3.5 kg · Wedge-profile head' },
      { name: 'Hatchet',                 detail: '0.5 – 0.8 kg · Short handle, one-hand use' },
      { name: "Hunter's Axe",            detail: '0.7 – 1.0 kg · Curved edge, compact' },
    ],
  },
  {
    id: 'shovels',
    label: 'Shovels',
    SvgComp: SvgShovel,
    color: '#5C8A4A',
    headline: 'Shovels & Spades',
    tagline: 'Every blade shape, any depth.',
    desc: 'Round-point, square-point, trenching and transplanting — heat-treated heads with wooden, fibreglass or steel handles.',
    variants: [
      { name: 'Round-Point Shovel',      detail: '0.9 – 1.4 kg head · D-grip or long handle' },
      { name: 'Square-Point Shovel',     detail: '1.0 – 1.5 kg head · For loose material' },
      { name: 'Trenching Shovel',        detail: 'Narrow blade · 28 cm depth reach' },
      { name: 'Garden Spade',            detail: 'Flat blade · Border or heavy-duty' },
      { name: 'Transplanting Spade',     detail: 'Pointed, narrow · Minimal root damage' },
    ],
  },
  {
    id: 'mattocks',
    label: 'Mattocks',
    SvgComp: SvgMattock,
    color: '#8A5C2E',
    headline: 'Pickaxes & Mattocks',
    tagline: 'Built for the hardest ground.',
    desc: 'Pick mattocks, cutter mattocks and adzes — dual-head designs that break hardpan, clear roots and move heavy earth.',
    variants: [
      { name: 'Cutter Mattock',          detail: '2.5 – 4.0 kg · Broad adze + pick' },
      { name: 'Pick Mattock',            detail: '2.0 – 3.5 kg · Narrow pick both ends' },
      { name: 'Grub Hoe / Adze',         detail: '1.5 – 2.5 kg · Root clearing' },
      { name: 'Heavy Pickaxe',           detail: '3.0 – 5.0 kg · Rocky terrain' },
      { name: 'Railroad Pick',           detail: '4.0 – 5.5 kg · Infrastructure use' },
    ],
  },
  {
    id: 'hoes',
    label: 'Hoes',
    SvgComp: SvgHoe,
    color: '#3D7A5E',
    headline: 'Hoes & Rakes',
    tagline: 'Precision for the field.',
    desc: 'Draw hoes, stirrup hoes and garden rakes for weeding, soil preparation and cultivation across tropical and arid markets.',
    variants: [
      { name: 'Draw Hoe – Wide Blade',   detail: '180 – 220 mm blade · Row cultivation' },
      { name: 'Draw Hoe – Narrow Blade', detail: '100 – 140 mm blade · Between-row weeding' },
      { name: 'Stirrup / Hula Hoe',      detail: 'Loop blade · Push-pull action' },
      { name: 'Garden Rake',             detail: '12 – 16 tines · Soil levelling' },
      { name: 'Warren Hoe',              detail: 'Pointed blade · Seed furrows' },
    ],
  },
  {
    id: 'crowbars',
    label: 'Crowbars',
    SvgComp: SvgCrowbar,
    color: '#4A4A5A',
    headline: 'Crowbars & Iron Bars',
    tagline: 'Solid iron, built to last.',
    desc: 'Hexagonal and octagonal section crowbars, flat bars and tamping rods — custom-cut lengths, multiple diameters.',
    variants: [
      { name: 'Hexagonal Crowbar',       detail: 'Ø25 – Ø32 mm · 1.2 m – 1.8 m' },
      { name: 'Flat Pry Bar',            detail: '25 × 8 mm section · Multiple lengths' },
      { name: 'Tamping Rod',             detail: 'Blunt both ends · Soil compaction' },
      { name: 'Point Bar',               detail: 'One pointed end · Rock/clay breaking' },
      { name: 'Custom-Cut Bar',          detail: 'Any length · Any section profile' },
    ],
  },
];

/* ── Showcase catalogue — filterable grid ── */
const FILTERS = [
  { key: 'all',      label: 'All Tools' },
  { key: 'axes',     label: 'Axes' },
  { key: 'shovels',  label: 'Shovels' },
  { key: 'mattocks', label: 'Mattocks' },
  { key: 'hoes',     label: 'Hoes' },
  { key: 'crowbars', label: 'Crowbars' },
  { key: 'custom',   label: 'Custom / OEM' },
];

const SHOWCASE = [
  {
    id: 'sc01', filter: 'shovels', accent: '#5C8A4A',
    SvgComp: SvgShovel,
    name: 'Round-Point Shovel',
    badge: 'Shovels',
    desc: 'The workhorse of the range. Heat-treated carbon blade, D-grip or long handle — in active export to 30+ countries.',
    specs: ['Carbon steel, heat-treated', 'Head: 0.9 – 1.4 kg', 'Wood / fibreglass handle'],
    available: ['Standard', 'Long Handle', 'D-Grip', 'Custom'],
  },
  {
    id: 'sc02', filter: 'shovels', accent: '#3D7A5E',
    SvgComp: SvgShovel,
    name: 'Trenching Shovel',
    badge: 'Shovels',
    desc: 'Narrow pointed blade for clean trench edges and irrigation channel digging. Popular on construction and farm sites.',
    specs: ['Narrow blade: 12 cm wide', '28 cm usable depth', 'Long steel handle'],
    available: ['Standard', 'Heavy-Duty', 'Custom'],
  },
  {
    id: 'sc03', filter: 'axes', accent: '#7A4A2E',
    SvgComp: SvgAxe,
    name: 'Single-Bit Felling Axe',
    badge: 'Axes',
    desc: 'Drop-forged high-carbon steel head, precision-ground edge. Hickory handle for balance and vibration absorption.',
    specs: ['1.8 kg head', 'Hickory handle', 'Polished or painted'],
    available: ['Single-bit', 'Double-bit', 'Hatchet', 'Custom'],
  },
  {
    id: 'sc04', filter: 'axes', accent: '#8A6A2E',
    SvgComp: SvgAxe,
    name: 'Splitting Axe',
    badge: 'Axes',
    desc: 'Wedge-profile head designed to split wood grain cleanly. Heavy poll, balanced for overhead swing power.',
    specs: ['2.5 – 3.5 kg', 'Wedge-profile blade', 'Fibreglass handle'],
    available: ['Standard', 'Heavy-Duty', 'Custom'],
  },
  {
    id: 'sc05', filter: 'mattocks', accent: '#6A4E2E',
    SvgComp: SvgMattock,
    name: 'Heavy Cutter Mattock',
    badge: 'Mattocks',
    desc: 'Dual-head combining an adze and pick. Breaks hardpan soil, clears roots and handles rough earthworks on large farms.',
    specs: ['3.5 kg total', 'Powder-coated', 'OEM available'],
    available: ['Pick Mattock', 'Cutter Mattock', 'Adze', 'Custom'],
  },
  {
    id: 'sc06', filter: 'crowbars', accent: '#4A3E4A',
    SvgComp: SvgCrowbar,
    name: 'Hexagonal Crowbar',
    badge: 'Crowbars',
    desc: 'Solid hexagonal-section iron crowbar for prying, ground compaction and earth-moving. Multiple lengths and diameters.',
    specs: ['1.2 m – 1.8 m', 'Ø25 – Ø32 mm', 'Custom-cut lengths'],
    available: ['Standard', 'Heavy-duty', 'Tamping Bar', 'Custom'],
  },
  {
    id: 'sc07', filter: 'hoes', accent: '#3D7A5E',
    SvgComp: SvgHoe,
    name: 'Draw Hoe – Wide Blade',
    badge: 'Hoes',
    desc: 'Wide-blade hoe for row cultivation and soil preparation in tropical and arid climates. Lightweight for all-day use.',
    specs: ['200 mm blade width', 'Rust-resistant finish', 'Telescopic handle option'],
    available: ['Narrow', 'Wide', 'Stirrup', 'Custom'],
  },
  {
    id: 'sc08', filter: 'custom', accent: '#2E3D5C',
    SvgComp: SvgAxe,
    name: 'Private Label Tool',
    badge: 'Custom / OEM',
    desc: 'Your logo, your handle colour, your blade geometry — forged to your exact drawing. Flexible minimum orders.',
    specs: ['Any head weight', 'Any handle type', 'Full branding'],
    available: ['Logo engraving', 'Custom colour', 'Custom spec', 'OEM pack'],
  },
];

/* ── Product range rows data ── */
const PRODUCTS = [
  {
    num: '01', SvgComp: SvgShovel, name: 'Shovels & Spades',
    desc: 'Round-point, square-point and trenching shovels for digging, lifting and earthmoving on farms and construction sites.',
    specs: ['High-carbon steel blade, heat-treated', 'Handle: wooden, fibreglass or steel', 'Weight range: 0.8 kg – 2.5 kg (head only)'],
  },
  {
    num: '02', SvgComp: SvgAxe, name: 'Axes & Hatchets',
    desc: 'Felling axes, splitting axes and hatchets — drop-forged heads with ergonomic handles to reduce fatigue during extended use.',
    specs: ['Drop-forged high-carbon steel head', 'Single bit & double bit options', 'Custom logo branding, polished finish'],
  },
  {
    num: '03', SvgComp: SvgMattock, name: 'Pickaxes & Mattocks',
    desc: 'Heavy pick mattocks, cutter mattocks and adzes for breaking hard soil, rocky ground and root clearance.',
    specs: ['Weight range: 2 kg – 5 kg', 'Powder-coated or plain finish', 'OEM & private label available'],
  },
  {
    num: '04', SvgComp: SvgHoe, name: 'Hoes & Rakes',
    desc: 'Draw hoes, stirrup hoes and garden rakes for weeding, cultivating and soil preparation in tropical and arid regions.',
    specs: ['Lightweight build for long-day use', 'Various blade widths available', 'Rust-resistant coated finish'],
  },
  {
    num: '05', SvgComp: SvgCrowbar, name: 'Crowbars & Iron Bars',
    desc: 'Solid wrought iron crowbars, flat bars and tampers for prying, earthmoving and compaction on farms and worksites.',
    specs: ['Multiple diameters & cross-sections', 'Custom cut lengths per order', 'Export-grade individual packing'],
  },
];

export default function Products() {
  const listRef      = useRef(null);
  const familyRef    = useRef(null);
  const showcaseRef  = useRef(null);
  const [activeFamily,  setActiveFamily]  = useState('axes');
  const [activeFilter,  setActiveFilter]  = useState('all');
  useReveal(listRef);
  useReveal(familyRef);
  useReveal(showcaseRef);

  const activeFam = TOOL_FAMILIES.find((f) => f.id === activeFamily);
  const filtered  = activeFilter === 'all'
    ? SHOWCASE
    : SHOWCASE.filter((p) => p.filter === activeFilter);

  return (
    <>
      <PageHero
        title="Our Products"
        subtitle="Five tool families engineered for durability — every one adaptable to your exact specification."
        breadcrumb={[{ label: 'Products' }]}
      />

      {/* ── 1. Product range list ── */}
      <section className="section" ref={listRef}>
        <div className="container">
          <div className="sec-head sec-head--row reveal">
            <div>
              <div className="eyebrow"><span className="idx">Product Range</span><span className="rule" /></div>
              <h2>Five tool families,<br />one forging standard.</h2>
            </div>
            <p className="sec-sub">Each category ships in multiple head shapes, weights and handle types — every one adaptable to a dealer&apos;s exact specification.</p>
          </div>
          <div className="item-list reveal">
            {PRODUCTS.map((p) => (
              <div className="item-row" key={p.num}>
                <span className="row-num">{p.num}</span>
                <div className="icon-box tool-svg-box">
                  <p.SvgComp />
                </div>
                <div className="info">
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <ul className="specs-list">
                    {p.specs.map((s) => <li className="tag-chip" key={s}>{s}</li>)}
                  </ul>
                  <Link to="/contact" className="row-link">Request Sample →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Tool family browser — tabs + detail panel ── */}
      <section className="section section-dark" ref={familyRef}>
        <div className="container">
          <div className="sec-head sec-head--row reveal">
            <div>
              <div className="eyebrow"><span className="idx">Browse by Tool</span><span className="rule" /></div>
              <h2>Every variant,<br />in one place.</h2>
            </div>
            <p className="sec-sub">Select a tool family below to explore the full range of variants, weights and handle options available.</p>
          </div>

          {/* Tab bar */}
          <div className="tf-tabs reveal">
            {TOOL_FAMILIES.map((fam) => (
              <button
                key={fam.id}
                className={`tf-tab${activeFamily === fam.id ? ' active' : ''}`}
                style={activeFamily === fam.id ? { '--tf-color': fam.color } : {}}
                onClick={() => setActiveFamily(fam.id)}
              >
                <span className="tf-tab-svg" style={{ color: activeFamily === fam.id ? fam.color : 'currentColor' }}>
                  <fam.SvgComp />
                </span>
                {fam.label}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          {activeFam && (
            <div className="tf-panel reveal" key={activeFam.id} style={{ '--tf-color': activeFam.color }}>
              <div className="tf-panel-left">
                {/* Large SVG illustration */}
                <div className="tf-illustration" style={{ color: activeFam.color }}>
                  <activeFam.SvgComp />
                  <span className="tf-illus-label">MW — {activeFam.headline.toUpperCase()}</span>
                </div>
              </div>

              <div className="tf-panel-right">
                <span className="tf-panel-eyebrow">{activeFam.headline}</span>
                <h3 className="tf-panel-tagline">{activeFam.tagline}</h3>
                <p className="tf-panel-desc">{activeFam.desc}</p>

                <div className="tf-variants">
                  {activeFam.variants.map((v, i) => (
                    <div className="tf-variant-row" key={v.name}>
                      <span className="tf-variant-num">{String(i + 1).padStart(2, '0')}</span>
                      <div className="tf-variant-info">
                        <span className="tf-variant-name">{v.name}</span>
                        <span className="tf-variant-detail">{v.detail}</span>
                      </div>
                      <Link to="/contact" className="tf-variant-cta">
                        Quote <ArrowIcon />
                      </Link>
                    </div>
                  ))}
                </div>

                <Link to="/contact" className="btn btn-on-dark" style={{ marginTop: '28px', display: 'inline-flex' }}>
                  Request Full Catalogue <ArrowIcon />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. Tool Showcase — filterable cards ── */}
      <section className="section section-alt" ref={showcaseRef}>
        <div className="container">
          <div className="sec-head sec-head--row reveal">
            <div>
              <div className="eyebrow"><span className="idx">Tool Showcase</span><span className="rule" /></div>
              <h2>Browse by<br />category.</h2>
            </div>
            <p className="sec-sub">Filter by tool type — every product ships to your spec. Request a sample or quote directly from the card.</p>
          </div>

          <div className="sc-filters reveal">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`sc-filter-btn${activeFilter === f.key ? ' active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="sc-grid">
            {filtered.map((p, i) => (
              <div
                className={`sc-card reveal delay-${(i % 4) + 1}`}
                key={p.id}
                style={{ '--sc-accent': p.accent }}
              >
                <div className="sc-thumb">
                  <div className="sc-thumb-bg" aria-hidden="true" />
                  <span className="sc-tool-svg" style={{ color: p.accent }} aria-hidden="true">
                    <p.SvgComp />
                  </span>
                  <span className="sc-watermark" aria-hidden="true">MW</span>
                  <span className={`sc-badge sc-badge--${p.filter}`}>{p.badge}</span>
                </div>

                <div className="sc-body">
                  <h4 className="sc-name">{p.name}</h4>
                  <p className="sc-desc">{p.desc}</p>
                  <div className="sc-specs">
                    {p.specs.map((s) => <span className="tag-chip" key={s}>{s}</span>)}
                  </div>
                  <div className="sc-variants">
                    {p.available.map((v) => (
                      <span
                        key={v}
                        className={`sc-variant${v === 'Custom' || v === 'OEM pack' || v === 'Custom spec' ? ' sc-variant--highlight' : ''}`}
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                  <div className="sc-actions">
                    <Link to="/contact" className="btn btn-primary btn-sm">
                      Request Sample <ArrowIcon />
                    </Link>
                    <Link to="/contact" className="sc-quote-link">Get Quote →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Custom order banner ── */}
      <section className="section">
        <div className="container">
          <div className="custom-banner reveal">
            <div className="txt">
              <h4>Don&apos;t see exactly what you need?</h4>
              <p>
                Share a drawing, a sample, or a description. We manufacture to your exact specification —
                blade shape, steel grade, handle type, surface finish and branding.
              </p>
            </div>
            <Link to="/contact" className="btn btn-on-dark">
              Start a Custom Order <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
