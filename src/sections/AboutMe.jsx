import Img from "../components/Img";
import Gradient from "../assets/gradient.svg";
import { about } from "../assets/img";
import { BUSINESS } from "../data/content";

export default function AboutMe() {
  return (
    <section
      id="o-mnie"
      aria-labelledby="o-mnie-tytul"
      className="relative flex min-h-svh snap-start flex-col overflow-hidden lg:h-svh"
    >
      <img
        src={Gradient}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute right-[150px] top-[-700px] hidden w-[90%] lg:block"
      />

      <Img
        img={about}
        alt="Faustyna Hojnor – kosmetolog w gabinecie Mento Care w Bochni"
        sizes="(min-width: 1024px) 53vh, 100vw"
        className="pointer-events-none absolute inset-x-0 top-0 h-[52svh] w-full object-cover object-[50%_18%] lg:inset-auto lg:bottom-0 lg:left-[4%] lg:top-auto lg:h-[80vh] lg:w-auto lg:object-contain lg:object-bottom"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,12,15,0.6)_0,rgba(11,12,15,0)_11svh,rgba(11,12,15,0)_32svh,#0B0C0F_52svh)] lg:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[32%] bg-[linear-gradient(180deg,rgba(11,12,15,0)_0%,rgba(11,12,15,0.5)_30%,#0B0C0F_90%)] lg:block"
      />

      <div className="relative z-10 mt-auto px-6 pb-[max(2rem,env(safe-area-inset-bottom))] text-center lg:my-auto lg:ml-auto lg:max-w-[560px] lg:px-10 lg:pb-0 lg:text-left xl:mr-[58px] xl:max-w-[640px]">
        <p className="eyebrow">O mnie</p>
        <h2 id="o-mnie-tytul" className="mt-1 text-[42px] leading-none text-cream lg:mt-2 lg:text-[72px]">
          Faustyna Hojnor
        </h2>
        <p className="mx-auto mt-3 max-w-[330px] text-[11px] uppercase leading-relaxed tracking-[0.12em] text-prime/90 lg:mx-0 lg:max-w-none lg:text-[14px] lg:tracking-[0.14em]">
          Dyplomowana kosmetolog estetyczna · Właścicielka Mento Care ·
          Studentka pielęgniarstwa
        </p>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-cream/90 lg:mx-0 lg:mt-4 lg:max-w-none lg:text-[18px]">
          Z pasją łączę nowoczesną kosmetologię z holistycznym podejściem do
          skóry. Specjalizuję się w zabiegach iniekcyjnych, podkreślając
          naturalne piękno. Nieustannie rozwijam się zawodowo i medycznie,
          dbając o bezpieczeństwo i skuteczność terapii. Pracuję na
          certyfikowanych produktach, oferując komfort, precyzję i indywidualne
          podejście.
        </p>
        <a
          href={BUSINESS.booksyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline mt-5 lg:mt-8"
        >
          Umów konsultację
        </a>
      </div>
    </section>
  );
}
