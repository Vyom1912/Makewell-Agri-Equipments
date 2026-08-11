// ── Home page data ────────────────────────────────────────────

const B = `${import.meta.env.BASE_URL}product/`;

export const HOME_PRODUCTS = [
  {
    num: "01",
    img: `${B}SHOVELS/p64.png`,
    name: "Shovels & Spades",
    tagline: "Built for every dig.",
    desc: "Heat-treated blades in round-point, square-point, trenching and spade profiles. Wood, fibreglass or steel handles.",
    link: "/products",
  },
  {
    num: "02",
    img: `${B}AXES/p17.png`,
    name: "Axes & Hatchets",
    tagline: "Drop-forged for every cut.",
    desc: "Felling axes, splitting axes and hatchets — precision-ground edges, hickory or fibreglass handles. Single and double bit.",
    link: "/products",
  },
  {
    num: "03",
    img: `${B}PICKS & MATTOCKS/p30.png`,
    name: "Pickaxes & Mattocks",
    tagline: "Built for the hardest ground.",
    desc: "Cutter mattocks, pick mattocks and adzes that break hardpan, clear roots and handle rough earthworks.",
    link: "/products",
  },
  {
    num: "04",
    img: `${B}HOES/p41.png`,
    name: "Hoes & Rakes",
    tagline: "Precision for the field.",
    desc: "Draw hoes, stirrup hoes and garden rakes for weeding and cultivation across tropical and arid markets.",
    link: "/products",
  },
  {
    num: "05",
    img: `${B}BARS/p27.png`,
    name: "Crowbars & Iron Bars",
    tagline: "Solid iron, built to last.",
    desc: "Hexagonal crowbars, flat pry bars and tamping rods — custom-cut lengths, multiple diameters.",
    link: "/products",
  },
  {
    num: "06",
    img: `${B}BINETTES/p1.png`,
    name: "Binettes",
    tagline: "Precision weeding tools.",
    desc: "Forged binettes for precision weeding and soil aeration — popular in European, African and Middle Eastern markets.",
    link: "/products",
  },
  {
    num: "07",
    img: `${B}FORGED HAMMERS/p11.png`,
    name: "Forged Hammers",
    tagline: "Impact, every swing.",
    desc: "Drop-forged steel hammers in multiple head weights — construction, demolition and agricultural use.",
    link: "/products",
  },
];

export const HIGHLIGHTS = [
  {
    icon: "⚒️",
    title: "Five Tool Families",
    desc: "Shovels, axes, mattocks, hoes and crowbars — engineered for real-world field use.",
    to: "/products",
    cta: "Browse Products",
  },
  {
    icon: "🎨",
    title: "Custom Manufacturing",
    desc: "Your blade shape, handle length, finish and brand — manufactured to your exact spec.",
    to: "/contact#form",
    cta: "Start Custom Order",
  },
  {
    icon: "🌐",
    title: "Global Export",
    desc: "Trusted by dealers and distributors in 50+ countries across 4 continents.",
    to: "/export",
    cta: "View Reach",
  },
];

export const HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.makewellagriequipments.com/#organization",
      name: "Makewell Agri Equipments",
      url: "https://www.makewellagriequipments.com/",
      logo: "https://www.makewellagriequipments.com/mwIcone.png",
      description: "Manufacturer and exporter of forged agricultural hand tools — shovels, axes, mattocks, hoes and crowbars — from Himatnagar, Gujarat, India.",
      foundingDate: "1996",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Vaktapur",
        addressLocality: "Himatnagar",
        addressRegion: "Gujarat",
        postalCode: "383001",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-98252-70190",
        contactType: "sales",
        availableLanguage: ["English", "Hindi", "Gujarati"],
      },
      sameAs: ["https://github.com/Vyom1912/Makewell-Agri-Equipments"],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.makewellagriequipments.com/#website",
      url: "https://www.makewellagriequipments.com/",
      name: "Makewell Agri Equipments",
      publisher: { "@id": "https://www.makewellagriequipments.com/#organization" },
    },
  ],
};
