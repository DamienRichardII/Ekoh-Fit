import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { reviews } from "@/data/reviews";

export const metadata: Metadata = { title: "Avis", description: "Les avis des clubs, comités et structures accompagnés par EKOHFIT." };

export default function Page() {
  return (
    <section className="section-y on-light">
      <div className="container-x">
        <SectionHeading as="h1" eyebrow="Témoignages" title="Ils me font confiance" lead="Les retours de responsables de clubs, comités et instances avec lesquels j’ai travaillé." />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <li key={r.author}><Reveal delay={i * 90} className="card-lift flex h-full flex-col rounded-card border border-navy/10 bg-white p-6 shadow-soft">
              <Quote aria-hidden className="h-8 w-8 text-gold-dark" />
              <blockquote className="mt-4 flex-1 leading-relaxed">{r.text}</blockquote>
              <p className="mt-6 font-bold">{r.author}</p><p className="text-sm text-navy/70">{r.role}</p>
            </Reveal></li>
          ))}
        </ul>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row"><Button href="/contact/?type=devis">Demander un devis</Button><Button href="/prestations/" variant="outline-dark">Voir les prestations</Button></div>
      </div>
    </section>
  );
}
