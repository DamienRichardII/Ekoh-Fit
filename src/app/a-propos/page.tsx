import type { Metadata } from "next";
import { Flame, TrendingUp, ShieldCheck, Award, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { aboutPhoto } from "@/data/media";
import { site } from "@/data/site";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "À propos", description: "Karichma EKOH, athlète internationale de handball et coach certifiée APAS : parcours, valeurs et ambitions." };

const values = [
  { Icon: Flame, t: "Discipline", d: "La régularité fait les résultats." },
  { Icon: TrendingUp, t: "Progression", d: "Des séances progressives, mesurées et ajustées." },
  { Icon: ShieldCheck, t: "Confiance", d: "Rigueur, sécurité et engagement dans chaque intervention." },
];

export default function Page() {
  return (
    <>
      <section className="bg-navy text-offwhite section-y">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading as="h1" tone="dark" eyebrow="À propos" title={site.coachName ?? "La coach EKOHFIT"} lead={profile.headline} />
            <div className="mt-6 max-w-xl space-y-4 text-offwhite/80">{profile.bio.map((p) => <p key={p}>{p}</p>)}</div>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-gold/30 pt-6 sm:grid-cols-4">
              {profile.stats.map((st) => <div key={st.label}><dd className="font-display text-4xl font-bold text-gold">{st.value}</dd><dt className="text-xs font-bold uppercase tracking-wide text-offwhite/80">{st.label}</dt></div>)}
            </dl>
          </div>
          <Media src={aboutPhoto?.src ?? null} pos={aboutPhoto?.pos} alt="La coach EKOHFIT debout dans le gymnase" label="Portrait de la coach à ajouter" sizes="(min-width:1024px) 50vw, 100vw" className="aspect-[4/5] w-full rounded-card lg:max-h-[38rem]" />
        </div>
      </section>

      <section className="section-y on-light"><div className="container-x">
        <h2 className="mb-8 text-4xl sm:text-5xl">Mes valeurs</h2>
        <ul className="grid gap-5 md:grid-cols-3">{values.map(({ Icon, t, d }, i) => <li key={t}><Reveal delay={i * 90} className="card-lift h-full rounded-card border border-navy/10 bg-white p-6 shadow-soft"><Icon aria-hidden className="h-8 w-8" /><h3 className="mt-4 text-2xl">{t}</h3><p className="mt-2 text-sm text-navy/75">{d}</p></Reveal></li>)}</ul>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-card bg-white p-6 shadow-soft"><h2 className="flex items-center gap-2 text-3xl"><Award aria-hidden className="h-6 w-6" /> Qualifications</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-navy/80">{profile.qualifications.map((q) => <li key={q}>{q}</li>)}</ul></div>
          <div className="rounded-card bg-white p-6 shadow-soft"><h2 className="text-3xl">Pour qui j’interviens</h2>
            <ul className="mt-3 flex flex-wrap gap-2">{profile.audiences.map((a) => <li key={a} className="rounded-pill bg-navy px-4 py-2 text-sm font-semibold text-offwhite">{a}</li>)}</ul></div>
        </div>

        <div className="mt-16">
          <SectionHeading title="Parcours & palmarès" lead="Un parcours forgé au plus haut niveau. Les étapes clés et les distinctions qui garantissent la qualité de mes interventions." />
          <ol className="mt-10 grid gap-x-10 gap-y-2 border-l-2 border-gold md:grid-cols-2 md:border-l-0">
            {profile.timeline.map((t, i) => (
              <li key={t.year}><Reveal delay={(i % 4) * 70} className="relative border-gold py-3 pl-6 md:border-l-2">
                <span aria-hidden className="absolute -left-[7px] top-5 h-3 w-3 rounded-full bg-gold md:-left-[7px]" />
                <p className="font-display text-3xl font-bold text-gold-dark"><span className="text-navy">{t.year}</span></p>
                <ul className="mt-1 space-y-1 text-navy/85">{t.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </Reveal></li>
            ))}
          </ol>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">{profile.honours.map((h) => <li key={h} className="flex items-center gap-3 rounded-card bg-navy p-5 font-bold text-offwhite"><Trophy aria-hidden className="h-6 w-6 shrink-0 text-gold" />{h}</li>)}</ul>
        </div>

        <div className="mt-16 rounded-card bg-navy p-8 text-offwhite sm:p-12">
          <h2 className="text-4xl sm:text-5xl">Mes ambitions</h2>
          <ul className="mt-5 flex flex-wrap gap-3">{profile.ambitions.map((a) => <li key={a} className="rounded-pill border border-gold/50 px-5 py-2 font-semibold text-gold">{a}</li>)}</ul>
          <p className="mt-5 max-w-2xl text-lg text-offwhite/85">{profile.ambitionLead}</p>
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row"><Button href="/reservation/">Réserver une séance</Button><Button href="/contact/?type=devis" variant="outline-dark">Demander un devis</Button></div>
      </div></section>
    </>
  );
}
