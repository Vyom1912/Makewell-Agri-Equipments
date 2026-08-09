import { useRef } from "react";
import { useReveal } from "../hooks/useReveal";
import PageHero from "../components/PageHero";
import ArrowIcon from "../components/ArrowIcon";
import CtaStrip from "../components/CtaStrip";
import SEO from "../components/SEO";

const REGIONS = [
  {
    num: "01",
    name: "Americas",
    countries:
      "USA · Canada · Argentina · Mexico · Brazil · Chile · Colombia · Peru · Ecuador · Venezuela",
  },
  {
    num: "02",
    name: "Europe ",
    countries:
      "United Kingdom · Germany · Netherlands · France · Belgium · Italy · Spain · Poland ",
  },
  {
    num: "03",
    name: "Middle East",
    countries:
      "UAE · Saudi Arabia · Oman · Yemen · Jordan · Kuwait · Qatar · Bahrain",
  },
  {
    num: "04",
    name: "Africa",
    countries:
      "Nigeria · Ghana · Kenya · Tanzania · Mozambique · Ethiopia · South Africa · Uganda",
  },

  {
    num: "05",
    name: "South & Southeast Asia",
    countries:
      "Bangladesh · Sri Lanka · Nepal · Myanmar · Philippines · Pakistan · Cambodia",
  },
];

const FEATURES = [
  "DGFT / RCMC certified export house",
  "Sea freight & air freight options",
  "FCL & LCL container packing",
  "All trade documents handled in-house",
  "Private label & OEM branding",
  "L/C, T/T & flexible payment terms",
  "Pre-shipment inspection available",
];

/* Process steps — same data shape as products so item-row works */
const PROCESS_STEPS = [
  {
    num: "01",
    icon: "💬",
    title: "Inquiry & Quotation",
    desc: "Submit your requirement. We respond with pricing, lead time and product specification within 24–48 hours.",
    specs: [
      "24–48 hr response",
      "Product spec included",
      "No commitment required",
    ],
  },
  {
    num: "02",
    icon: "📝",
    title: "Order Confirmation",
    desc: "Purchase order raised, advance payment or L/C arranged. Production slot confirmed in our schedule.",
    specs: [
      "L/C or T/T accepted",
      "Slot confirmed in writing",
      "Flexible lead times",
    ],
  },
  {
    num: "03",
    icon: "⚒️",
    title: "Production",
    desc: "Tools manufactured, quality-inspected and packed to export grade as per your approved specification.",
    specs: ["Dimensional QC", "Hardness-tested", "Export-grade packing"],
  },
  {
    num: "04",
    icon: "🚢",
    title: "Shipping & Documents",
    desc: "Cargo booked, BL / AWB issued, all trade documents — invoice, packing list, COO — prepared in-house.",
    specs: ["All docs in-house", "BL / AWB issued", "COO available"],
  },
  {
    num: "05",
    icon: "✅",
    title: "Delivery & Support",
    desc: "Shipment tracked to destination. Post-delivery support and reorder process immediately available.",
    specs: [
      "Shipment tracking",
      "Post-delivery support",
      "Easy reorder process",
    ],
  },
];

const LOGISTICS = [
  {
    icon: "🏭",
    title: "Manufacturing Hub",
    body: "Himatnagar, Sabarkantha — India's most prominent agricultural hand tool cluster with a century-old forging tradition.",
  },
  {
    icon: "🛣️",
    title: "Road Connectivity",
    body: "Direct NH-48 highway access. Ahmedabad 90 km — connecting to the national road network and all major ports.",
  },
  {
    icon: "🚢",
    title: "Port Access",
    body: "Mundra Port ~220 km · Kandla Port ~250 km — two of India's largest cargo ports on global shipping lanes.",
  },
  {
    icon: "✈️",
    title: "Air Freight",
    body: "Ahmedabad International Airport 90 km — for express samples or urgent smaller consignments worldwide.",
  },
];

