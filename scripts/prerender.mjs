/**
 * Prerender: po `vite build` zamienia pusty <div id="root"></div> w dist/index.html
 * na gotowy HTML strony. Dzięki temu Google, Bing, Facebook i wyszukiwarki AI
 * widzą całą treść od razu, a strona szybciej się wyświetla.
 * Gdyby coś poszło nie tak – build NIE jest przerywany (strona działa jak wcześniej).
 */
import { readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "node_modules", ".mento-prerender");
const indexPath = path.join(root, "dist", "index.html");
const EMPTY_ROOT = '<div id="root"></div>';

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
  const appHtml = render();

  const html = await readFile(indexPath, "utf8");
  if (!html.includes(EMPTY_ROOT)) throw new Error(`brak ${EMPTY_ROOT} w dist/index.html`);
  await writeFile(indexPath, html.replace(EMPTY_ROOT, `<div id="root">${appHtml}</div>`));
  console.log(`[prerender] OK – dist/index.html zawiera ${Math.round(appHtml.length / 1024)} KB treści`);
} catch (err) {
  console.warn("[prerender] Pominięto (strona działa dalej jako zwykła aplikacja React):", err?.message || err);
} finally {
  await rm(outDir, { recursive: true, force: true }).catch(() => {});
}
