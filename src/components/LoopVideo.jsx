import { useEffect, useRef, useState } from "react";

/**
 * Krótki film w pętli (bez dźwięku) – jak animowane zdjęcie. Ma ruszać sam, na każdym telefonie.
 * • plik pobiera się dopiero, gdy sekcja zbliża się do ekranu (nie spowalnia wejścia na stronę),
 * • iPhone/iPad/Safari: film wstawiony jako obrazek (<img src="film.mp4">) – Safari odtwarza go sam
 *   także w trybie niskiego zużycia energii, w którym zwykłe <video> czeka na kliknięcie;
 *   gdyby ta wersja Safari tego nie umiała → zwykłe <video>,
 * • inne przeglądarki: <video muted autoplay playsinline>; poza ekranem i przy otwartym oknie film stoi,
 * • do czasu wczytania (albo gdy przeglądarka zablokuje odtwarzanie) widać zdjęcie – nigdy przycisk „play”.
 */

// Safari na Macu oraz każda przeglądarka na iPhonie/iPadzie (wszystkie działają na silniku Safari)
const isSafariEngine = () =>
  /AppleWebKit/.test(navigator.userAgent) && !/Chrome\/|Chromium|Android|Edg\//.test(navigator.userAgent);

export default function LoopVideo({ src, srcLarge, poster, className = "", label }) {
  const boxRef = useRef(null);
  const videoRef = useRef(null);
  const onScreen = useRef(false);
  const [url, setUrl] = useState(null); // adres pliku, gdy można go pobrać
  const [asImage, setAsImage] = useState(false); // Safari: film jako obrazek
  const [shown, setShown] = useState(false); // obrazek-film wczytany → chowamy zdjęcie pod spodem

  // zwykłe <video>: gra tylko na ekranie i gdy nie ma otwartego okna (np. formularza vouchera)
  const sync = () => {
    const video = videoRef.current;
    if (!video || !video.currentSrc) return;
    if (onScreen.current && !document.documentElement.classList.contains("modal-open")) {
      video.play().catch(() => {}); // zablokowane → zostaje zdjęcie (poster), przycisk „play” ukryty w CSS
    } else video.pause();
  };
  const syncRef = useRef(sync);
  syncRef.current = sync;

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    // na dużym ekranie ostrzejsza wersja (1080 px), na telefonie lżejsza (720 px)
    const start = () => {
      setAsImage(isSafariEngine());
      setUrl(srcLarge && window.matchMedia("(min-width: 1024px)").matches ? srcLarge : src);
    };
    if (!("IntersectionObserver" in window)) {
      onScreen.current = true;
      start();
      return;
    }
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          near.disconnect();
        }
      },
      { rootMargin: "100% 0px" }
    );
    const visible = new IntersectionObserver(([entry]) => {
      onScreen.current = entry.isIntersecting;
      syncRef.current();
    });
    const root = document.documentElement;
    const modal = new MutationObserver(() => syncRef.current());
    near.observe(box);
    visible.observe(box);
    modal.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => {
      near.disconnect();
      visible.disconnect();
      modal.disconnect();
    };
  }, [src, srcLarge]);

  // <video>: iPhone odtwarza sam tylko wyciszone filmy (React nie zawsze ustawia atrybut „muted”)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    if (url) syncRef.current();
  }, [url, asImage]);

  const hidden = label ? undefined : "true";

  if (asImage && url) {
    return (
      <span ref={boxRef} className="relative block h-full w-full">
        {/* zdjęcie do czasu wczytania filmu; potem widoczne tylko pod otwartym oknem */}
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          decoding="async"
          className={`absolute inset-0 ${className} ${shown ? "loop-under" : ""}`}
        />
        <img
          src={url}
          alt={label || ""}
          aria-hidden={hidden}
          decoding="async"
          onLoad={() => setShown(true)}
          onError={() => setAsImage(false)} // ta wersja Safari nie umie → zwykłe <video>
          className={`loop-anim absolute inset-0 ${className}`}
        />
      </span>
    );
  }

  return (
    <span ref={boxRef} className="relative block h-full w-full">
      <video
        ref={videoRef}
        src={url || undefined}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        preload={url ? "auto" : "none"}
        disablePictureInPicture
        disableRemotePlayback
        aria-label={label}
        aria-hidden={hidden}
        className={`loop-video ${className}`}
      />
    </span>
  );
}