export default function Export() {
  const reachRef = useRef(null);
  const processRef = useRef(null);
  const logisticRef = useRef(null);
  useReveal(reachRef);
  useReveal(processRef);
  useReveal(logisticRef);

  return (
    <>
      <SEO
        title="Global Export — Agricultural Tools from India to 50+ Countries"
        description="Makewell Agri Equipments exports forged agricultural hand tools to 50+ countries across Africa, Middle East, Europe and the Americas. DGFT certified. Full documentation, FCL/LCL container packing, flexible payment terms."
        canonical="/export"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "url": "https://www.makewellagriequipments.com/export",
          "name": "Global Export — Makewell Agri Equipments",
          "description": "Exporting forged agricultural hand tools from Gujarat, India to distributors in 50+ countries worldwide."
        }}
      />
      <PageHero
        title='Global Export'
        subtitle='Exporting from Gujarat to the world — with full documentation support and proven logistics.'
        breadcrumb={[{ label: "Export" }]}
      />

      {/* ── 1. Reach — light bg, contrasts with dark hero ── */}
      <section className='section' ref={reachRef}>
        <div className='container'>
          <div className='sec-head sec-head--row reveal'>
            <div>
              <div className='eyebrow'>
                <span className='idx'>Global Reach</span>
                <span className='rule' />
              </div>
              <h2>
                50+ countries.
                <br />
                Four continents.
              </h2>
            </div>
            <p className='sec-sub'>
              Makewell tools reach farmers, contractors and distributors
              worldwide. Our export infrastructure handles everything from
              documentation to last-mile delivery.
            </p>
          </div>

          <div className='col-2 reveal'>
            {/* Regions using region-row (light version defined in index.css) */}
            <div>
              <div style={{ borderTop: "1px solid var(--line)" }}>
                {REGIONS.map((r) => (
                  <div className='region-row' key={r.name}>
                    <div>
                      <div className='reg-name'>{r.name}</div>
                      <div className='reg-countries'>{r.countries}</div>
                    </div>
                    <span className='reg-badge'>Active</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Infrastructure panel */}
            <div>
              <div className='panel'>
                <span className='panel-label'>Export Infrastructure</span>
                <div className='list-ruled'>
                  {FEATURES.map((f) => (
                    <div className='tool-row-item' key={f}>
                      <span className='item-name'>{f}</span>
                      <span className='item-status'>✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Export Process — alt bg, item-row style ── */}
      <section className='section section-alt' ref={processRef}>
        <div className='container'>
          <div className='sec-head sec-head--row reveal'>
            <div>
              <div className='eyebrow'>
                <span className='idx'>Export Process</span>
                <span className='rule' />
              </div>
              <h2>
                From inquiry
                <br />
                to delivery.
              </h2>
            </div>
            <p className='sec-sub'>
              A clear, step-by-step process so you know exactly what to expect
              at every stage — from your first message to the goods arriving at
              your warehouse.
            </p>
          </div>
          <div className='item-list reveal'>
            {PROCESS_STEPS.map((step) => (
              <div className='item-row' key={step.num}>
                <span className='row-num'>{step.num}</span>
                <div className='icon-box'>{step.icon}</div>
                <div className='info'>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <ul className='specs-list'>
                    {step.specs.map((sp) => (
                      <li className='tag-chip' key={sp}>
                        {sp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Logistics — dark, visual rhythm ── */}
      <section className='section section-dark' ref={logisticRef}>
        <div className='container'>
          <div className='sec-head sec-head--row reveal'>
            <div>
              <div className='eyebrow'>
                <span className='idx'>Logistics</span>
                <span className='rule' />
              </div>
              <h2>Placed for global shipping.</h2>
            </div>
            <p className='sec-sub'>
              Himatnagar's location gives direct access to India's two largest
              cargo ports and the main highway network — keeping lead times
              short and costs predictable.
            </p>
          </div>
          <div className='ruled-grid ruled-grid-4 reveal'>
            {LOGISTICS.map((l) => (
              <div className='logi-card logi-card--dark' key={l.title}>
                <span className='logi-icon'>{l.icon}</span>
                <h4>{l.title}</h4>
                <p>{l.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaStrip
        title='Ready to import from India?'
        subtitle='We handle the entire process — from quote to your warehouse.'
        primaryLabel='Start an Inquiry'
        primaryTo='/contact#form'
        secondLabel='📄 Download Catalogue'
        secondHref={`${import.meta.env.BASE_URL}Make Well Product Catalouge.pdf`}
      />
    </>
  );
}
