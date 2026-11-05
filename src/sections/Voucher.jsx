import { useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import { FiGift, FiPhone } from "react-icons/fi";
import Img from "../components/Img";
import Modal from "../components/Modal";
import VoucherForm, { TITLE_ID } from "../components/VoucherForm";
import { voucher } from "../assets/img";
import { BUSINESS, VOUCHER } from "../data/content";

export default function Voucher() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="voucher"
      aria-labelledby="voucher-tytul"
      className="relative flex h-svh snap-start flex-col justify-end overflow-hidden px-6 pb-[max(3rem,env(safe-area-inset-bottom))] lg:px-10 lg:pb-[96px] xl:px-[98px]"
    >
      <Img
        img={voucher}
        sizes="100vw"
        alt="Elegancki voucher podarunkowy Mento Care na zabieg kosmetologiczny"
        className="absolute inset-0 h-full w-full object-cover object-[35%_50%] opacity-80 lg:opacity-90"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,12,15,0.85)_0%,rgba(11,12,15,0)_25%,rgba(11,12,15,0.2)_45%,#0B0C0F_85%)] lg:bg-[linear-gradient(90deg,#0B0C0F_0%,rgba(11,12,15,0.88)_35%,rgba(11,12,15,0.45)_55%,rgba(11,12,15,0)_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[18%] bg-gradient-to-b from-bgPrimary to-transparent lg:block"
      />

      <div className="relative z-10 mx-auto max-w-md text-center lg:mx-0 lg:max-w-[540px] lg:text-left xl:max-w-[600px]">
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
          Na kwotę lub na wybrany zabieg · e-mailem, do odbioru w gabinecie lub wysyłką ·{" "}
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
      </div>

      <Modal open={open} onClose={() => setOpen(false)} labelledBy={TITLE_ID}>
        <VoucherForm onClose={() => setOpen(false)} />
      </Modal>
    </section>
  );
}
