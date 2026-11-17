/**
 * Podstrony – osobne adresy dla Google (np. mentocare.pl/vouchery/).
 * Dzięki nim Google może pokazywać pod wynikiem linki do działów strony (tzw. sitelinks)
 * – nie da się ich wymusić, Google wybiera je sam, gdy strona ma wyraźną strukturę.
 *
 * • Strona główna pokazuje wszystkie sekcje jak dotąd.
 * • Podstrona pokazuje tylko swoje sekcje (+ kontakt) i ma własny tytuł i opis w Google.
 * • Pliki HTML podstron generuje scripts/prerender.mjs przy `npm run build`.
 *
 * title = niebieski tytuł w Google (do ~60 znaków), description = opis pod nim (do ~155 znaków).
 */
import { BUSINESS } from "./business.js";

export const SITE_URL = "https://mentocare.pl";

export const HOME = {
  key: "home",
  path: "/",
  sections: ["start", "zabiegi", "o-nas", "metamorfozy", "cennik", "voucher", "faq", "kontakt"],
};

export const PAGES = [
  {
    key: "zabiegi",
    path: "/zabiegi/",
    crumb: "Zabiegi",
    sections: ["zabiegi", "kontakt"],
    h1: "Zabiegi kosmetologiczne w Bochni",
    title: "Zabiegi kosmetologiczne Bochnia – Mento Care",
    description:
      "Terapia trądziku, mezoterapia igłowa i mikroigłowa, stymulatory tkankowe, BTX, peelingi medyczne, lampa LED, masaż Kobido i Head SPA w gabinecie w Bochni.",
  },
  {
    key: "o-nas",
    path: "/o-nas/",
    crumb: "O nas",
    sections: ["o-nas", "kontakt"],
    h1: "O nas – zespół Mento Care",
    title: "O nas – Faustyna Hojnor i zespół | Mento Care Bochnia",
    description:
      "Poznaj zespół Mento Care: kosmetolog estetyczna Faustyna Hojnor i fizjoterapeutka Kamila Maj. Indywidualne podejście i nowoczesne zabiegi w Bochni.",
  },
  {
    key: "metamorfozy",
    path: "/metamorfozy/",
    crumb: "Metamorfozy",
    sections: ["metamorfozy", "kontakt"],
    h1: "Metamorfozy – efekty zabiegów w Mento Care",
    title: "Metamorfozy – efekty zabiegów | Mento Care Bochnia",
    description:
      "Zdjęcia przed i po zabiegach w gabinecie Mento Care w Bochni – zobacz efekty pracy ze skórą naszych klientów.",
  },
  {
    key: "cennik",
    path: "/cennik/",
    crumb: "Cennik",
    sections: ["cennik", "kontakt"],
    h1: "Cennik zabiegów Mento Care",
    title: "Cennik zabiegów – Mento Care Kosmetologia Bochnia",
    description:
      "Aktualny cennik zabiegów kosmetologicznych w Bochni: konsultacje, terapia trądziku, mezoterapia, stymulatory tkankowe, peelingi, Kobido i Head SPA.",
  },
  {
    key: "vouchery",
    path: "/vouchery/",
    crumb: "Vouchery",
    sections: ["voucher", "voucher-szczegoly", "kontakt"],
    h1: "Voucher podarunkowy Mento Care – kup online",
    title: "Voucher podarunkowy – kup online | Mento Care Bochnia",
    description:
      "Podaruj voucher na zabieg lub dowolną kwotę. PDF od razu na e-mail albo voucher w eleganckim pudełku – do odbioru w Bochni lub z wysyłką.",
    ogImage: "/og-vouchery.jpg",
  },
  {
    key: "kontakt",
    path: "/kontakt/",
    crumb: "Kontakt",
    sections: ["kontakt"],
    h1: "Kontakt i dojazd – Mento Care Bochnia",
    title: `Kontakt i dojazd – Mento Care, ul. ${BUSINESS.street}, ${BUSINESS.city}`,
    description: `${BUSINESS.fullName}, ul. ${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}. Tel. ${BUSINESS.phoneDisplay}, pon.–pt. 10:00–19:00. Rezerwacja online przez Booksy.`,
  },
];

// Sekcja → podstrona, na której jest (linki „#cennik” itp. z podstron, na których tej sekcji nie ma)
const SECTION_PATHS = {
  start: "/",
  faq: "/#faq",
  zabiegi: "/zabiegi/",
  "o-nas": "/o-nas/",
  metamorfozy: "/metamorfozy/",
  cennik: "/cennik/",
  voucher: "/vouchery/",
  "voucher-szczegoly": "/vouchery/",
  kontakt: "/kontakt/",
};

export function pathForSection(id) {
  if (SECTION_PATHS[id]) return SECTION_PATHS[id];
  if (id.startsWith("zabieg-")) return `/zabiegi/#${id}`;
  return null;
}

export function pageForPath(pathname = "/") {
  const p = `/${pathname.replace(/index\.html$/, "").replace(/^\/+|\/+$/g, "")}/`.replace("//", "/");
  return PAGES.find((page) => page.path === p) || HOME;
}

