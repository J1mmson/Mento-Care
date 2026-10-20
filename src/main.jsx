import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const container = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Strona jest wstępnie wygenerowana do HTML (scripts/prerender.mjs) – wtedy
// React tylko „ożywia” gotowy kod. W trybie dev renderujemy od zera.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
