import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import PageHero  from '../components/PageHero';
import ArrowIcon from '../components/ArrowIcon';
import SEO from '../components/SEO';

const PRODUCTS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Makewell Agri Equipments — Product Range",
  "url": "https://www.makewellagriequipments.com/products",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Shovels & Spades", "url": "https://www.makewellagriequipments.com/products" },
    { "@type": "ListItem", "position": 2, "name": "Axes & Hatchets",  "url": "https://www.makewellagriequipments.com/products" },
    { "@type": "ListItem", "position": 3, "name": "Pickaxes & Mattocks", "url": "https://www.makewellagriequipments.com/products" },
    { "@type": "ListItem", "position": 4, "name": "Hoes & Rakes",     "url": "https://www.makewellagriequipments.com/products" },
    { "@type": "ListItem", "position": 5, "name": "Crowbars & Iron Bars", "url": "https://www.makewellagriequipments.com/products" }
  ]
};

/* ══════════════════════════════════════════════════
   SVG silhouettes — one per variant
   ══════════════════════════════════════════════════ */

/* ── Axes ── */
// Single-bit felling axe: long handle, single blade one side
const SvgAxeSingleBit = () => (
  <svg viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="37" y="28" width="6" height="102" rx="3" fill="currentColor" opacity=".9"/>
    <path d="M40 30 L10 6 Q4 0 9 6 L20 34 Q29 40 40 36Z" fill="currentColor" opacity=".9"/>
    <path d="M40 30 Q46 20 44 36Z" fill="currentColor" opacity=".5"/>
    <line x1="10" y1="6" x2="20" y2="34" stroke="currentColor" strokeWidth="1.5" opacity=".5"/>
  </svg>
);

// Double-bit felling axe: blade on both sides
const SvgAxeDoubleBit = () => (
  <svg viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="37" y="28" width="6" height="102" rx="3" fill="currentColor" opacity=".9"/>
    <path d="M40 30 L10 8 Q4 2 9 8 L20 34 Q29 40 40 36Z" fill="currentColor" opacity=".9"/>
    <path d="M40 30 L66 8 Q74 2 69 8 L58 34 Q50 40 40 36Z" fill="currentColor" opacity=".75"/>
  </svg>
);

// Splitting axe: wide wedge head, short-ish handle
const SvgAxeSplitting = () => (
  <svg viewBox="0 0 90 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="42" y="40" width="6" height="90" rx="3" fill="currentColor" opacity=".9"/>
    {/* wide wedge */}
    <path d="M45 42 L8 22 Q2 16 8 20 L18 46 Q30 54 45 50Z" fill="currentColor" opacity=".9"/>
    <path d="M45 42 L78 22 Q84 16 78 20 L68 46 Q56 54 45 50Z" fill="currentColor" opacity=".75"/>
    {/* thick poll */}
    <rect x="38" y="38" width="14" height="8" rx="2" fill="currentColor" opacity=".6"/>
  </svg>
);

// Hatchet: short handle, compact head
const SvgAxeHatchet = () => (
  <svg viewBox="0 0 70 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="32" y="36" width="6" height="74" rx="3" fill="currentColor" opacity=".9"/>
    <path d="M35 38 L12 20 Q6 14 11 18 L20 40 Q27 46 35 43Z" fill="currentColor" opacity=".9"/>
    <path d="M35 38 Q42 28 40 44Z" fill="currentColor" opacity=".5"/>
    <rect x="30" y="34" width="10" height="6" rx="1.5" fill="currentColor" opacity=".6"/>
  </svg>
);

// Hunter's axe: curved belly, compact
const SvgAxeHunter = () => (
  <svg viewBox="0 0 70 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="32" y="32" width="5" height="88" rx="2.5" fill="currentColor" opacity=".9"/>
    <path d="M34 34 Q16 18 12 28 Q8 42 22 46 Q28 48 34 44Z" fill="currentColor" opacity=".9"/>
    <path d="M34 34 Q40 28 39 44Z" fill="currentColor" opacity=".5"/>
  </svg>
);

