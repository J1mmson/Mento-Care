import { FiChevronDown } from "react-icons/fi";
import Img from "../components/Img";
import { cennik } from "../assets/img";
import { BUSINESS, PRICE_LIST, formatPrice, minPrice } from "../data/content";

export default function Pricing() {
  return (
    <section
      id="cennik"
      aria-labelledby="cennik-tytul"
      className="relative flex h-svh snap-start overflow-hidden"
    >
      <div className="relative hidden w-1/2 lg:block">
        <Img
          img={cennik}
          sizes="50vw"
          alt="Materiały Mento Care – cennik zabiegów kosmetologicznych w Bochni"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-bgPrimary/70 to-transparent"
        />
      </div>

      <div className="relative flex w-full flex-col px-5 pb-5 pt-24 lg:w-1/2 lg:px-12 lg:pb-8 lg:pt-32 xl:px-16">
        <header className="text-center lg:text-left">
          <p className="eyebrow">Cennik</p>
          <h2 id="cennik-tytul" className="section-title mt-2">
            Cennik zabiegów
          </h2>
        </header>

        <div className="scroll-fade mt-4 min-h-0 flex-1 overflow-y-auto overscroll-y-auto pb-10 pr-1 lg:mt-6">
          {PRICE_LIST.map((category, i) => {
            const from = minPrice(category);
            return (
              <details
                key={category.title}
                name="cennik"
                open={i === 0}
                className="group border-b border-cream/15"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-3.5 lg:py-4">
                  <h3 className="text-[20px] leading-tight text-cream lg:text-[23px]">
                    {category.title}
                  </h3>
                  <span className="flex shrink-0 items-center gap-3 text-[13px] text-cream/60">
                    {from && <span>od {from} zł</span>}
                    <FiChevronDown
                      aria-hidden="true"
                      className="text-[18px] text-prime transition-transform duration-300 group-open:rotate-180"
                    />
                  </span>
                </summary>
                <ul className="pb-4">
                  {category.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline gap-3 py-1.5 text-[14px] text-cream/90 lg:text-[15px]"
                    >
                      <span>{item.name}</span>
                      <span
                        aria-hidden="true"
                        className="min-w-[16px] flex-1 -translate-y-1 border-b border-dotted border-cream/25"
                      />
                      <span className="whitespace-nowrap text-cream">{formatPrice(item)}</span>
                    </li>
                  ))}
                </ul>
              </details>
            );
          })}
        </div>

        <p className="mt-3 text-center text-[13px] text-cream/70 lg:text-left">
          Ceny orientacyjne – aktualne ceny i wolne terminy znajdziesz na{" "}
          <a
            href={BUSINESS.booksyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-prime underline underline-offset-4"
          >
            Booksy
          </a>
          .
        </p>
      </div>
    </section>
  );
}
