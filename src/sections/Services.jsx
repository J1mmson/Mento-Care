import { useCallback, useEffect, useRef, useState } from "react";
import Img from "../components/Img";
import { BUSINESS, SERVICES } from "../data/content";

// Na komputerze z myszą/touchpadem zabiegi są jednym slajdem przełączanym kółkiem.
// Na telefonach i tabletach każdy zabieg to osobny pełnoekranowy slajd.
const DESK_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
const COUNT = SERVICES.length;
const pad = (n) => String(n).padStart(2, "0");

export default function Services() {
  const sectionRef = useRef(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  // zdjęcia, które już mogą się wczytać na desktopie (aktywne ± 1)
  const [shown, setShown] = useState(() => new Set([0, 1]));

  const go = useCallback((index) => {
    if (index < 0 || index >= COUNT) return false;
    activeRef.current = index;
    setActive(index);
    setShown((prev) => {
      const next = new Set(prev);
      [index - 1, index, index + 1].forEach((i) => i >= 0 && i < COUNT && next.add(i));
      return next.size === prev.size ? prev : next;
    });
    return true;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(DESK_QUERY);
    const section = sectionRef.current;
    let lockUntil = 0;
    let lastStep = 0;
    let acc = 0;
    let wasSnapped = false;

    const isSnapped = () => Math.abs(section.getBoundingClientRect().top) < 3;

    const onWheel = (e) => {
      if (!mq.matches || e.ctrlKey) return;
      if (!isSnapped()) {
        wasSnapped = false;
        return;
      }
      const now = performance.now();
      if (!wasSnapped) {
        // właśnie „dojechaliśmy” do slajdu – wygaszamy bezwładność touchpada
        wasSnapped = true;
        lockUntil = now + 450;
      }
      const dir = Math.sign(e.deltaY);
      if (!dir) return;
      const idx = activeRef.current;
      const atEdge = (dir > 0 && idx === COUNT - 1) || (dir < 0 && idx === 0);
      if (atEdge && now - lastStep > 800 && now >= lockUntil) return; // przewiń do kolejnej sekcji
      e.preventDefault();
      if (now < lockUntil) {
        // ciągły gest (bezwładność touchpada) = jeden krok, ale nie dłużej niż ~1,2 s
        lockUntil = Math.min(lastStep + 1200, Math.max(lockUntil, now + 180));
        return;
      }
      if (Math.sign(acc) !== dir) acc = 0;
      acc += e.deltaY;
      if (Math.abs(acc) < 25) return;
      acc = 0;
      if (go(idx + dir)) {
        lastStep = now;
        lockUntil = now + 650;
      }
    };

    const onKey = (e) => {
      if (!mq.matches || !isSnapped()) return;
      if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
      const keys = { ArrowDown: 1, PageDown: 1, " ": 1, ArrowUp: -1, PageUp: -1 };
      let dir = keys[e.key];
      if (!dir) return;
      if (e.key === " " && e.shiftKey) dir = -1;
      if (go(activeRef.current + dir)) e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [go]);

  return (
    <section
      id="zabiegi"
      ref={sectionRef}
      aria-labelledby="zabiegi-tytul"
      className="relative desk:h-svh desk:snap-start desk:overflow-hidden"
    >
      <h2 id="zabiegi-tytul" className="sr-only">
        Zabiegi kosmetologiczne w Bochni
      </h2>

      {SERVICES.map((service, i) => {
        const isActive = i === active;
        return (
          <article
            key={service.slug}
            id={`zabieg-${service.slug}`}
            className={`relative flex h-svh snap-start flex-col justify-end overflow-hidden px-6 pb-[max(3rem,env(safe-area-inset-bottom))] pt-28 desk:absolute desk:inset-0 desk:snap-align-none desk:px-[98px] desk:pb-[96px] desk:transition-[opacity,visibility] desk:duration-700 ${
              isActive ? "desk:z-10" : "desk:invisible desk:opacity-0"
            }`}
          >
            <div className={`absolute inset-0 ${shown.has(i) ? "" : "desk:hidden"}`}>
              <Img
                img={service.image}
                alt={`${service.name} – Mento Care Bochnia`}
                sizes="100vw"
                className="h-full w-full object-cover opacity-45"
              />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-bgPrimary via-bgPrimary/50 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-bgPrimary via-bgPrimary/70 to-transparent"
            />

            <div className="relative z-10 mx-auto w-full max-w-xl text-center desk:mx-0 desk:max-w-[760px] desk:text-left">
              <p className="eyebrow">
                Nasze zabiegi · {pad(i + 1)}/{pad(COUNT)}
              </p>
              <h3 className="mt-3 hyphens-auto text-[clamp(2.3rem,10vw,3.4rem)] leading-[1.05] text-cream desk:text-[64px]">
                {service.name}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-cream/90 desk:mt-5 desk:text-[18px]">
                {service.description}
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3 desk:mt-10 desk:justify-start">
                <a
                  href={BUSINESS.booksyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  Umów się na wizytę
                </a>
                <a href="#cennik" className="btn-ghost">
                  Cennik
                </a>
              </div>
            </div>
          </article>
        );
      })}

      {/* Nawigacja kropkami – tylko desktop */}
      <nav
        aria-label="Wybierz zabieg"
        className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 desk:block xl:right-[98px]"
      >
        <ul className="flex flex-col items-end gap-2">
          {SERVICES.map((service, i) => (
            <li key={service.slug}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={service.name}
                aria-current={i === active ? "true" : undefined}
                className="group flex items-center gap-3"
              >
                <span
                  className={`whitespace-nowrap text-[13px] tracking-wide transition-opacity ${
                    i === active
                      ? "text-prime opacity-100"
                      : "text-cream opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }`}
                >
                  {service.name}
                </span>
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                    i === active ? "border-prime" : "border-cream/70 group-hover:border-prime"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full bg-prime transition-transform ${
                      i === active ? "scale-100" : "scale-0"
                    }`}
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
