import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { buildSchema } from "./src/seo/schema.js";
import { buildRegulamin } from "./src/seo/regulamin.js";

// Wstrzykuje dane strukturalne (JSON-LD) do <head> – zawsze aktualne względem src/data/business.js
function seoSchema() {
  return {
    name: "mento-seo-schema",
    transformIndexHtml() {
      return [
        {
          tag: "script",
          attrs: { type: "application/ld+json" },
          children: JSON.stringify(buildSchema()),
          injectTo: "head",
        },
      ];
    },
  };
}

// Strona /regulamin-voucherow/ generowana z src/data/business.js (src/seo/regulamin.js)
function regulaminPage() {
  return {
    name: "mento-regulamin",
    // npm run dev – zawsze świeża wersja po zmianie business.js
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!/^\/regulamin-voucherow(\/|\/index\.html)?$/.test(req.url.split("?")[0])) return next();
        const mod = await server.ssrLoadModule("/src/seo/regulamin.js");
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(mod.buildRegulamin());
      });
    },
    // npm run build – plik dist/regulamin-voucherow/index.html
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "regulamin-voucherow/index.html", source: buildRegulamin() });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoSchema(), regulaminPage()],
});
