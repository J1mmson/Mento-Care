import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { handleAnchorClick } from "./lib/scrollToSection";
import { HOME } from "./data/pages";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import AboutUs from "./sections/AboutMe";
import Metamorphoses from "./sections/Metamorphoses";
import Pricing from "./sections/Pricing";
import Voucher from "./sections/Voucher";
import VoucherDetails from "./sections/VoucherDetails";
import Faq from "./sections/Faq";
import Contact from "./sections/Contact";

// id sekcji → komponent (które sekcje są na której podstronie: src/data/pages.js)
const SECTIONS = {
  start: Hero,
  zabiegi: Services,
  "o-nas": AboutUs,
  metamorfozy: Metamorphoses,
  cennik: Pricing,
  voucher: Voucher,
  "voucher-szczegoly": VoucherDetails,
  faq: Faq,
  kontakt: Contact,
};

export default function App({ page = HOME }) {
  // linki „#sekcja” i menu przewijają niezawodnie także na iPhonie (src/lib/scrollToSection.js)
  useEffect(() => {
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <>
      <a
        href={`#${page.sections.find((id) => id !== "start") || "kontakt"}`}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-prime focus:px-4 focus:py-2 focus:text-bgPrimary"
      >
        Przejdź do treści
      </a>
      <Navbar page={page} />
      <main>
        {page.h1 && <h1 className="sr-only">{page.h1}</h1>}
        {page.sections.map((id) => {
          const Section = SECTIONS[id];
          return <Section key={id} />;
        })}
      </main>
    </>
  );
}
