import { useState, useEffect } from "react";

import "./App.css";
import FacebookLogo from "./assets/facebook_logo.svg";
import InstagramLogo from "./assets/instagram_logo.svg";
import TikTokLogo from "./assets/tiktok_logo.svg";
import Girl from "./assets/girl_main_page.png";
import PriceListPhoto from "./assets/cennik.png";
import Gradient from "./assets/gradient.svg";
import Navbar from "./components/Navbar";
import Girl2 from "./assets/about-me.png";
import Przed1 from "./assets/metamorphoses/przed1.png";
import Po1 from "./assets/metamorphoses/po1.png";
import Przed2 from "./assets/metamorphoses/przed2.png";
import Po2 from "./assets/metamorphoses/po2.png";
import Przed3 from "./assets/metamorphoses/przed3.png";
import Po3 from "./assets/metamorphoses/po3.png";
import Przed4 from "./assets/metamorphoses/przed4.png";
import Po4 from "./assets/metamorphoses/po4.png";
import Przed5 from "./assets/metamorphoses/przed5.png";
import Po5 from "./assets/metamorphoses/po5.png";
import Przed6 from "./assets/metamorphoses/przed6.png";
import Po6 from "./assets/metamorphoses/po6.png";
import Voucher from "./assets/voucher.png";

// Services Images
import Kobido from "./assets/servicesPhotos/uslugi-kobido.png";
import MezoterapiaMikroiglowa from "./assets/servicesPhotos/MezoterapiaMikroiglowa.png";
import MezoterapiaIglowa from "./assets/servicesPhotos/2-min.png";
import MezoterapiaSkoryGlowy from "./assets/servicesPhotos/4-min.png";
import TerapiaTradzikowa from "./assets/servicesPhotos/3-min.png";
// import StylizacjaBrwi from "./assets/servicesPhotos/5-min.png";
import PeelingKwasowy from "./assets/servicesPhotos/6-min.png";
import RytualMentoCare from "./assets/servicesPhotos/7-min.png";
import LampaLED from "./assets/servicesPhotos/lampa-led.png";
import DlaNiego from "./assets/servicesPhotos/dla-niego.png";
import Konsultacja from "./assets/servicesPhotos/konsultacja.png";
import Rytulal from "./assets/servicesPhotos/rytual.png";
import BTX from "./assets/servicesPhotos/btx.png";
import TerapiaTradzikowa2 from "./assets/servicesPhotos/terapia-tradzikowa.png";
import HeadSPA from "./assets/servicesPhotos/head-spa.png";

import { useIsMobile } from "./hooks/useIsMobile";

const listOfServices = [
  {
    id: 1,
    name: "Konsultacja kosmetologiczna",
    description:
      "to moment, w którym poznajemy Twoją skórę i jej potrzeby. Wspólnie wypełniamy kartę klienta, rozmawiamy o pielęgnacji, stylu życia i oczekiwaniach. Przeprowadzamy analizę skóry, która pozwala dobrać bezpieczne i skuteczne zabiegi oraz odpowiednią pielęgnację domową – dopasowaną tylko do Ciebie",
    image: Konsultacja,
  },
  {
    id: 2,
    name: "Terapia trądzikowa",
    description:
      "to kompleksowe podejście do skóry problematycznej, oparte na działaniu wielokierunkowym. Skutecznie oczyszcza pory, reguluje wydzielanie sebum i zatrzymuje stany zapalne. Rozjaśnia przebarwienia pozapalne, wygładza strukturę skóry i redukuje blizny potrądzikowe. To indywidualnie dobrana pielęgnacja, która przywraca skórze równowagę, świeżość i komfort",
    image: TerapiaTradzikowa2,
  },
  {
    id: 3,
    name: "Stymulatory tkankowe",
    description:
      "to zabiegi, które pobudzają skórę do intensywnej regeneracji i odbudowy, poprawiając jej jędrność, gładkość i elastyczność. Działają głęboko, aktywując produkcję kolagenu i elastyny – bez przerysowanego efektu.Idealne rozwiązanie dla tych, którzy cenią sobie świeży i młodzieńczy wygląd.",
    image: MezoterapiaSkoryGlowy,
  },
  {
    id: 4,
    name: "Mezoterapia igłowa",
    description:
      "to najlepszy sposób na intensywne odżywienie i nawilżenie skóry od wewnątrz. Poprzez drobne wkłucia dostarczane są koktajle pełne witamin, kwasu hialuronowego i składników aktywnych. Zabieg poprawia koloryt, wygładza i przywraca cerze blask. To idealna terapia dla skóry zmęczonej, odwodnionej lub pozbawionej życia.",
    image: MezoterapiaIglowa,
  },
  {
    id: 5,
    name: "Mezoterapia mikroigłowa",
    description:
      "to zabieg, który pobudza skórę do intensywnej regeneracji poprzez mikronakłucia. Poprawia napięcie, strukturę i koloryt skóry, a drobne zmarszczki, blizny oraz rozszerzone pory zostają zredukowane. Efektem jest gładsza, jędrniejsza i wyraźnie odświeżona cera. To najlepsza metoda na poprawę jakości skóry w naturalny sposób.",
    image: MezoterapiaMikroiglowa,
  },
  {
    id: 6,
    name: "BTX",
    description:
      "to szybki i mało inwazyjny sposób na wygładzenie zmarszczek mimicznych. Zabieg relaksuje wybrane mięśnie twarzy, dzięki czemu cera wygląda na młodszą i wypoczętą. Efekt jest naturalny i zauważalny już po kilku dniach. Idealne rozwiązanie na lwią zmarszczkę, kurze łapki i poziome linie na czole.",
    image: BTX,
  },
  {
    id: 7,
    name: "Peeling kwasowy",
    description:
      "to skuteczna metoda złuszczania martwego naskórka i odświeżenia skóry. Pomagają w redukcji stanów zapalnych, przebarwień, zaskórników i drobnych zmarszczek. Skóra po zabiegu staje się gładsza, jaśniejsza i bardziej promienna. To doskonały wybór dla osób, które chcą poprawić kondycję cery i nadać jej zdrowy blask.",
    image: PeelingKwasowy,
  },
  {
    id: 8,
    name: "Lampa LED",
    description:
      "Lampa Celluma Pro wykorzystuje światło LED (niebieskie, czerwone i podczerwone), by wspierać regenerację skóry i łagodzić stany zapalne. Pomaga w leczeniu trądziku, wygładza zmarszczki, przyspiesza gojenie i stymuluje produkcję kolagenu. Idealna jako osobna terapia lub uzupełnienie innych zabiegów.",
    image: LampaLED,
  },
  {
    id: 9,
    name: "Dla niego",
    description:
      "Zabiegi stworzone z myślą o męskich potrzebach: oczyszczający Męski Detox Twarzy, który odświeża i przywraca równowagę, rytuał Pan Młody – idealny przed ważnym wydarzeniem, oraz terapie przeciw wypadaniu włosów, wzmacniające cebulki i stymulujące porost. Skuteczna pielęgnacja – konkretnie, profesjonalnie i bez kompromisów.",
    image: DlaNiego,
  },
  {
    id: 10,
    name: "Masaż Kobido",
    description:
      "Kobido to japoński masaż liftingujący, który łączy relaks z widocznym efektem odmłodzenia. Poprawia krążenie, napięcie mięśni i owal twarzy, wygładzając drobne zmarszczki. Skóra staje się promienna, jędrna i pełna blasku.Idealny dla osób ceniących naturalne i nieinwazyjne metody pielęgnacji.",
    image: Kobido,
  },
  {
    id: 11,
    name: "Head SPA",
    description:
      "przyjemność zamknięta w dotyku, zapachu i dźwięku. Ciepła woda, aromatyczne olejki i powolny masaż skóry głowy pomagają wyciszyć umysł i rozluźnić ciało. Zabieg koi napięcia, poprawia krążenie, pielęgnuje włosy i skórę głowy. To błogi moment tylko dla Ciebie – spokojny, miękki i pełen relaksu.",
    image: HeadSPA,
  },
  {
    id: 12,
    name: "Autorskie rytuały pielęgnacyjne",
    description:
      "to wyjątkowe zabiegi tworzone z myślą o potrzebach Twojej skóry i chwili dla siebie. Łączą starannie dobrane etapy oczyszczania, masażu i odżywienia w jedną, spójną całość. To nie tylko pielęgnacja, ale też głęboki relaks i regeneracja dla ciała i zmysłów. Każdy rytuał dopasowuję indywidualnie – z troską, uważnością i intuicją.",
    image: Rytulal,
  },
];

