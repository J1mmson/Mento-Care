import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

const LOCK = "modal-open"; // klasa na <html>: blokuje przewijanie strony pod oknem

/**
 * Okno dialogowe na natywnym <dialog>: Esc, przycisk ✕ i kliknięcie w tło zamykają.
 * Treść jest w HTML od początku (dobre dla Google), tylko ukryta do otwarcia.
 */
export default function Modal({ open, onClose, labelledBy, children, size = "max-w-3xl" }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const root = document.documentElement;
    if (open && !dialog.open) {
      dialog.showModal();
      root.classList.add(LOCK);
    } else if (!open && dialog.open) {
      dialog.close();
    }
    if (!open) root.classList.remove(LOCK);
  }, [open]);

  useEffect(() => () => document.documentElement.classList.remove(LOCK), []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className={`m-auto w-[calc(100%-16px)] ${size} overflow-hidden rounded-lg border border-cream/15 bg-[#17110d] p-0 text-cream shadow-[0_30px_80px_rgba(0,0,0,0.6)] backdrop:bg-black/75 backdrop:backdrop-blur-sm sm:w-[calc(100%-48px)]`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Zamknij"
        className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#17110d]/80 text-[22px] text-cream/80 transition-colors hover:text-prime"
      >
        <FiX aria-hidden="true" />
      </button>
      <div className="relative max-h-[min(92svh,920px)] overflow-y-auto overscroll-contain px-5 pb-6 pt-10 sm:px-9 sm:pb-9 sm:pt-11">
        {children}
      </div>
    </dialog>
  );
}