/* ── Shovels ── */
// Round-point shovel
const SvgShovelRoundPoint = () => (
  <svg viewBox="0 0 60 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="27" y="0" width="6" height="62" rx="3" fill="currentColor" opacity=".9"/>
    <rect x="20" y="56" width="20" height="5" rx="2" fill="currentColor"/>
    <path d="M18 61 Q10 76 12 93 Q15 110 30 114 Q45 110 48 93 Q50 76 42 61Z" fill="currentColor" opacity=".85"/>
    <ellipse cx="30" cy="61" rx="12" ry="3" fill="currentColor"/>
  </svg>
);

// Square-point shovel: flat bottom
const SvgShovelSquarePoint = () => (
  <svg viewBox="0 0 60 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="27" y="0" width="6" height="62" rx="3" fill="currentColor" opacity=".9"/>
    <rect x="20" y="56" width="20" height="5" rx="2" fill="currentColor"/>
    <rect x="16" y="61" width="28" height="48" rx="2" fill="currentColor" opacity=".85"/>
    <rect x="16" y="61" width="28" height="4" fill="currentColor" opacity=".5"/>
  </svg>
);

// Trenching shovel: narrow blade
const SvgShovelTrenching = () => (
  <svg viewBox="0 0 60 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="27" y="0" width="6" height="60" rx="3" fill="currentColor" opacity=".9"/>
    <rect x="22" y="54" width="16" height="5" rx="2" fill="currentColor"/>
    <rect x="24" y="59" width="12" height="42" rx="2" fill="currentColor" opacity=".85"/>
    <path d="M24 101 L30 116 L36 101Z" fill="currentColor" opacity=".9"/>
  </svg>
);

// Garden spade: flat straight blade
const SvgShovelSpade = () => (
  <svg viewBox="0 0 60 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="27" y="0" width="6" height="58" rx="3" fill="currentColor" opacity=".9"/>
    {/* D-grip */}
    <path d="M24 4 Q18 4 18 10 Q18 16 24 16" stroke="currentColor" strokeWidth="4" fill="none" opacity=".7" strokeLinecap="round"/>
    <rect x="20" y="52" width="20" height="5" rx="2" fill="currentColor"/>
    <rect x="17" y="57" width="26" height="50" rx="1" fill="currentColor" opacity=".85"/>
    <rect x="17" y="57" width="26" height="4" fill="currentColor" opacity=".5"/>
  </svg>
);

// Transplanting spade: narrow pointed blade
const SvgShovelTransplanting = () => (
  <svg viewBox="0 0 60 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="27" y="0" width="6" height="60" rx="3" fill="currentColor" opacity=".9"/>
    <rect x="22" y="54" width="16" height="5" rx="2" fill="currentColor"/>
    <path d="M22 59 L38 59 L36 90 L30 110 L24 90Z" fill="currentColor" opacity=".85"/>
  </svg>
);

/* ── Mattocks ── */
// Cutter mattock: wide adze + narrow pick
const SvgMattockCutter = () => (
  <svg viewBox="0 0 110 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="52" y="38" width="6" height="92" rx="3" fill="currentColor" opacity=".9"/>
    <path d="M55 42 L10 24 Q4 18 10 24 L28 46 Q38 50 55 46Z" fill="currentColor" opacity=".9"/>
    <rect x="55" y="24" width="42" height="16" rx="4" fill="currentColor" opacity=".75"/>
    <path d="M97 24 Q106 18 104 28 L97 40Z" fill="currentColor" opacity=".6"/>
  </svg>
);

// Pick mattock: narrow pick both ends
const SvgMattockPick = () => (
  <svg viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="57" y="36" width="6" height="94" rx="3" fill="currentColor" opacity=".9"/>
    <path d="M60 40 L14 26 Q6 20 12 26 L30 44 Q42 48 60 44Z" fill="currentColor" opacity=".9"/>
    <path d="M60 40 L106 26 Q114 20 108 26 L90 44 Q78 48 60 44Z" fill="currentColor" opacity=".75"/>
  </svg>
);

