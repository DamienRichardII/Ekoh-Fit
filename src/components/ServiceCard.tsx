import Link from "next/link";
import { Clock, Users, ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";
import { Media } from "./Media";
import { Button } from "./Button";

export function ServiceCard({ service }: { service: Service }) {
  const s = service;
  return (
    <article className="card-lift flex h-full flex-col overflow-hidden rounded-card border border-navy/10 bg-white shadow-soft">
      <Link href={`/prestations/${s.slug}/`} className="zoom-frame block" tabIndex={-1} aria-hidden>
        <Media src={s.media?.src ?? null} pos={s.media?.pos} alt={s.title} sizes="(min-width:1280px) 25vw, (min-width:640px) 50vw, 100vw" className="aspect-[4/3] w-full" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-2xl">
          <Link href={`/prestations/${s.slug}/`} className="link-u">{s.title}</Link>
        </h3>
        <p className="text-sm leading-relaxed text-navy/75">{s.short}</p>
        {!s.verified && <p className="text-xs font-semibold uppercase tracking-wide text-navy/70">Contenu à confirmer</p>}
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            {s.capacity && <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-navy/70"><Users aria-hidden className="h-3.5 w-3.5" />{s.capacity}</p>}
            {s.duration && <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-navy/70"><Clock aria-hidden className="h-3.5 w-3.5" />{s.duration}</p>}
            <p className="text-lg font-extrabold leading-tight">{s.price ?? "Sur devis"}</p>
            {s.priceNote && <p className="text-xs text-navy/70">{s.priceNote}</p>}
          </div>
        </div>
        <Button href={s.quote ? `/contact/?type=devis&prestation=${s.slug}` : `/reservation/?prestation=${s.slug}`} className="w-full">
          {s.quote ? "Demander un devis" : "Réserver"} <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </article>
  );
}
