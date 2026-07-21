import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <div className="nf-inner">
          <span className="nf-code">404</span>
          <h1>Page not found.</h1>
          <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <div className="nf-actions">
            <Link to="/" className="btn btn-primary">Back to Home</Link>
            <Link to="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