// Grub hoe / adze: wide horizontal blade
const SvgMattockAdze = () => (
  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="47" y="35" width="6" height="85" rx="3" fill="currentColor" opacity=".9"/>
    <rect x="14" y="22" width="72" height="18" rx="4" fill="currentColor" opacity=".85"/>
    <path d="M14 32 Q8 32 8 40 L14 40Z" fill="currentColor" opacity=".65"/>
    <path d="M86 32 Q92 32 92 40 L86 40Z" fill="currentColor" opacity=".65"/>
  </svg>
);

// Heavy pickaxe: single long pick
const SvgMattockPickaxe = () => (
  <svg viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="57" y="34" width="6" height="96" rx="3" fill="currentColor" opacity=".9"/>
    <path d="M60 38 L8 20 Q2 12 8 20 L22 44 Q38 50 60 44Z" fill="currentColor" opacity=".9"/>
    <path d="M60 38 L108 28 Q116 22 112 30 L100 42 Q84 48 60 44Z" fill="currentColor" opacity=".7"/>
  </svg>
);

// Railroad pick: heavier, symmetrical picks
const SvgMattockRailroad = () => (
  <svg viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="62" y="34" width="6" height="96" rx="3" fill="currentColor" opacity=".9"/>
    <path d="M65 38 L8 18 Q0 10 8 18 L24 46 Q42 54 65 46Z" fill="currentColor" opacity=".9"/>
    <path d="M65 38 L122 18 Q130 10 122 18 L106 46 Q88 54 65 46Z" fill="currentColor" opacity=".75"/>
    <rect x="56" y="34" width="18" height="10" rx="2" fill="currentColor" opacity=".5"/>
  </svg>
);

/* ── Hoes ── */
// Draw hoe wide blade
const SvgHoeDrawWide = () => (
  <svg viewBox="0 0 90 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="22" y1="5" x2="62" y2="82" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity=".9"/>
    <rect x="6" y="76" width="48" height="12" rx="3" fill="currentColor" opacity=".85"/>
    <rect x="6" y="70" width="10" height="24" rx="2" fill="currentColor" opacity=".7"/>
  </svg>
);

// Draw hoe narrow blade
const SvgHoeDrawNarrow = () => (
  <svg viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="22" y1="5" x2="58" y2="78" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity=".9"/>
    <rect x="14" y="72" width="28" height="12" rx="3" fill="currentColor" opacity=".85"/>
    <rect x="14" y="66" width="8" height="24" rx="2" fill="currentColor" opacity=".7"/>
  </svg>
);

// Stirrup / hula hoe: loop blade
const SvgHoeStirrup = () => (
  <svg viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="22" y1="5" x2="50" y2="72" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity=".9"/>
    {/* oval loop */}
    <ellipse cx="40" cy="88" rx="20" ry="10" stroke="currentColor" strokeWidth="5" fill="none" opacity=".85"/>
    <line x1="50" y1="80" x2="50" y2="72" stroke="currentColor" strokeWidth="5" opacity=".85"/>
    <line x1="30" y1="80" x2="28" y2="92" stroke="currentColor" strokeWidth="5" opacity=".85"/>
  </svg>
);

// Garden rake: fan of tines
const SvgHoeRake = () => (
  <svg viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="40" y1="5" x2="40" y2="80" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity=".9"/>
    <rect x="8" y="80" width="64" height="7" rx="2" fill="currentColor" opacity=".85"/>
    {[8,16,24,32,40,48,56,64,72].map((x) => (
      <line key={x} x1={x+4} y1="87" x2={x+2} y2="108" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".75"/>
    ))}
  </svg>
);

// Warren hoe: pointed triangular blade
const SvgHoeWarren = () => (
  <svg viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="22" y1="5" x2="50" y2="72" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity=".9"/>
    <path d="M28 74 L52 74 L40 102Z" fill="currentColor" opacity=".85"/>
    <rect x="28" y="68" width="24" height="8" rx="2" fill="currentColor" opacity=".6"/>
  </svg>
);

