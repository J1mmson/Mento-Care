import Img from "./Img";
import Zoom from "./Zoom";
import { voucherPdf, voucherPudelko } from "../assets/img";
import { VOUCHER } from "../data/content";

const zl = (n) => `${n} zł`;

/** Podgląd vouchera (kartka / PDF) jak karty – cały, z marginesem – w podglądach i w formularzu. */
export function PdfCard({ sizes, className = "" }) {
  return (
    <span className={`flex h-full w-full items-center justify-center bg-[#1d1611] p-[7%] ${className}`}>
      <Img
        img={voucherPdf}
        alt="Przykładowy voucher podarunkowy Mento Care – na kwotę 300 zł"
        sizes={sizes}
        className="h-full w-auto max-w-full rounded-[3px] object-contain shadow-[0_12px_40px_rgba(0,0,0,0.65)] ring-1 ring-cream/15"
      />
    </span>
  );
}

/**
 * Jak wygląda voucher: premium w eleganckim pudełku (odbiór / wysyłka) oraz klasyczny –
 * kartka w czarnej kopercie (odbiór / wysyłka) albo ta sama kartka jako PDF e-mailem. Kliknięcie powiększa zdjęcie.
 */
export default function VoucherLooks({ Heading = "h3" }) {
  const paper = VOUCHER.printedFee;
  const premium = VOUCHER.printedFee + VOUCHER.premiumFee;
  const items = [
    {
      key: "premium",
      zoom: voucherPudelko,
      alt: "Voucher premium Mento Care w eleganckim czarnym pudełku z kokardą",
      thumb: (
        <Img
          img={voucherPudelko}
          alt="Voucher premium Mento Care w eleganckim czarnym pudełku z kokardą"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
      ),
      title: "Voucher premium w eleganckim pudełku",
      price: `odbiór w gabinecie +${zl(premium)} · wysyłka +${zl(premium + VOUCHER.shippingFee)}`,
      text: "Prezent gotowy do wręczenia – voucher w ozdobnym pudełku. Odbierzesz go w gabinecie w Bochni albo wyślemy go na wskazany adres.",
    },
    {
      key: "klasyczny",
      zoom: voucherPdf,
      alt: "Przykładowy voucher podarunkowy Mento Care – na kwotę 300 zł",
      thumb: <PdfCard sizes="(min-width: 768px) 40vw, 85vw" />,
      title: "Voucher w czarnej kopercie lub PDF",
      price: `PDF e-mailem bez dopłat · w kopercie: odbiór +${zl(paper)} · wysyłka +${zl(paper + VOUCHER.shippingFee)}`,
      text: "Elegancka kartka w czarnej kopercie – do odbioru w gabinecie albo z wysyłką. Ten sam voucher możesz dostać od razu e-mailem jako PDF, o każdej porze – idealny na ostatnią chwilę.",
    },
  ];

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
      {items.map((item) => (
        <figure key={item.key} className="flex flex-col">
          <Zoom
            img={item.zoom}
            alt={item.alt}
            caption={item.title}
            className="aspect-[16/10] w-full overflow-hidden rounded-md border border-cream/10 bg-[#080808]"
          >
            {item.thumb}
          </Zoom>
          <figcaption className="mt-4">
            <Heading className="font-serif text-[24px] leading-tight text-cream lg:text-[28px]">{item.title}</Heading>
            <p className="mt-1 text-[12px] uppercase tracking-[0.12em] text-prime lg:text-[13px]">{item.price}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-cream/80">{item.text}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
