import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import PageHero from "../components/PageHero";
import ArrowIcon from "../components/ArrowIcon";
import CtaStrip from "../components/CtaStrip";

/* ── Real contact details ─────────────────────────────────── */
export const PHONE_RAW = "+919825270190";
export const PHONE_DISPLAY = "+91 98252 70190";
export const EMAIL = "makewellagri@gmail.com";
export const WHATSAPP_URL = `https://wa.me/${PHONE_RAW.replace("+", "")}`;

/* ── Country list: { name, code (ISO), dial } ─────────────── */
const COUNTRIES = [
  { name: "Afghanistan",                 code: "AF", dial: "+93"   },
  { name: "Albania",                     code: "AL", dial: "+355"  },
  { name: "Algeria",                     code: "DZ", dial: "+213"  },
  { name: "Andorra",                     code: "AD", dial: "+376"  },
  { name: "Angola",                      code: "AO", dial: "+244"  },
  { name: "Argentina",                   code: "AR", dial: "+54"   },
  { name: "Armenia",                     code: "AM", dial: "+374"  },
  { name: "Australia",                   code: "AU", dial: "+61"   },
  { name: "Austria",                     code: "AT", dial: "+43"   },
  { name: "Azerbaijan",                  code: "AZ", dial: "+994"  },
  { name: "Bahrain",                     code: "BH", dial: "+973"  },
  { name: "Bangladesh",                  code: "BD", dial: "+880"  },
  { name: "Belarus",                     code: "BY", dial: "+375"  },
  { name: "Belgium",                     code: "BE", dial: "+32"   },
  { name: "Bolivia",                     code: "BO", dial: "+591"  },
  { name: "Bosnia and Herzegovina",      code: "BA", dial: "+387"  },
  { name: "Brazil",                      code: "BR", dial: "+55"   },
  { name: "Bulgaria",                    code: "BG", dial: "+359"  },
  { name: "Cambodia",                    code: "KH", dial: "+855"  },
  { name: "Cameroon",                    code: "CM", dial: "+237"  },
  { name: "Canada",                      code: "CA", dial: "+1"    },
  { name: "Chile",                       code: "CL", dial: "+56"   },
  { name: "China",                       code: "CN", dial: "+86"   },
  { name: "Colombia",                    code: "CO", dial: "+57"   },
  { name: "Costa Rica",                  code: "CR", dial: "+506"  },
  { name: "Croatia",                     code: "HR", dial: "+385"  },
  { name: "Cuba",                        code: "CU", dial: "+53"   },
  { name: "Cyprus",                      code: "CY", dial: "+357"  },
  { name: "Czech Republic",              code: "CZ", dial: "+420"  },
  { name: "Denmark",                     code: "DK", dial: "+45"   },
  { name: "Dominican Republic",          code: "DO", dial: "+1"    },
  { name: "Ecuador",                     code: "EC", dial: "+593"  },
  { name: "Egypt",                       code: "EG", dial: "+20"   },
  { name: "El Salvador",                 code: "SV", dial: "+503"  },
  { name: "Estonia",                     code: "EE", dial: "+372"  },
  { name: "Ethiopia",                    code: "ET", dial: "+251"  },
  { name: "Finland",                     code: "FI", dial: "+358"  },
  { name: "France",                      code: "FR", dial: "+33"   },
  { name: "Georgia",                     code: "GE", dial: "+995"  },
  { name: "Germany",                     code: "DE", dial: "+49"   },
  { name: "Ghana",                       code: "GH", dial: "+233"  },
  { name: "Greece",                      code: "GR", dial: "+30"   },
  { name: "Guatemala",                   code: "GT", dial: "+502"  },
  { name: "Honduras",                    code: "HN", dial: "+504"  },
  { name: "Hungary",                     code: "HU", dial: "+36"   },
  { name: "Iceland",                     code: "IS", dial: "+354"  },
  { name: "India",                       code: "IN", dial: "+91"   },
  { name: "Indonesia",                   code: "ID", dial: "+62"   },
  { name: "Iran",                        code: "IR", dial: "+98"   },
  { name: "Iraq",                        code: "IQ", dial: "+964"  },
  { name: "Ireland",                     code: "IE", dial: "+353"  },
  { name: "Israel",                      code: "IL", dial: "+972"  },
  { name: "Italy",                       code: "IT", dial: "+39"   },
  { name: "Jamaica",                     code: "JM", dial: "+1"    },
  { name: "Japan",                       code: "JP", dial: "+81"   },
  { name: "Jordan",                      code: "JO", dial: "+962"  },
  { name: "Kazakhstan",                  code: "KZ", dial: "+7"    },
  { name: "Kenya",                       code: "KE", dial: "+254"  },
  { name: "Kuwait",                      code: "KW", dial: "+965"  },
  { name: "Kyrgyzstan",                  code: "KG", dial: "+996"  },
  { name: "Laos",                        code: "LA", dial: "+856"  },
  { name: "Latvia",                      code: "LV", dial: "+371"  },
  { name: "Lebanon",                     code: "LB", dial: "+961"  },
  { name: "Libya",                       code: "LY", dial: "+218"  },
  { name: "Lithuania",                   code: "LT", dial: "+370"  },
  { name: "Luxembourg",                  code: "LU", dial: "+352"  },
  { name: "Malaysia",                    code: "MY", dial: "+60"   },
  { name: "Maldives",                    code: "MV", dial: "+960"  },
  { name: "Mexico",                      code: "MX", dial: "+52"   },
  { name: "Moldova",                     code: "MD", dial: "+373"  },
  { name: "Mongolia",                    code: "MN", dial: "+976"  },
  { name: "Morocco",                     code: "MA", dial: "+212"  },
  { name: "Mozambique",                  code: "MZ", dial: "+258"  },
  { name: "Myanmar",                     code: "MM", dial: "+95"   },
  { name: "Nepal",                       code: "NP", dial: "+977"  },
  { name: "Netherlands",                 code: "NL", dial: "+31"   },
  { name: "New Zealand",                 code: "NZ", dial: "+64"   },
  { name: "Nicaragua",                   code: "NI", dial: "+505"  },
  { name: "Nigeria",                     code: "NG", dial: "+234"  },
  { name: "North Korea",                 code: "KP", dial: "+850"  },
  { name: "Norway",                      code: "NO", dial: "+47"   },
  { name: "Oman",                        code: "OM", dial: "+968"  },
  { name: "Pakistan",                    code: "PK", dial: "+92"   },
  { name: "Panama",                      code: "PA", dial: "+507"  },
  { name: "Paraguay",                    code: "PY", dial: "+595"  },
  { name: "Peru",                        code: "PE", dial: "+51"   },
  { name: "Philippines",                 code: "PH", dial: "+63"   },
  { name: "Poland",                      code: "PL", dial: "+48"   },
  { name: "Portugal",                    code: "PT", dial: "+351"  },
  { name: "Qatar",                       code: "QA", dial: "+974"  },
  { name: "Romania",                     code: "RO", dial: "+40"   },
  { name: "Russia",                      code: "RU", dial: "+7"    },
  { name: "Rwanda",                      code: "RW", dial: "+250"  },
  { name: "Saudi Arabia",                code: "SA", dial: "+966"  },
  { name: "Senegal",                     code: "SN", dial: "+221"  },
  { name: "Serbia",                      code: "RS", dial: "+381"  },
  { name: "Singapore",                   code: "SG", dial: "+65"   },
  { name: "Slovakia",                    code: "SK", dial: "+421"  },
  { name: "Slovenia",                    code: "SI", dial: "+386"  },
  { name: "Somalia",                     code: "SO", dial: "+252"  },
  { name: "South Africa",                code: "ZA", dial: "+27"   },
  { name: "South Korea",                 code: "KR", dial: "+82"   },
  { name: "Spain",                       code: "ES", dial: "+34"   },
  { name: "Sri Lanka",                   code: "LK", dial: "+94"   },
  { name: "Sudan",                       code: "SD", dial: "+249"  },
  { name: "Sweden",                      code: "SE", dial: "+46"   },
  { name: "Switzerland",                 code: "CH", dial: "+41"   },
  { name: "Syria",                       code: "SY", dial: "+963"  },
  { name: "Taiwan",                      code: "TW", dial: "+886"  },
  { name: "Tajikistan",                  code: "TJ", dial: "+992"  },
  { name: "Tanzania",                    code: "TZ", dial: "+255"  },
  { name: "Thailand",                    code: "TH", dial: "+66"   },
  { name: "Tunisia",                     code: "TN", dial: "+216"  },
  { name: "Turkey",                      code: "TR", dial: "+90"   },
  { name: "Turkmenistan",                code: "TM", dial: "+993"  },
  { name: "Uganda",                      code: "UG", dial: "+256"  },
  { name: "Ukraine",                     code: "UA", dial: "+380"  },
  { name: "United Arab Emirates",        code: "AE", dial: "+971"  },
  { name: "United Kingdom",              code: "GB", dial: "+44"   },
  { name: "United States",               code: "US", dial: "+1"    },
  { name: "Uruguay",                     code: "UY", dial: "+598"  },
  { name: "Uzbekistan",                  code: "UZ", dial: "+998"  },
  { name: "Venezuela",                   code: "VE", dial: "+58"   },
  { name: "Vietnam",                     code: "VN", dial: "+84"   },
  { name: "Yemen",                       code: "YE", dial: "+967"  },
  { name: "Zimbabwe",                    code: "ZW", dial: "+263"  },
];

