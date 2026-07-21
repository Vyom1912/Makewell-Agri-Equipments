import { useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import PageHero  from '../components/PageHero';
import ArrowIcon from '../components/ArrowIcon';
import CtaStrip  from '../components/CtaStrip';

const DETAILS = [
  {
    ic: '📍', label: 'Address',
    value: <>Makewell Agri Equipments<br />Vaktapur, Himatnagar – 383001<br />Sabarkantha, Gujarat, India</>,
  },
  {
    ic: '📞', label: 'Phone / WhatsApp',
    value: <><a href="tel:+919999999999">+91 99999 99999</a><br /><span className="cic-dim">Mon–Sat, 9 am – 6 pm IST</span></>,
  },
  {
    ic: '✉️', label: 'Email',
    value: <><a href="mailto:info@makewellagri.com">info@makewellagri.com</a><br /><a href="mailto:export@makewellagri.com">export@makewellagri.com</a></>,
  },
  {
    ic: '🕐', label: 'Business Hours',
    value: <>Monday – Saturday: 9:00 am – 6:00 pm IST<br /><span className="cic-dim">Sunday: Closed</span></>,
  },
];

export default function Contact({ showToast }) {
  const infoRef  = useRef(null);
  const mainRef  = useRef(null);
  useReveal(infoRef);
  useReveal(mainRef);

  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', country: '', product: '', message: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim())    { showToast('Please enter your full name.'); return; }
    if (!form.email.trim())   { showToast('Please enter your email address.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { showToast('Please enter a valid email.'); return; }
    if (!form.message.trim()) { showToast('Please describe your requirement.'); return; }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: '', company: '', email: '', phone: '', country: '', product: '', message: '' });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 6000);
    }, 1400);
  };

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Whether you're a distributor looking for a long-term supply partner or a first-time buyer — we're ready to help."
        breadcrumb={[{ label: 'Contact' }]}
      />

      {/* ── 1. Info strip — section-alt (light warm) ── */}
      <section className="contact-info-bar" ref={infoRef}>
        <div className="container">
          <div className="contact-info-cells">
            {DETAILS.map((d, i) => (
              <div className={`contact-info-cell reveal delay-${i + 1}`} key={d.label}>
                <div className="cic-icon">{d.ic}</div>
                <div>
                  <span className="cic-label">{d.label}</span>
                  <div className="cic-value">{d.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Map + Form — white section ── */}
      <section className="section" ref={mainRef}>
        <div className="container">
          <div className="contact-grid">

            {/* Left — map + location notes */}
            <div className="reveal">
              <div className="eyebrow">
                <span className="idx">Our Location</span>
                <span className="rule" />
              </div>
              <h2 style={{ fontSize: 'clamp(22px,2.8vw,34px)', marginBottom: '20px' }}>
                Find us in Himatnagar,<br />Gujarat.
              </h2>
              <div className="contact-map">
                <iframe
                  src="https://www.google.com/maps?q=23.678558,72.945444&z=17&t=k&output=embed"
                  width="100%" height="280"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Makewell Agri Equipments — Satellite Map"
                />
                <a
                  href="https://www.google.com/maps?q=23.678558,72.945444"
                  target="_blank" rel="noopener noreferrer"
                  className="map-link-btn map-link-btn--light"
                >
                  📍 Open in Google Maps
                </a>
              </div>
              <div className="loc-cards">
                <div className="loc-card">
                  <span className="loc-card-label">🏭 Manufacturing Hub</span>
                  <p>Himatnagar, Sabarkantha — India's most prominent agricultural hand tool cluster with a century-old forging tradition.</p>
                </div>
                <div className="loc-card">
                  <span className="loc-card-label">🚢 Export Logistics</span>
                  <p>Ahmedabad 90 km · NH-48 highway · Mundra &amp; Kandla ports · Ahmedabad Airport 90 km</p>
                </div>
              </div>
            </div>

            {/* Right — inquiry form */}
            <div className="reveal delay-2">
              <div className="contact-form-card">
                <div className="contact-form-head">
                  <h3>Send an Inquiry</h3>
                  <p>Share your requirement and we&apos;ll respond within 24 hours on business days.</p>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="field field--light">
                      <label htmlFor="cn-name">Full Name *</label>
                      <input type="text" id="cn-name" name="name" placeholder="Your full name" required value={form.name} onChange={handleChange} autoComplete="name" />
                    </div>
                    <div className="field field--light">
                      <label htmlFor="cn-company">Company</label>
                      <input type="text" id="cn-company" name="company" placeholder="Your company" value={form.company} onChange={handleChange} autoComplete="organization" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field field--light">
                      <label htmlFor="cn-email">Email Address *</label>
                      <input type="email" id="cn-email" name="email" placeholder="you@company.com" required value={form.email} onChange={handleChange} autoComplete="email" />
                    </div>
                    <div className="field field--light">
                      <label htmlFor="cn-phone">Phone / WhatsApp</label>
                      <input type="tel" id="cn-phone" name="phone" placeholder="+1 234 567 8900" value={form.phone} onChange={handleChange} autoComplete="tel" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field field--light">
                      <label htmlFor="cn-country">Country</label>
                      <input type="text" id="cn-country" name="country" placeholder="Your country" value={form.country} onChange={handleChange} autoComplete="country-name" />
                    </div>
                    <div className="field field--light">
                      <label htmlFor="cn-product">Product Interest</label>
                      <select id="cn-product" name="product" value={form.product} onChange={handleChange}>
                        <option value="">— Select —</option>
                        <option>Shovels &amp; Spades</option>
                        <option>Axes &amp; Hatchets</option>
                        <option>Pickaxes &amp; Mattocks</option>
                        <option>Hoes &amp; Rakes</option>
                        <option>Crowbars &amp; Iron Bars</option>
                        <option>Custom / OEM Manufacturing</option>
                        <option>Multiple Products</option>
                      </select>
                    </div>
                  </div>
                  <div className="field field--light full">
                    <label htmlFor="cn-message">Message / Requirements *</label>
                    <textarea id="cn-message" name="message" rows="5" placeholder="Describe your requirement, quantities, specifications..." required value={form.message} onChange={handleChange} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-full" disabled={sending}>
                    {sending ? 'Sending…' : 'Send Inquiry'} {!sending && <ArrowIcon />}
                  </button>
                  <p className="contact-form-note">We respond within 24 hours on business days.</p>
                  {success && (
                    <div className="contact-form-success show" role="alert">
                      ✓ Your inquiry has been sent. We&apos;ll be in touch shortly.
                    </div>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. CTA — dark (uses shared CtaStrip) ── */}
      <CtaStrip
        title="Prefer to call or email?"
        subtitle="Reach us directly — our team responds same day during business hours."
        primaryLabel="WhatsApp Us"
        primaryTo="/contact"
        secondLabel="Send Email"
        secondTo="/contact"
      />
    </>
  );
}