function App() {
  const isMobile = useIsMobile();
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [currentBeforeAfterIndex, setCurrentBeforeAfterIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isInServicesSection, setIsInServicesSection] = useState(false);

  const priceData = [
    // {
    //   title: "Wiosna w Mento Care",
    //   services: [
    //     { name: "Pan Młody", price: "270 zł" },
    //     { name: "Panna Młoda", price: "320 zł" },
    //     { name: "Zabieg dla kobiet w ciąży/karmiących", price: "350 zł" },
    //     { name: "Rytułał ESTHEMAX", price: "320 zł" },
    //   ],
    // },
    {
      title: "Pierwsza wizyta",
      services: [
        { name: "Konsultacja kosmetologiczna", price: "100 zł" },
        { name: "Konsultacja + zabieg", price: "+180 zł" },
      ],
    },
    {
      title: "Mezoterapia igłowa",
      services: [
        { name: "Okolica oka", price: "+250 zł" },
        { name: "Twarz + oczy", price: "+450 zł" },
        { name: "Twarz + oczy", price: "+550 zł" },
        { name: "Twarz + oczy + szyja", price: "+650 zł" },
        { name: "NEAUVIA HUDRO DELUXE", price: "590 zł" },
      ],
    },
    {
      title: "Biostymulatory tkankowe",
      services: [
        { name: "Stymulator twarz/szyja/dekolt", price: "+600 zł" },
        { name: "Stymulator - okolica oczu", price: "+500 zł" },
        { name: "Stymulator - dłonie", price: "+500 zł" },
      ],
    },
    {
      title: "Mezoterapia mikroigłowa",
      services: [
        { name: "Twarz", price: "400 zł" },
        { name: "Twarz + szyja", price: "500 zł" },
        { name: "Twarz + szyja + dekolt", price: "550 zł" },
        { name: "DERMAPEN + peeling kwasowy", price: "500 zł" },
      ],
    },
    {
      title: "Japoński masaż",
      services: [
        { name: "Kobido basic", price: "220 zł" },
        { name: "+ Maska ESTHEMAX", price: "270 zł" },
        { name: "Pakiet 5 Kobido", price: "880 zł" },
        { name: "+ Taping", price: "270 zł" },
        { name: "+ Masaż Transbukalny", price: "280 zł" },
        { name: "+ Kwas Ferulowy + maska", price: "350 zł" },
      ],
    },
    {
      title: "Zabiegi na twarz",
      services: [
        { name: "Rytułał Mento Care", price: "220 zł" },
        { name: "Pakiet Pan&Pani", price: "550 zł" },
        {
          name: "DERMAPLANING (depilacja twarzy)",
          price: "180 zł",
        },
        { name: "+ Peeling Kwasowy", price: "260 zł" },
        { name: "Męski detox twarzy", price: "180 zł" },
        { name: "Antyoksydacyjna tarcza", price: "240 zł" },
      ],
    },
    {
      title: "Peeling kwasowy",
      services: [
        { name: "Terapia cery trądziwkowej i tłustej", price: "250 zł" },
        { name: "Terapia na przebarwienia", price: "500 zł" },
        { name: "Terapia nawilżająca - Odbudowa bariery", price: "230 zł" },
        { name: "Terapia trądzik różowaty/naczynka", price: "250 zł" },
        { name: "MULTI IGŁA - blizny", price: "550 zł" },
      ],
    },
    {
      title: "TRYCHOLOGIA - Skóra głowy",
      services: [
        { name: "Mezoterapia skóry głowy/broda", price: "600 zł" },
        { name: "Pakiet 4 zabiegów", price: "2000 zł" },
        { name: "Mizoterapia Mikroigłowa skóry głowy", price: "350 zł" },
        { name: "+ EGZOSOMY", price: "500 zł" },
        { name: "Głębokie oczyszczanie skóry głowy", price: "130 zł" },
      ],
    },
    {
      title: "Brwi",
      services: [
        { name: "Regulacja brwi", price: "40 zł" },
        { name: "Henna brwi + regulacja", price: "60 zł" },
      ],
    },
    {
      title: "Makijaż Permanentny",
      services: [
        { name: "Brwi Soft Ombre", price: "800 zł" },
        { name: "Usta Soft Lips", price: "900 zł" },
        { name: "Dopigmentowanie/Korekta", price: "0,01 zł" },
        {
          name: "Odświeżenie makijażu wykonanego w naszym salonie",
          price: "500 zł",
        },
        {
          name: "Odświeżenie makijażu wykonanego w innym salonie",
          price: "600 zł",
        },
        { name: "Bezpłatna konsultacja online", price: "0,01 zł" },
      ],
    },
    {
      title: "TROPOKOLGEN",
      services: [
        { name: "Okolice oka i dłonie", price: "349 zł" },
        { name: "Ciało", price: "500 zł" },
        { name: "Twarz | Szyja | Dekolt | Skóra", price: "0,01 zł" },
      ],
    },
    {
      title: "Światłoterapia LED CELLUMA PRO",
      services: [
        { name: "Lampa LED CECLLUMA", price: "100 zł" },
        { name: "Lampa LED CECLLUMA - dodatek do zabiegu", price: "50 zł" },
      ],
    },
  ];

  const beforeAfterData = [
    {
      id: 1,
      before: Przed1,
      after: Po1,
    },
    {
      id: 2,
      before: Przed2,
      after: Po2,
    },
    {
      id: 3,
      before: Przed3,
      after: Po3,
    },
    {
      id: 4,
      before: Przed4,
      after: Po4,
    },
    {
      id: 5,
      before: Przed5,
      after: Po5,
    },
    {
      id: 6,
      before: Przed6,
      after: Po6,
    },
  ];

  // Handle wheel scroll for service navigation
  const handleServiceScroll = (e) => {
    if (isScrolling) return;

    e.preventDefault(); // Zapobiega domyślnemu scrollowaniu

    const scrollDirection = e.deltaY > 0 ? "down" : "up";
    const currentServiceId = listOfServices[currentServiceIndex].id;

    setIsScrolling(true);

    if (scrollDirection === "down") {
      // Scroll down - next service or next section
      if (currentServiceIndex < listOfServices.length - 1) {
        setCurrentServiceIndex((prev) => prev + 1);
      } else {
        // Tylko z ostatniej usługi (id=7) można przejść do about-me
        if (currentServiceId === 12) {
          document.getElementById("about-me")?.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    } else {
      // Scroll up - previous service or previous section
      if (currentServiceIndex > 0) {
        setCurrentServiceIndex((prev) => prev - 1);
      } else {
        // Tylko z pierwszej usługi (id=1) można przejść do about
        if (currentServiceId === 1) {
          document.getElementById("about")?.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    }

    // Krótszy debounce dla płynniejszego działania
    setTimeout(() => setIsScrolling(false), 150);
  };

  // Handle dot click navigation
  const handleDotClick = (index) => {
    setCurrentServiceIndex(index);
  };

  const handleDotBeforeAfterClick = (index) => {
    setCurrentBeforeAfterIndex(index);
  };

  // Globalna funkcja obsługi scroll'a - blokuje scroll gdy jesteśmy w sekcji services (tylko desktop)
  useEffect(() => {
    // Tylko na desktop - blokujemy scroll w sekcji services
    if (isMobile) return;

    const handleGlobalScroll = (e) => {
      if (isInServicesSection) {
        const currentServiceId = listOfServices[currentServiceIndex].id;
        const scrollDirection = e.deltaY > 0 ? "down" : "up";

        // Blokuj scroll jeśli nie jesteśmy na odpowiedniej usłudze
        if (scrollDirection === "down" && currentServiceId !== 12) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
        if (scrollDirection === "up" && currentServiceId !== 1) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }
    };

    // Intersection Observer do wykrywania czy jesteśmy w sekcji services
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "services") {
            setIsInServicesSection(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.5 }
    );

    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      observer.observe(servicesSection);
    }

    // Dodaj event listener tylko dla desktop
    document.addEventListener("wheel", handleGlobalScroll, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleGlobalScroll);
      observer.disconnect();
    };
  }, [isInServicesSection, currentServiceIndex, isMobile]);

  const currentService = listOfServices[currentServiceIndex];

  const PriceCard = ({ title, services, isMobile }) => {
    return (
      <fieldset className="mb-10 relative border-2 border-[#FFF8E7]/40 rounded-md pt-6 px-6 pb-5">
        <legend className="px-3 mx-2">
          <h3
            className={`text-[#FFF8E7] ${
              isMobile ? "text-[18px]" : "text-[24px]"
            }`}
            style={{ fontFamily: "Cormorant Garamond, SemiBold" }}
          >
            {title}
          </h3>
        </legend>

        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={index} className="flex justify-between">
              <span
                className={`text-[#FFF8E7] font-thin ${
                  isMobile ? "text-sm" : ""
                }`}
              >
                {service.name}
              </span>
              <span
                className={`text-[#FFF8E7] font-thin ${
                  isMobile ? "text-sm" : ""
                }`}
              >
                {service.price}
              </span>
            </div>
          ))}
        </div>
      </fieldset>
    );
  };

  return (
    <>
      <Navbar />
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        {/* First Section - Home */}
        {!isMobile ? (
          <section
            id="about"
            className="snap-start h-screen w-full overflow-hidden relative"
          >
            <div className="flex flex-col justify-center items-start h-full px-[98px]">
              <h1
                style={{
                  fontFamily: "Cormorant Garamond, SemiBold",
                  fontSize: "72px",
                  lineHeight: "1.1",
                  color: "#FCAF56",
                  marginBottom: "15px",
                  marginTop: "auto",
                  maxWidth: "800px"
                }}
              >
                MENTO CARE - Kosmetologia Bochnia
              </h1>
              <p className="max-w-[675px] text-[#FFF8E7] text-[18px] font-thin">
                Nowoczesna przestrzeń kosmetologii estetycznej, gdzie nauka
                spotyka się z troską. Specjalizujemy się w zaawansowanych
                terapiach skóry twarzy i precyzyjnych zabiegach iniekcyjnych,
                które subtelnie podkreślają naturalne piękno. Dzięki wiedzy,
                doświadczeniui indywidualnemu podejściu tworzymy efekty, które
                poprawiają wygląd i wzmacniają pewność siebie. Mento Care to
                miejsce, w którym liczy się jakość, spokóji dbałość o każdy
                detal.
              </p>
              <div className="flex justify-between items-center w-full mt-auto py-[2rem] z-20">
                <div className="flex space-x-4">
                  <div className="border-2 border-gray-400 rounded-full py-2 px-5 text-textPrimary">
                    Nad Babicą 2, Bochnia
                  </div>
                  <div className="border-2 border-gray-400 rounded-full py-2 px-5 text-textPrimary">
                    +48 798 144 399
                  </div>
                </div>
                <div className="flex space-x-4 text-textPrimary items-center">
                  <a
                    href="https://www.facebook.com/p/Mento-Care-61557586307146/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={FacebookLogo}
                      alt="facebook_logo"
                      style={{ height: "48px" }}
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/mento.care/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={InstagramLogo}
                      alt="instagram_logo"
                      style={{ height: "38px" }}
                    />
                  </a>
                  <a
                    href="https://www.tiktok.com/@mento.care"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={TikTokLogo}
                      alt="instagram_logo"
                      style={{ height: "38px" }}
                    />
                  </a>
                </div>
              </div>
            </div>
            <img
              src={Gradient}
              alt="Gradient"
              className="absolute top-0 right-0 w-[75%] h-auto pointer-events-none z-0"
              style={{ top: -400, right: -280 }}
            />
            <img
              src={Girl}
              alt="background photo"
              className="absolute right-0 w-[40%] h-auto pointer-events-none z-10"
              style={{ bottom: -100 }}
            />
            <div
              className="absolute bottom-0 left-0 w-full h-[32%] pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(180deg, #0B0C0F00 0%, #0B0C0F80 30%, #0B0C0F 90%)",
              }}
            ></div>
          </section>
        ) : (
          <section
            id="about"
            className="snap-start h-screen w-full relative px-6 py-10 flex flex-col overflow-hidden"
            style={{
              minHeight: "100dvh",
              // paddingTop: "max(10px, env(safe-area-inset-top))",
              paddingBottom: "max(100px, env(safe-area-inset-bottom))",
            }}
          >
            <div className="flex flex-col items-center justify-end h-full mt-auto z-30">
              {/* Social Icons */}
              <div className="flex space-x-6 justify-center items-center  mt-10">
                <a
                  href="https://www.facebook.com/MentoBarberShop"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={FacebookLogo}
                    alt="facebook_logo"
                    style={{ height: "38px" }}
                  />
                </a>
                <a
                  href="https://www.instagram.com/mento.barbershop/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={InstagramLogo}
                    alt="instagram_logo"
                    style={{ height: "30px" }}
                  />
                </a>
                <a
                  href="https://www.tiktok.com/@mento_barbershop"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={TikTokLogo}
                    alt="tiktok_logo"
                    style={{ height: "30px" }}
                  />
                </a>
              </div>

              <div className="flex flex-col items-center text-center">
                {/* Title */}
                <h1
                  style={{
                    fontFamily: "Cormorant Garamond, SemiBold",
                    fontSize: "40px",
                    color: "#FCAF56",
                    marginBottom: 6,
                  }}
                >
                  MENTO CARE - Kosmetologia Bochnia
                </h1>

                {/* Description */}
                <p className="text-[#FFF8E7] text-[13px] text-justify max-w-xs mb-6 font-thin">
                  Nowoczesna przestrzeń kosmetologii estetycznej, gdzie nauka
                  spotyka się z troską. Specjalizujemy się w zaawansowanych
                  terapiach skóry twarzy i precyzyjnych zabiegach iniekcyjnych,
                  które subtelnie podkreślają naturalne piękno. Dzięki wiedzy,
                  doświadczeniui indywidualnemu podejściu tworzymy efekty, które
                  poprawiają wygląd i wzmacniają pewność siebie. Mento Care to
                  miejsce, w którym liczy się jakość, spokóji dbałość o każdy
                  detal.
                </p>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col space-y-3 mt-0 mb-4 w-full items-center">
                <div className="border-2 border-gray-400 rounded-full py-2 px-5 text-textPrimary text-sm w-full max-w-xs text-center z-30">
                  Nad Babicą 2, Bochnia
                </div>
                <div className="border-2 border-gray-400 rounded-full py-2 px-5 text-textPrimary text-sm w-full max-w-xs text-center z-30">
                  +48 798 144 399
                </div>
              </div>
            </div>
            <img
              src={Girl}
              alt="Nowoczesny salon kosmetyczny Bochnia - zabiegi na twarz"
              className="absolute right-0 w-[100%] h-auto pointer-events-none z-10"
              style={{ bottom: 160 }}
            />
            // ...existing code...
            {/* <img
              src={Gradient}
              alt="Gradient"
              className="absolute pointer-events-none z-0"
              style={{
                top: -500,
                right: -200,
                // width: "2000px", // konkretna wartość w pikselach
                height: "auto",
                minWidth: "200vw", // backup z viewport units
              }}
            /> */}
            // ...existing code...
            {/* Bottom gradient overlay */}
            <div
              className="absolute bottom-0 left-0 w-full h-[40%] pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(180deg, #0B0C0F00 0%, #0B0C0F80 10%, #0B0C0F 50%)",
              }}
            ></div>
          </section>
        )}

        {/* Second Section - Services */}
        {!isMobile ? (
          <section
            id="services"
            className="snap-start h-screen w-full relative flex items-end pb-[98px]"
            onWheel={handleServiceScroll}
          >
            {/* Background Image */}
            <img
              src={currentService.image}
              alt={currentService.name}
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 transition-all duration-500"
            />

            {/* Content container */}
            <div className="px-[98px] z-20 relative w-full">
              <div className="flex flex-row items-end justify-between">
                <div className="w-[800px] pr-12">
                  <h2
                    className="text-[#FFF8E7] text-[59px] transition-all duration-500 w-[900px]"
                    style={{
                      fontFamily: "Cormorant Garamond, SemiBold",
                      lineHeight: 1.5,
                    }}
                  >
                    {currentService.name}
                  </h2>
                  <p className="text-[#FFF8E7] text-[18px] transition-all duration-500 font-thin">
                    {currentService.description}
                  </p>
                  <div className="mt-[48px]">
                    <a
                      href="#"
                      className="border-2 text-[18px] border-prime hover:border-[#976934] text-prime rounded-[5px] py-[16px] px-[48px] hover:bg-[#976934] hover:text-black transition-colors duration-300"
                    >
                      Umów się na wizytę
                    </a>
                  </div>
                </div>

                {/* Navigation dots - zawsze w tej samej pozycji */}
                <div className="flex flex-col space-y-[6px] flex-shrink-0">
                  {listOfServices.map((_, index) => (
                    <div
                      key={index}
                      className={`w-5 h-5 border-[1px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        index === currentServiceIndex
                          ? "border-prime"
                          : "border-[#FFF8E7] hover:border-prime"
                      }`}
                      onClick={() => handleDotClick(index)}
                    >
                      {index === currentServiceIndex && (
                        <div className="bg-prime border-prime w-3 h-3 m-auto rounded-full transition-all duration-300" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom gradient overlay */}
            <div
              className="absolute bottom-0 left-0 w-full h-[15%] pointer-events-none z-30"
              style={{
                background:
                  "linear-gradient(180deg, #0B0C0F00 0%, #0B0C0F80 40%, #0B0C0F 90%)",
              }}
            ></div>
            <div
              className="absolute top-0 left-0 w-full h-[15%] pointer-events-none z-30"
              style={{
                background:
                  "linear-gradient(0deg, #0B0C0F00 0%, #0B0C0F80 50%, #0B0C0F 90%)",
              }}
            ></div>
          </section>
        ) : (
          // Mobile: Each service as separate section
          <>
            {listOfServices.map((service, index) => (
              <section
                key={service.id}
                id={index === 0 ? "services" : `service-${service.id}`}
                className="snap-start h-screen w-full relative flex flex-col px-6 py-10"
                style={{
                  minHeight: "100dvh",
                  paddingBottom: "max(100px, env(safe-area-inset-bottom))",
                }}
              >
                {/* Background Image */}
                <img
                  src={service.image}
                  alt={service.name}
                  className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
                />

                <div className="flex flex-col h-full z-20">
                  <div className="flex flex-col items-center flex-grow justify-end">
                    {/* Title centered */}
                    <h2
                      className="text-[#FFF8E7] text-[54px] mb-2 text-center"
                      style={{
                        fontFamily: "Cormorant Garamond, SemiBold",
                        lineHeight: 1.2,
                      }}
                    >
                      {service.name}
                    </h2>

                    {/* Description centered */}
                    <p className="text-[#FFF8E7] text-[13px] text-justify mb-10 max-w-xs font-thin">
                      {service.description}
                    </p>

                    {/* Button centered */}
                    <div className="mb-10">
                      <a
                        href="#"
                        className="border-2 text-[16px] border-prime text-prime rounded-[5px] py-[14px] px-[32px] hover:bg-prime hover:text-black transition-colors duration-300"
                      >
                        Umów się na wizytę
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom gradient overlay */}
                <div
                  className="absolute bottom-0 left-0 w-full h-[15%] pointer-events-none z-10"
                  style={{
                    background:
                      "linear-gradient(180deg, #0B0C0F00 0%, #0B0C0F80 40%, #0B0C0F 90%)",
                  }}
                ></div>
              </section>
            ))}
          </>
        )}

        {/*About Me*/}
        {!isMobile ? (
          <section
            id="about-me"
            className="snap-start h-screen w-full overflow-hidden relative"
          >
            <div className="h-full flex flex-col justify-center items-end">
              <div className="flex flex-col justify-center items-start px-[98px]">
                <h1
                  style={{
                    fontFamily: "Cormorant Garamond, SemiBold",
                    fontSize: "72px",
                    color: "#FFF8E7",
                    marginBottom: "-10px",
                    marginTop: "auto",
                  }}
                >
                  Faustyna Hojnor
                </h1>
                <p className="max-w-[675px] text-[#FFF8E7] text-[18px] font-thin">
                  Dyplomowana kosmetolog estetyczna | Właścicielka Mento Care |
                  Studentka pielęgniarstwa Z pasją łączę nowoczesną kosmetologię
                  z holistycznym podejściem do skóry. Specjalizuję się w
                  zabiegach iniekcyjnych, podkreślając naturalne piękno.
                  Nieustannie rozwijam się zawodowo i medycznie, dbając o
                  bezpieczeństwo i skuteczność terapii. Pracuję na
                  certyfikowanych produktach, oferując komfort, precyzję i
                  indywidualne podejście.
                </p>
              </div>
            </div>
            <img
              src={Gradient}
              alt="Gradient"
              className="absolute top-0 right-0 w-[90%] h-auto pointer-events-none z-0"
              style={{ top: -700, right: 150 }}
            />
            <img
              src={Girl2}
              alt="background photo"
              className="absolute left-20 w-[31%] h-auto pointer-events-none z-10"
              style={{ bottom: -200 }}
            />
            <div
              className="absolute bottom-0 left-0 w-full h-[32%] pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(180deg, #0B0C0F00 0%, #0B0C0F80 30%, #0B0C0F 90%)",
              }}
            ></div>
          </section>
        ) : (
          <section
            id="about-me"
            className="snap-start h-screen w-full relative px-6 py-10 flex flex-col overflow-hidden"
            style={{
              minHeight: "100dvh",
              // paddingTop: "max(10px, env(safe-area-inset-top))",
              paddingBottom: "max(100px, env(safe-area-inset-bottom))",
            }}
          >
            <div className="flex flex-col items-center justify-end h-full mt-auto z-30">
              <div className="flex flex-col items-center text-center">
                {/* Title */}
                <h1
                  style={{
                    fontFamily: "Cormorant Garamond, SemiBold",
                    fontSize: "50px",
                    color: "#FFF8E7",
                    marginBottom: 6,
                  }}
                >
                  Faustyna Hojnor
                </h1>

                {/* Description */}
                <p className="text-[#FFF8E7] text-[13px] text-justify max-w-xs mb-0 font-thin">
                  Dyplomowana kosmetolog estetyczna | Właścicielka Mento Care |
                  Studentka pielęgniarstwa Z pasją łączę nowoczesną kosmetologię
                  z holistycznym podejściem do skóry. Specjalizuję się w
                  zabiegach iniekcyjnych, podkreślając naturalne piękno.
                  Nieustannie rozwijam się zawodowo i medycznie, dbając o
                  bezpieczeństwo i skuteczność terapii. Pracuję na
                  certyfikowanych produktach, oferując komfort, precyzję i
                  indywidualne podejście.
                </p>
              </div>
            </div>
            <img
              src={Girl2}
              alt="background photo"
              className="absolute right-0 w-[100%] h-auto pointer-events-none z-10"
              style={{ bottom: -50 }}
            />
            <div
              className="absolute bottom-0 left-0 w-full h-[40%] pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(180deg, #0B0C0F00 0%, #0B0C0F80 10%, #0B0C0F 50%)",
              }}
            ></div>
          </section>
        )}

        {/*Metamorphoses*/}
        {!isMobile ? (
          <section
            id="metamorphoses"
            className="snap-start h-screen w-full overflow-hidden relative"
          >
            <div className="h-full flex flex-col justify-center px-[98px]">
              <div className="flex flex-col justify-center mt-[150px]">
                <h1
                  style={{
                    fontFamily: "Cormorant Garamond, SemiBold",
                    fontSize: "35px",
                    color: "#FFF8E7",
                    zIndex: 50,
                  }}
                >
                  Metamorfozy
                </h1>
              </div>
              <div className="flex items-center justify-between mt-5">
                <fieldset className="mb-10 mr-5 relative border-2 border-[#FFF8E7]/40 rounded-md pt-3 px-6 pb-6 flex-1">
                  <legend className="px-3 mx-2">
                    <h3
                      className={`text-[#FFF8E7] ${
                        isMobile ? "text-[18px]" : "text-[20px]"
                      }`}
                      style={{ fontFamily: "Cormorant Garamond, SemiBold" }}
                    >
                      PRZED
                    </h3>
                  </legend>
                  <img
                    src={beforeAfterData[currentBeforeAfterIndex].before}
                    alt="Metamorfoza skóry przed zabiegiem - kosmetolog Bochnia"
                    className="block w-full h-[430px] object-cover"
                  />
                </fieldset>

                <fieldset className="mb-10 ml-5 relative border-2 border-[#FFF8E7]/40 rounded-md pt-3 px-6 pb-6 flex-1">
                  <legend className="px-3 mx-2">
                    <h3
                      className={`text-[#FFF8E7] ${
                        isMobile ? "text-[18px]" : "text-[20px]"
                      }`}
                      style={{ fontFamily: "Cormorant Garamond, SemiBold" }}
                    >
                      PO
                    </h3>
                  </legend>
                  <img
                    src={beforeAfterData[currentBeforeAfterIndex].after}
                    alt="Efekt po zabiegu w gabinecie kosmetycznym Mento Care Bochnia"
                    className="block w-full h-[430px] object-cover"
                  />
                </fieldset>
              </div>
              <div className="flex flex-row justify-center items-center space-x-3 flex-shrink-0 mb-10">
                {beforeAfterData.map((_, index) => (
                  <div
                    key={index}
                    className={`w-5 h-5 border-[1px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                      index === currentBeforeAfterIndex
                        ? "border-prime"
                        : "border-[#FFF8E7] hover:border-prime"
                    }`}
                    onClick={() => handleDotBeforeAfterClick(index)}
                  >
                    {index === currentBeforeAfterIndex && (
                      <div className="bg-prime border-prime w-3 h-3 m-auto rounded-full transition-all duration-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="absolute top-0 left-0 w-full h-[25%] pointer-events-none z-30"
              style={{
                background:
                  "linear-gradient(0deg, #0B0C0F00 0%, #0B0C0F80 20%, #0B0C0F 80%)",
              }}
            ></div>
          </section>
        ) : (
          <section
            id="metamorphoses"
            className="snap-start min-h-screen w-full relative px-6 py-10 flex flex-col overflow-hidden"
            style={{
              minHeight: "100dvh",
              paddingTop: "max(80px, env(safe-area-inset-top))",
              paddingBottom: "max(100px, env(safe-area-inset-bottom))",
            }}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              e.currentTarget.startX = touch.clientX;
            }}
            onTouchEnd={(e) => {
              const touch = e.changedTouches[0];
              const deltaX = touch.clientX - e.currentTarget.startX;

              if (Math.abs(deltaX) > 50) {
                // Minimum swipe distance
                if (deltaX > 0 && currentBeforeAfterIndex > 0) {
                  // Swipe right - previous
                  setCurrentBeforeAfterIndex(currentBeforeAfterIndex - 1);
                } else if (
                  deltaX < 0 &&
                  currentBeforeAfterIndex < beforeAfterData.length - 1
                ) {
                  // Swipe left - next
                  setCurrentBeforeAfterIndex(currentBeforeAfterIndex + 1);
                }
              }
            }}
          >
            <div className="flex flex-col h-full z-30 justify-between">
              {/* Title */}
              <div className="flex flex-col items-center mt-4 mb-0">
                <h1
                  style={{
                    fontFamily: "Cormorant Garamond, SemiBold",
                    fontSize: "36px",
                    color: "#FFF8E7",
                  }}
                >
                  Metamorfozy
                </h1>
              </div>

              {/* Images in column */}
              <div className="flex flex-col items-center space-y-2 flex-grow justify-center">
                <fieldset className="relative border-2 border-[#FFF8E7]/40 rounded-md pt-3 px-4 pb-4 w-full max-w-xs">
                  <legend className="px-3 mx-2">
                    <h3
                      className="text-[#FFF8E7] text-[16px]"
                      style={{ fontFamily: "Cormorant Garamond, SemiBold" }}
                    >
                      PRZED
                    </h3>
                  </legend>
                  <img
                    src={beforeAfterData[currentBeforeAfterIndex].before}
                    alt="Metamorfoza skóry przed zabiegiem - salon kosmetyczny Bochnia"
                    className="block w-full h-[170px] object-cover"
                  />
                </fieldset>

                <fieldset className="relative border-2 border-[#FFF8E7]/40 rounded-md pt-3 px-4 pb-4 w-full max-w-xs">
                  <legend className="px-3 mx-2">
                    <h3
                      className="text-[#FFF8E7] text-[16px]"
                      style={{ fontFamily: "Cormorant Garamond, SemiBold" }}
                    >
                      PO
                    </h3>
                  </legend>
                  <img
                    src={beforeAfterData[currentBeforeAfterIndex].after}
                    alt="Efekt po zabiegu w salonie kosmetycznym Mento Care Bochnia"
                    className="block w-full h-[170px] object-cover"
                  />
                </fieldset>
              </div>

              {/* Navigation dots at bottom */}
              <div className="flex flex-row justify-center items-center space-x-4 mt-4">
                {beforeAfterData.map((_, index) => (
                  <div
                    key={index}
                    className={`w-5 h-5 border-[1px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                      index === currentBeforeAfterIndex
                        ? "border-prime"
                        : "border-[#FFF8E7] hover:border-prime"
                    }`}
                    onClick={() => handleDotBeforeAfterClick(index)}
                  >
                    {index === currentBeforeAfterIndex && (
                      <div className="bg-prime border-prime w-3 h-3 m-auto rounded-full transition-all duration-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Top gradient overlay */}
            <div
              className="absolute top-0 left-0 w-full h-[10%] pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(0deg, #0B0C0F00 0%, #0B0C0F80 40%, #0B0C0F 90%)",
              }}
            ></div>
          </section>
        )}

        {/* Third Section - Price List */}
        {!isMobile ? (
          <section
            id="pricing"
            className="snap-start h-screen w-full relative "
          >
            <div className="flex h-full">
              {/* Left side - Image */}
              <div className="w-1/2 h-full relative">
                <img
                  src={PriceListPhoto}
                  alt="Cennik usług kosmetologicznych Mento Care Bochnia"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}
              </div>

              {/* Right side - Price List */}
              <div
                className="w-1/2 h-full overflow-y-auto flex flex-col px-[60px] pt-[200px] pb-[100px]"
                style={{ fontFamily: "sans-serif" }}
              >
                {priceData.map((category, index) => (
                  <PriceCard
                    key={index}
                    title={category.title}
                    services={category.services}
                    isMobile={false}
                  />
                ))}
              </div>
            </div>
            <div
              className="absolute bottom-0 left-0 w-full h-[15%] pointer-events-none z-30"
              style={{
                background:
                  "linear-gradient(180deg, #0B0C0F00 0%, #0B0C0F80 40%, #0B0C0F 90%)",
              }}
            ></div>
            <div
              className="absolute top-0 left-0 w-full h-[25%] pointer-events-none z-30"
              style={{
                background:
                  "linear-gradient(0deg, #0B0C0F00 0%, #0B0C0F80 20%, #0B0C0F 80%)",
              }}
            ></div>
          </section>
        ) : (
          <section
            id="pricing"
            className="snap-start h-screen w-full relative px-6 py-10"
            style={{
              minHeight: "100dvh",
              // paddingTop: "max(10px, env(safe-area-inset-top))",
              paddingBottom: "max(100px, env(safe-area-inset-bottom))",
            }}
          >
            <div className="h-full overflow-y-auto flex flex-col pt-10 pb-20">
              <h2
                className="text-[#FFF8E7] text-[40px] text-center mb-8"
                style={{ fontFamily: "Cormorant Garamond, SemiBold" }}
              >
                Cennik
              </h2>

              {priceData.map((category, index) => (
                <PriceCard
                  key={index}
                  title={category.title}
                  services={category.services}
                  isMobile={true}
                />
              ))}
            </div>

            {/* Bottom gradient overlay */}
            <div
              className="absolute bottom-0 left-0 w-full h-[15%] pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(180deg, #0B0C0F00 0%, #0B0C0F80 40%, #0B0C0F 90%)",
              }}
            ></div>
            <div
              className="absolute top-0 left-0 w-full h-[10%] pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(0deg, #0B0C0F00 0%, #0B0C0F80 40%, #0B0C0F 90%)",
              }}
            ></div>
          </section>
        )}

        {/* Voucher */}
        {!isMobile ? (
          <section
            id="voucher"
            className="snap-start h-screen w-full relative flex items-end pb-[98px]"
          >
            {/* Background Image */}
            <img
              src={Voucher}
              alt="Voucher podarunkowy na zabiegi kosmetyczne Bochnia"
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-90 transition-all duration-500"
            />

            {/* Content container */}
            <div className="px-[98px] z-20 relative w-full">
              <div className="flex flex-row items-end justify-between">
                {/* Text content - stała szerokość zamiast md:w-1/2 */}
                <div className="w-[800px] pr-12">
                  <h2
                    className="text-[#FFF8E7] text-[72px] transition-all duration-500"
                    style={{
                      fontFamily: "Cormorant Garamond, SemiBold",
                      lineHeight: 1.2,
                    }}
                  >
                    Voucher
                  </h2>
                  <p className="text-[#FFF8E7] text-[18px] transition-all duration-500 font-thin">
                    Prezent, który daje więcej niż rzeczy – daje emocje, piękno
                    i spokój. Podaruj bliskiej osobie chwilę zatrzymania,
                    odprężenia i świadomej pielęgnacji. To nie tylko zabieg – to
                    doświadczenie, które przywraca balans, podnosi pewność
                    siebie i pozwala poczuć się wyjątkowo. Dla niej. Dla niego.
                    Dla każdego, kto zasługuje na moment tylko dla siebie.
                  </p>
                  <div className="mt-[48px]">
                    <a
                      href="#"
                      className="border-2 text-[18px] border-prime hover:border-[#976934] text-prime rounded-[5px] py-[16px] px-[48px] hover:bg-[#976934] hover:text-black transition-colors duration-300"
                    >
                      Kup voucher
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Left gradient overlay */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[40%] pointer-events-none z-0"
              style={{
                background:
                  "linear-gradient(90deg, #0B0C0F 0%, #0B0C0F80 70%, #0B0C0F00 100%)",
              }}
            />
            <div
              className="absolute top-0 left-0 w-full h-[15%] pointer-events-none z-30"
              style={{
                background:
                  "linear-gradient(0deg, #0B0C0F00 0%, #0B0C0F80 50%, #0B0C0F 90%)",
              }}
            />
          </section>
        ) : (
          // Mobile: Each service as separate section
          <>
            <section
              id="voucher"
              className="snap-start h-screen w-full relative flex flex-col px-6 py-10"
              style={{
                minHeight: "100dvh",
                paddingBottom: "max(100px, env(safe-area-inset-bottom))",
              }}
            >
              {/* Background Image */}
              <img
                src={Voucher}
                alt="voucher"
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
              />

              <div className="flex flex-col h-full z-20">
                <div className="flex flex-col items-center flex-grow justify-end">
                  <h2
                    className="text-[#FFF8E7] text-[54px] mb-2 text-center"
                    style={{
                      fontFamily: "Cormorant Garamond, SemiBold",
                      lineHeight: 1.2,
                    }}
                  >
                    Voucher
                  </h2>

                  <p className="text-[#FFF8E7] text-[13px] text-justify mb-10 max-w-xs font-thin">
                    Prezent, który daje więcej niż rzeczy – daje emocje, piękno
                    i spokój. Podaruj bliskiej osobie chwilę zatrzymania,
                    odprężenia i świadomej pielęgnacji. To nie tylko zabieg – to
                    doświadczenie, które przywraca balans, podnosi pewność
                    siebie i pozwala poczuć się wyjątkowo. Dla niej. Dla niego.
                    Dla każdego, kto zasługuje na moment tylko dla siebie.
                  </p>

                  <div className="mb-10">
                    <a
                      href="#"
                      className="border-2 text-[16px] border-prime text-prime rounded-[5px] py-[14px] px-[32px] hover:bg-prime hover:text-black transition-colors duration-300"
                    >
                      Kup voucher
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom gradient overlay */}
              <div
                className="absolute bottom-0 left-0 w-full h-[15%] pointer-events-none z-10"
                style={{
                  background:
                    "linear-gradient(180deg, #0B0C0F00 0%, #0B0C0F80 40%, #0B0C0F 90%)",
                }}
              />
              <div
                className="absolute top-0 left-0 w-full h-[25%] pointer-events-none z-10"
                style={{
                  background:
                    "linear-gradient(0deg, #0B0C0F00 0%, #0B0C0F80 40%, #0B0C0F 90%)",
                }}
              />
            </section>
          </>
        )}
      </div>
    </>
  );
}

export default App;
