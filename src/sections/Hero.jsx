import { FiMapPin, FiPhone } from "react-icons/fi";
import Img from "../components/Img";
import Social from "../components/Social";
import Gradient from "../assets/gradient.svg";
import { hero } from "../assets/img";
import { BUSINESS } from "../data/content";

export default function Hero() {
  return (
    <section
      id="o-nas"
      aria-label="Mento Care – kosmetologia w Bochni"
      className="relative flex min-h-svh snap-start flex-col overflow-hidden lg:h-svh"
    >
      <img
        src={Gradient}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-[280px] -top-[400px] hidden w-[75%] lg:block"
      />

      <Img
        img={hero}
        alt="Faustyna Hojnor – kosmetolog estetyczna, Mento Care Bochnia"
        sizes="(min-width: 1024px) 57vh, (orientation: landscape) 100vw, 67vh"
        loading="eager"
        fetchPriority="high"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top opacity-80 lg:inset-auto lg:bottom-0 lg:right-[3%] lg:h-[78vh] lg:w-auto lg:object-contain lg:object-bottom lg:opacity-100 xl:right-[6%] xl:h-[86vh]"
      />

      {/* przyciemnienie pod tekstem */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,12,15,0)_0%,rgba(11,12,15,0.15)_38%,rgba(11,12,15,0.88)_58%,#0B0C0F_78%)] lg:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[32%] bg-[linear-gradient(180deg,rgba(11,12,15,0)_0%,rgba(11,12,15,0.5)_30%,#0B0C0F_90%)] lg:block"
      />

      <div className="relative z-10 mt-auto flex w-full flex-col items-center px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-28 text-center lg:mt-0 lg:h-full lg:items-start lg:px-10 lg:pb-8 lg:pt-[120px] lg:text-left xl:px-[98px]">
        <div className="max-w-md lg:mt-auto lg:max-w-[500px] xl:max-w-[640px]">
          <h1 className="leading-[1.02] text-prime">
            <span className="block text-[48px] font-semibold tracking-wide lg:text-[64px] xl:text-[78px]">
              MENTO CARE
            </span>
            <span className="mt-1 block text-[28px] text-cream lg:text-[40px] xl:text-[46px]">
              Kosmetologia Bochnia
            </span>
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-cream/90 lg:mt-6 lg:text-[17px] xl:text-[18px]">
            Nowoczesna przestrzeń kosmetologii estetycznej, gdzie nauka spotyka
            się z troską.
            <span className="hidden sm:inline">
              {" "}
              Specjalizujemy się w zaawansowanych terapiach skóry twarzy
              i precyzyjnych zabiegach iniekcyjnych, które subtelnie podkreślają
              naturalne piękno.
            </span>
            <span className="hidden lg:inline">
              {" "}
              Dzięki wiedzy, doświadczeniu i indywidualnemu podejściu tworzymy
              efekty, które poprawiają wygląd i wzmacniają pewność siebie. Mento
              Care to miejsce, w którym liczy się jakość, spokój i dbałość o
              każdy detal.
            </span>
          </p>
          <div className="mt-6 grid w-full grid-cols-2 gap-3 sm:flex sm:justify-center lg:mt-8 lg:justify-start">
            <a
              href={BUSINESS.booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid col-span-2"
            >
              Zarezerwuj wizytę online
            </a>
            <a href={`tel:${BUSINESS.phone}`} className="btn-outline px-4">
              <FiPhone aria-hidden="true" />
              <span className="sm:hidden">Zadzwoń</span>
              <span className="hidden sm:inline">{BUSINESS.phoneDisplay}</span>
            </a>
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost px-4 lg:hidden"
            >
              <FiMapPin aria-hidden="true" className="text-prime" />
              Dojazd
            </a>
          </div>
        </div>

        <div className="mt-auto hidden w-full items-center justify-between pt-8 lg:flex">
          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-5 py-2.5 text-[14px] text-textPrimary transition-colors hover:border-prime hover:text-prime"
          >
            <FiMapPin aria-hidden="true" className="text-prime" />
            ul. {BUSINESS.street}, {BUSINESS.postalCode} {BUSINESS.city}
          </a>
          <Social />
        </div>
      </div>
    </section>
  );
}
