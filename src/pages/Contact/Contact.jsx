import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useReveal } from "../../hooks/useReveal";
import { PageHero, ArrowIcon, CtaStrip, SEO } from "../../components";
import {
  PHONE_RAW, PHONE_DISPLAY, EMAIL, WHATSAPP_URL,
  CONTACT_DETAILS, COUNTRIES, PRODUCT_OPTIONS,
} from "../../data/contactData";
import "./Contact.css";

// Re-export contact constants so Footer.jsx can still import from here
export { PHONE_RAW, PHONE_DISPLAY, EMAIL, WHATSAPP_URL };


export default function Contact({ showToast }) {
  const infoRef = useRef(null);
  const mainRef = useRef(null);
  useReveal(infoRef);
  useReveal(mainRef);

  /* Scroll to form when URL has #form */
  const { hash } = useLocation();
  useEffect(() => {
    if (hash === "#form") {
      const el = document.getElementById("contact-form");
      if (el) {
        setTimeout(
          () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
          100,
        );
      }
    }
  }, [hash]);

  const EMPTY_FORM = {
    name: "",
    company: "",
    email: "",
    dialCode: "+91",
    phone: "",
    country: "",
    product: "",
    message: "",
  };

  const [form, setForm] = useState(EMPTY_FORM);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailChecking, setEmailChecking] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => {
      const updated = { ...f, [name]: value };
      // When country changes, sync dial code automatically
      if (name === "country") {
        const match = COUNTRIES.find((c) => c.name === value);
        if (match) updated.dialCode = match.dial;
      }
      return updated;
    });
    if (name === "email") setEmailError("");
  };

  /* MX-record check via Mailcheck.ai — no API key required */
  const validateEmail = async (email) => {
    const trimmed = email.trim();
    if (!trimmed) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailChecking(true);
    setEmailError("");
    try {
      const domain = trimmed.split("@")[1];
      const res = await fetch(
        `https://mailcheck.ai/api/v1/domain?domain=${encodeURIComponent(domain)}`,
        { headers: { Accept: "application/json" } },
      );
      if (!res.ok) return;
      const data = await res.json();
      if (data.disposable) {
        setEmailError("Disposable email addresses are not accepted.");
      } else if (data.mx === false) {
        setEmailError(
          "This email domain doesn't appear to exist. Please check for typos.",
        );
      }
    } catch {
      // silently allow on network error
    } finally {
      setEmailChecking(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      showToast("Please enter your full name.");
      return;
    }
    if (!form.email.trim()) {
      showToast("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (emailError) {
      document.getElementById("cn-email")?.focus();
      return;
    }
    if (emailChecking) {
      showToast("Please wait — verifying your email address.");
      return;
    }
    if (!form.message.trim()) {
      showToast("Please describe your requirement.");
      return;
    }

    // Build full phone string for the email
    const fullPhone = form.phone.trim()
      ? `${form.dialCode} ${form.phone.trim()}`
      : "";

    setSending(true);
    try {
      const payload = {
        access_key: import.meta.env.VITE_WEB3FORMS_KEY,
        subject: `New Inquiry from ${form.name}${form.company ? ` — ${form.company}` : ""}`,
        from_name: "Makewell Website",
        replyto: form.email,
        name: form.name,
        company: form.company,
        email: form.email,
        phone: fullPhone,
        country: form.country,
        product: form.product,
        message: form.message,
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setForm(EMPTY_FORM);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 6000);
      } else {
        showToast(
          "Something went wrong. Please try again or email us directly.",
        );
      }
    } catch {
      showToast("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <SEO
        title='Contact Us — Get a Quote for Agricultural Tools'
        description='Contact Makewell Agri Equipments for bulk orders, export inquiries and custom manufacturing. Call, WhatsApp or email us. Based in Himatnagar, Gujarat, India. Response within 24 hours.'
        canonical='/contact'
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: "https://www.makewellagriequipments.com/contact",
          name: "Contact Makewell Agri Equipments",
          mainEntity: {
            "@type": "Organization",
            name: "Makewell Agri Equipments",
            telephone: "+91-98252-70190",
            email: "makewellagri@gmail.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Vaktapur",
              addressLocality: "Himatnagar",
              addressRegion: "Gujarat",
              postalCode: "383001",
              addressCountry: "IN",
            },
          },
        }}
      />
      <PageHero
        title='Contact Us'
        subtitle="Whether you're a distributor looking for a long-term supply partner or a first-time buyer — we're ready to help."
        breadcrumb={[{ label: "Contact" }]}
      />

      {/* ── 1. Info strip ── */}
      <section className='contact-info-bar' ref={infoRef}>
        <div className='container'>
          <div className='contact-info-cells'>
            {CONTACT_DETAILS.map((d, i) => (
              <div className={`contact-info-cell reveal delay-${i + 1}`} key={d.label}>
                <div className='cic-icon'>{d.ic}</div>
                <div>
                  <span className='cic-label'>{d.label}</span>
                  <div className='cic-value'>
                    {d.lines && d.lines.map((line, j) => (
                      <span key={j}>{line}{j < d.lines.length - 1 && <br />}</span>
                    ))}
                    {d.phone && (
                      <>
                        <a href={`tel:${PHONE_RAW}`}>{PHONE_DISPLAY}</a>
                        <br />
                        <a href={WHATSAPP_URL} target='_blank' rel='noopener noreferrer' className='cic-dim'>
                          WhatsApp ↗
                        </a>
                      </>
                    )}
                    {d.email && <a href={`mailto:${EMAIL}`}>{EMAIL}</a>}
                    {d.note && <span className='cic-dim'>{d.note}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Map + Form ── */}
      <section className='section' ref={mainRef} id='contact-form'>
        <div className='container'>
          <div className='contact-grid'>
            {/* Left — map */}
            <div className='reveal'>
              <div className='eyebrow'>
                <span className='idx'>Our Location</span>
                <span className='rule' />
              </div>
              <h2
                style={{
                  fontSize: "clamp(22px,2.8vw,34px)",
                  marginBottom: "20px",
                }}>
                Find us in Himatnagar,
                <br />
                Gujarat.
              </h2>
              <div className='contact-map'>
                <iframe
                  src='https://www.google.com/maps?q=23.678558,72.945444&z=17&t=k&output=embed'
                  width='100%'
                  height='280'
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  title='Makewell Agri Equipments — Satellite Map'
                />
                <a
                  href='https://www.google.com/maps?q=23.678558,72.945444'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='map-link-btn map-link-btn--light'>
                  📍 Open in Google Maps
                </a>
              </div>
              <div className='loc-cards'>
                <div className='loc-card'>
                  <span className='loc-card-label'>🏭 Manufacturing Hub</span>
                  <p>
                    Himatnagar, Sabarkantha — India's most prominent
                    agricultural hand tool cluster with a century-old forging
                    tradition.
                  </p>
                </div>
                <div className='loc-card'>
                  <span className='loc-card-label'>🚢 Export Logistics</span>
                  <p>
                    Ahmedabad 90 km · NH-48 highway · Mundra &amp; Kandla ports
                    · Ahmedabad Airport 90 km
                  </p>
                </div>
              </div>
            </div>

            {/* Right — inquiry form */}
            <div className='reveal delay-2'>
              <div className='contact-form-card'>
                <div className='contact-form-head'>
                  <h3>Send an Inquiry</h3>
                  <p>
                    Share your requirement and we&apos;ll respond within 24
                    hours on business days.
                  </p>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                  {/* Row 1 — Name + Company */}
                  <div className='form-row'>
                    <div className='field field--light'>
                      <label htmlFor='cn-name'>Full Name *</label>
                      <input
                        type='text'
                        id='cn-name'
                        name='name'
                        placeholder='Your full name'
                        required
                        value={form.name}
                        onChange={handleChange}
                        autoComplete='name'
                      />
                    </div>
                    <div className='field field--light'>
                      <label htmlFor='cn-company'>Company</label>
                      <input
                        type='text'
                        id='cn-company'
                        name='company'
                        placeholder='Your company'
                        value={form.company}
                        onChange={handleChange}
                        autoComplete='organization'
                      />
                    </div>
                  </div>

                  {/* Row 2 — Email + Phone with dial code */}
                  <div className='form-row'>
                    <div
                      className={`field field--light${emailError ? " field--error" : ""}`}>
                      <label htmlFor='cn-email'>Email Address *</label>
                      <input
                        type='email'
                        id='cn-email'
                        name='email'
                        placeholder='you@company.com'
                        required
                        value={form.email}
                        onChange={handleChange}
                        onBlur={(e) => validateEmail(e.target.value)}
                        autoComplete='email'
                        aria-describedby={
                          emailError ? "cn-email-error" : undefined
                        }
                        aria-invalid={!!emailError}
                      />
                      {emailChecking && (
                        <span className='field-hint'>Verifying…</span>
                      )}
                      {emailError && (
                        <span
                          className='field-error'
                          id='cn-email-error'
                          role='alert'>
                          {emailError}
                        </span>
                      )}
                    </div>
                    <div className='field field--light'>
                      <label htmlFor='cn-phone'>Phone / WhatsApp</label>
                      <div className='phone-input-group'>
                        <select
                          className='dial-select'
                          name='dialCode'
                          value={form.dialCode}
                          onChange={handleChange}
                          aria-label='Country dial code'>
                          {COUNTRIES.map((c) => (
                            <option key={`${c.code}-${c.dial}`} value={c.dial}>
                              {c.code} {c.dial}
                            </option>
                          ))}
                        </select>
                        <input
                          type='tel'
                          id='cn-phone'
                          name='phone'
                          placeholder='98765 43210'
                          value={form.phone}
                          onChange={handleChange}
                          autoComplete='tel-national'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3 — Country select + Product */}
                  <div className='form-row'>
                    <div className='field field--light'>
                      <label htmlFor='cn-country'>Country</label>
                      <select
                        id='cn-country'
                        name='country'
                        value={form.country}
                        onChange={handleChange}>
                        <option value=''>— Select country —</option>
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='field field--light'>
                      <label htmlFor='cn-product'>Product Interest</label>
                      <select
                        id='cn-product'
                        name='product'
                        value={form.product}
                        onChange={handleChange}>
                        <option value=''>— Select —</option>
                        {PRODUCT_OPTIONS.map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className='field field--light full'>
                    <label htmlFor='cn-message'>Message / Requirements *</label>
                    <textarea
                      id='cn-message'
                      name='message'
                      rows='5'
                      placeholder='Describe your requirement, quantities, specifications...'
                      required
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type='submit'
                    className='btn btn-primary btn-full'
                    disabled={sending}>
                    {sending ? "Sending…" : "Send Inquiry"}{" "}
                    {!sending && <ArrowIcon />}
                  </button>
                  <p className='contact-form-note'>
                    We respond within 24 hours on business days.
                  </p>
                  {success && (
                    <div className='contact-form-success show' role='alert'>
                      ✓ Your inquiry has been sent. We&apos;ll be in touch
                      shortly.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. CTA ── */}
      <CtaStrip
        title='Prefer to call or WhatsApp?'
        subtitle='Reach us directly — our team responds same day during business hours.'
        primaryLabel='WhatsApp Us'
        primaryHref={WHATSAPP_URL}
        secondLabel={`Email: ${EMAIL}`}
        secondHref={`mailto:${EMAIL}`}
      />
    </>
  );
}
