import type { Metadata } from "next";
import { ClipboardList, Target, CalendarDays, TrendingUp, LineChart, User, Users, Activity } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { FAQ } from "@/components/FAQ";
import { Button } from "@/components/Button";

export const metadata: Metadata = { title: "Coaching", description: "La méthode d’accompagnement EKOHFIT : bilan, objectifs, séances adaptées, progression et suivi." };

const steps = [
  { Icon: ClipboardList, t: "Bilan initial", d: "On fait le point sur votre situation et votre niveau." },
  { Icon: Target, t: "Objectifs", d: "On définit ensemble des objectifs clairs et réalistes." },
  { Icon: CalendarDays, t: "Séances adaptées", d: "Des séances construites autour de vos besoins." },
  { Icon: TrendingUp, t: "Progression", d: "Une montée en charge progressive et maîtrisée." },
  { Icon: LineChart, t: "Suivi", d: "Un point régulier pour mesurer les résultats." },
];
const blocks = [
  { Icon: User, t: "Accompagnement individuel", d: "Un suivi personnalisé, au rythme de la personne." },
  { Icon: Users, t: "Accompagnement collectif", d: "Encadrement sportif pour clubs, groupes et équipes, sur mesure." },
  { Icon: Activity, t: "Préparation physique", d: "Séances spécifiques de handball et stages de perfectionnement." },
];

export default function Page() {
  return (
    <>
      <section className="bg-navy text-offwhite section-y">
        <div className="container-x"><SectionHeading as="h1" tone="dark" eyebrow="Méthode" title="Mon approche du coaching" lead="Une démarche simple en cinq étapes, centrée sur vous." /></div>
      </section>
      <section className="section-y on-light"><div className="container-x">
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ Icon, t, d }, i) => (
            <li key={t}><Reveal delay={i * 80} className="card-lift h-full rounded-card border border-navy/10 bg-white p-5 shadow-soft">
              <span className="font-display text-5xl font-bold text-gold-dark" aria-hidden>{i + 1}</span>
              <Icon aria-hidden className="my-3 h-7 w-7" /><h2 className="text-2xl">{t}</h2><p className="mt-2 text-sm text-navy/75">{d}</p>
            </Reveal></li>
          ))}
        </ol>
      </div></section>
      <section className="bg-navy-800 text-offwhite section-y"><div className="container-x">
        <h2 className="mb-8 text-4xl sm:text-5xl">Formats d’accompagnement</h2>
        <ul className="grid gap-5 md:grid-cols-3">
          {blocks.map(({ Icon, t, d }, i) => <li key={t}><Reveal delay={i * 90} className="h-full rounded-card border border-gold/30 p-6"><Icon aria-hidden className="h-8 w-8 text-gold" /><h3 className="mt-4 text-2xl">{t}</h3><p className="mt-2 text-sm text-offwhite/80">{d}</p></Reveal></li>)}
        </ul>
      </div></section>
      <section className="section-y on-light"><div className="container-x max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Questions fréquentes" className="mb-8" />
        <FAQ />
        <div className="mt-10 flex flex-col gap-3 sm:flex-row"><Button href="/reservation/">Réserver une séance</Button><Button href="/prestations/" variant="outline-dark">Voir les prestations</Button></div>
      </div></section>
    </>
  );
}
