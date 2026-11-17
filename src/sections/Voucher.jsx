import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import { FiEye, FiGift, FiPhone } from "react-icons/fi";
import LoopVideo from "../components/LoopVideo";
import Modal from "../components/Modal";
import VoucherForm, { TITLE_ID } from "../components/VoucherForm";
import VoucherLooks from "../components/VoucherLooks";
import film from "../assets/voucher-film.mp4";
import filmLarge from "../assets/voucher-film-1080.mp4";
import filmPoster from "../assets/voucher-film-poster.webp";
import { BUSINESS, VOUCHER } from "../data/content";
import { OPEN_VOUCHER_FORM } from "../lib/voucherForm";
import { scrollToSection } from "../lib/scrollToSection";

export default function Voucher() {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);

  // przycisk „Kup voucher online” w innych miejscach strony (np. /vouchery/)
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_VOUCHER_FORM, onOpen);
    return () => window.removeEventListener(OPEN_VOUCHER_FORM, onOpen);
  }, []);

  const buyFromPreview = () => {
    setPreview(false);
    setOpen(true);
  };

  return (
    <section
      id="voucher"
      aria-labelledby="voucher-tytul"
      className="relative flex min-h-svh snap-start flex-col overflow-hidden px-6 pb-[max(3rem,env(safe-area-inset-bottom))] lg:h-svh lg:justify-end lg:px-10 lg:pb-[96px] xl:px-[98px]"
    >

      {/* Film w pętli (wręczanie vouchera w pudełku): telefon – nad tekstem, komputer – cały film w pionie po prawej;
          brzegi filmu łagodnie przechodzą w tło (klasa .video-fade w index.css) */}
      <div className="video-fade relative -mx-6 h-[62svh] shrink-0 lg:absolute lg:inset-y-0 lg:left-[74%] lg:mx-0 lg:aspect-[9/16] lg:h-full lg:-translate-x-1/2">
        <LoopVideo
          src={film}
          srcLarge={filmLarge}
          poster={filmPoster}
          className="h-full w-full object-cover object-[50%_100%] opacity-90 lg:object-center"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,12,15,0.8)_0%,rgba(11,12,15,0)_22%)] lg:hidden"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[18%] bg-gradient-to-b from-bgPrimary to-transparent lg:block"
      />

      <div className="relative z-10 mx-auto -mt-12 max-w-md text-center lg:mx-0 lg:mt-0 lg:max-w-[540px] lg:text-left xl:max-w-[600px]">
        <p className="eyebrow">Prezent</p>
        <h2 id="voucher-tytul" className="mt-2 text-[48px] leading-[1.05] text-cream lg:text-[64px] xl:text-[72px]">
          Voucher podarunkowy
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-cream/90 lg:text-[18px]">
          Prezent, który daje więcej niż rzeczy – daje emocje, piękno i spokój.
          Podaruj bliskiej osobie chwilę zatrzymania, odprężenia i świadomej
          pielęgnacji. Dla niej. Dla niego. Dla każdego, kto zasługuje na
          moment tylko dla siebie.
        </p>
        <p className="mt-3 text-[14px] text-cream/70 lg:text-[15px]">
          Na dowolną kwotę lub wybrany zabieg – w eleganckim pudełku do odbioru w gabinecie lub z wysyłką,
          albo od razu e-mailem jako PDF ·{" "}
          <a href={VOUCHER.termsUrl} className="underline underline-offset-2 hover:text-prime">
            regulamin
          </a>
        </p>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center lg:mt-9 lg:justify-start">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            className="btn-solid col-span-2"
          >
            <FiGift aria-hidden="true" /> Kup voucher online
          </button>
          <a href={`tel:${BUSINESS.phone}`} className="btn-outline px-4">
            <FiPhone aria-hidden="true" />
            <span className="sm:hidden">Zadzwoń</span>
            <span className="hidden sm:inline">{BUSINESS.phoneDisplay}</span>
          </a>
          <a
            href={BUSINESS.instagramDm}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-4"
          >
            <FaInstagram aria-hidden="true" /> Instagram
          </a>
        </div>
        <button
          type="button"
          onClick={() => scrollToSection("voucher-szczegoly") || setPreview(true)}
          aria-haspopup="dialog"
          className="mt-5 inline-flex items-center gap-2 text-[15px] text-prime underline decoration-prime/50 underline-offset-4 transition-colors hover:decoration-prime"
        >
          <FiEye aria-hidden="true" /> Zobacz, jak wygląda voucher – PDF i w pudełku
        </button>
      </div>

      <Modal open={preview} onClose={() => setPreview(false)} labelledBy="voucher-podglad-tytul" size="max-w-5xl">
        <p className="eyebrow">Voucher podarunkowy</p>
        <h2 id="voucher-podglad-tytul" className="mt-1 pr-10 font-serif text-[32px] leading-tight text-cream sm:text-[40px]">
          Jak wygląda voucher
        </h2>
        <div className="mt-6">
          <VoucherLooks />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={buyFromPreview} className="btn-solid">
            <FiGift aria-hidden="true" /> Kup voucher online
          </button>
          <a href="/vouchery/" className="btn-ghost">
            Więcej o voucherach
          </a>
        </div>
      </Modal>

      <Modal open={open} onClose={() => setOpen(false)} labelledBy={TITLE_ID}>
        <VoucherForm onClose={() => setOpen(false)} />
      </Modal>
    </section>
  );
}
