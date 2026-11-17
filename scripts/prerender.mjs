/**
 * Prerender: po `vite build` zamienia pusty <div id="root"></div> w dist/index.html
 * na gotowy HTML strony – i tworzy podstrony (dist/vouchery/index.html itd., lista w src/data/pages.js)
 * z własnym tytułem i opisem dla Google, a także dist/sitemap.xml.
 * Dzięki temu Google, Bing, Facebook i wyszukiwarki AI widzą całą treść od razu, a strona szybciej się wyświetla.
 * Gdyby coś poszło nie tak – build NIE jest przerywany (strona główna działa jak wcześniej).
 */
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";
import { ALL_PAGES, pageHtml, sitemapXml } from "./pages-html.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "node_modules", ".mento-prerender");
const dist = path.join(root, "dist");

try {
  await build({
    root,
    logLevel: "warn",
    build: {
      ssr: "src/entry-server.jsx",
      outDir,
      emptyOutDir: true,
      copyPublicDir: false,
    },
  });

  const entry = (await readdir(outDir)).find((f) => /^entry-server\.m?js$/.test(f));
  if (!entry) throw new Error("nie znaleziono zbudowanego entry-server.js");
  const { render } = await import(pathToFileURL(path.join(outDir, entry)).href);

  const template = await readFile(path.join(dist, "index.html"), "utf8");
  for (const page of ALL_PAGES) {
    const appHtml = render(page.path);
    const dir = path.join(dist, page.path);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "index.html"), pageHtml(template, page, appHtml));
    console.log(`[prerender] ${page.path} – ${Math.round(appHtml.length / 1024)} KB treści`);
  }
  await writeFile(path.join(dist, "sitemap.xml"), sitemapXml());
  console.log("[prerender] OK – sitemap.xml z podstronami");
} catch (err) {
  console.warn("[prerender] Pominięto (strona działa dalej jako zwykła aplikacja React):", err?.message || err);
} finally {
  await rm(outDir, { recursive: true, force: true }).catch(() => {});
}