/* ── Crowbars ── */
// Hexagonal crowbar: long straight bar, hex cross-section hint
const SvgCrowbarHex = () => (
  <svg viewBox="0 0 40 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="16" y="4" width="8" height="112" rx="1" fill="currentColor" opacity=".9"/>
    {/* hex end hint */}
    <polygon points="20,4 24,7 24,13 20,16 16,13 16,7" fill="currentColor" opacity=".7"/>
    <path d="M16 116 Q10 122 8 128 L16 124Z" fill="currentColor" opacity=".8"/>
    <path d="M24 116 Q30 122 32 128 L24 124Z" fill="currentColor" opacity=".65"/>
  </svg>
);

// Flat pry bar: flat profile, angled tip
const SvgCrowbarFlatPry = () => (
  <svg viewBox="0 0 40 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="14" y="4" width="12" height="4" rx="1" fill="currentColor" opacity=".9"/>
    <rect x="17" y="8" width="6" height="104" rx="1" fill="currentColor" opacity=".9"/>
    {/* angled chisel tip */}
    <path d="M17 112 L14 126 L23 112Z" fill="currentColor" opacity=".85"/>
  </svg>
);

// Tamping rod: blunt both ends
const SvgCrowbarTamping = () => (
  <svg viewBox="0 0 40 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="17" y="8" width="6" height="114" rx="1" fill="currentColor" opacity=".9"/>
    <rect x="13" y="4" width="14" height="8" rx="2" fill="currentColor" opacity=".8"/>
    <rect x="13" y="118" width="14" height="8" rx="2" fill="currentColor" opacity=".8"/>
  </svg>
);

// Point bar: one sharp point end
const SvgCrowbarPoint = () => (
  <svg viewBox="0 0 40 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="17" y="4" width="6" height="108" rx="1" fill="currentColor" opacity=".9"/>
    <rect x="13" y="2" width="14" height="6" rx="2" fill="currentColor" opacity=".8"/>
    {/* sharp point */}
    <path d="M17 112 L20 128 L23 112Z" fill="currentColor" opacity=".9"/>
  </svg>
);

// Custom-cut bar: dashed cut marks
const SvgCrowbarCustom = () => (
  <svg viewBox="0 0 40 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="17" y="4" width="6" height="122" rx="1" fill="currentColor" opacity=".9"/>
    <rect x="13" y="2" width="14" height="6" rx="2" fill="currentColor" opacity=".7"/>
    <rect x="13" y="122" width="14" height="6" rx="2" fill="currentColor" opacity=".7"/>
    {/* cut mark lines */}
    <line x1="10" y1="50" x2="30" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" opacity=".6"/>
    <line x1="10" y1="80" x2="30" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" opacity=".6"/>
  </svg>
);

/* ── Tab-level family SVGs (kept for the tab bar) ── */
const SvgShovel = SvgShovelRoundPoint;
const SvgAxe    = SvgAxeSingleBit;
const SvgMattock = SvgMattockCutter;
const SvgHoe    = SvgHoeDrawWide;
const SvgCrowbar = SvgCrowbarHex;

