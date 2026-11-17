import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

const LOCK = "modal-open"; // klasa na <html>: blokuje przewijanie strony pod oknem
let openCount = 0; // ile okien jest otwartych (okno może się otworzyć nad innym, np. powiększony podgląd)

/**
 * Okno dialogowe na natywnym <dialog>: Esc, przycisk ✕ i kliknięcie w tło zamykają.
 * Treść jest w HTML od początku (dobre dla Google), tylko ukryta do otwarcia.
 * Tło bez rozmycia (backdrop-blur) – na iPhonie rozmycie pod oknem zacinało przewijanie i pisanie.
 */
export default function Modal({ open, onClose, labelledBy, children, size = "max-w-3xl" }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    const root = document.documentElement;
    if (!dialog.open) dialog.showModal();
    openCount += 1;
    root.classList.add(LOCK);
    return () => {
      if (dialog.open) dialog.close();
      openCount = Math.max(0, openCount - 1);
      if (!openCount) root.classList.remove(LOCK);
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      // e.target: zamknięcie okna otwartego NAD tym oknem (np. powiększenia) nie zamyka tego okna
      onClose={(e) => e.target === ref.current && onClose()}
      onClick={(e) => e.target === ref.current && onClose()}
      className={`m-auto w-[calc(100%-16px)] ${size} overflow-hidden rounded-lg border border-cream/15 bg-[#17110d] p-0 text-cream shadow-[0_30px_80px_rgba(0,0,0,0.6)] backdrop:bg-black/80 sm:w-[calc(100%-48px)]`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Zamknij"
        className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#17110d]/80 text-[22px] text-cream/80 transition-colors hover:text-prime"
      >
        <FiX aria-hidden="true" />
      </button>
      {/* contain: zmiany w oknie (pisanie, przewijanie) nie przeliczają reszty strony */}
      <div className="relative max-h-[min(92svh,920px)] overflow-y-auto overscroll-contain px-5 pb-6 pt-10 [contain:content] sm:px-9 sm:pb-9 sm:pt-11">
        {children}
      </div>
    </dialog>
  );
}
