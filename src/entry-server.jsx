import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { pageForPath } from "./data/pages.js";

/** HTML strony głównej albo podstrony (scripts/prerender.mjs). */
export function render(path = "/") {
  return renderToString(
    <StrictMode>
      <App page={pageForPath(path)} />
    </StrictMode>
  );
}
