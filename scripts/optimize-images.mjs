/**
 * Optymalizacja zdjęć strony Mento Care.
 *
 * Bierze oryginały z src/assets (PNG/JPG), tworzy lekkie wersje WebP
 * w kilku szerokościach (src/assets/img) i generuje plik src/assets/img/index.js,
 * z którego korzysta strona (srcset → przeglądarka sama wybiera rozmiar).
 *
 * Podmieniasz zdjęcie?  1) nadpisz oryginał w src/assets (ta sama nazwa pliku)
 *                       2) npm run images   (za pierwszym razem: npm i -D sharp)
 *                       3) commit + push
 */
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.error(
    "\n[images] Brak pakietu 'sharp'. Zainstaluj go jednorazowo:  npm i -D sharp\n"
  );
  process.exit(1);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "src/assets");
const OUT = path.join(root, "src/assets/img");
const PUBLIC = path.join(root, "public");

// name → [plik źródłowy, szerokości, jakość webp, opcje]
const PHOTO = [1080, 720, 480];
const BG = [1920, 1280, 768];
const IMAGES = {
  // zdjęcia z wyciętym tłem (przezroczystość)
  hero: ["glowna.png", [1365, 1080, 720, 480], 80],
  about: ["omnie.png", [1365, 1080, 720, 480], 80],
  logo: ["og-image.png", [240, 160, 100], 90, { trim: true }],

  // tła usług
  "uslugi-konsultacja": ["servicesPhotos/konsultacja.png", BG, 70],
  "uslugi-tradzik": ["servicesPhotos/terapia-tradzikowa.png", BG, 70],
  "uslugi-stymulatory": ["stymulator.jpg", BG, 70],
  "uslugi-mezo-iglowa": ["iglowa.jpg", BG, 70],
  "uslugi-mezo-mikroiglowa": ["mikro.jpg", BG, 70],
  "uslugi-btx": ["servicesPhotos/btx.png", BG, 70],
  "uslugi-peeling": ["peeling.jpg", BG, 70],
  "uslugi-led": ["servicesPhotos/lampa-led.png", BG, 70],
  "uslugi-dla-niego": ["servicesPhotos/dla-niego.png", BG, 70],
  "uslugi-kobido": ["kobido.jpg", BG, 70],
  "uslugi-head-spa": ["headspa.jpg", BG, 70],
  "uslugi-rytualy": ["servicesPhotos/rytual.png", BG, 70],

  // metamorfozy
  ...Object.fromEntries(
    [1, 2, 3, 4, 5, 6].flatMap((n) => [
      [`przed${n}`, [`metamorphoses/przed${n}.png`, PHOTO, 78]],
      [`po${n}`, [`metamorphoses/po${n}.png`, PHOTO, 78]],
    ])
  ),

  cennik: ["cennik.png", [960, 720, 480], 75],
  voucher: ["voucher.png", BG, 74],
};

const camel = (s) => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const imports = [];
const exportsOut = [];
let total = 0;

for (const [name, [file, widths, qWebp, opts = {}]] of Object.entries(IMAGES)) {
  const source = path.join(SRC, file);
  // trim: obcina przezroczyste marginesy (np. logo)
  const input = opts.trim ? await sharp(source).trim().toBuffer() : source;
  const meta = await sharp(input).metadata();
  const usable = [...new Set(widths.map((w) => Math.min(w, meta.width)))].sort(
    (a, b) => a - b
  );
  const id = camel(name);
  const set = [];

  for (const w of usable) {
    const outName = `${name}-${w}.webp`;
    const info = await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: qWebp, effort: 5, alphaQuality: 90, smartSubsample: true })
      .toFile(path.join(OUT, outName));
    total += info.size;
    const varName = `${id}_${w}`;
    imports.push(`import ${varName} from "./${outName}";`);
    set.push(`\${${varName}} ${w}w`);
  }

  const largest = usable[usable.length - 1];
  const fallback = usable.find((w) => w >= 1000) ?? largest;
  const h = Math.round((meta.height * largest) / meta.width);
  exportsOut.push(
    `export const ${id} = {\n  width: ${largest},\n  height: ${h},\n  src: ${id}_${fallback},\n  srcSet: \`${set.join(", ")}\`,\n};`
  );
  console.log(`[images] ${name}: ${usable.join(", ")}px`);
}

await writeFile(
  path.join(OUT, "index.js"),
  `// PLIK GENEROWANY AUTOMATYCZNIE przez scripts/optimize-images.mjs – nie edytuj ręcznie.\n${imports.join(
    "\n"
  )}\n\n${exportsOut.join("\n\n")}\n`
);

// ---- grafiki statyczne: ikony + obrazek do udostępniania (og:image) ----
const logoSrc = path.join(SRC, "og-image.png");
const BG_COLOR = { r: 11, g: 12, b: 15, alpha: 1 };

// sam znak „M” z logo (górna część pliku) – do favicon
const mark = await sharp(logoSrc)
  .extract({ left: 196, top: 92, width: 110, height: 188 })
  .toBuffer();
async function icon(size, file, pad = 0.16) {
  const inner = Math.round(size * (1 - pad * 2));
  const m = await sharp(mark).resize({ height: inner, width: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: BG_COLOR } })
    .composite([{ input: m, gravity: "center" }])
    .png()
    .toFile(path.join(PUBLIC, file));
}
await icon(32, "favicon-32.png", 0.08);
await icon(180, "apple-touch-icon.png");
await icon(192, "icon-192.png");
await icon(512, "icon-512.png");

// og:image 1200×630 – zdjęcie + logo na ciemnym tle
const heroForOg = await sharp(path.join(SRC, "glowna.png"))
  .resize({ height: 630 })
  .toBuffer();
const heroMeta = await sharp(heroForOg).metadata();
const logoForOg = await sharp(logoSrc).resize({ width: 380 }).toBuffer();
const gradient = Buffer.from(
  `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
     <defs><radialGradient id="g" cx="78%" cy="35%" r="70%">
       <stop offset="0" stop-color="#3c2a21"/><stop offset="1" stop-color="#0B0C0F"/>
     </radialGradient></defs>
     <rect width="1200" height="630" fill="url(#g)"/>
     <text x="80" y="520" font-family="DejaVu Serif, serif" font-size="40" fill="#FCAF56">Kosmetologia · Bochnia</text>
     <text x="80" y="566" font-family="DejaVu Sans, sans-serif" font-size="24" fill="#EBE6E1">ul. Nad Babicą 2 · tel. 505 204 943</text>
   </svg>`
);
await sharp(gradient)
  .composite([
    { input: heroForOg, left: 1200 - heroMeta.width + 40, top: 0 },
    { input: logoForOg, left: 40, top: 40 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(PUBLIC, "og-mento-care.jpg"));

const files = await readdir(OUT);
console.log(
  `[images] gotowe: ${files.length - 1} plików, łącznie ${(total / 1024 / 1024).toFixed(1)} MB (wszystkie warianty)`
);
