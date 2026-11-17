import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { pageForPath } from "./data/pages.js";

const container = document.getElementById("root");
// podstrona (np. /vouchery/) – te same sekcje co w HTML wygenerowanym przez scripts/prerender.mjs
const page = pageForPath(window.location.pathname);
const app = (
  <StrictMode>
    <App page={page} />
  </StrictMode>
);

// Strona jest wstępnie wygenerowana do HTML (scripts/prerender.mjs) – wtedy
// React tylko „ożywia” gotowy kod. W trybie dev renderujemy od zera.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
