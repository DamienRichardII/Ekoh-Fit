import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";

export const metadata: Metadata = { title: "Avis", description: "Les avis vérifiés des personnes accompagnées par EKOHFIT." };

/** Avis vérifiés uniquement. Ajoutez ici les témoignages réels fournis et validés. */
const reviews: { author: string; role: string; text: string }[] = [];

export default function Page() {
  return (
    <section className="section-y on-light">
      <div className="container-x">
        <SectionHeading as="h1" eyebrow="Témoignages" title="Ils me font confiance" />
        {reviews.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-4 rounded-card border border-dashed border-navy/30 bg-white p-10 text-center sm:p-16">
            <Quote aria-hidden className="h-10 w-10 text-gold-dark" />
            <h2 className="text-3xl">Les premiers avis arrivent bientôt</h2>
            <p className="max-w-md text-navy/75">Nous affichons uniquement des témoignages réels, fournis et validés. Aucun avis fictif n’est présenté sur cette page.</p>
            <Button href="/contact/" variant="navy">Nous contacter</Button>
          </div>
        ) : (
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => <li key={r.author} className="rounded-card bg-white p-6 shadow-soft"><blockquote>{r.text}</blockquote><p className="mt-4 font-bold">{r.author}</p><p className="text-sm text-navy/70">{r.role}</p></li>)}
          </ul>
        )}
      </div>
    </section>
  );
}