/* ── Image map: variant name → public path ── */
const BASE = `${import.meta.env.BASE_URL}img/`;
const IMG = {
  // Axes
  'Single-Bit Felling Axe':  `${BASE}MW Single-Bit Felling Axe.png`,
  'Double-Bit Felling Axe':  `${BASE}MW Double-Bit Felling Axe.png`,
  'Splitting Axe':            `${BASE}MW Splitting Axe.png`,
  'Hatchet':                  `${BASE}MW Hatchet.png`,
  "Hunter's Axe":             `${BASE}MW Hunter's Axe.png`,
  // Shovels
  'Round-Point Shovel':       `${BASE}MW Round-Point Shovel.png`,
  'Square-Point Shovel':      `${BASE}MW Square-Point Shovel.png`,
  'Trenching Shovel':         `${BASE}MW Trenching Shovel.png`,
  'Garden Spade':             `${BASE}MW Garden Spade.png`,
  'Transplanting Spade':      `${BASE}MW Transplanting Spade.png`,
  // Mattocks
  'Cutter Mattock':           `${BASE}MW Cutter Mattock.png`,
  'Pick Mattock':             `${BASE}MW Pick Mattock.png`,
  'Grub Hoe / Adze':         `${BASE}MW Grub Hoe.png`,
  'Heavy Pickaxe':            `${BASE}MW Heavy Pickaxe.png`,
  'Railroad Pick':            `${BASE}MW Railroad Pick.png`,
  // Hoes
  'Draw Hoe – Wide Blade':   `${BASE}MW Draw Hoe – Wide Blade.png`,
  'Draw Hoe – Narrow Blade': `${BASE}MW Draw Hoe – Narrow Blade.png`,
  'Stirrup / Hula Hoe':      `${BASE}MW Stirrup Hoe.png`,
  'Garden Rake':              `${BASE}MW Garden Rake.png`,
  'Warren Hoe':               `${BASE}MW Warren Hoe.png`,
  // Crowbars
  'Hexagonal Crowbar':        `${BASE}MW Hexagonal Crowbar.png`,
  'Flat Pry Bar':             `${BASE}MW Flat Pry Bar.png`,
  'Tamping Rod':              `${BASE}MW Tamping Rod.png`,
  'Point Bar':                `${BASE}MW Point bar.png`,
  'Custom-Cut Bar':           `${BASE}MW Custom-Cut Bar.png`,
};

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
      { name: 'Single-Bit Felling Axe',  detail: '1.4 – 2.2 kg · Hickory or fibreglass handle', SvgComp: SvgAxeSingleBit },
      { name: 'Double-Bit Felling Axe',  detail: '1.8 – 2.6 kg · Straight handle',              SvgComp: SvgAxeDoubleBit },
      { name: 'Splitting Axe',           detail: '2.0 – 3.5 kg · Wedge-profile head',            SvgComp: SvgAxeSplitting },
      { name: 'Hatchet',                 detail: '0.5 – 0.8 kg · Short handle, one-hand use',    SvgComp: SvgAxeHatchet },
      { name: "Hunter's Axe",            detail: '0.7 – 1.0 kg · Curved edge, compact',          SvgComp: SvgAxeHunter },
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
      { name: 'Round-Point Shovel',    detail: '0.9 – 1.4 kg head · D-grip or long handle', SvgComp: SvgShovelRoundPoint },
      { name: 'Square-Point Shovel',   detail: '1.0 – 1.5 kg head · For loose material',    SvgComp: SvgShovelSquarePoint },
      { name: 'Trenching Shovel',      detail: 'Narrow blade · 28 cm depth reach',           SvgComp: SvgShovelTrenching },
      { name: 'Garden Spade',          detail: 'Flat blade · Border or heavy-duty',           SvgComp: SvgShovelSpade },
      { name: 'Transplanting Spade',   detail: 'Pointed, narrow · Minimal root damage',      SvgComp: SvgShovelTransplanting },
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
      { name: 'Cutter Mattock',   detail: '2.5 – 4.0 kg · Broad adze + pick',    SvgComp: SvgMattockCutter },
      { name: 'Pick Mattock',     detail: '2.0 – 3.5 kg · Narrow pick both ends', SvgComp: SvgMattockPick },
      { name: 'Grub Hoe / Adze', detail: '1.5 – 2.5 kg · Root clearing',          SvgComp: SvgMattockAdze },
      { name: 'Heavy Pickaxe',   detail: '3.0 – 5.0 kg · Rocky terrain',          SvgComp: SvgMattockPickaxe },
      { name: 'Railroad Pick',   detail: '4.0 – 5.5 kg · Infrastructure use',     SvgComp: SvgMattockRailroad },
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
      { name: 'Draw Hoe – Wide Blade',   detail: '180 – 220 mm blade · Row cultivation',     SvgComp: SvgHoeDrawWide },
      { name: 'Draw Hoe – Narrow Blade', detail: '100 – 140 mm blade · Between-row weeding', SvgComp: SvgHoeDrawNarrow },
      { name: 'Stirrup / Hula Hoe',      detail: 'Loop blade · Push-pull action',             SvgComp: SvgHoeStirrup },
      { name: 'Garden Rake',             detail: '12 – 16 tines · Soil levelling',            SvgComp: SvgHoeRake },
      { name: 'Warren Hoe',              detail: 'Pointed blade · Seed furrows',              SvgComp: SvgHoeWarren },
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
      { name: 'Hexagonal Crowbar', detail: 'Ø25 – Ø32 mm · 1.2 m – 1.8 m',         SvgComp: SvgCrowbarHex },
      { name: 'Flat Pry Bar',      detail: '25 × 8 mm section · Multiple lengths',   SvgComp: SvgCrowbarFlatPry },
      { name: 'Tamping Rod',       detail: 'Blunt both ends · Soil compaction',       SvgComp: SvgCrowbarTamping },
      { name: 'Point Bar',         detail: 'One pointed end · Rock/clay breaking',    SvgComp: SvgCrowbarPoint },
      { name: 'Custom-Cut Bar',    detail: 'Any length · Any section profile',        SvgComp: SvgCrowbarCustom },
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
    img: IMG['Round-Point Shovel'],
    SvgComp: SvgShovel,
    name: 'Round-Point Shovel',
    badge: 'Shovels',
    desc: 'The workhorse of the range. Heat-treated carbon blade, D-grip or long handle — in active export to 30+ countries.',
    specs: ['Carbon steel, heat-treated', 'Head: 0.9 – 1.4 kg', 'Wood / fibreglass handle'],
    available: ['Standard', 'Long Handle', 'D-Grip', 'Custom'],
  },
  {
    id: 'sc02', filter: 'shovels', accent: '#3D7A5E',
    img: IMG['Trenching Shovel'],
    SvgComp: SvgShovel,
    name: 'Trenching Shovel',
    badge: 'Shovels',
    desc: 'Narrow pointed blade for clean trench edges and irrigation channel digging. Popular on construction and farm sites.',
    specs: ['Narrow blade: 12 cm wide', '28 cm usable depth', 'Long steel handle'],
    available: ['Standard', 'Heavy-Duty', 'Custom'],
  },
  {
    id: 'sc03', filter: 'axes', accent: '#7A4A2E',
    img: IMG['Single-Bit Felling Axe'],
    SvgComp: SvgAxe,
    name: 'Single-Bit Felling Axe',
    badge: 'Axes',
    desc: 'Drop-forged high-carbon steel head, precision-ground edge. Hickory handle for balance and vibration absorption.',
    specs: ['1.8 kg head', 'Hickory handle', 'Polished or painted'],
    available: ['Single-bit', 'Double-bit', 'Hatchet', 'Custom'],
  },
  {
    id: 'sc04', filter: 'axes', accent: '#8A6A2E',
    img: IMG['Splitting Axe'],
    SvgComp: SvgAxe,
    name: 'Splitting Axe',
    badge: 'Axes',
    desc: 'Wedge-profile head designed to split wood grain cleanly. Heavy poll, balanced for overhead swing power.',
    specs: ['2.5 – 3.5 kg', 'Wedge-profile blade', 'Fibreglass handle'],
    available: ['Standard', 'Heavy-Duty', 'Custom'],
  },
  {
    id: 'sc05', filter: 'mattocks', accent: '#6A4E2E',
    img: IMG['Cutter Mattock'],
    SvgComp: SvgMattock,
    name: 'Heavy Cutter Mattock',
    badge: 'Mattocks',
    desc: 'Dual-head combining an adze and pick. Breaks hardpan soil, clears roots and handles rough earthworks on large farms.',
    specs: ['3.5 kg total', 'Powder-coated', 'OEM available'],
    available: ['Pick Mattock', 'Cutter Mattock', 'Adze', 'Custom'],
  },
  {
    id: 'sc06', filter: 'crowbars', accent: '#4A3E4A',
    img: IMG['Hexagonal Crowbar'],
    SvgComp: SvgCrowbar,
    name: 'Hexagonal Crowbar',
    badge: 'Crowbars',
    desc: 'Solid hexagonal-section iron crowbar for prying, ground compaction and earth-moving. Multiple lengths and diameters.',
    specs: ['1.2 m – 1.8 m', 'Ø25 – Ø32 mm', 'Custom-cut lengths'],
    available: ['Standard', 'Heavy-duty', 'Tamping Bar', 'Custom'],
  },
  {
    id: 'sc07', filter: 'hoes', accent: '#3D7A5E',
    img: IMG['Draw Hoe – Wide Blade'],
    SvgComp: SvgHoe,
    name: 'Draw Hoe – Wide Blade',
    badge: 'Hoes',
    desc: 'Wide-blade hoe for row cultivation and soil preparation in tropical and arid climates. Lightweight for all-day use.',
    specs: ['200 mm blade width', 'Rust-resistant finish', 'Telescopic handle option'],
    available: ['Narrow', 'Wide', 'Stirrup', 'Custom'],
  },
  {
    id: 'sc08', filter: 'custom', accent: '#2E3D5C',
    img: IMG['Single-Bit Felling Axe'],
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
    num: '01', SvgComp: SvgShovel, img: IMG['Round-Point Shovel'],
    name: 'Shovels & Spades',
    desc: 'Round-point, square-point and trenching shovels for digging, lifting and earthmoving on farms and construction sites.',
    specs: ['High-carbon steel blade, heat-treated', 'Handle: wooden, fibreglass or steel', 'Weight range: 0.8 kg – 2.5 kg (head only)'],
  },
  {
    num: '02', SvgComp: SvgAxe, img: IMG['Single-Bit Felling Axe'],
    name: 'Axes & Hatchets',
    desc: 'Felling axes, splitting axes and hatchets — drop-forged heads with ergonomic handles to reduce fatigue during extended use.',
    specs: ['Drop-forged high-carbon steel head', 'Single bit & double bit options', 'Custom logo branding, polished finish'],
  },
  {
    num: '03', SvgComp: SvgMattock, img: IMG['Cutter Mattock'],
    name: 'Pickaxes & Mattocks',
    desc: 'Heavy pick mattocks, cutter mattocks and adzes for breaking hard soil, rocky ground and root clearance.',
    specs: ['Weight range: 2 kg – 5 kg', 'Powder-coated or plain finish', 'OEM & private label available'],
  },
  {
    num: '04', SvgComp: SvgHoe, img: IMG['Draw Hoe – Wide Blade'],
    name: 'Hoes & Rakes',
    desc: 'Draw hoes, stirrup hoes and garden rakes for weeding, cultivating and soil preparation in tropical and arid regions.',
    specs: ['Lightweight build for long-day use', 'Various blade widths available', 'Rust-resistant coated finish'],
  },
  {
    num: '05', SvgComp: SvgCrowbar, img: IMG['Hexagonal Crowbar'],
    name: 'Crowbars & Iron Bars',
    desc: 'Solid wrought iron crowbars, flat bars and tampers for prying, earthmoving and compaction on farms and worksites.',
    specs: ['Multiple diameters & cross-sections', 'Custom cut lengths per order', 'Export-grade individual packing'],
  },
];

