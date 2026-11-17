import { useId, useState } from "react";
import { FiMaximize2 } from "react-icons/fi";
import Img from "./Img";
import Modal from "./Modal";

/**
 * Miniatura, którą można kliknąć, żeby zobaczyć zdjęcie w dużym oknie.
 * children = wygląd miniatury; img/alt/caption = duże zdjęcie w oknie.
 */
export default function Zoom({ img, alt, caption, className = "", children }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Powiększ: ${alt}`}
        className={`group relative block cursor-zoom-in ${className}`}
      >
        {children}
        <span
          aria-hidden="true"
          className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-bgPrimary/75 text-[15px] text-cream/90 transition-colors group-hover:bg-prime group-hover:text-bgPrimary"
        >
          <FiMaximize2 />
        </span>
      </button>
      <Modal open={open} onClose={() => setOpen(false)} labelledBy={titleId} size="max-w-5xl">
        <p id={titleId} className="eyebrow pr-10">
          {caption || alt}
        </p>
        <Img
          img={img}
          alt={alt}
          sizes="(min-width: 1100px) 1000px, 100vw"
          className="mt-4 h-auto w-full rounded"
        />
      </Modal>
    </>
  );
}
