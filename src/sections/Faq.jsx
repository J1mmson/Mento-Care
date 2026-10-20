import { FiPlus } from "react-icons/fi";
import Gradient from "../assets/gradient.svg";
import { FAQ } from "../data/content";

export default function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-tytul"
      className="relative flex min-h-svh snap-start flex-col justify-center overflow-hidden px-5 pb-8 pt-24 lg:h-svh lg:px-10 lg:pt-28 xl:px-[98px]"
    >
      <img
        src={Gradient}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -left-[30%] top-[-30%] w-[120%] opacity-70 lg:-left-[20%] lg:w-[80%]"
      />

      <div className="relative mx-auto w-full max-w-3xl">
        <header className="text-center">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-tytul" className="section-title mt-2">
            Najczęstsze pytania
          </h2>
        </header>

        <div className="mt-4 lg:mt-10">
          {FAQ.map(({ q, a }) => (
            <details key={q} name="faq" className="group border-b border-cream/15">
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-3 lg:py-4">
                <h3 className="text-[17px] leading-snug text-cream lg:text-[24px]">{q}</h3>
                <FiPlus
                  aria-hidden="true"
                  className="shrink-0 text-[20px] text-prime transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="pb-4 pr-8 text-[14px] leading-relaxed text-cream/85 lg:text-[16px]">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
