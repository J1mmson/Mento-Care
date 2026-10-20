/**
 * Przewija stronę do sekcji o danym id.
 *
 * Strona używa „slajdów” (scroll-snap). Safari na iPhonie (i Chrome na iPhonie,
 * który działa na silniku Safari) potrafi zignorować albo cofnąć programowe
 * przewinięcie, gdy snap jest włączony. Dlatego na czas skoku wyłączamy snap,
 * a po dotarciu na miejsce włączamy go z powrotem.
 */
let restoreTimer = 0;
let cleanup = null;

export function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return false;

  const root = document.documentElement;
  const touch = window.matchMedia("(pointer: coarse)").matches;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const smooth = !touch && !reduce; // na telefonach skok natychmiastowy – najpewniejszy
  const top = Math.round(target.getBoundingClientRect().top + window.scrollY);

  if (cleanup) cleanup();
  root.style.scrollSnapType = "none";
  root.style.scrollBehavior = "auto";

  const restore = () => {
    if (cleanup) cleanup();
    root.style.scrollSnapType = "";
    root.style.scrollBehavior = "";
  };
  const onScroll = () => {
    clearTimeout(restoreTimer);
    restoreTimer = setTimeout(restore, 180);
  };
  cleanup = () => {
    window.removeEventListener("scroll", onScroll);
    clearTimeout(restoreTimer);
    cleanup = null;
  };

  if (smooth) {
    window.addEventListener("scroll", onScroll, { passive: true });
    restoreTimer = setTimeout(restore, 1500);
    window.scrollTo({ top, behavior: "smooth" });
  } else {
    try {
      window.scrollTo({ top, behavior: "instant" });
    } catch {
      window.scrollTo(0, top);
    }
    requestAnimationFrame(() => requestAnimationFrame(restore));
  }

  if (location.hash !== `#${id}`) history.replaceState(null, "", `#${id}`);
  return true;
}

/** Obsługa wszystkich linków typu href="#sekcja" na stronie. */
export function handleAnchorClick(e) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const link = e.target.closest?.('a[href^="#"]');
  if (!link) return;
  const id = decodeURIComponent(link.getAttribute("href").slice(1));
  if (!id) return;
  if (scrollToSection(id)) e.preventDefault();
}
