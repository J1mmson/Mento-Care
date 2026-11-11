/**
 * Regulamin sprzedaży voucherów – strona /regulamin-voucherow/.
 * Generowany z src/data/business.js (SELLER, VOUCHER, BUSINESS) podczas budowania
 * i w trybie `npm run dev` (vite.config.js), więc dane są zawsze zgodne z formularzem.
 */
import { BUSINESS, SELLER, VOUCHER, monthsLabel } from "../data/business.js";
import { SITE_URL } from "./schema.js";

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const zl = (n) => `${n}&nbsp;zł`;
const list = (items) => `<ol>${items.map((i) => `<li>${i}</li>`).join("")}</ol>`;
const section = (n, title, body) => `<section id="p${n}"><h2>§ ${n}. ${title}</h2>${body}</section>`;

export function buildRegulamin() {
  const V = VOUCHER;
  const mail = `<a href="mailto:${esc(SELLER.email)}">${esc(SELLER.email)}</a>`;
  const seller = `${esc(SELLER.name)}, ${esc(SELLER.address)}`;
  const studio = `${esc(BUSINESS.street)}, ${esc(BUSINESS.postalCode)} ${esc(BUSINESS.city)}`;
  const validity = monthsLabel(V.validityMonths);
  const termsUrl = new URL(V.termsUrl, SITE_URL).href;

  const body = [
    section(1, "Postanowienia ogólne", list([
      `Regulamin określa zasady sprzedaży voucherów podarunkowych na zabiegi w gabinecie ${esc(BUSINESS.fullName)} (ul. ${studio}) za pośrednictwem formularza na stronie <a href="${SITE_URL}">${SITE_URL.replace(/^https?:\/\/|\/$/g, "")}</a> oraz zasady korzystania z voucherów.`,
      `Sprzedawcą jest <strong>${seller}</strong>, NIP ${esc(SELLER.nip)}, REGON ${esc(SELLER.regon)}, e-mail: ${mail}, tel. 536 588 261 („Sprzedawca”). Gabinet Mento Care działa w ramach działalności Sprzedawcy.`,
      `<strong>Klient</strong> – osoba składająca zamówienie. <strong>Konsument</strong> – Klient będący osobą fizyczną, który kupuje voucher w celu niezwiązanym bezpośrednio z działalnością gospodarczą lub zawodową. Postanowienia dotyczące Konsumentów stosuje się także do przedsiębiorców prowadzących jednoosobową działalność, jeżeli zakup nie ma dla nich charakteru zawodowego.`,
      `<strong>Voucher</strong> – bon uprawniający okaziciela do skorzystania z zabiegów w gabinecie Mento Care do określonej kwoty (voucher kwotowy) albo na wskazany zabieg (voucher na zabieg), oznaczony unikalnym, 4-znakowym numerem (np. 7K3Q).`,
      `Do złożenia zamówienia potrzebne jest urządzenie z dostępem do internetu, aktualna przeglądarka internetowa i aktywny adres e-mail. Zabronione jest przekazywanie za pomocą formularza treści o charakterze bezprawnym.`,
    ])),

    section(2, "Zamówienie i cena", list([
      `Klient wybiera rodzaj vouchera, sposób jego przekazania i płatności, podaje swoje dane, akceptuje Regulamin i wysyła formularz przyciskiem „Zamawiam z obowiązkiem zapłaty”.`,
      `Po wysłaniu formularza Klient widzi na ekranie numer vouchera oraz dane do płatności. Umowa zostaje zawarta z chwilą wysłania zamówienia. Potwierdzenie zawarcia umowy wraz z danymi do płatności Sprzedawca wysyła automatycznie e-mailem na adres podany w zamówieniu.`,
      `Ceny podane są w złotych polskich i zawierają podatki. Do wartości vouchera doliczana jest opłata za formę przekazania:<ul>
        <li>e-mailem (plik PDF do samodzielnego wydruku) – bez dopłat,</li>
        <li>odbiór w gabinecie (voucher papierowy) – ${zl(V.printedFee)},</li>
        <li>wysyłka na adres w Polsce (voucher papierowy i przesyłka) – ${zl(V.printedFee + V.shippingFee)}.</li>
      </ul>Łączna kwota do zapłaty jest widoczna w formularzu przed wysłaniem zamówienia.`,
      `Najniższa wartość vouchera kwotowego wynosi ${zl(V.minAmount)}. Wartość vouchera na zabieg odpowiada cenie zabiegu z cennika obowiązującego w dniu zamówienia.`,
    ])),

    section(3, "Płatność", list([
      `Płatności dokonuje się przelewem na rachunek bankowy Sprzedawcy nr <strong>${esc(V.bankAccount)}</strong>${V.blikPhone ? ` albo przelewem na telefon BLIK na numer <strong>${esc(V.blikPhone)}</strong>` : ""}, podając w tytule numer vouchera.`,
      `Zamówienie należy opłacić w ciągu ${V.paymentDays} dni od jego złożenia. Zamówienie nieopłacone w tym terminie może zostać anulowane – Sprzedawca poinformuje o tym Klienta e-mailem, a voucher z anulowanego zamówienia jest nieważny.`,
      `Sprzedawca wystawia dowód zakupu zgodnie z obowiązującymi przepisami, a na życzenie Klienta – fakturę.`,
    ])),

    section(4, "Przekazanie vouchera", list([
      `Voucher przekazywany e-mailem Sprzedawca wysyła automatycznie, niezwłocznie po złożeniu zamówienia, jako plik PDF na adres podany w zamówieniu. Voucher staje się aktywny – i może zostać wykorzystany – po zaksięgowaniu wpłaty.`,
      `Sprzedawca potwierdza zaksięgowanie wpłaty niezwłocznie, nie później niż w ciągu 2 dni roboczych od jej wpływu. Klient otrzymuje wtedy e-mail z informacją, że voucher jest aktywny.`,
      `Voucher papierowy Sprzedawca przygotowuje po zaksięgowaniu wpłaty:<ul>
        <li>odbiór w gabinecie – voucher czeka w gabinecie przy ul. ${studio} od następnego dnia roboczego, w godzinach otwarcia,</li>
        <li>wysyłka – Sprzedawca nadaje przesyłkę na adres w Polsce podany w zamówieniu w ciągu 3 dni roboczych.</li>
      </ul>`,
      `Klient jest zobowiązany podać prawidłowy adres e-mail i adres do wysyłki. Przesyłkę zwróconą z powodu błędnego adresu Sprzedawca może wysłać ponownie po uzgodnieniu z Klientem.`,
    ])),

    section(5, "Korzystanie z vouchera", list([
      `Voucher jest ważny <strong>${validity} od daty zakupu</strong> (złożenia zamówienia). Data ważności jest podana na voucherze. Z vouchera można korzystać po zaksięgowaniu wpłaty – voucher z nieopłaconego zamówienia jest nieważny.`,
      `Voucher jest na okaziciela – może z niego skorzystać osoba obdarowana. Imię wpisane na voucherze ma charakter okolicznościowy. Numer vouchera należy chronić przed osobami niepowołanymi.`,
      `Wizytę z voucherem należy umówić telefonicznie (${esc(BUSINESS.phoneDisplay)}) lub przez Booksy, informując o voucherze, i okazać voucher (wydruk, plik lub numer) w gabinecie.`,
      V.multiUse
        ? `Voucher kwotowy można wykorzystać jednorazowo albo w kilku częściach, na dowolne zabiegi z aktualnego cennika, do wyczerpania jego wartości w okresie ważności. Jeżeli cena zabiegu jest wyższa niż pozostała wartość vouchera, różnicę dopłaca się w gabinecie.`
        : `Voucher kwotowy wykorzystuje się jednorazowo, podczas jednej wizyty, na dowolne zabiegi z aktualnego cennika. Jeżeli cena zabiegów jest wyższa niż wartość vouchera, różnicę dopłaca się w gabinecie; niewykorzystana część wartości nie podlega zwrotowi.`,
      `Voucher na zabieg uprawnia do wykonania wskazanego zabiegu. Jeżeli cena zabiegu jest podana jako „od”, a wybrany wariant jest droższy, różnicę dopłaca się w gabinecie.`,
      `Wykonanie zabiegu jest możliwe, jeśli nie ma przeciwwskazań zdrowotnych stwierdzonych podczas wywiadu. W razie przeciwwskazań voucher można wykorzystać na inny zabieg z cennika.`,
      `Voucher nie podlega wymianie na gotówkę. Po upływie terminu ważności voucher nie może zostać wykorzystany. Na prośbę zgłoszoną przed upływem terminu ważności Sprzedawca może przedłużyć ważność vouchera.`,
      `W razie zgubienia lub zniszczenia vouchera Sprzedawca wyda duplikat po podaniu numeru vouchera i danych zamawiającego, o ile voucher nie został wykorzystany.`,
    ])),

    section(6, "Prawo odstąpienia od umowy", list([
      `Konsument może odstąpić od umowy bez podania przyczyny w terminie 14 dni od dnia jej zawarcia, a w przypadku vouchera papierowego – od dnia jego odbioru lub doręczenia.`,
      `Wystarczy przed upływem terminu wysłać oświadczenie o odstąpieniu e-mailem na adres ${mail} lub pisemnie na adres Sprzedawcy. Można skorzystać ze wzoru formularza zamieszczonego na końcu Regulaminu, ale nie jest to obowiązkowe.`,
      `Sprzedawca zwraca wszystkie otrzymane płatności, w tym opłatę za przekazanie vouchera, w ciągu 14 dni od otrzymania oświadczenia, przelewem na rachunek, z którego dokonano wpłaty, chyba że Konsument zgodzi się na inny sposób zwrotu. Konsument nie ponosi kosztów zwrotu.`,
      `Voucher papierowy należy zwrócić w gabinecie lub odesłać na adres Sprzedawcy w ciągu 14 dni od odstąpienia (koszt odesłania ponosi Konsument). Sprzedawca może wstrzymać zwrot płatności do chwili otrzymania vouchera lub dowodu jego odesłania. Voucher, od którego Konsument odstąpił, traci ważność.`,
      `Jeżeli przed odstąpieniem voucher został częściowo wykorzystany, zwrotowi podlega jego niewykorzystana wartość. Prawo odstąpienia nie przysługuje, jeżeli voucher został w całości wykorzystany, tj. usługa została w pełni wykonana za wyraźną zgodą Konsumenta.`,
    ])),

    section(7, "Reklamacje", list([
      `Reklamacje dotyczące zamówienia, vouchera lub działania formularza można składać e-mailem na adres ${mail} lub pisemnie na adres Sprzedawcy. Warto podać numer vouchera i opis problemu.`,
      `Sprzedawca odpowiada na reklamację w ciągu 14 dni od jej otrzymania.`,
      `Konsument może skorzystać z pozasądowych sposobów rozpatrywania sporów, np. z pomocy miejskiego lub powiatowego rzecznika konsumentów albo wojewódzkiego inspektoratu Inspekcji Handlowej. Informacje są dostępne na stronie <a href="https://prawakonsumenta.uokik.gov.pl">prawakonsumenta.uokik.gov.pl</a>.`,
    ])),

    section(8, "Dane osobowe", list([
      `Administratorem danych osobowych podanych w formularzu jest ${seller}, e-mail: ${mail}.`,
      `Dane (imię i nazwisko, e-mail, telefon, ewentualnie adres do wysyłki i imię osoby obdarowanej) są przetwarzane w celu realizacji zamówienia i umowy (art. 6 ust. 1 lit. b RODO), wypełnienia obowiązków podatkowych i rachunkowych (art. 6 ust. 1 lit. c RODO) oraz ewentualnego dochodzenia roszczeń lub obrony przed nimi (art. 6 ust. 1 lit. f RODO).`,
      `Podanie danych jest dobrowolne, ale niezbędne do realizacji zamówienia.`,
      `Odbiorcami danych mogą być podmioty wspierające Sprzedawcę: dostawca hostingu strony i obsługi formularzy (Netlify, Inc.), poczta e-mail, operator pocztowy lub kurierski, bank oraz biuro rachunkowe. W związku z korzystaniem z usług Netlify dane mogą być przekazywane do USA na podstawie mechanizmów przewidzianych w RODO (np. standardowych klauzul umownych).`,
      `Dane są przechowywane przez czas realizacji umowy i ważności vouchera, a następnie przez okres wymagany przepisami podatkowymi lub do upływu terminu przedawnienia roszczeń.`,
      `Osobie, której dane dotyczą, przysługuje prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz wniesienia sprzeciwu, a także prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.`,
    ])),

    section(9, "Postanowienia końcowe", list([
      `Regulamin jest dostępny bezpłatnie pod adresem <a href="${termsUrl}">${termsUrl.replace(/^https?:\/\//, "")}</a> – można go zapisać lub wydrukować.`,
      `Do zamówienia stosuje się Regulamin w wersji obowiązującej w dniu jego złożenia.`,
      `W sprawach nieuregulowanych stosuje się przepisy prawa polskiego, w szczególności Kodeksu cywilnego i ustawy o prawach konsumenta. Postanowienia Regulaminu nie ograniczają uprawnień Konsumentów wynikających z przepisów prawa.`,
    ])),

    `<section id="formularz" class="form"><h2>Wzór formularza odstąpienia od umowy</h2>
      <p class="muted">(formularz należy wypełnić i odesłać tylko w przypadku chęci odstąpienia od umowy)</p>
      <p>Adresat: ${seller}, e-mail: ${mail}</p>
      <p>Ja/My(*) niniejszym informuję/informujemy(*) o moim/naszym odstąpieniu od umowy o świadczenie następującej usługi(*) / sprzedaży następującej rzeczy(*): voucher podarunkowy nr ………………………</p>
      <p>Data zawarcia umowy(*) / odbioru(*): ………………………</p>
      <p>Imię i nazwisko konsumenta(-ów): ………………………</p>
      <p>Adres konsumenta(-ów): ………………………</p>
      <p>Numer rachunku do zwrotu płatności (opcjonalnie): ………………………</p>
      <p>Podpis konsumenta(-ów) (tylko jeżeli formularz jest przesyłany w wersji papierowej): ………………………</p>
      <p>Data: ………………………</p>
      <p class="muted">(*) Niepotrzebne skreślić.</p>
    </section>`,
  ].join("\n");

  return `<!doctype html>
<html lang="pl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Regulamin sprzedaży voucherów – Mento Care Bochnia</title>
<meta name="description" content="Zasady zakupu i korzystania z voucherów podarunkowych Mento Care – kosmetologia w Bochni." />
<meta name="robots" content="noindex, follow" />
<link rel="canonical" href="${termsUrl}" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@300;400;500&display=swap" />
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #0b0c0f linear-gradient(to right, #1a120b, #3c2a21) fixed; color: #ebe6e1;
         font: 300 16px/1.7 Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; }
  main { max-width: 780px; margin: 0 auto; padding: 32px 20px 64px; }
  a { color: #fcaf56; }
  .top { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap;
         padding-bottom: 20px; border-bottom: 1px solid rgba(255,248,231,.12); }
  .brand { font: 600 22px/1 "Cormorant Garamond", Georgia, serif; letter-spacing: .12em; color: #fcaf56; text-decoration: none; }
  .back { font-size: 14px; }
  .eyebrow { margin: 40px 0 0; font-size: 12px; letter-spacing: .3em; text-transform: uppercase; color: #fcaf56; }
  h1, h2 { font-family: "Cormorant Garamond", Georgia, serif; font-weight: 500; color: #fff8e7; line-height: 1.15; }
  h1 { font-size: clamp(34px, 7vw, 48px); margin: 8px 0 6px; }
  h2 { font-size: 26px; margin: 40px 0 10px; }
  ol, ul { padding-left: 1.4em; }
  li { margin: 8px 0; }
  ul li { margin: 4px 0; }
  strong { font-weight: 500; color: #fff8e7; }
  .muted { color: rgba(235,230,225,.65); font-size: 14px; }
  .form { margin-top: 48px; padding: 4px 24px 16px; border: 1px solid rgba(255,248,231,.18); border-radius: 6px; }
  .print { margin-top: 32px; background: none; border: 1px solid #fcaf56; color: #fcaf56; border-radius: 5px;
           padding: 10px 18px; font: inherit; cursor: pointer; }
  @media print {
    body { background: #fff; color: #000; font-size: 12px; }
    h1, h2, strong, .brand { color: #000; }
    a { color: #000; }
    .back, .print { display: none; }
    .form { break-before: page; border-color: #000; }
  }
</style>
</head>
<body>
<main>
  <div class="top">
    <a class="brand" href="/">MENTO CARE</a>
    <a class="back" href="/#voucher">← Wróć do zakupu vouchera</a>
  </div>
  <p class="eyebrow">Voucher podarunkowy</p>
  <h1>Regulamin sprzedaży voucherów</h1>
  <p class="muted">Obowiązuje od ${esc(V.termsDate)}</p>
  ${body}
  <button class="print" type="button" onclick="window.print()">Drukuj / zapisz jako PDF</button>
</main>
</body>
</html>
`;
}
