import Image from "next/image";
import { cn } from "@/lib/cn";

/** Affiche la photo si elle existe, sinon un emplacement visuel provisoire. `pos` = point de focus du recadrage. */
export function Media({
  src, alt, className, label = "Photo à ajouter", priority, pos = "50% 30%", sizes = "(min-width:1024px) 33vw, 100vw", imgClassName,
}: { src: string | null; alt: string; className?: string; label?: string; priority?: boolean; pos?: string; sizes?: string; imgClassName?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-navy-700", className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectPosition: pos }} className={cn("object-cover", imgClassName)} />
      ) : (
        <div role="img" aria-label={`${alt} — ${label.toLowerCase()}`} className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-navy-700 to-navy-900 p-4 text-center">
          <Image src="/logo-mark.png" alt="" width={96} height={94} className="h-auto w-1/4 max-w-24 opacity-35" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-offwhite/70">{label}</span>
        </div>
      )}
    </div>
  );
}
