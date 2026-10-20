import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { handleAnchorClick } from "./lib/scrollToSection";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import AboutMe from "./sections/AboutMe";
import Metamorphoses from "./sections/Metamorphoses";
import Pricing from "./sections/Pricing";
import Voucher from "./sections/Voucher";
import Faq from "./sections/Faq";
import Contact from "./sections/Contact";

export default function App() {
  // wszystkie linki „#sekcja” przewijają niezawodnie także na iPhonie
  useEffect(() => {
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <>
      <a
        href="#zabiegi"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-prime focus:px-4 focus:py-2 focus:text-bgPrimary"
      >
        Przejdź do treści
      </a>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <AboutMe />
        <Metamorphoses />
        <Pricing />
        <Voucher />
        <Faq />
        <Contact />
      </main>
    </>
  );
}
