/**
 * Treści strony w jednym miejscu: dane firmy, zabiegi, cennik, FAQ.
 * Zmieniasz cenę, godziny albo opis zabiegu? Edytuj ten plik, commit + push.
 * (Z tego pliku generują się też dane strukturalne dla Google – src/seo/schema.js)
 */
export const BUSINESS = {
  name: "Mento Care",
  fullName: "Mento Care – Kosmetologia Bochnia",
  owner: "Faustyna Hojnor",
  phone: "+48505204943",
  phoneDisplay: "505 204 943",
  street: "Nad Babicą 2",
  postalCode: "32-700",
  city: "Bochnia",
  geo: { lat: 49.9689941, lng: 20.4336793 },
  hours: [
    { days: "Poniedziałek – piątek", time: "10:00 – 19:00" },
    { days: "Sobota – niedziela", time: "nieczynne" },
  ],
  booksyUrl:
    "https://booksy.com/pl-pl/221086_mento-care-faustyna-hojnor_salon-kosmetyczny_10189_bochnia",
  mapsUrl: "https://maps.app.goo.gl/RFGgzMwBrD8JDkG19",
  googleProfileUrl: "https://www.google.com/maps?cid=411962576593343164",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Mento+Care+Kosmetologia+Bochnia%2C+Nad+Babic%C4%85+2%2C+32-700+Bochnia",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Mento+Care+-+Kosmetologia+Bochnia,+Nad+Babic%C4%85+2,+32-700+Bochnia&z=16&output=embed",
  // Link „Poproś o opinię” z wizytówki Google (np. https://g.page/r/XXXX/review).
  // Zostaw pusty, a przycisk „Wystaw opinię” się nie pokaże.
  googleReviewUrl: "https://g.page/r/CbzSmd7HlbcFEBM/review",
  instagram: "https://www.instagram.com/mento.care/",
  instagramDm: "https://ig.me/m/mento.care",
  facebook: "https://www.facebook.com/p/Mento-Care-61557586307146/",
  tiktok: "https://www.tiktok.com/@mento.care",
};