const DETAILS = [
  {
    ic: "📍",
    label: "Address",
    value: (
      <>
        Makewell Agri Equipments
        <br />
        Vaktapur, Himatnagar – 383001
        <br />
        Sabarkantha, Gujarat, India
      </>
    ),
  },
  {
    ic: "📞",
    label: "Phone / WhatsApp",
    value: (
      <>
        <a href={`tel:${PHONE_RAW}`}>{PHONE_DISPLAY}</a>
        <br />
        <a
          href={WHATSAPP_URL}
          target='_blank'
          rel='noopener noreferrer'
          className='cic-dim'>
          WhatsApp ↗
        </a>
      </>
    ),
  },
  {
    ic: "✉️",
    label: "Email",
    value: (
      <>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </>
    ),
  },
  {
    ic: "🕐",
    label: "Business Hours",
    value: (
      <>
        Mon, Wed – Sun: 9:00 am – 6:00 pm IST
        <br />
        <span className='cic-dim'>Tuesday: Closed</span>
      </>
    ),
  },
];

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
    if (!form.name.trim()) { showToast("Please enter your full name."); return; }
    if (!form.email.trim()) { showToast("Please enter your email address."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setEmailError("Please enter a valid email address."); return;
    }
    if (emailError) { document.getElementById("cn-email")?.focus(); return; }
    if (emailChecking) { showToast("Please wait — verifying your email address."); return; }
    if (!form.message.trim()) { showToast("Please describe your requirement."); return; }

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
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setForm(EMPTY_FORM);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 6000);
      } else {
        showToast("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      showToast("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero
        title='Contact Us'
        subtitle="Whether you're a distributor looking for a long-term supply partner or a first-time buyer — we're ready to help."
        breadcrumb={[{ label: "Contact" }]}
      />

      {/* ── 1. Info strip ── */}
      <section className='contact-info-bar' ref={infoRef}>
        <div className='container'>
          <div className='contact-info-cells'>
            {DETAILS.map((d, i) => (
              <div
                className={`contact-info-cell reveal delay-${i + 1}`}
                key={d.label}>
                <div className='cic-icon'>{d.ic}</div>
                <div>
                  <span className='cic-label'>{d.label}</span>
                  <div className='cic-value'>{d.value}</div>
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
              <h2 style={{ fontSize: "clamp(22px,2.8vw,34px)", marginBottom: "20px" }}>
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
                    <div className={`field field--light${emailError ? " field--error" : ""}`}>
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
                        aria-describedby={emailError ? "cn-email-error" : undefined}
                        aria-invalid={!!emailError}
                      />
                      {emailChecking && (
                        <span className='field-hint'>Verifying…</span>
                      )}
                      {emailError && (
                        <span className='field-error' id='cn-email-error' role='alert'>
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
                      ✓ Your inquiry has been sent. We&apos;ll be in touch shortly.
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