import { useRef } from "react";
import { useReveal } from "../../hooks/useReveal";
import { PageHero, CtaStrip, SEO, HeroSlider } from "../../components";
import { MILESTONES, VALUES } from "../../data/aboutData";
import "./About.css";

export default function About() {
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const milestone = useRef(null);
  useReveal(storyRef);
  useReveal(valuesRef);
  useReveal(milestone);

  return (
    <>
      <SEO
        title='About Makewell — Forged Agricultural Tools Manufacturer, Gujarat India'
        description='Learn about Makewell Agri Equipments — a 30-year forging tradition from Himatnagar, Sabarkantha, Gujarat. Drop-forged agricultural hand tools exported to 50+ countries worldwide.'
        canonical='/about'
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: "https://www.makewellagriequipments.com/about",
          name: "About Makewell Agri Equipments",
          description:
            "30-year manufacturer and exporter of forged agricultural hand tools from Himatnagar, Gujarat, India.",
          mainEntity: {
            "@type": "Organization",
            name: "Makewell Agri Equipments",
            foundingDate: "1996",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Himatnagar",
              addressRegion: "Gujarat",
              addressCountry: "IN",
            },
          },
        }}
      />
      <PageHero
        title='About Makewell'
        subtitle='A forging tradition from Sabarkantha, Gujarat — built on precision, partnership and purpose.'
        breadcrumb={[{ label: "About" }]}
      />

      {/* ── Story — light bg, contrasts with dark hero ── */}
      <section className='section' ref={storyRef}>
        <div className='container'>
          <div className='about-grid'>
            <HeroSlider />

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
