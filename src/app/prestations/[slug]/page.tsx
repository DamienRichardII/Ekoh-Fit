import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Info } from "lucide-react";
import { getService, services } from "@/data/services";
import { Button } from "@/components/Button";
import { Media } from "@/components/Media";
import { SectionHeading } from "@/components/SectionHeading";

export const dynamicParams = false;
export function generateStaticParams() { return services.map((s) => ({ slug: s.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getService((await params).slug);
  return s ? { title: s.title, description: s.short } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  return (
    <section className="section-y on-light">
      <div className="container-x">
        <Link href="/prestations/" className="link-u mb-8 inline-flex min-h-11 items-center gap-2 text-sm font-bold"><ArrowLeft aria-hidden className="h-4 w-4" /> Toutes les prestations</Link>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading as="h1" title={s.title} lead={s.description} />
            {!s.verified && <p className="mt-4 flex gap-2 rounded-lg bg-gold/25 p-3 text-sm font-medium"><Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />Contenu suggéré par la maquette, à confirmer avec la coach.</p>}
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div><h2 className="mb-2 text-2xl">Public concerné</h2><p className="text-navy/80">{s.audience}</p></div>
              <div><h2 className="mb-2 text-2xl">Tarif</h2><p className="text-xl font-extrabold">{s.price ?? "Sur devis"}</p>{s.priceNote && <p className="text-sm text-navy/75">{s.priceNote}</p>}</div>
            </div>
            <h2 className="mb-3 mt-8 text-2xl">Déroulement</h2>
            <ol className="space-y-2">{s.steps.map((t, i) => <li key={t} className="flex gap-3"><CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" /><span><span className="sr-only">Étape {i + 1} : </span>{t}</span></li>)}</ol>
            <h2 className="mb-3 mt-8 text-2xl">Informations pratiques</h2>
            <ul className="list-disc space-y-1 pl-5 text-navy/80">{s.duration && <li>Durée : {s.duration}</li>}{s.practical.map((p) => <li key={p}>{p}</li>)}</ul>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {s.quote
                ? <Button href={`/contact/?type=devis&prestation=${s.slug}`}>Demander un devis</Button>
                : <Button href={`/reservation/?prestation=${s.slug}`}>Réserver</Button>}
              <Button href="/contact/" variant="outline-dark">Poser une question</Button>
            </div>
          </div>
          <Media src={s.media?.src ?? null} pos={s.media?.pos} alt={s.title} sizes="(min-width:1024px) 45vw, 100vw" className="aspect-[4/5] w-full rounded-card lg:sticky lg:top-24" />
        </div>
      </div>
    </section>
  );
}
