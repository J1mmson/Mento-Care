# Mento Care – strona mentocare.pl

React + Vite + Tailwind, hosting: Netlify (deploy po `git push` na `main`).

## Najczęstsze zmiany

| Co chcesz zmienić | Gdzie |
| --- | --- |
| Ceny, cennik, godziny, telefon, linki, FAQ, opisy zabiegów | `src/data/business.js` |
| Okno „Dowiedz się więcej” przy konsultacji | `src/data/business.js` → `CONSULTATIONS` |
| Zespół w sekcji „O nas” (osoby, opisy, zdjęcia) | `src/data/business.js` → `TEAM` |
| Voucher online: kwoty, numer konta, BLIK, ważność | `src/data/business.js` → `VOUCHER` |
| Link do wystawiania opinii Google (przycisk „Oceń nas”) | `src/data/business.js` → `googleReviewUrl` |
| Zdjęcia | podmień plik w `src/assets` (ta sama nazwa) i uruchom `npm run images` |
| Teksty sekcji (strona główna, voucher) | `src/sections/*.jsx` |

## Nowa osoba w zespole („O nas”)

1. Zdjęcie wycięte z tła (PNG z przezroczystością, ok. 1365×2048 px) zapisz jako `src/assets/kamila.png`
   (inna osoba: dopisz ją w `scripts/optimize-images.mjs` obok `kamila`).
2. `npm run images`
3. W `src/data/business.js` → `TEAM` uzupełnij imię i nazwisko, stanowisko, opis i **usuń `draft: true`**.
   Osoby z `draft: true` widać tylko w podglądzie `npm run dev` – na stronie ich nie ma.

## Voucher online (Netlify Forms) i regulamin

Regulamin sprzedaży voucherów (`/regulamin-voucherow/`) generuje się automatycznie z `src/data/business.js`
(`SELLER`, `VOUCHER`) – treść jest w `src/seo/regulamin.js`. Zmieniasz zasady? Zmień też `VOUCHER.termsDate`.

### Obsługa zamówienia krok po kroku

1. Przychodzi mail z Netlify, w temacie numer vouchera, np. „Voucher MC-7K3Q – 310 zł – Anna Kowalska”.
2. Odpowiedz na niego (trafi prosto do kupującego) – to potwierdzenie zawarcia umowy, np.:
   > Dzień dobry, potwierdzamy zamówienie vouchera MC-7K3Q (310 zł). Po zaksięgowaniu wpłaty przygotujemy voucher.
   > Regulamin: https://mentocare.pl/regulamin-voucherow/ – Mento Care
3. Gdy wpłata z tym numerem w tytule wpłynie: wyślij PDF / przygotuj voucher do odbioru / nadaj przesyłkę.
   Na voucherze wpisz ten sam numer i datę ważności.
4. Zapisz numer w liście wydanych voucherów; przy realizacji w gabinecie odnotuj wykorzystanie (i pozostałą kwotę).
   Vouchery sprzedane na miejscu numeruj po swojemu, np. MC-G001 – nie pomylą się z internetowymi.


Formularz „Kup voucher online” wysyła zamówienie do Netlify Forms, a klient od razu widzi dane do płatności.

- Jednorazowo w panelu Netlify: **Site configuration → Forms → Enable form detection**, potem opublikuj stronę ponownie.
- Powiadomienia mailem: **Forms → Form notifications → Add notification → Email notification** (formularz `voucher`).
- Numer konta, BLIK, dopłaty, ważność: `VOUCHER` w `src/data/business.js`. Puste konto = klient dostaje
  komunikat, że dane do przelewu wyślecie mailem; pusty BLIK = opcja BLIK się nie pokazuje.
- Zmieniasz pola formularza (`src/components/VoucherForm.jsx`)? Dopisz je też w ukrytym formularzu w `index.html`.
- W `npm run dev` formularz niczego nie wysyła (tylko pokazuje ekran potwierdzenia).

Dane strukturalne dla Google (JSON-LD) generują się automatycznie z `src/data/business.js`
podczas budowania – nie trzeba ich edytować ręcznie.

## Zdjęcia

Oryginały (PNG/JPG) leżą w `src/assets`. Strona używa lekkich wersji WebP z `src/assets/img`,
generowanych skryptem:

```bash
npm i -D sharp      # tylko za pierwszym razem
npm run images      # tworzy src/assets/img/* + ikony i obrazek do udostępniania w public/
```

Nowe zdjęcie w hero / „o mnie” najlepiej wycięte z tła (PNG z przezroczystością), ok. 1365×2048 px.

## Komendy

```bash
npm install
npm run dev       # podgląd na http://localhost:5173
npm run build     # build + prerender treści do dist/index.html
npm run preview   # podgląd wersji produkcyjnej
```
