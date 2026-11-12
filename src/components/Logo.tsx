import Image from "next/image";
import Link from "next/link";

/** Logo compact (marque lion + wordmark EKOH / FIT). */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="EKOHFIT — accueil" className={`flex items-center gap-2.5 ${className}`}>
      <Image src="/logo-mark.png" alt="" width={40} height={39} className="h-9 w-auto" priority />
      <span className="font-display text-3xl font-extrabold italic leading-none tracking-tight">
        <span className="text-offwhite">EKOH</span><span className="text-gold">FIT</span>
      </span>
    </Link>
  );
}