export const SERVICE_TEXTS = [
  {
    slug: "konsultacja-kosmetologiczna",
    name: "Konsultacja kosmetologiczna",
    description:
      "To moment, w którym poznajemy Twoją skórę i jej potrzeby. Wspólnie wypełniamy kartę klienta, rozmawiamy o pielęgnacji, stylu życia i oczekiwaniach. Analiza skóry pozwala dobrać bezpieczne i skuteczne zabiegi oraz pielęgnację domową – dopasowaną tylko do Ciebie.",
  },
  {
    slug: "terapia-tradzikowa",
    name: "Terapia trądzikowa",
    description:
      "Kompleksowe podejście do skóry problematycznej, oparte na działaniu wielokierunkowym. Oczyszcza pory, reguluje wydzielanie sebum i wycisza stany zapalne. Rozjaśnia przebarwienia pozapalne, wygładza strukturę skóry i redukuje ślady potrądzikowe. Zalecana seria: 2–5 zabiegów co 3 tygodnie.",
  },
  {
    slug: "stymulatory-tkankowe",
    name: "Stymulatory tkankowe",
    description:
      "Preparaty działające w głębszych warstwach skóry, które pobudzają produkcję kolagenu i elastyny. Poprawiają gęstość, napięcie i nawilżenie skóry, wygładzają drobne zmarszczki i odświeżają owal twarzy. Wykonujemy je na twarz, szyję, dekolt, okolice oczu i dłonie.",
  },
  {
    slug: "mezoterapia-iglowa",
    name: "Mezoterapia igłowa",
    description:
      "Wprowadzenie w skórę substancji nawilżających, odżywczych i rozświetlających. Sprawdza się przy skórze suchej, odwodnionej i zmęczonej, drobnych zmarszczkach, utracie jędrności i cieniach pod oczami. Pracujemy wyłącznie na przebadanych preparatach medycznych.",
  },
  {
    slug: "mezoterapia-mikroiglowa",
    name: "Mezoterapia mikroigłowa",
    description:
      "Zabieg urządzeniem SkinPen® Precision. Mikronakłucia pobudzają skórę do regeneracji i produkcji kolagenu, a jednocześnie ułatwiają wnikanie substancji aktywnych. Wygładza zmarszczki, poprawia teksturę i koloryt, spłyca blizny potrądzikowe. Wykonujemy go także na skórę głowy.",
  },
  {
    slug: "btx",
    name: "BTX",
    description:
      "Szybki i mało inwazyjny sposób na wygładzenie zmarszczek mimicznych. Zabieg relaksuje wybrane mięśnie twarzy, dzięki czemu cera wygląda na młodszą i wypoczętą. Efekt jest naturalny i zauważalny już po kilku dniach. Idealne rozwiązanie na lwią zmarszczkę, kurze łapki i poziome linie na czole.",
  },
  {
    slug: "peeling-medyczny",
    name: "Peeling medyczny",
    description:
      "Terapie kwasami dobrane do problemu skóry: cera tłusta i trądzikowa, przebarwienia, naczynka i trądzik różowaty, skóra odwodniona z osłabioną barierą. Złuszczają martwy naskórek, oczyszczają pory, wyrównują koloryt i przywracają skórze blask.",
  },
  {
    slug: "lampa-led",
    name: "Lampa LED",
    description:
      "Lampa Celluma Pro wykorzystuje światło LED (niebieskie, czerwone i podczerwone), by wspierać regenerację skóry i łagodzić stany zapalne. Pomaga w terapii trądziku, wygładza zmarszczki, przyspiesza gojenie i stymuluje produkcję kolagenu. Idealna jako osobna terapia lub uzupełnienie innych zabiegów.",
  },
  {
    slug: "zabiegi-dla-mezczyzn",
    name: "Dla niego",
    description:
      "Zabiegi stworzone z myślą o męskich potrzebach: oczyszczający Męski Detox Twarzy, rytuał Pan Młody – idealny przed ważnym wydarzeniem, oraz terapie przeciw wypadaniu włosów, wzmacniające cebulki i stymulujące porost. Skuteczna pielęgnacja – konkretnie, profesjonalnie i bez kompromisów.",
  },
  {
    slug: "masaz-kobido",
    name: "Masaż Kobido",
    description:
      "Japoński masaż liftingujący twarzy, szyi i dekoltu, który łączy głęboki relaks z widocznym efektem. Rozluźnia napięcia, wygładza rysy i dodaje skórze blasku. Rytuał odbywa się w osobnym, wyciszonym gabinecie SPA i obejmuje też skórę głowy oraz obręcz szyjno-barkową.",
  },
  {
    slug: "head-spa",
    name: "Head SPA",
    description:
      "Przyjemność zamknięta w dotyku, zapachu i dźwięku. Peeling, maska, masaż i relaksujące mycie oczyszczają skórę głowy z sebum i napięcia, a włosom przywracają blask. W wersji Premium łączymy Head SPA z liftingującym masażem Kobido.",
  },
  {
    slug: "rytualy-pielegnacyjne",
    name: "Autorskie rytuały pielęgnacyjne",
    description:
      "Wyjątkowe zabiegi tworzone z myślą o potrzebach Twojej skóry i chwili dla siebie. Łączą starannie dobrane etapy oczyszczania, masażu i odżywienia w jedną, spójną całość. To nie tylko pielęgnacja, ale też głęboki relaks i regeneracja dla ciała i zmysłów.",
  },
];

/**
 * Cennik – zgodny z Booksy (stan: październik 2026).
 * price: liczba w zł; from: true = cena „od”; note: tekst zamiast ceny.
 */
