import { Helmet } from "react-helmet-async";

const SITE = "https://www.makewellagriequipments.com";
const DEFAULT_IMG = `${SITE}/img/MW Single-Bit Felling Axe.png`;

/**
 * SEO component — renders <title>, meta, Open Graph, Twitter Card,
 * canonical link, and optional JSON-LD structured data.
 */
export default function SEO({
  title,
  description,
  canonical,
  image = DEFAULT_IMG,
  jsonLd = null,
}) {
  const fullTitle = title
    ? `${title} | Makewell Agri Equipments`
    : "Makewell Agri Equipments — Forged Agricultural Tools, Himatnagar Gujarat India";

  const canonicalUrl = canonical ? `${SITE}${canonical}` : SITE;

  return (
    <Helmet>
      {/* ── Core ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* ── Open Graph (Facebook / WhatsApp / LinkedIn) ── */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Makewell Agri Equipments" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* ── JSON-LD structured data ── */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
