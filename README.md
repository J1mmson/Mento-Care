# Mento Care – strona mentocare.pl

React + Vite + Tailwind, hosting: Netlify (deploy po `git push` na `main`).

## Najczęstsze zmiany

| Co chcesz zmienić | Gdzie |
| --- | --- |
| Ceny, cennik, godziny, telefon, linki, FAQ, opisy zabiegów | `src/data/business.js` |
| Link do wystawiania opinii Google (przycisk „Oceń nas”) | `src/data/business.js` → `googleReviewUrl` |
| Zdjęcia | podmień plik w `src/assets` (ta sama nazwa) i uruchom `npm run images` |
| Teksty sekcji (o nas, o mnie, voucher) | `src/sections/*.jsx` |

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
