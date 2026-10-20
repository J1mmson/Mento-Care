import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { buildSchema } from "./src/seo/schema.js";

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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoSchema()],
});
