"use client";
import { useEffect, useRef, type ReactNode, type KeyboardEvent } from "react";
import { X } from "lucide-react";

/** Dialogue natif <dialog> : focus piégé, Échap, restauration du focus. */
export function Modal({ open, onClose, title, children, onKeyDown, wide }: {
  open: boolean; onClose: () => void; title: string; children: ReactNode; onKeyDown?: (e: KeyboardEvent) => void; wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} className="modal m-auto" aria-label={title} onClose={onClose} onKeyDown={onKeyDown}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}>
      <div className={`relative mx-auto rounded-card bg-offwhite p-5 text-navy shadow-lift sm:p-7`} style={{ width: wide ? "min(94vw,64rem)" : "min(94vw,34rem)" }}>
        <button type="button" onClick={onClose} aria-label="Fermer"
          className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-navy text-offwhite transition-colors hover:bg-navy-700">
          <X aria-hidden className="h-5 w-5" />
        </button>
        {open && children}
      </div>
    </dialog>
  );
}
