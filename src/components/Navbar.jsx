import { useEffect, useState } from "react";
import { FiArrowRight, FiGift, FiMenu, FiPhone, FiX } from "react-icons/fi";
import Img from "./Img";
import Social from "./Social";
import { logo } from "../assets/img";
import { BUSINESS, NAV } from "../data/content";

const HALF = Math.ceil(NAV.length / 2);
const LEFT = NAV.slice(0, HALF);
const RIGHT = NAV.slice(HALF);

function useActiveSection() {
  const [active, setActive] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.45;
      let current = null;
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) {
          current = id;
          break;
        }
      }
      setActive(current);
      setScrolled(window.scrollY > 40);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { active, scrolled };
}

// Linki prowadzą do podstron (/cennik/ itd. – widzi je Google), a na stronie głównej
// przewijają do sekcji (data-section, obsługa w src/lib/scrollToSection.js)
function NavLink({ item, active, currentPage, onClick }) {
  const isActive = active === item.id;
  return (
    <a
      href={item.path}
      data-section={item.id}
      onClick={onClick}
      aria-current={currentPage === item.id ? "page" : isActive ? "true" : undefined}
      className={`flex items-center gap-2 whitespace-nowrap transition-colors hover:text-prime ${
        isActive ? "text-prime" : "text-textPrimary"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full bg-prime transition-opacity ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />
      {item.label}
    </a>
  );
}

const PROMO_KEY = "mc-promo-vouchery"; // ukrycie paska ✕ na 14 dni (patrz skrypt w index.html)

/** Pasek nad menu: nowość – vouchery online. Chowa się po przewinięciu strony. */
function PromoBar({ show, onClose }) {
  return (
    <div
      className={`promo-bar overflow-hidden bg-prime text-bgPrimary transition-[height] duration-300 ${
        show ? "h-9" : "h-0"
      }`}
    >
      <div className="relative flex h-9 items-center justify-center px-11">
        <a
          href="/vouchery/"
          tabIndex={show ? 0 : -1}
          className="flex min-w-0 items-center gap-2 text-[12px] font-medium tracking-[0.02em] sm:text-[13px]"
        >
          <FiGift aria-hidden="true" className="shrink-0 text-[15px]" />
          <span className="truncate">
            <span className="uppercase tracking-[0.12em]">Nowość:</span>
            <span className="md:hidden"> voucher premium w eleganckim pudełku</span>
            <span className="hidden md:inline">
              {" "}
              zamów voucher online – także premium w eleganckim pudełku, z odbiorem w gabinecie lub wysyłką
            </span>
          </span>
          <span className="hidden shrink-0 items-center gap-1 underline underline-offset-2 sm:flex">
            Kup voucher <FiArrowRight aria-hidden="true" />
          </span>
          <FiArrowRight aria-hidden="true" className="shrink-0 sm:hidden" />
        </a>
        <button
          type="button"
          onClick={onClose}
          tabIndex={show ? 0 : -1}
          aria-label="Ukryj informację o voucherach"
          className="absolute right-1 top-0 flex h-9 w-10 items-center justify-center text-[17px] opacity-70 transition-opacity hover:opacity-100"
        >
          <FiX aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default function Navbar({ page }) {
  const [open, setOpen] = useState(false);
  const { active, scrolled } = useActiveSection();
  const [promoClosed, setPromoClosed] = useState(false);
  const promo = page?.key !== "vouchery"; // na stronie voucherów pasek niepotrzebny
  // podstrona: podświetl jej pozycję w menu, gdy żadna sekcja z menu nie jest akurat na ekranie
  const currentPage = page && page.key !== "home" ? NAV.find((n) => n.path === page.path)?.id : undefined;
  const shown = active ?? currentPage;

  useEffect(() => {
    try {
      if (Number(localStorage.getItem(PROMO_KEY)) > Date.now()) setPromoClosed(true);
    } catch {
      /* brak dostępu do localStorage – pasek zostaje */
    }
  }, []);

  const closePromo = () => {
    setPromoClosed(true);
    try {
      localStorage.setItem(PROMO_KEY, String(Date.now() + 14 * 864e5));
    } catch {
      /* trudno – schowany do odświeżenia strony */
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);


  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-gradient-to-b from-bgPrimary/95 via-bgPrimary/70 to-transparent"
          : "bg-gradient-to-b from-bgPrimary/60 to-transparent"
      }`}
    >
      {promo && <PromoBar show={!promoClosed && !scrolled && !open} onClose={closePromo} />}
      <nav
        aria-label="Menu główne"
        className="mx-auto flex h-[76px] items-center justify-between px-5 lg:grid lg:h-[110px] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6 xl:gap-8 lg:px-10 xl:px-[98px]"
      >
        {/* Linki – lewa strona (desktop). Mniejsze odstępy do 1536 px, żeby menu nie wchodziło na logo */}
        <ul className="hidden items-center gap-4 text-[12px] font-light uppercase tracking-[0.1em] lg:flex xl:gap-5 xl:text-[13px] xl:tracking-[0.12em] 2xl:gap-8 2xl:text-[15px]">
          {LEFT.map((item) => (
            <li key={item.id}>
              <NavLink item={item} active={shown} currentPage={currentPage} />
            </li>
          ))}
        </ul>

        {/* Logo */}
        <a
          href="/"
          data-section="start"
          className="relative z-20 shrink-0 lg:justify-self-center"
          aria-label="Mento Care – strona główna"
        >
          <Img
            img={logo}
            alt="Mento Care – kosmetologia Bochnia"
            sizes="(min-width: 1024px) 80px, 52px"
            loading="eager"
            className="h-11 w-[51px] max-w-none lg:h-[68px] lg:w-[78px]"
          />
        </a>

        {/* Linki – prawa strona + rezerwacja (desktop) */}
        <div className="hidden items-center justify-end gap-4 text-[12px] font-light uppercase tracking-[0.1em] lg:flex xl:gap-5 xl:text-[13px] xl:tracking-[0.12em] 2xl:gap-8 2xl:text-[15px]">
          <ul className="flex items-center gap-4 xl:gap-5 2xl:gap-8">
            {RIGHT.map((item) => (
              <li key={item.id}>
                <NavLink item={item} active={shown} currentPage={currentPage} />
              </li>
            ))}
          </ul>
          <a
            href={BUSINESS.booksyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-full border border-prime px-5 py-2 text-prime transition-colors hover:bg-prime hover:text-bgPrimary"
          >
            zarezerwuj
          </a>
        </div>

        {/* Mobile: rezerwacja + menu */}
        <div className="relative z-20 flex items-center gap-2 lg:hidden">
          <a
            href={BUSINESS.booksyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-prime/80 bg-bgPrimary/60 px-4 py-2 text-[12px] uppercase tracking-[0.14em] text-prime"
          >
            zarezerwuj
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobilne"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            className="flex h-11 w-11 items-center justify-center text-[26px] text-cream"
          >
            {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Menu mobilne */}
      <div
        id="menu-mobilne"
        className={`fixed inset-0 z-10 flex flex-col items-center justify-center overscroll-none bg-bgPrimary/[0.97] transition-opacity duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-3 font-serif text-[28px] leading-tight text-cream">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={item.path}
                data-section={item.id}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                aria-current={currentPage === item.id ? "page" : undefined}
                className={shown === item.id ? "text-prime" : ""}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col items-center gap-5">
          <a
            href={`tel:${BUSINESS.phone}`}
            tabIndex={open ? 0 : -1}
            className="flex items-center gap-2 text-[16px] tracking-wide text-prime"
          >
            <FiPhone aria-hidden="true" /> {BUSINESS.phoneDisplay}
          </a>
          <Social />
        </div>
      </div>
    </header>
  );
}
