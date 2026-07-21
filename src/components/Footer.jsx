import { Link } from 'react-router-dom';

const QUICK_LINKS = [
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About Us' },
  { to: '/products', label: 'Products' },
  { to: '/company',  label: 'Company' },
  { to: '/export',   label: 'Export' },
  { to: '/contact',  label: 'Contact' },
];

const PRODUCT_LINKS = [
  { to: '/products', label: 'Shovels & Spades' },
  { to: '/products', label: 'Axes & Hatchets' },
  { to: '/products', label: 'Pickaxes & Mattocks' },
  { to: '/products', label: 'Hoes & Rakes' },
  { to: '/products', label: 'Crowbars & Iron Bars' },
  { to: '/contact',  label: 'Custom / OEM Tools' },
];

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="f-logo">
              <span className="brand-mark footer-mark">MW</span>
              <span className="brand-text">
                <span className="name footer-name">Makewell</span><br />
                <span className="tag">Agri Equipments</span>
              </span>
            </Link>
            <p>Premium agricultural hand tools — forged in Gujarat, trusted by dealers and farmers worldwide.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="WhatsApp">W</a>
              <a href="#" aria-label="Instagram">ig</a>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h5>Quick Links</h5>
            <ul>
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="footer-col">
            <h5>Products</h5>
            <ul>
              {PRODUCT_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h5>Contact</h5>
            <ul className="fc-contact">
              <li>📍 Vaktapur, Himatnagar – 383001<br />Sabarkantha, Gujarat, India</li>
              <li>📞 <a href="tel:+919999999999">+91 99999 99999</a></li>
              <li>✉️ <a href="mailto:info@makewellagri.com">info@makewellagri.com</a></li>
              <li>✉️ <a href="mailto:export@makewellagri.com">export@makewellagri.com</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© 2025 Makewell Agri Equipments. All rights reserved.</span>
          <span>Vaktapur, Himatnagar, Gujarat, India</span>
        </div>
      </div>
    </footer>
  );
}
