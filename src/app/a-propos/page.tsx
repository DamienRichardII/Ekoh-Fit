import type { Metadata } from "next";
import { Flame, TrendingUp, ShieldCheck, Award } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { aboutPhoto } from "@/data/media";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "À propos", description: "Découvrez la coach EKOHFIT, ses valeurs et ses spécialités." };

const values = [
  { Icon: Flame, t: "Discipline", d: "La régularité fait les résultats." },
  { Icon: TrendingUp, t: "Progression", d: "Avancer pas à pas, mesurer, ajuster." },
  { Icon: ShieldCheck, t: "Confiance", d: "Un cadre exigeant et bienveillant." },
];

export default function Page() {
  return (
    <>
      <section className="bg-navy text-offwhite section-y">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading as="h1" tone="dark" eyebrow="À propos" title={site.coachName ?? "La coach EKOHFIT"} lead="Coach sportive, je vous accompagne avec exigence et bienveillance, du premier bilan jusqu’à vos objectifs." />
            <p className="mt-5 max-w-xl text-sm text-offwhite/70">Parcours, diplômes et qualifications : à renseigner une fois confirmés.</p>
          </div>
          <Media src={aboutPhoto?.src ?? null} pos={aboutPhoto?.pos} alt="La coach EKOHFIT debout dans le gymnase" label="Portrait de la coach à ajouter" sizes="(min-width:1024px) 50vw, 100vw" className="aspect-[4/5] w-full rounded-card lg:max-h-[38rem]" />
        </div>
      </section>
      <section className="section-y on-light"><div className="container-x">
        <h2 className="mb-8 text-4xl sm:text-5xl">Mes valeurs</h2>
        <ul className="grid gap-5 md:grid-cols-3">{values.map(({ Icon, t, d }, i) => <li key={t}><Reveal delay={i * 90} className="card-lift h-full rounded-card border border-navy/10 bg-white p-6 shadow-soft"><Icon aria-hidden className="h-8 w-8" /><h3 className="mt-4 text-2xl">{t}</h3><p className="mt-2 text-sm text-navy/75">{d}</p></Reveal></li>)}</ul>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-card bg-white p-6 shadow-soft"><h2 className="text-3xl">Spécialités</h2><p className="mt-3 text-navy/80">Coaching individuel et collectif, préparation physique, handball (HandFit), interventions en structures.</p></div>
          <div className="rounded-card border border-dashed border-navy/30 p-6"><h2 className="flex items-center gap-2 text-3xl"><Award aria-hidden className="h-6 w-6" /> Qualifications</h2><p className="mt-3 text-navy/75">À renseigner : aucune qualification n’est affichée tant qu’elle n’est pas confirmée.</p></div>
        </div>
        <div className="mt-10"><Button href="/reservation/">Réserver une séance</Button></div>
      </div></section>
    </>
  );
}
