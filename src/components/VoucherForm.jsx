/**
 * Zamówienie vouchera online.
 * Zgłoszenie trafia do Netlify Forms (formularz „voucher” – szkielet w index.html),
 * a klient od razu widzi dane do płatności. Ustawienia: src/data/business.js → VOUCHER
 */
import { useEffect, useRef, useState } from "react";
import { FiCheck, FiChevronDown, FiCopy, FiPhone } from "react-icons/fi";
import { BUSINESS, PRICE_LIST, SELLER, VOUCHER, formatPrice, monthsLabel } from "../data/content";

export const FORM_NAME = "voucher";
export const TITLE_ID = "voucher-zamowienie-tytul"; // nagłówek okna (aria-labelledby)

// Numer vouchera, np. MC-7K3Q – 4 znaki (bez liter/cyfr łatwych do pomylenia: 0/O, 1/I/L).
// Ok. 920 tys. kombinacji – przy wpisywaniu do listy sprawdź, czy numer się nie powtarza.
const CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const makeCode = () =>
  "MC-" + Array.from(crypto.getRandomValues(new Uint8Array(4)), (b) => CODE_CHARS[b % CODE_CHARS.length]).join("");

const zl = (n) => `${Number(n).toLocaleString("pl-PL").replace(/\s/g, "\u00a0")}\u00a0zł`;

// Zabiegi, na które można kupić voucher (bez dodatków „+ …”)
const TREATMENTS = PRICE_LIST.map((c, ci) => ({
  title: c.title,
  items: c.items
    .map((item, ii) => ({ ...item, key: `${ci}-${ii}`, category: c.title }))
    .filter((i) => i.price && !i.plus),
})).filter((c) => c.items.length);
const TREATMENT_BY_KEY = Object.fromEntries(TREATMENTS.flatMap((c) => c.items.map((i) => [i.key, i])));

const PAYMENTS = [
  { id: "przelew", label: "Przelew na konto" },
  VOUCHER.blikPhone && { id: "blik", label: "BLIK na telefon" },
].filter(Boolean);

// Forma przekazania + dopłata (VOUCHER.printedFee / shippingFee w business.js)
const DELIVERY = [
  { id: "email", label: "E-mailem", hint: "PDF od razu na e-mail · bez dopłat", fee: 0 },
  {
    id: "odbior",
    label: "Odbiór w gabinecie",
    hint: `voucher papierowy · +${zl(VOUCHER.printedFee)}`,
    fee: VOUCHER.printedFee,
  },
  {
    id: "wysylka",
    label: "Wysyłka na adres",
    hint: `z przesyłką · +${zl(VOUCHER.printedFee + VOUCHER.shippingFee)}`,
    fee: VOUCHER.printedFee + VOUCHER.shippingFee,
  },
];
const DELIVERY_BY_ID = Object.fromEntries(DELIVERY.map((d) => [d.id, d]));

function Choice({ name, value, checked, onChange, children }) {
  return (
    <label className="choice">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {children}
    </label>
  );
}

function Group({ legend, children }) {
  return (
    <fieldset className="mt-6 first:mt-0">
      <legend className="field-label">{legend}</legend>
      {children}
    </fieldset>
  );
}

function CopyButton({ text, label }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() =>
        navigator.clipboard?.writeText(text).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 2000);
        })
      }
      aria-label={`Kopiuj: ${label}`}
      className="inline-flex shrink-0 items-center gap-1.5 rounded border border-cream/25 px-2.5 py-1 text-[12px] text-cream/80 transition-colors hover:border-prime hover:text-prime"
    >
      {done ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
      {done ? "Skopiowano" : "Kopiuj"}
    </button>
  );
}

