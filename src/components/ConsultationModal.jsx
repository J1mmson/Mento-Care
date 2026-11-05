import { FiCheck, FiClock } from "react-icons/fi";
import Modal from "./Modal";
import { scrollToSection } from "../lib/scrollToSection";
import { BUSINESS, CONSULTATIONS } from "../data/content";

/** Okno „Dowiedz się więcej” przy konsultacji – treści w src/data/business.js → CONSULTATIONS */
export default function ConsultationModal({ open, onClose }) {
  const toPricing = (e) => {
    e.preventDefault();
    onClose();
    requestAnimationFrame(() => scrollToSection("cennik"));
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="konsultacja-tytul">
      <p className="eyebrow">Pierwsza wizyta</p>
      <h2 id="konsultacja-tytul" className="mt-2 pr-8 text-[34px] leading-[1.05] text-cream sm:text-[44px]">
        Konsultacja kosmetologiczna
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-cream/85 sm:text-[16px]">
        {CONSULTATIONS.intro}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
        {CONSULTATIONS.types.map((t) => (
          <article
            key={t.name}
            className="flex flex-col rounded-md border border-cream/15 bg-bgPrimary/40 p-5 sm:p-6"
          >
            <h3 className="text-[26px] leading-tight text-cream">{t.name}</h3>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px]">
              <span className="text-[20px] font-normal text-prime">{t.price} zł</span>
              <span className="inline-flex items-center gap-1.5 text-cream/60">
                <FiClock aria-hidden="true" /> {t.duration}
              </span>
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-cream/85">{t.forWhom}</p>
            <ul className="mt-4 space-y-2 text-[14px] leading-snug text-cream/90">
              {t.includes.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <FiCheck aria-hidden="true" className="mt-0.5 shrink-0 text-prime" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {t.withTreatment && (
              <div className="mt-auto pt-4">
                <p className="border-t border-cream/10 pt-3 text-[13px] text-cream/70">
                  Konsultacja + zabieg: <span className="text-cream">od {t.withTreatment} zł</span>
                </p>
              </div>
            )}
          </article>
        ))}
      </div>

      {CONSULTATIONS.note && (
        <p className="mt-5 text-[14px] leading-relaxed text-cream/75">{CONSULTATIONS.note}</p>
      )}

      <div className="mt-6 grid gap-3 sm:flex">
        <a
          href={BUSINESS.booksyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-solid"
        >
          Zarezerwuj konsultację
        </a>
        <a href="#cennik" onClick={toPricing} className="btn-ghost">
          Zobacz pełny cennik
        </a>
      </div>
    </Modal>
  );
}
