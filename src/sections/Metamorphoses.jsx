import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Img from "../components/Img";
import { METAMORPHOSES } from "../data/content";

const SIZES = "(min-width: 1024px) 500px, 26vh";
const COUNT = METAMORPHOSES.length;

function Frame({ label, children }) {
  return (
    <fieldset className="rounded-md border-2 border-cream/40 px-3 pb-3 pt-1 lg:px-5 lg:pb-5">
      <legend className="mx-2 px-3 font-serif text-[16px] tracking-[0.2em] text-cream lg:text-[20px]">
        {label}
      </legend>
      {children}
    </fieldset>
  );
}

export default function Metamorphoses() {
  const [index, setIndex] = useState(0);
  const touchX = useRef(null);
  const pair = METAMORPHOSES[index];

  const go = (i) => setIndex((i + COUNT) % COUNT);

  const sectionRef = useRef(null);
  const [near, setNear] = useState(false);

  // gdy sekcja jest blisko ekranu, wczytaj w tle kolejną parę zdjęć
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && (setNear(true), io.disconnect()),
      { rootMargin: "100% 0px" }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    const next = METAMORPHOSES[(index + 1) % COUNT];
    [next.before, next.after].forEach((im) => {
      const pre = new Image();
      pre.sizes = SIZES;
      pre.srcset = im.srcSet;
      pre.src = im.src;
    });
  }, [index, near]);

  const imgClass =
    "block aspect-square h-[min(25svh,250px)] w-auto rounded-sm object-cover lg:h-[min(50vh,500px)]";

  return (
    <section
      id="metamorfozy"
      ref={sectionRef}
      aria-labelledby="metamorfozy-tytul"
      className="relative flex min-h-svh snap-start flex-col justify-center overflow-hidden px-6 pb-6 pt-20 lg:h-svh lg:px-10 lg:pb-8 lg:pt-28 xl:px-[98px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[25%] bg-gradient-to-b from-bgPrimary to-transparent"
      />

      <header className="relative text-center lg:text-left">
        <p className="eyebrow">Efekty zabiegów</p>
        <h2 id="metamorfozy-tytul" className="section-title mt-1 lg:mt-2">
          Metamorfozy
        </h2>
      </header>

      <div
        className="relative mt-4 flex flex-col items-center gap-2 lg:mt-8 lg:flex-row lg:justify-center lg:gap-10"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        <Frame label="PRZED">
          <Img
            key={`b${index}`}
            img={pair.before}
            sizes={SIZES}
            alt={`Skóra przed zabiegiem – metamorfoza ${index + 1} z ${COUNT}, Mento Care Bochnia`}
            className={imgClass}
          />
        </Frame>
        <Frame label="PO">
          <Img
            key={`a${index}`}
            img={pair.after}
            sizes={SIZES}
            alt={`Skóra po zabiegu – metamorfoza ${index + 1} z ${COUNT}, Mento Care Bochnia`}
            className={imgClass}
          />
        </Frame>
      </div>

      <div className="relative mt-4 flex items-center justify-center gap-4 lg:mt-8">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Poprzednia metamorfoza"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 text-[20px] text-cream transition-colors hover:border-prime hover:text-prime"
        >
          <FiChevronLeft aria-hidden="true" />
        </button>
        <ul className="flex items-center gap-2.5">
          {METAMORPHOSES.map((_, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`Metamorfoza ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                  i === index ? "border-prime" : "border-cream/70 hover:border-prime"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full bg-prime transition-transform ${
                    i === index ? "scale-100" : "scale-0"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Następna metamorfoza"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/40 text-[20px] text-cream transition-colors hover:border-prime hover:text-prime"
        >
          <FiChevronRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