export const PRICE_LIST = [
  {
    title: "Pierwsza wizyta",
    items: [
      { name: "Konsultacja pielęgnacyjna", price: 200 },
      { name: "Konsultacja pielęgnacyjna + zabieg", price: 250, from: true },
      { name: "Konsultacja holistyczna (z analizą badań)", price: 300 },
      { name: "Konsultacja holistyczna + zabieg", price: 350, from: true },
    ],
  },
  {
    title: "Terapie kwasami i trądzik",
    items: [
      { name: "Terapia trądzikowa", price: 300, from: true },
      { name: "Terapia cery tłustej", price: 250, from: true },
      { name: "Terapia na przebarwienia", price: 280, from: true },
      { name: "Terapia nawilżająca – odbudowa bariery", price: 260, from: true },
      { name: "Terapia trądzik różowaty / naczynka", price: 280, from: true },
      { name: "MULTI IGŁA – blizny", price: 600 },
    ],
  },
  {
    title: "Mezoterapia igłowa",
    items: [
      { name: "Okolica oka", price: 250, from: true },
      { name: "Twarz", price: 450, from: true },
      { name: "Twarz + szyja", price: 550, from: true },
      { name: "Twarz + szyja + dekolt", price: 650, from: true },
      { name: "NEAUVIA Hydro Deluxe", price: 590 },
    ],
  },
  {
    title: "Mezoterapia mikroigłowa SkinPen®",
    items: [
      { name: "Twarz", price: 600 },
      { name: "Twarz + szyja", price: 700 },
      { name: "Twarz + szyja + dekolt", price: 750, from: true },
      { name: "SkinPen + peeling medyczny", price: 700, from: true },
    ],
  },
  {
    title: "Biostymulatory i tropokolagen",
    items: [
      { name: "Stymulator – twarz / szyja / dekolt", price: 600, from: true },
      { name: "Stymulator – okolica oczu", price: 500, from: true },
      { name: "Stymulator – dłonie", price: 500, from: true },
      { name: "Tropokolagen – twarz, okolica oka, podbródek lub dłonie", price: 349 },
      { name: "Tropokolagen – twarz, szyja, dekolt, skóra głowy", price: 490, from: true },
      { name: "Tropokolagen – ciało", price: 500, from: true },
    ],
  },
  {
    title: "Retinol – terapia przebudowująca",
    items: [
      { name: "Twarz", price: 320 },
      { name: "Twarz + szyja", price: 480 },
      { name: "Twarz + szyja + dekolt", price: 620 },
    ],
  },
  {
    title: "Zabiegi na twarz i rytuały",
    items: [
      { name: "Rytuał Mento Care", price: 250 },
      { name: "Rytuał ESTHEMAX", price: 320 },
      { name: "Antyoksydacyjna tarcza", price: 330 },
      { name: "Mama w blasku", price: 290 },
      { name: "Panna Młoda", price: 320 },
      { name: "Pan Młody", price: 270 },
      { name: "Męski detox twarzy", price: 250 },
      { name: "Dermaplaning (depilacja twarzy)", price: 180 },
      { name: "Dermaplaning + peeling kwasowy", price: 260 },
      { name: "Pakiet Pan & Pani (2 osoby)", price: 550 },
    ],
  },
  {
    title: "Japoński masaż Kobido",
    items: [
      { name: "Kobido basic", price: 250 },
      { name: "Kobido + taping", price: 270 },
      { name: "Kobido + masaż transbukalny", price: 280 },
      { name: "Kobido + maska ESTHEMAX", price: 300 },
      { name: "Kobido + kwas ferulowy + maska", price: 380 },
      { name: "Kobido DUO (2 osoby)", price: 480 },
      { name: "Pakiet 5 × Kobido", price: 999 },
    ],
  },
  {
    title: "Head SPA",
    items: [
      { name: "Head SPA Classic", price: 290 },
      { name: "Head SPA Premium z masażem Kobido", price: 420 },
      { name: "Rozszerzenie: Kérastase Fusio-Dose", price: 150, plus: true },
    ],
  },
  {
    title: "Trychologia – skóra głowy",
    items: [
      { name: "Mezoterapia skóry głowy / brody", price: 600 },
      { name: "Mezoterapia skóry głowy – pakiet 4 zabiegów", price: 2000 },
      { name: "Mezoterapia mikroigłowa skóry głowy", price: 350 },
      { name: "Mezoterapia mikroigłowa + egzosomy", price: 500 },
      { name: "Głębokie oczyszczenie skóry głowy", price: 150 },
    ],
  },
  {
    title: "Fizjoterapia estetyczna",
    items: [
      { name: "Drenaż limfatyczny – całe ciało", price: 150 },
      { name: "Drenaż limfatyczny – pakiet 5 zabiegów", price: 675 },
      { name: "Terapia bruksizmu – pierwsza wizyta", price: 230 },
      { name: "Terapia bruksizmu", price: 190 },
      { name: "Terapia bruksizmu – pierwsza wizyta + 4 kolejne", price: 990 },
      { name: "Postawa / wdowi garb", price: 170 },
      { name: "Postawa / wdowi garb – pakiet 5 zabiegów", price: 790 },
      { name: "Antycellulit / modelowanie sylwetki", price: 220 },
      { name: "Antycellulit – pakiet 5 zabiegów", price: 990 },
    ],
  },
  {
    title: "Światłoterapia LED Celluma Pro",
    items: [
      { name: "Lampa LED Celluma", price: 100 },
      { name: "Lampa LED Celluma – dodatek do zabiegu", price: 50 },
    ],
  },
  {
    title: "Brwi",
    items: [
      { name: "Regulacja brwi", price: 40 },
      { name: "Henna brwi + regulacja", price: 60 },
    ],
  },
];

