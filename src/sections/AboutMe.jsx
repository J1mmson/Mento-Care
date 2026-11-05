// Sekcja „O nas” – zespół Mento Care. Osoby, opisy i zdjęcia: src/data/business.js → TEAM
import Img from "../components/Img";
import Gradient from "../assets/gradient.svg";
import { logo } from "../assets/img";
import { BUSINESS, TEAM_MEMBERS } from "../data/content";

const BookButton = ({ className = "" }) => (
  <a
    href={BUSINESS.booksyUrl}
    target="_blank"
    rel="noopener noreferrer"
    className={`btn-outline ${className}`}
  >
    Umów konsultację
  </a>
);

/**
 * Zdjęcie osoby (wycięte z tła). Na telefonie leży swobodnie na tle (jak dawniej „O mnie”),
 * na komputerze – w pionowej ramce z ciepłą poświatą. Bez zdjęcia – znak Mento Care.
 */
function Portrait({ person }) {
  return (
    <div className="relative h-full w-full overflow-hidden lg:rounded-md lg:border lg:border-cream/10 lg:bg-[radial-gradient(ellipse_at_50%_35%,#4a3426_0%,#21170f_55%,#0f0c0a_100%)]">
      {person.image ? (
        <Img
          img={person.image}
          alt={`${person.name} – ${person.roles[0]}, Mento Care Bochnia`}
          sizes="(min-width: 1024px) 20vw, 100vw"
          className="absolute inset-0 h-full w-full object-cover object-[50%_18%] lg:object-[50%_85%]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-cream/50">
          <Img img={logo} alt="" sizes="80px" className="h-16 w-auto opacity-60" />
          <span className="text-[12px] uppercase tracking-[0.2em]">Zdjęcie wkrótce</span>
        </div>
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/4 bg-gradient-to-t from-[#0f0c0a]/80 to-transparent lg:block"
      />
    </div>
  );
}

const pad = (n) => String(n).padStart(2, "0");

/**
 * Telefon: każda osoba to osobny pełnoekranowy slajd (zdjęcie u góry, opis pod spodem).
 * Komputer: karta – zdjęcie w pionie po lewej, opis po prawej.
 */
function PersonCard({ person, index, total }) {
  return (
    <article className="relative flex min-h-svh snap-start flex-col overflow-hidden bg-bgPrimary lg:min-h-0 lg:snap-align-none lg:flex-row lg:items-center lg:gap-7 lg:overflow-visible lg:bg-transparent xl:gap-9">
      {/* zdjęcie: na telefonie u góry ekranu (w normalnym układzie – tekst nigdy nie zasłania twarzy) */}
      <div className="relative h-[min(50svh,440px)] w-full shrink-0 lg:aspect-[3/4] lg:h-auto lg:max-h-[62vh] lg:w-[42%] 2xl:w-[46%]">
        <Portrait person={person} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,12,15,0.6)_0,rgba(11,12,15,0)_22%,rgba(11,12,15,0)_58%,#0B0C0F_100%)] lg:hidden"
        />
      </div>

      <div className="relative z-10 -mt-[min(8svh,64px)] px-6 pb-[max(2rem,env(safe-area-inset-bottom))] text-center lg:mt-0 lg:min-w-0 lg:flex-1 lg:px-0 lg:pb-0 lg:text-left">
        <p className="eyebrow lg:hidden">
          Nasz zespół · {pad(index + 1)}/{pad(total)}
        </p>
        <h3 className="mt-1 text-[40px] leading-none text-cream lg:mt-0 lg:text-[34px] xl:text-[38px] 2xl:text-[44px]">
          {person.name}
        </h3>
        <p className="mx-auto mt-3 max-w-[330px] text-[11px] uppercase leading-relaxed tracking-[0.12em] text-prime/90 lg:mx-0 lg:mt-2.5 lg:max-w-none xl:text-[12px]">
          {person.roles.join(" · ")}
        </p>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-cream/90 lg:mx-0 lg:max-w-none xl:text-[15px] 2xl:text-[16px]">
          {person.bio}
        </p>
        <BookButton className="mt-5 lg:hidden" />
      </div>
    </article>
  );
}

/** Kilka osób – na komputerze obok siebie, na telefonie jedna pod drugą (każda na osobnym ekranie). */
function Team({ team }) {
  return (
    <section
      id="o-nas"
      aria-labelledby="o-nas-tytul"
      className="relative snap-start lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:overflow-hidden lg:px-10 lg:pb-12 lg:pt-28 xl:px-[98px]"
    >
      <img
        src={Gradient}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute right-[10%] top-[-700px] hidden w-[90%] lg:block"
      />

      <header className="lg:relative lg:mx-auto lg:flex lg:w-full lg:max-w-[1500px] lg:items-end lg:justify-between lg:gap-6">
        {/* na telefonie nagłówek tylko dla czytników ekranu – każdy slajd ma własny podpis */}
        <div className="sr-only lg:not-sr-only">
          <p className="eyebrow">O nas</p>
          <h2 id="o-nas-tytul" className="section-title mt-2">
            Poznaj nasz zespół
          </h2>
        </div>
        <BookButton className="hidden lg:inline-flex" />
      </header>

      <div className="lg:relative lg:mx-auto lg:mt-10 lg:grid lg:w-full lg:max-w-[1500px] lg:grid-cols-2 lg:gap-10 xl:gap-16">
        {team.map((person, i) => (
          <PersonCard key={person.id} person={person} index={i} total={team.length} />
        ))}
      </div>
    </section>
  );
}

/** Jedna osoba: duże zdjęcie + opis (dotychczasowy wygląd sekcji). */
function Solo({ person }) {
  return (
    <section
      id="o-nas"
      aria-labelledby="o-nas-tytul"
      className="relative flex min-h-svh snap-start flex-col overflow-hidden lg:h-svh"
    >
      <img
        src={Gradient}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute right-[150px] top-[-700px] hidden w-[90%] lg:block"
      />

      {person.image && (
        <Img
          img={person.image}
          alt={`${person.name} – ${person.roles[0]}, Mento Care Bochnia`}
          sizes="(min-width: 1024px) 53vh, 100vw"
          className="pointer-events-none absolute inset-x-0 top-0 h-[52svh] w-full object-cover object-[50%_18%] lg:inset-auto lg:bottom-0 lg:left-[4%] lg:top-auto lg:h-[80vh] lg:w-auto lg:object-contain lg:object-bottom"
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,12,15,0.6)_0,rgba(11,12,15,0)_11svh,rgba(11,12,15,0)_32svh,#0B0C0F_52svh)] lg:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[32%] bg-[linear-gradient(180deg,rgba(11,12,15,0)_0%,rgba(11,12,15,0.5)_30%,#0B0C0F_90%)] lg:block"
      />

      <div className="relative z-10 mt-auto px-6 pb-[max(2rem,env(safe-area-inset-bottom))] text-center lg:my-auto lg:ml-auto lg:max-w-[560px] lg:px-10 lg:pb-0 lg:text-left xl:mr-[58px] xl:max-w-[640px]">
        <p className="eyebrow">O nas</p>
        <h2 id="o-nas-tytul" className="mt-1 text-[42px] leading-none text-cream lg:mt-2 lg:text-[72px]">
          {person.name}
        </h2>
        <p className="mx-auto mt-3 max-w-[330px] text-[11px] uppercase leading-relaxed tracking-[0.12em] text-prime/90 lg:mx-0 lg:max-w-none lg:text-[14px] lg:tracking-[0.14em]">
          {person.roles.join(" · ")}
        </p>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-cream/90 lg:mx-0 lg:mt-4 lg:max-w-none lg:text-[18px]">
          {person.bio}
        </p>
        <BookButton className="mt-5 lg:mt-8" />
      </div>
    </section>
  );
}

export default function AboutUs() {
  return TEAM_MEMBERS.length > 1 ? <Team team={TEAM_MEMBERS} /> : <Solo person={TEAM_MEMBERS[0]} />;
}
