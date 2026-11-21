import { FiFileText, FiGift } from "react-icons/fi";
import VoucherLooks from "../components/VoucherLooks";
import { BUSINESS, VOUCHER, monthsLabel } from "../data/content";
import { openVoucherForm } from "../lib/voucherForm";

const STEPS = [
  {
    title: "Wybierz kwotę lub zabieg",
    text: `Voucher na dowolną kwotę (od ${VOUCHER.minAmount} zł) albo na konkretny zabieg z cennika. Możesz wpisać imię osoby obdarowanej.`,
  },
  {
    title: "Zapłać przelewem lub BLIK-iem",
    text: "Dane do płatności zobaczysz od razu na ekranie i w e-mailu. Voucher jest aktywny po zaksięgowaniu wpłaty.",
  },
  {
    title: "Odbierz voucher",
    text: "Kartkę w czarnej kopercie albo voucher premium w eleganckim pudełku odbierzesz w gabinecie lub wyślemy pocztą. Wersja PDF przychodzi od razu na e-mail.",
  },
  {
    title: "Umów wizytę",
    text: `Voucher jest ważny ${monthsLabel(VOUCHER.validityMonths)} od zakupu${
      VOUCHER.multiUse ? ", a voucher na kwotę wykorzystasz na kilka wizyt" : ""
    }. Wizytę umówisz przez Booksy albo pod numerem ${BUSINESS.phoneDisplay}.`,
  },
];

/** Podstrona /vouchery/: jak wygląda voucher (premium w pudełku, kartka w kopercie / PDF) + jak to działa. */
export default function VoucherDetails() {
  return (
    <section
      id="voucher-szczegoly"
      aria-labelledby="voucher-szczegoly-tytul"
      className="relative min-h-svh snap-start px-6 pb-16 pt-24 lg:px-10 lg:pb-20 lg:pt-32 xl:px-[98px]"
    >
      <div className="mx-auto max-w-6xl">
        <header className="text-center lg:text-left">
          <p className="eyebrow">Do wyboru</p>
          <h2 id="voucher-szczegoly-tytul" className="section-title mt-2">
            Jak wygląda voucher
          </h2>
        </header>

        <div className="mt-8 lg:mt-12">
          <VoucherLooks />
        </div>

        <h3 className="mt-14 text-center font-serif text-[30px] leading-tight text-cream lg:mt-20 lg:text-left lg:text-[40px]">
          Jak to działa
        </h3>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-6 lg:mt-8 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-4 rounded-md border border-cream/10 bg-cream/[0.03] p-4 sm:block sm:p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-prime font-serif text-[18px] text-prime">
                {i + 1}
              </span>
              <div>
                <p className="text-[17px] text-cream sm:mt-4">{step.title}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-cream/75 sm:mt-2">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
          <button type="button" onClick={openVoucherForm} aria-haspopup="dialog" className="btn-solid">
            <FiGift aria-hidden="true" /> Kup voucher online
          </button>
          <a href={VOUCHER.termsUrl} className="btn-ghost">
            <FiFileText aria-hidden="true" /> Regulamin voucherów
          </a>
        </div>
      </div>
    </section>
  );
}
