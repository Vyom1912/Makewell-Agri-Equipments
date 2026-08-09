import { useRef } from "react";
import { useReveal } from "../hooks/useReveal";
import PageHero from "../components/PageHero";
import SectionHead from "../components/SectionHead";
import CtaStrip from "../components/CtaStrip";

const MILESTONES = [
  {
    year: "1996",
    title: "Founded in Himatnagar",
    desc: "Makewell Agri Equipments begins operations in the Sabarkantha district forging cluster.",
  },
  {
    year: "2002",
    title: "First Export Order",
    desc: "First international shipment dispatched to distributors in East Africa.",
  },
  {
    year: "2010",
    title: "Capacity Expansion",
    desc: "New drop-forging presses and heat-treatment furnaces installed to meet growing demand.",
  },
  {
    year: "2015",
    title: "OEM Programme Launched",
    desc: "Dedicated private-label and OEM manufacturing service introduced for global brands.",
  },
  {
    year: "2020",
    title: "40+ Countries Reached",
    desc: "Active distribution across Africa, Middle East, South Asia, Europe and the Americas.",
  },
  {
    year: "2025",
    title: "30 Years of Excellence",
    desc: "Over two decades of consistent quality, trusted by dealers and distributors worldwide.",
  },
];

const VALUES = [
  {
    icon: "🔩",
    title: "Craft & Precision",
    desc: "Every tool head is drop-forged, heat-treated and ground to exact dimensional tolerances — not just cast and painted.",
  },
  {
    icon: "🤝",
    title: "Dealer Partnership",
    desc: "We work as a long-term supply partner, not just a one-time vendor. Clear pricing, reliable lead times.",
  },
  {
    icon: "🎨",
    title: "Customisation First",
    desc: "Your market has specific needs. We engineer tools to your spec — blade angle, weight, handle, finish, branding.",
  },
  {
    icon: "🌍",
    title: "Global Thinking",
    desc: "Our export team understands international compliance, documentation and logistics across four continents.",
  },
];

export default function About() {
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const milestone = useRef(null);
  useReveal(storyRef);
  useReveal(valuesRef);
  useReveal(milestone);

  return (
    <>
      <PageHero
        title='About Makewell'
        subtitle='A forging tradition from Sabarkantha, Gujarat — built on precision, partnership and purpose.'
        breadcrumb={[{ label: "About" }]}
      />

      {/* ── Story — light bg, contrasts with dark hero ── */}
      <section className='section' ref={storyRef}>
        <div className='container'>
          <div className='about-grid'>
            <div className='about-visual reveal'>
              <div className='home-product-photo'>
                <img
                  src='/Makewell-Agri-Equipments/img/MW Grub Hoe.png'
                  alt='Makewell Grub Hoe — drop-forged in Himatnagar, Gujarat'
                  loading='lazy'
                />
                <span className='tag'>MW — GRUB HOE / DROP-FORGED HEAD</span>
              </div>
            </div>

            <div className='about-copy reveal delay-2'>
              <div className='eyebrow'>
                <span className='idx'>Our Story</span>
                <span className='rule' />
              </div>
              <h2>A forging tradition from Gujarat, shipped to the world.</h2>
              <p>
                Makewell Agri Equipments operates out of{" "}
                <strong>
                  Vaktapur, Himatnagar, Sabarkantha district, Gujarat
                </strong>{" "}
                — one of India&apos;s principal manufacturing hubs for
                hand-forged agricultural implements.
              </p>
              <p>
                We manufacture a focused range of tools built for one purpose:
                to survive real work. Every shovel, axe, mattock, hoe and spade
                that leaves our unit is shaped, hardened and finished by people
                who understand what a farmer, a forestry crew or a construction
                gang needs at the end of a long day.
              </p>
              <p>
                Beyond our standard catalogue, we work directly with dealers and
                importers who need a{" "}
                <strong>specific weight, handle length or finish</strong> —
                manufactured to their own drawing rather than off a shelf.
              </p>
              <div className='badge-group'>
                <span className='badge'>🔩 Forged High-Carbon Steel</span>
                <span className='badge'>📦 Bulk &amp; Container Orders</span>
                <span className='badge'>🎨 Custom Branding Available</span>
                <span className='badge'>🌐 Global Export Network</span>
              </div>
              <div className='stat-row'>
                <div className='cell'>
                  <span className='stat-num'>Drop</span>
                  <span className='stat-label'>Forged Heads</span>
                </div>
                <div className='cell'>
                  <span className='stat-num'>High-C</span>
                  <span className='stat-label'>Carbon Steel</span>
                </div>
                <div className='cell'>
                  <span className='stat-num'>Export</span>
                  <span className='stat-label'>Grade Packing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values — alt bg ── */}
      <section className='section section-alt' ref={valuesRef}>
        <div className='container'>
          {/* Wide row head: eyebrow left, heading + body right */}
          <div className='sec-head sec-head--row reveal'>
            <div>
              <div className='eyebrow'>
                <span className='idx'>Our Values</span>
                <span className='rule' />
              </div>
              <h2>What drives us.</h2>
            </div>
            <p className='sec-sub'>
              Four principles that shape every decision we make — from steel
              selection to shipment across 50+ countries.
            </p>
          </div>
          <div className='values-grid'>
            {VALUES.map((v, i) => (
              <div className={`value-card reveal delay-${i + 1}`} key={v.title}>
                <div className='vc-icon'>{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Milestones — dark bg ── */}
      <section className='section section-dark' ref={milestone}>
        <div className='container'>
          <div className='sec-head sec-head--row reveal'>
            <div>
              <div className='eyebrow'>
                <span className='idx'>Milestones</span>
                <span className='rule' />
              </div>
              <h2>30 years in the making.</h2>
            </div>
            <p className='sec-sub'>
              From a single forging unit in Himatnagar to a global export
              operation trusted in 50+ countries worldwide.
            </p>
          </div>

          <div className='vtl'>
            {MILESTONES.map((m, i) => (
              <div className='vtl-item reveal' key={m.year}>
                {/* Left: year */}
                <div className='vtl-year-col'>
                  <span className='vtl-year'>{m.year}</span>
                </div>

                {/* Centre: dot + line */}
                <div className='vtl-spine' aria-hidden='true'>
                  <div className='vtl-dot'>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                </div>

                {/* Right: card */}
                <div className='vtl-card'>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaStrip
        title='Want to work with us?'
        subtitle='We partner with dealers, distributors and importers globally.'
        primaryLabel='Get in Touch'
        primaryTo='/contact#form'
        secondLabel='View Products'
        secondTo='/products'
      />
    </>
  );
}
