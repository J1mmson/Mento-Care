import { useState } from "react";
import { FiClock, FiMapPin, FiNavigation, FiPhone, FiStar } from "react-icons/fi";
import Social from "../components/Social";
import { BUSINESS } from "../data/content";

function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title="Mapa dojazdu do Mento Care, ul. Nad Babicą 2, Bochnia"
        src={BUSINESS.mapEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full rounded-md border-0 [filter:grayscale(0.4)_contrast(1.05)]"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group flex h-full w-full flex-col items-center justify-center gap-4 rounded-md border border-cream/20 bg-bgPrimary/50 text-cream transition-colors hover:border-prime"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-prime text-[26px] text-prime transition-transform group-hover:scale-110">
        <FiMapPin aria-hidden="true" />
      </span>
      <span className="font-serif text-[26px]">Pokaż mapę dojazdu</span>
      <span className="text-[13px] text-cream/60">
        ul. {BUSINESS.street}, {BUSINESS.postalCode} {BUSINESS.city} · Mapy Google
      </span>
    </button>
  );
}

export default function Contact() {
  return (
    <section
      id="kontakt"
      aria-labelledby="kontakt-tytul"
      className="relative flex min-h-svh snap-start flex-col overflow-hidden px-6 pt-24 lg:h-svh lg:px-10 lg:pt-32 xl:px-[98px]"
    >
      <div className="grid flex-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <p className="eyebrow">Kontakt</p>
          <h2 id="kontakt-tytul" className="section-title mt-2 text-[34px] lg:text-[56px]">
            Zapraszamy do gabinetu
          </h2>

          <address className="mx-auto mt-5 max-w-sm space-y-3.5 text-left not-italic lg:mx-0 lg:mt-8 lg:max-w-none lg:space-y-4">
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 transition-colors hover:text-prime"
            >
              <FiMapPin aria-hidden="true" className="mt-1 shrink-0 text-[20px] text-prime" />
              <span className="text-[16px] lg:text-[18px]">
                {BUSINESS.fullName}
                <br />
                ul. {BUSINESS.street}, {BUSINESS.postalCode} {BUSINESS.city}
              </span>
            </a>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="flex items-center gap-4 transition-colors hover:text-prime"
            >
              <FiPhone aria-hidden="true" className="shrink-0 text-[20px] text-prime" />
              <span className="text-[16px] lg:text-[18px]">+48 {BUSINESS.phoneDisplay}</span>
            </a>
            <div className="flex gap-4">
              <FiClock aria-hidden="true" className="mt-1 shrink-0 text-[20px] text-prime" />
              <dl className="grid grid-cols-[auto_auto] gap-x-6 gap-y-1 text-[15px] lg:text-[17px]">
                {BUSINESS.hours.map((h) => (
                  <div key={h.days} className="contents">
                    <dt className="text-cream/70">{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </address>

          <div className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-3 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center lg:mt-10 lg:justify-start">
            <a
              href={BUSINESS.booksyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid col-span-2"
            >
              Zarezerwuj online
            </a>
            <a
              href={BUSINESS.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-3"
            >
              <FiNavigation aria-hidden="true" /> Trasa
            </a>
            <a
              href={BUSINESS.googleReviewUrl || BUSINESS.googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost px-3"
            >
              <FiStar aria-hidden="true" />
              {BUSINESS.googleReviewUrl ? "Oceń nas" : "Opinie Google"}
            </a>
          </div>

          <Social className="mt-5 justify-center lg:mt-8 lg:justify-start" />
        </div>

        <div className="hidden h-[min(60vh,520px)] lg:block">
          <MapEmbed />
        </div>
      </div>

      <footer className="mt-6 flex flex-col items-center gap-1 border-t border-cream/10 py-5 text-center text-[12px] text-cream/50 lg:flex-row lg:justify-between lg:text-left">
        <p>
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
          {BUSINESS.name} · {BUSINESS.owner} · Kosmetologia estetyczna Bochnia
        </p>
        <p>
          ul. {BUSINESS.street}, {BUSINESS.postalCode} {BUSINESS.city} · tel.{" "}
          {BUSINESS.phoneDisplay}
        </p>
      </footer>
    </section>
  );
}
