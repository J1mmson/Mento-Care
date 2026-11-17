/**
 * HTML podstron (mentocare.pl/vouchery/ itd.) na bazie dist/index.html:
 * własny tytuł, opis, adres kanoniczny, podgląd do udostępniania i dane dla Google.
 * Używa go scripts/prerender.mjs. Lista podstron: src/data/pages.js
 */
import { HOME, PAGES, SITE_URL } from "../src/data/pages.js";
import { buildPageSchema } from "../src/seo/schema.js";

const EMPTY_ROOT = '<div id="root"></div>';
const attr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function setAttr(html, tagRe, name, value) {
  if (!tagRe.test(html)) throw new Error(`brak znacznika ${tagRe} w index.html`);
  return html.replace(tagRe, (tag) => tag.replace(new RegExp(`${name}="[^"]*"`), `${name}="${attr(value)}"`));
}
const meta = (key, kind = "name") => new RegExp(`<meta\\s+${kind}="${key}"\\s+content="[^"]*"\\s*/?>`);

export const ALL_PAGES = [HOME, ...PAGES];

export function pageHtml(template, page, appHtml) {
  if (!template.includes(EMPTY_ROOT)) throw new Error(`brak ${EMPTY_ROOT} w index.html`);
  let html = template.replace(EMPTY_ROOT, `<div id="root">${appHtml}</div>`);
  if (page === HOME) return html;

  const url = SITE_URL + page.path;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${attr(page.title)}</title>`);
  html = setAttr(html, meta("description"), "content", page.description);
  html = setAttr(html, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, "href", url);
  html = setAttr(html, meta("og:url", "property"), "content", url);
  html = setAttr(html, meta("og:title", "property"), "content", page.title);
  html = setAttr(html, meta("og:description", "property"), "content", page.description);
  html = setAttr(html, meta("twitter:title"), "content", page.title);
  html = setAttr(html, meta("twitter:description"), "content", page.description);
  if (page.ogImage) {
    html = setAttr(html, meta("og:image", "property"), "content", SITE_URL + page.ogImage);
    html = setAttr(html, meta("twitter:image"), "content", SITE_URL + page.ogImage);
    html = setAttr(html, meta("og:image:alt", "property"), "content", page.h1);
  }
  const schema = JSON.stringify(buildPageSchema(page)).replace(/</g, "\\u003c");
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">${schema}</script>`
  );
  return html;
}

export function sitemapXml(date = new Date().toISOString().slice(0, 10)) {
  const urls = [...ALL_PAGES.map((p) => p.path), "/regulamin-voucherow/"];
  const items = urls.map((u) => `  <url>\n    <loc>${SITE_URL}${u}</loc>\n    <lastmod>${date}</lastmod>\n  </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items.join("\n")}\n</urlset>\n`;
}
