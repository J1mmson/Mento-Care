import { useEffect, useRef, useState } from "react";

/**
 * Krótki film w pętli (bez dźwięku) – jak animowane zdjęcie.
 * • plik pobiera się dopiero, gdy sekcja zbliża się do ekranu (nie spowalnia wejścia na stronę),
 * • poza ekranem i przy otwartym oknie (np. formularzu) film się zatrzymuje,
 * • przy „ogranicz ruch” w systemie albo oszczędzaniu danych zostaje samo zdjęcie (poster).
 */
export default function LoopVideo({ src, srcLarge, poster, className = "", label }) {
  const ref = useRef(null);
  const onScreen = useRef(false);
  const [load, setLoad] = useState(null); // adres pliku, gdy można go pobrać

  useEffect(() => {
    const video = ref.current;
    if (!video || !("IntersectionObserver" in window)) return;
    // iPhone odtwarza automatycznie tylko wyciszone filmy (React nie zawsze ustawia atrybut „muted”)
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData;
    if (reduce || saveData) return;

    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // na dużym ekranie ostrzejsza wersja (1080 px), na telefonie lżejsza (720 px)
          setLoad(srcLarge && window.matchMedia("(min-width: 1024px)").matches ? srcLarge : src);
          near.disconnect();
        }
      },
      { rootMargin: "100% 0px" }
    );
    const visible = new IntersectionObserver(([entry]) => {
      onScreen.current = entry.isIntersecting;
      if (!video.currentSrc) return;
      if (entry.isIntersecting && !document.documentElement.classList.contains("modal-open")) video.play().catch(() => {});
      else video.pause();
    });
    // okno (np. formularz vouchera) otwarte → film stoi, telefon ma całą moc dla formularza
    const root = document.documentElement;
    const modal = new MutationObserver(() => {
      if (!video.currentSrc) return;
      if (root.classList.contains("modal-open")) video.pause();
      else if (onScreen.current) video.play().catch(() => {});
    });
    near.observe(video);
    visible.observe(video);
    modal.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => {
      near.disconnect();
      visible.disconnect();
      modal.disconnect();
    };
  }, [src, srcLarge]);

  // plik podpięty – ruszaj, jeśli film jest akurat na ekranie
  useEffect(() => {
    if (load && onScreen.current) ref.current?.play().catch(() => {});
  }, [load]);

  return (
    <video
      ref={ref}
      src={load || undefined}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
      className={className}
    />
  );
}