export default function Products() {
  const listRef      = useRef(null);
  const familyRef    = useRef(null);
  const showcaseRef  = useRef(null);
  const [activeFamily,  setActiveFamily]  = useState('axes');
  const [activeVariant, setActiveVariant] = useState(0);
  const [activeFilter,  setActiveFilter]  = useState('all');
  useReveal(listRef);
  useReveal(familyRef);
  useReveal(showcaseRef);

  const activeFam     = TOOL_FAMILIES.find((f) => f.id === activeFamily);
  const activeVar     = activeFam?.variants[activeVariant] ?? activeFam?.variants[0];
  const IllustSvg     = activeVar?.SvgComp ?? activeFam?.SvgComp;

  // Reset variant index when switching families
  const handleFamilyChange = (id) => {
    setActiveFamily(id);
    setActiveVariant(0);
  };

  const filtered  = activeFilter === 'all'
    ? SHOWCASE
    : SHOWCASE.filter((p) => p.filter === activeFilter);

  return (
    <>
      <SEO
        title="Agricultural Hand Tools — Shovels, Axes, Mattocks, Hoes & Crowbars"
        description="Browse Makewell's full range of forged agricultural hand tools: round-point shovels, felling axes, cutter mattocks, draw hoes and hexagonal crowbars. OEM and custom manufacturing available. Export to 50+ countries."
        canonical="/products"
        jsonLd={PRODUCTS_JSON_LD}
      />
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
                <div className="icon-box tool-img-box">
                  {p.img ? (
                    <img src={p.img} alt={p.name} loading="lazy" />
                  ) : (
                    <p.SvgComp />
                  )}
                </div>
                <div className="info">
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <ul className="specs-list">
                    {p.specs.map((s) => <li className="tag-chip" key={s}>{s}</li>)}
                  </ul>
                  <Link to="/contact#form" className="row-link">Request Sample →</Link>
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
                onClick={() => handleFamilyChange(fam.id)}
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
                {/* Real product photo — falls back to SVG if image missing */}
                <div className="tf-illustration" style={{ color: activeFam.color }}>
                  {IMG[activeVar?.name] ? (
                    <div className="tf-illus-photo" key={activeVariant}>
                      <img
                        src={IMG[activeVar.name]}
                        alt={activeVar.name}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="tf-illus-svg" key={activeVariant}>
                      <IllustSvg />
                    </div>
                  )}
                  <span className="tf-illus-label">
                    MW — {activeVar?.name?.toUpperCase() ?? activeFam.headline.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="tf-panel-right">
                <span className="tf-panel-eyebrow">{activeFam.headline}</span>
                <h3 className="tf-panel-tagline">{activeFam.tagline}</h3>
                <p className="tf-panel-desc">{activeFam.desc}</p>

                <div className="tf-variants">
                  {activeFam.variants.map((v, i) => {
                    const VariantSvg = v.SvgComp;
                    return (
                      <div
                        className={`tf-variant-row${activeVariant === i ? ' active' : ''}`}
                        key={v.name}
                        onClick={() => setActiveVariant(i)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setActiveVariant(i)}
                      >
                        {/* Mobile inline preview — real photo or SVG fallback */}
                        {activeVariant === i && (
                          <div className="tf-variant-mobile-preview" aria-hidden="true">
                            {IMG[v.name] ? (
                              <div className="tf-illus-photo" key={`mob-${i}`}>
                                <img src={IMG[v.name]} alt={v.name} loading="lazy" />
                              </div>
                            ) : (
                              <div className="tf-illus-svg" key={`mob-${i}`}>
                                <VariantSvg />
                              </div>
                            )}
                            <span className="tf-illus-label">
                              {v.name.toUpperCase()}
                            </span>
                          </div>
                        )}

                        <span className="tf-variant-num">{String(i + 1).padStart(2, '0')}</span>
                        <div className="tf-variant-info">
                          <span className="tf-variant-name">{v.name}</span>
                          <span className="tf-variant-detail">{v.detail}</span>
                        </div>
                        <Link
                          to="/contact#form"
                          className="tf-variant-cta"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Quote <ArrowIcon />
                        </Link>
                      </div>
                    );
                  })}
                </div>

                <Link to="/contact#form" className="btn btn-on-dark" style={{ marginTop: '28px', display: 'inline-flex' }}>
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
                  {p.img ? (
                    <img
                      className="sc-thumb-photo"
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                    />
                  ) : (
                    <>
                      <div className="sc-thumb-bg" aria-hidden="true" />
                      <span className="sc-tool-svg" style={{ color: p.accent }} aria-hidden="true">
                        <p.SvgComp />
                      </span>
                    </>
                  )}
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
                    <Link to="/contact#form" className="btn btn-primary btn-sm">
                      Request Sample <ArrowIcon />
                    </Link>
                    <Link to="/contact#form" className="sc-quote-link">Get Quote →</Link>
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
            <Link to="/contact#form" className="btn btn-on-dark">
              Start a Custom Order <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
