/**
 * Dane strukturalne (JSON-LD) dla Google – generowane z src/data/business.js
 * i wstrzykiwane do <head> podczas budowania strony (vite.config.js).
 */
import { BUSINESS, FAQ, PRICE_LIST, SERVICE_TEXTS, minPrice } from "../data/business.js";

export const SITE_URL = "https://mentocare.pl/";

export function buildSchema() {
  const salonId = `${SITE_URL}#salon`;

  const salon = {
    "@type": "BeautySalon",
    "@id": salonId,
    name: "Mento Care - Kosmetologia Bochnia",
    alternateName: ["Mento Care", "Mento Care Faustyna Hojnor"],
    description:
      "Gabinet kosmetologii estetycznej w Bochni. Terapia trądziku, mezoterapia igłowa i mikroigłowa, stymulatory tkankowe, peelingi medyczne, masaż Kobido, Head SPA i fizjoterapia estetyczna.",
    url: SITE_URL,
    logo: `${SITE_URL}icon-512.png`,
    image: [`${SITE_URL}og-mento-care.jpg`],
    telephone: BUSINESS.phone,
    priceRange: "40–999 zł",
    currenciesAccepted: "PLN",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      postalCode: BUSINESS.postalCode,
      addressRegion: "małopolskie",
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    hasMap: BUSINESS.googleProfileUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Bochnia" },
      { "@type": "AdministrativeArea", name: "powiat bocheński" },
    ],
    founder: {
      "@type": "Person",
      name: BUSINESS.owner,
      jobTitle: "Kosmetolog estetyczna",
      worksFor: { "@id": salonId },
    },
    sameAs: [
      BUSINESS.facebook,
      BUSINESS.instagram,
      BUSINESS.tiktok,
      BUSINESS.booksyUrl,
      BUSINESS.googleProfileUrl,
    ],
    knowsAbout: SERVICE_TEXTS.map((s) => s.name),
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: BUSINESS.booksyUrl,
        inLanguage: "pl-PL",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "Rezerwacja wizyty w Mento Care" },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cennik zabiegów Mento Care",
      itemListElement: PRICE_LIST.filter((c) => minPrice(c)).map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: c.title },
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: minPrice(c),
          priceCurrency: "PLN",
        },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: "Mento Care",
    inLanguage: "pl-PL",
    publisher: { "@id": salonId },
  };

  const faq = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}#faq`,
    mainEntity: FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return { "@context": "https://schema.org", "@graph": [salon, website, faq] };
}