/** Ekran po wysłaniu: dane do płatności i co dalej. */
function Confirmation({ order, onClose, onAgain }) {
  const ref = useRef(null);
  // formularz był długi – pokaż potwierdzenie od góry okna
  useEffect(() => {
    ref.current?.closest(".overflow-y-auto")?.scrollTo(0, 0);
  }, []);
  const title = `Voucher ${order.code}`;
  const rows = [
    ["Odbiorca", VOUCHER.accountHolder],
    order.payment === "przelew" &&
      VOUCHER.bankAccount && ["Numer konta", VOUCHER.bankAccount, VOUCHER.bankAccount.replace(/\s/g, "")],
    order.payment === "blik" && ["Telefon BLIK", VOUCHER.blikPhone, VOUCHER.blikPhone.replace(/\s/g, "")],
    ["Kwota", zl(order.total)],
    ["Tytuł", title, title],
  ].filter(Boolean);
  const paymentDetailsLater = order.payment === "przelew" && !VOUCHER.bankAccount;

  return (
    <div ref={ref} role="status">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-prime text-[26px] text-prime">
        <FiCheck aria-hidden="true" />
      </span>
      <h2 id={TITLE_ID} className="mt-4 pr-8 text-[32px] leading-tight text-cream sm:text-[40px]">
        Dziękujemy, zamówienie przyjęte!
      </h2>
      <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-md border border-prime/40 bg-prime/10 px-4 py-3 text-[15px] text-cream">
        <span className="text-cream/70">Numer vouchera:</span>
        <span className="font-serif text-[26px] font-medium leading-none tracking-wider text-prime">{order.code}</span>
        <CopyButton text={order.code} label="numer vouchera" />
      </p>
      <p className="mt-4 text-[15px] leading-relaxed text-cream/85">
        {order.label} – do zapłaty <strong className="font-normal text-prime">{zl(order.total)}</strong>
        {order.fee > 0 && (
          <span className="text-cream/60">
            {" "}
            (w tym {DELIVERY_BY_ID[order.delivery].label.toLowerCase()} {zl(order.fee)})
          </span>
        )}
        .
      </p>

      {paymentDetailsLater ? (
        <p className="mt-5 rounded-md border border-cream/15 bg-bgPrimary/50 p-4 text-[15px] leading-relaxed text-cream/90">
          Dane do przelewu wyślemy na adres <span className="text-cream">{order.email}</span>.
        </p>
      ) : (
        <div className="mt-5 rounded-md border border-cream/15 bg-bgPrimary/50 p-4 sm:p-5">
          <p className="text-[14px] text-cream/75">
            {order.payment === "blik"
              ? "Zrób przelew na telefon BLIK w aplikacji swojego banku:"
              : "Dane do przelewu:"}
          </p>
          <dl className="mt-3 space-y-2.5 text-[15px]">
            {rows.map(([label, value, copy]) => (
              <div key={label} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <dt className="text-cream/60">{label}</dt>
                <dd className="flex items-center gap-3 text-right text-cream">
                  <span className="break-words">{value}</span>
                  {copy && <CopyButton text={copy} label={label} />}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <p className="mt-5 text-[15px] leading-relaxed text-cream/85">
        {order.delivery === "email" &&
          `Voucher w PDF za chwilę przyjdzie na ${order.email} – możesz go od razu przekazać. Będzie aktywny po zaksięgowaniu wpłaty; wtedy wyślemy też jego wersję bez dopisku o płatności.`}
        {order.delivery === "odbior" &&
          `Po zaksięgowaniu wpłaty voucher będzie czekał na Ciebie w gabinecie – ul. ${BUSINESS.street}, ${BUSINESS.city}.`}
        {order.delivery === "wysylka" && `Po zaksięgowaniu wpłaty wyślemy voucher na adres: ${order.address}.`}
      </p>
      <p className="mt-2 text-[14px] leading-relaxed text-cream/70">
        Potwierdzenie zamówienia przyjdzie e-mailem w ciągu kilku minut – jeśli go nie widzisz, zajrzyj do folderu
        Spam lub Oferty. Zachowaj numer vouchera – po nim odnajdziemy Twoje zamówienie. Pytania?{" "}
        <a href={`tel:${BUSINESS.phone}`} className="text-prime underline underline-offset-4">
          Zadzwoń: {BUSINESS.phoneDisplay}
        </a>
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <button type="button" onClick={onClose} className="btn-ghost">
          Zamknij
        </button>
        <button type="button" onClick={onAgain} className="btn px-4 text-cream/70 hover:text-prime">
          Zamów kolejny voucher
        </button>
      </div>
    </div>
  );
}

export default function VoucherForm({ onClose }) {
  const [kind, setKind] = useState("kwota"); // „kwota” | „zabieg”
  const [amount, setAmount] = useState(String(VOUCHER.amounts[1] ?? VOUCHER.amounts[0]));
  const [custom, setCustom] = useState("");
  const [treatmentKey, setTreatmentKey] = useState("");
  const [delivery, setDelivery] = useState("email");
  const [payment, setPayment] = useState(PAYMENTS[0].id);
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [order, setOrder] = useState(null);

  const treatment = TREATMENT_BY_KEY[treatmentKey];
  const value =
    kind === "zabieg" ? treatment?.price ?? 0 : amount === "inna" ? Number(custom) || 0 : Number(amount);
  const deliveryOption = DELIVERY_BY_ID[delivery];
  const total = value > 0 ? value + deliveryOption.fee : 0;

  if (order) return <Confirmation order={order} onClose={onClose} onAgain={() => setOrder(null)} />;

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("bot-field")) return; // pułapka na boty

    const name = String(fd.get("imie_nazwisko")).trim();
    const code = makeCode();
    const email = String(fd.get("email")).trim();
    const label =
      kind === "zabieg"
        ? `Voucher na zabieg „${treatment.name}”`
        : `Voucher na kwotę ${zl(value)}`;
    const field = (n) => String(fd.get(n) || "").trim();
    const address =
      delivery === "wysylka"
        ? `${field("adres_odbiorca") || name}, ${field("adres_ulica")}, ${field("adres_kod")} ${field("adres_miasto")}`
        : "";

    const data = {
      "form-name": FORM_NAME,
      // temat maila z Netlify (nadpisuje temat ustawiony w panelu)
      subject: `Voucher ${code} – ${total} zł – ${name}`,
      kod: code,
      voucher: label,
      zabieg: treatment ? `${treatment.category} – ${treatment.name} (${formatPrice(treatment)})` : "",
      kwota: zl(value),
      dla_kogo: field("dla_kogo"),
      dostawa: deliveryOption.fee ? `${deliveryOption.label} (+${zl(deliveryOption.fee)})` : deliveryOption.label,
      adres: address,
      platnosc: PAYMENTS.find((p) => p.id === payment).label,
      do_zaplaty: zl(total),
      imie_nazwisko: name,
      email,
      telefon: fd.get("telefon") || "",
      zgoda: "tak",
    };

    setStatus("sending");
    try {
      if (import.meta.env.DEV) {
        // podgląd lokalny (npm run dev) – nic nie jest wysyłane
        console.info("[voucher] podgląd – zgłoszenie NIE zostało wysłane:", data);
        await new Promise((r) => setTimeout(r, 400));
      } else {
        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data).toString(),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      }
      setOrder({ code, label, total, fee: deliveryOption.fee, name, email, delivery, payment, address });
      setStatus("idle");
    } catch (err) {
      console.error("[voucher]", err);
      setStatus("error");
    }
  }

  return (
    <form name={FORM_NAME} onSubmit={onSubmit}>
      <p className="eyebrow">Voucher podarunkowy</p>
      <h2 id={TITLE_ID} className="mt-2 pr-8 text-[34px] leading-[1.05] text-cream sm:text-[44px]">
        Kup voucher online
      </h2>
      <p className="mb-6 mt-3 text-[15px] leading-relaxed text-cream/80">
        Wybierz kwotę albo zabieg i podaj swoje dane. Zaraz po wysłaniu zobaczysz dane do płatności.
      </p>
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="hidden" aria-hidden="true">
        <label>
          Nie wypełniaj: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <Group legend="Rodzaj vouchera">
        <div className="grid grid-cols-2 gap-2">
          <Choice name="rodzaj" value="kwota" checked={kind === "kwota"} onChange={setKind}>
            Na kwotę
          </Choice>
          <Choice name="rodzaj" value="zabieg" checked={kind === "zabieg"} onChange={setKind}>
            Na zabieg
          </Choice>
        </div>

        {kind === "kwota" ? (
          <div className="mt-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {VOUCHER.amounts.map((a) => (
                <Choice key={a} name="kwota_wybor" value={String(a)} checked={amount === String(a)} onChange={setAmount}>
                  {zl(a)}
                </Choice>
              ))}
              <Choice name="kwota_wybor" value="inna" checked={amount === "inna"} onChange={setAmount}>
                Inna kwota
              </Choice>
            </div>
            {amount === "inna" && (
              <label className="mt-3 block">
                <span className="sr-only">Kwota vouchera w złotych</span>
                <span className="relative block">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={VOUCHER.minAmount}
                    step="10"
                    required
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    placeholder={`Kwota (min. ${VOUCHER.minAmount} zł)`}
                    className="field pr-12"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-cream/50">zł</span>
                </span>
              </label>
            )}
          </div>
        ) : (
          <label className="mt-3 block">
            <span className="sr-only">Wybierz zabieg</span>
            <span className="relative block">
              <select
                required
                value={treatmentKey}
                onChange={(e) => setTreatmentKey(e.target.value)}
                className="field appearance-none pr-11"
              >
                <option value="" disabled>
                  Wybierz zabieg…
                </option>
                {TREATMENTS.map((c) => (
                  <optgroup key={c.title} label={c.title}>
                    {c.items.map((i) => (
                      <option key={i.key} value={i.key}>
                        {i.name} – {formatPrice(i)}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <FiChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[18px] text-prime"
              />
            </span>
            {treatment?.from && (
              <span className="mt-2 block text-[13px] text-cream/60">
                Cena „od” – voucher obejmuje kwotę {zl(treatment.price)}, ewentualną różnicę dopłacasz w gabinecie.
              </span>
            )}
          </label>
        )}
      </Group>

      <Group legend="Dla kogo (opcjonalnie)">
        <input
          name="dla_kogo"
          autoComplete="off"
          maxLength={60}
          placeholder="Imię osoby obdarowanej (na voucher)"
          className="field"
        />
      </Group>

      <Group legend="Jak przekazać voucher">
        <div className="grid gap-2 sm:grid-cols-3">
          {DELIVERY.map((d) => (
            <Choice key={d.id} name="dostawa" value={d.id} checked={delivery === d.id} onChange={setDelivery}>
              <span className="flex flex-col items-center gap-0.5">
                <span>{d.label}</span>
                <span className="text-[12px] opacity-70">{d.hint}</span>
              </span>
            </Choice>
          ))}
        </div>

        {delivery === "wysylka" && (
          <div className="mt-3 grid gap-3 sm:grid-cols-[2fr_3fr]">
            <input
              name="adres_odbiorca"
              autoComplete="shipping name"
              maxLength={80}
              placeholder="Odbiorca przesyłki (jeśli inny niż Ty)"
              className="field sm:col-span-2"
            />
            <input
              name="adres_ulica"
              required
              autoComplete="shipping street-address"
              maxLength={100}
              placeholder="Ulica, numer domu / mieszkania"
              className="field sm:col-span-2"
            />
            <input
              name="adres_kod"
              required
              autoComplete="shipping postal-code"
              inputMode="numeric"
              pattern="[0-9]{2}-[0-9]{3}"
              title="Kod pocztowy, np. 32-700"
              placeholder="Kod pocztowy"
              className="field"
            />
            <input
              name="adres_miasto"
              required
              autoComplete="shipping address-level2"
              maxLength={60}
              placeholder="Miejscowość"
              className="field"
            />
          </div>
        )}
      </Group>

      <Group legend="Płatność">
        <div className={`grid gap-2 ${PAYMENTS.length > 1 ? "sm:grid-cols-2" : ""}`}>
          {PAYMENTS.map((p) => (
            <Choice key={p.id} name="platnosc" value={p.id} checked={payment === p.id} onChange={setPayment}>
              {p.label}
            </Choice>
          ))}
        </div>
      </Group>

      <Group legend="Twoje dane">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="imie_nazwisko"
            required
            autoComplete="name"
            placeholder="Imię i nazwisko"
            className="field sm:col-span-2"
          />
          <input name="email" type="email" required autoComplete="email" placeholder="E-mail" className="field" />
          <input
            name="telefon"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            minLength={9}
            title="Numer telefonu, np. 505 204 943"
            placeholder="Telefon"
            className="field"
          />
        </div>
      </Group>

      <label className="mt-5 flex cursor-pointer gap-3 text-[13px] leading-relaxed text-cream/75">
        <input type="checkbox" name="zgoda" required className="mt-1 h-4 w-4 shrink-0 accent-[#FCAF56]" />
        <span>
          Akceptuję{" "}
          <a href={VOUCHER.termsUrl} target="_blank" rel="noopener" className="text-prime underline underline-offset-2">
            regulamin sprzedaży voucherów
          </a>
          . Administratorem danych z formularza jest {SELLER.name}, {SELLER.address} – wykorzystujemy je
          wyłącznie do realizacji zamówienia (szczegóły w § 8 regulaminu).
        </span>
      </label>

      <p className="mt-3 text-[13px] text-cream/60">
        Voucher jest ważny {monthsLabel(VOUCHER.validityMonths)} od daty zakupu
        {VOUCHER.multiUse ? " – voucher na kwotę możesz wykorzystać na kilka wizyt." : "."}
      </p>

      <div className="mt-6 flex flex-col gap-4 border-t border-cream/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[15px] text-cream/75">
            Do zapłaty:{" "}
            <span className="font-serif text-[30px] font-medium leading-none text-prime">
              {total > 0 ? zl(total) : "—"}
            </span>
          </p>
          {total > 0 && deliveryOption.fee > 0 && (
            <p className="mt-1 text-[13px] text-cream/55">
              voucher {zl(value)} + {deliveryOption.label.toLowerCase()} {zl(deliveryOption.fee)}
            </p>
          )}
        </div>
        <button type="submit" disabled={status === "sending"} className="btn-solid disabled:opacity-60">
          {status === "sending" ? "Wysyłanie…" : "Zamawiam z obowiązkiem zapłaty"}
        </button>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-md border border-red-400/40 bg-red-500/10 p-3 text-[14px] text-cream">
          Nie udało się wysłać zamówienia. Spróbuj ponownie albo zadzwoń:{" "}
          <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-1 text-prime underline">
            <FiPhone aria-hidden="true" /> {BUSINESS.phoneDisplay}
          </a>
        </p>
      )}

      <p className="mt-4 text-[13px] leading-relaxed text-cream/55">
        Po wysłaniu formularza zobaczysz dane do płatności.{" "}
        {delivery === "email"
          ? "Voucher w PDF wyślemy od razu e-mailem – stanie się aktywny po zaksięgowaniu wpłaty."
          : "Voucher papierowy przygotujemy po zaksięgowaniu wpłaty."}
      </p>
    </form>
  );
}