export const formatPrice = (item) => {
  if (item.note) return item.note;
  const value = item.price.toLocaleString("pl-PL").replace(/ /g, " ");
  if (item.from) return `od ${value} zł`;
  if (item.plus) return `+ ${value} zł`;
  return `${value} zł`;
};

export const minPrice = (category) => {
  const prices = category.items.filter((i) => i.price && !i.plus).map((i) => i.price);
  return prices.length ? Math.min(...prices) : null;
};

export const FAQ = [
  {
    q: "Od czego zacząć, jeśli to moja pierwsza wizyta?",
    a: "Najlepiej od konsultacji kosmetologicznej. Przeprowadzamy wywiad i analizę skóry, a następnie układamy plan zabiegów i pielęgnacji domowej. Konsultację można połączyć z pierwszym zabiegiem. Jeśli masz wyniki badań krwi z ostatnich 3 miesięcy – zabierz je ze sobą.",
  },
  {
    q: "Jak umówić wizytę?",
    a: "Najszybciej online przez Booksy – widać tam wolne terminy i aktualne ceny. Możesz też zadzwonić pod numer 505 204 943 (poniedziałek – piątek, 10:00 – 19:00).",
  },
  {
    q: "Gdzie znajduje się gabinet i czy jest parking?",
    a: "Mento Care mieści się w Bochni przy ul. Nad Babicą 2 (32-700 Bochnia). Przy gabinecie jest parking, a lokal jest dostępny dla osób z niepełnosprawnościami.",
  },
  {
    q: "Ile zabiegów potrzebuję, żeby zobaczyć efekt?",
    a: "To zależy od zabiegu i stanu skóry. Orientacyjnie: mezoterapia igłowa 4–6 zabiegów co ok. 2 tygodnie, terapia trądzikowa 2–5 zabiegów co 3 tygodnie, stymulatory tkankowe 2–3 zabiegi co 3–4 tygodnie. Dokładny plan ustalamy na konsultacji.",
  },
  {
    q: "Czy zabiegi iniekcyjne bolą?",
    a: "Dyskomfort jest zwykle niewielki i zależy od preparatu oraz techniki (igła lub kaniula). W razie potrzeby stosujemy znieczulenie miejscowe, aby zabieg był jak najbardziej komfortowy.",
  },
  {
    q: "Czy mogę podarować zabieg w prezencie?",
    a: "Tak – przygotujemy elegancki voucher na wybrany zabieg. Zadzwoń pod numer 505 204 943 lub napisz do nas na Instagramie.",
  },
  {
    q: "Czy wykonujecie zabiegi dla mężczyzn?",
    a: "Tak. Polecamy m.in. Męski Detox Twarzy, zabieg Pan Młody, terapie skóry głowy przeciw wypadaniu włosów oraz regulację brwi.",
  },
];

export const NAV = [
  { id: "o-nas", label: "o nas" },
  { id: "zabiegi", label: "zabiegi" },
  { id: "o-mnie", label: "o mnie" },
  { id: "metamorfozy", label: "metamorfozy" },
  { id: "cennik", label: "cennik" },
  { id: "voucher", label: "voucher" },
  { id: "kontakt", label: "kontakt" },
];
