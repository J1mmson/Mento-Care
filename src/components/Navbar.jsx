import { useEffect, useState } from "react";
import { FiMenu, FiPhone, FiX } from "react-icons/fi";
import Img from "./Img";
import Social from "./Social";
import { logo } from "../assets/img";
import { BUSINESS, NAV } from "../data/content";

const LEFT = NAV.slice(0, 4);
const RIGHT = NAV.slice(4);

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

function NavLink({ item, active, onClick }) {
  const isActive = active === item.id;
  return (
    <a
      href={`#${item.id}`}
      onClick={onClick}
      aria-current={isActive ? "true" : undefined}
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

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { active, scrolled } = useActiveSection();

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-gradient-to-b from-bgPrimary/95 via-bgPrimary/70 to-transparent"
          : "bg-gradient-to-b from-bgPrimary/60 to-transparent"
      }`}
    >
      <nav
        aria-label="Menu główne"
        className="mx-auto flex h-[76px] items-center justify-between px-5 lg:grid lg:h-[110px] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6 xl:gap-8 lg:px-10 xl:px-[98px]"
      >
        {/* Linki – lewa strona (desktop) */}
        <ul className="hidden items-center gap-5 text-[13px] font-light uppercase tracking-[0.12em] lg:flex xl:gap-8 xl:text-[15px]">
          {LEFT.map((item) => (
            <li key={item.id}>
              <NavLink item={item} active={active} />
            </li>
          ))}
        </ul>

        {/* Logo */}
        <a
          href="#o-nas"
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
        <div className="hidden items-center justify-end gap-5 text-[13px] font-light uppercase tracking-[0.12em] lg:flex xl:gap-8 xl:text-[15px]">
          <ul className="flex items-center gap-5 xl:gap-8">
            {RIGHT.map((item) => (
              <li key={item.id}>
                <NavLink item={item} active={active} />
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
            className="rounded-full border border-prime/80 bg-bgPrimary/40 px-4 py-2 text-[12px] uppercase tracking-[0.14em] text-prime backdrop-blur-sm"
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
        className={`fixed inset-0 z-10 flex flex-col items-center justify-center bg-bgPrimary/95 backdrop-blur-md transition-opacity duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-3 font-serif text-[28px] leading-tight text-cream">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={close}
                tabIndex={open ? 0 : -1}
                className={active === item.id ? "text-prime" : ""}
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
