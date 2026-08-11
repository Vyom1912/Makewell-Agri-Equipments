import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import "./HeroSlider.css";
const B = `${import.meta.env.BASE_URL}product/`;

const SLIDES = [
  {
    img: `${B}AXES/p17.png`,
    eyebrow: "Axes & Hatchets",
    title: "Felling Axe",
    alt: "Felling Axe — Makewell Agri Equipments",
  },
  {
    img: `${B}SHOVELS/p60.png`,
    eyebrow: "Shovels & Spades",
    title: "Square-Point Shovel",
    alt: "Square-Point Shovel — Makewell Agri Equipments",
  },
  {
    img: `${B}PICKS & MATTOCKS/p30.png`,
    eyebrow: "Pickaxes & Mattocks",
    title: "Cutter Mattock",
    alt: "Cutter Mattock — Makewell Agri Equipments",
  },
  {
    img: `${B}BARS/p27.png`,
    eyebrow: "Crowbars & Iron Bars",
    title: "Hexagonal Crowbar",
    alt: "Hexagonal Crowbar — Makewell Agri Equipments",
  },
  {
    img: `${B}HOES/p42.png`,
    eyebrow: "Hoes & Rakes",
    title: "Draw Hoe",
    alt: "Draw Hoe — Makewell Agri Equipments",
  },
];

const PAD = (n) => String(n).padStart(2, "0");

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const total = SLIDES.length;

  const go = useCallback(
    (idx) => {
      setActive(((idx % total) + total) % total);
    },
    [total],
  );

  const restart = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setActive((a) => (a + 1) % total),
      4200,
    );
  }, [total]);

  useEffect(() => {
    restart();
    return () => clearInterval(timerRef.current);
  }, [restart]);

  const handleGo = (idx) => {
    go(idx);
    restart();
  };

  return (
    <div className='hs-showcase'>
      {/* ── Main frame ── */}
      <div className='hs-frame'>
        <div className='hs-track'>
          {SLIDES.map((s, i) => (
            <div key={i} className={`hs-slide${active === i ? " active" : ""}`}>
              <div className='hs-slide-bg' aria-hidden='true' />
              <span className='hs-slide-idx'>
                <b>{PAD(i + 1)}</b> / {PAD(total)}
              </span>
              <div className='hs-slide-img-bg'>
                <img
                  src={s.img}
                  alt={s.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
              <div className='hs-caption'>
                <span className='hs-caption-eyebrow'>{s.eyebrow}</span>
                <h3 className='hs-caption-title'>{s.title}</h3>
              </div>
            </div>
          ))}

          {/* Prev / Next */}
          <button
            className='hs-nav hs-prev'
            onClick={() => handleGo(active - 1)}
            aria-label='Previous product'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'>
              <path d='M15 18l-6-6 6-6' />
            </svg>
          </button>
          <button
            className='hs-nav hs-next'
            onClick={() => handleGo(active + 1)}
            aria-label='Next product'>
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'>
              <path d='M9 18l6-6-6-6' />
            </svg>
          </button>
        </div>

        {/* Dot bar */}
        <div className='hs-dots' role='tablist' aria-label='Product slides'>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hs-dot${active === i ? " active" : ""}`}
              onClick={() => handleGo(i)}
              role='tab'
              aria-selected={active === i}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── Thumbnail strip ── */}
      <div className='hs-thumbs'>
        {SLIDES.map((s, i) => (
          <button
            key={i}
            className={`hs-thumb${active === i ? " active" : ""}`}
            onClick={() => handleGo(i)}
            aria-label={s.title}>
            <div className='hs-thumbs-img-bg'>
              <img src={s.img} alt='' aria-hidden='true' loading='lazy' />
            </div>
          </button>
        ))}
      </div>

      {/* ── Badge row ── */}
      <div className='hs-badge'>
        <span className='hs-badge-left'>DROP-FORGED · HIMATNAGAR, GUJARAT</span>
        <Link to='/products' className='hs-badge-right'>
          View all products →
        </Link>
      </div>
    </div>
  );
}
