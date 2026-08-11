import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useReveal } from "../../hooks/useReveal";
import {
  Testimonials,
  ArrowIcon,
  SectionHead,
  CtaStrip,
  SEO,
  HeroSlider,
} from "../../components";
import { HOME_PRODUCTS, HIGHLIGHTS, HOME_JSON_LD } from "../../data/homeData";
import "./Home.css";

function animateCounter(el, target, suffix) {
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 50));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, 28);
}

export default function Home() {
  const rulerRef = useRef(null);
  const pageRef = useRef(null);
  const productsRef = useRef(null);
  useReveal(pageRef);
  useReveal(productsRef);

  useEffect(() => {
    if (!rulerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".stat-num[data-target]")
              .forEach((el) => {
                const target = parseInt(el.getAttribute("data-target"), 10);
                const suffix = el.getAttribute("data-suffix") || "";
                if (!isNaN(target)) animateCounter(el, target, suffix);
              });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(rulerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={pageRef}>
      <SEO
        canonical='/'
        description='Makewell Agri Equipments — manufacturer and exporter of forged agricultural hand tools: shovels, axes, mattocks, hoes, spades and crowbars. Based in Himatnagar, Gujarat, India. Trusted by dealers in 50+ countries.'
        jsonLd={HOME_JSON_LD}
      />
      {/* ── Hero ── */}
      <section className='hero' id='home'>
        <div className='hero-pattern' aria-hidden='true' />
        <div className='container'>
          <div className='hero-inner'>
            {/* Left — copy */}
            <div className='hero-copy'>
              <div className='hero-topline'>
                <span className='idx'>MW / 2026</span>
                <span className='rule' />
                <span className='loc'>
                  Vaktapur, Himatnagar, Gujarat, India
                </span>
              </div>
              <div className='hero-content'>
                <h1>
                  Precision-forged tools
                  <br />
                  <span className='thin'>for the world&apos;s fields.</span>
                </h1>
                <p className='lead'>
                  Makewell Agri Equipments manufactures and exports shovels,
                  axes, mattocks, hoes and spades — built to standard
                  specification or forged to a dealer&apos;s exact drawing.
                  Trusted by dealers and distributors across 50+ countries
                  worldwide.
                </p>
                <div className='hero-actions'>
                  <Link to='/products' className='btn btn-primary'>
                    Explore Products <ArrowIcon />
                  </Link>
                  <Link to='/contact#form' className='btn btn-on-dark'>
                    Become a Dealer
                  </Link>
                  <a
                    href={`${import.meta.env.BASE_URL}Make Well Product Catalouge.pdf`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-ghost-light'>
                    📄 View Catalogue
                  </a>
                </div>
              </div>

              <div className='hero-ruler-row' ref={rulerRef}>
                <div className='item'>
                  <span className='stat-num' data-target='30' data-suffix='+'>
                    30+
                  </span>
                  <span className='stat-label'>Years of Excellence</span>
                </div>
                <div className='item'>
                  <span className='stat-num' data-target='50' data-suffix='+'>
                    50+
                  </span>
                  <span className='stat-label'>Countries Served</span>
                </div>
                <div className='item'>
                  <span className='stat-num'>100%</span>
                  <span className='stat-label'>Custom Spec Ready</span>
                </div>
                <div className='item'>
                  <span className='stat-num'>OEM</span>
                  <span className='stat-label'>Private Label Available</span>
                </div>
              </div>
            </div>

            {/* Right — product slider */}
            <HeroSlider />
          </div>
        </div>

        <div className='scroll-cue' aria-hidden='true'>
          <span className='line' />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ── Product Range ── */}
      <section className='section section-alt' ref={productsRef}>
        <div className='container'>
          <div className='sec-head sec-head--row reveal'>
            <div>
              <div className='eyebrow'>
                <span className='idx'>What We Make</span>
                <span className='rule' />
              </div>
              <h2>
                Seven tool families,
                <br />
                one forging standard.
              </h2>
            </div>
            <div>
              <p className='sec-sub'>
                Every category ships in multiple head shapes, weights and handle
                types — each one forged to survive real work, adaptable to a
                dealer&apos;s exact specification.
              </p>
              <Link
                to='/products'
                className='btn btn-primary btn-sm'
                style={{ marginTop: "16px", display: "inline-flex" }}>
                Full Product Range <ArrowIcon />
              </Link>
            </div>
          </div>

          <div className='home-product-list item-list reveal'>
            {HOME_PRODUCTS.map((p, i) => (
              <div className='item-row home-item-row' key={p.num}>
                <span className='row-num'>{p.num}</span>
                <div className='icon-box tool-img-box home-tool-img'>
                  <img src={p.img} alt={p.name} loading='lazy' />
                </div>
                <div className='info'>
                  <h3>{p.name}</h3>
                  <p className='home-product-tagline'>{p.tagline}</p>
                  <p>{p.desc}</p>
                  <p>
                    {/* <a
                      href={p.link}
                      className='home-product-view-link'
                      target='_blank'
                      rel='noopener noreferrer'>
                      View Range &gt;
                    </a> */}
                    <Link
                      to={p.link}
                      className='home-product-view-link'
                      aria-label={`View ${p.name}`}>
                      View Range &gt;
                    </Link>
                  </p>
                </div>
                <Link
                  to={p.link}
                  className='btn btn-outline btn-sm home-product-cta'
                  aria-label={`View ${p.name}`}>
                  View Range <ArrowIcon />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About snippet ── */}
      <section className='section section-alt'>
        <div className='container'>
          <div className='about-snippet-grid'>
            <div className='reveal'>
              <div className='home-product-photo'>
                <img
                  src={`${import.meta.env.BASE_URL}product/SHOVELS/p63.png`}
                  alt='Makewell SHOVELS — forged in Himatnagar, Gujarat'
                  loading='lazy'
                />
                <span className='tag'>MW — FORGED SHOVELS</span>
              </div>
            </div>
            <div className='reveal delay-2'>
              <div className='eyebrow'>
                <span className='idx'>About Us</span>
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
                Every shovel, axe, mattock, hoe and spade that leaves our unit
                is shaped, hardened and finished by people who understand what a
                farmer, a forestry crew or a construction gang needs from a
                tool.
              </p>
              <div className='badge-group'>
                <span className='badge'>🔩 Forged High-Carbon Steel</span>
                <span className='badge'>📦 Bulk &amp; Container Orders</span>
                <span className='badge'>🎨 Custom Branding</span>
                <span className='badge'>🌐 Global Export</span>
              </div>
              <div style={{ marginTop: "32px" }}>
                <Link to='/about' className='btn btn-primary'>
                  Our Story <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className='section'>
        <div className='container'>
          <SectionHead
            eyebrow='Why Makewell'
            title={
              <>
                Built for dealers.
                <br />
                Designed for the world.
              </>
            }
            className='reveal'
          />
          <div className='highlights-grid'>
            {HIGHLIGHTS.map((h, i) => (
              <div
                className={`highlight-card reveal delay-${i + 1}`}
                key={h.title}>
                <div className='hc-icon'>{h.icon}</div>
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
                <Link to={h.to} className='row-link'>
                  {h.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── CTA strip ── */}
      <CtaStrip
        title='Ready to source quality tools?'
        subtitle="Tell us your requirement and we'll respond within 24 hours."
        primaryLabel='Send an Inquiry'
        primaryTo='/contact#form'
        secondLabel='View Products'
        secondTo='/products'
      />
    </div>
  );
}
