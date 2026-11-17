import Img from "./Img";
import Zoom from "./Zoom";
import { voucherPdf, voucherPudelko } from "../assets/img";
import { VOUCHER } from "../data/content";

const zl = (n) => `${n} zł`;

/** Podgląd vouchera PDF jak karty (cały, z marginesem) – w podglądach i w formularzu. */
export function PdfCard({ sizes, className = "" }) {
  return (
    <span className={`flex h-full w-full items-center justify-center bg-[#1d1611] p-[7%] ${className}`}>
      <Img
        img={voucherPdf}
        alt="Przykładowy voucher podarunkowy Mento Care w PDF – na kwotę 300 zł"
        sizes={sizes}
        className="h-full w-auto max-w-full rounded-[3px] object-contain shadow-[0_12px_40px_rgba(0,0,0,0.65)] ring-1 ring-cream/15"
      />
    </span>
  );
}

/** Jak wygląda voucher: w pudełku (odbiór / wysyłka) i PDF (e-mail). Kliknięcie powiększa zdjęcie. */
export default function VoucherLooks({ Heading = "h3" }) {
  const items = [
    {
      key: "pudelko",
      zoom: voucherPudelko,
      alt: "Voucher podarunkowy Mento Care w czarnym pudełku z kokardą",
      thumb: (
        <Img
          img={voucherPudelko}
          alt="Voucher podarunkowy Mento Care w czarnym pudełku z kokardą"
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
      ),
      title: "Voucher w eleganckim pudełku",
      price: `odbiór w gabinecie +${zl(VOUCHER.printedFee)} · wysyłka +${zl(VOUCHER.printedFee + VOUCHER.shippingFee)}`,
      text: "Prezent gotowy do wręczenia. Odbierzesz go w gabinecie w Bochni albo wyślemy go na wskazany adres.",
    },
    {
      key: "pdf",
      zoom: voucherPdf,
      alt: "Przykładowy voucher podarunkowy Mento Care w PDF – na kwotę 300 zł",
      thumb: <PdfCard sizes="(min-width: 768px) 40vw, 85vw" />,
      title: "Voucher elektroniczny (PDF)",
      price: "e-mailem · bez dopłat",
      text: "Przychodzi e-mailem od razu po zamówieniu – o każdej porze. Wydrukujesz go albo prześlesz dalej. Idealny na ostatnią chwilę.",
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
