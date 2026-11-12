import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Dumbbell, Users, Activity, Trophy, ClipboardCheck, Quote } from "lucide-react";
import { Button } from "@/components/Button";
import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { domains } from "@/data/site";
import { getService } from "@/data/services";
import { heroPhoto, aboutPhoto } from "@/data/media";
import { profile } from "@/data/profile";
import { reviews } from "@/data/reviews";
import { site } from "@/data/site";

const icons = { Dumbbell, Users, Activity, Trophy, ClipboardCheck };
const featured = ["ekohfit-up", "harmony", "offre-particulier", "handfit"].map((s) => getService(s)!);

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-navy text-offwhite">
        <div className="absolute inset-0 -z-10 lg:left-[40%]">
          {heroPhoto ? (
            <>
              <Media src={heroPhoto.src} pos={heroPhoto.pos} alt="La coach EKOHFIT en gymnase" priority sizes="(min-width:1024px) 60vw, 100vw" className="h-full w-full" imgClassName="hero-photo" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-navy/10 via-navy/70 to-navy lg:hidden" />
              <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-r from-navy via-navy/55 to-navy/5 lg:block" />
              <div aria-hidden className="absolute inset-x-0 bottom-0 hidden h-1/4 bg-gradient-to-t from-navy/70 to-transparent lg:block" />
            </>
          ) : (
            <div className="hidden h-full items-center justify-center p-12 lg:flex">
              <Media src={null} alt="La coach EKOHFIT" label="Photo de la coach à ajouter" className="aspect-[4/5] h-[min(70vh,40rem)] rounded-card border border-gold/40 shadow-lift" />
            </div>
          )}
        </div>
        <div className="container-x flex min-h-[calc(100svh-8rem)] items-end py-8 lg:min-h-[calc(100svh-4rem)] lg:items-center lg:py-10">
          <div className="flex w-full flex-col items-center gap-6 text-center lg:w-1/2 lg:items-start lg:gap-8 lg:text-left">
            <h1 className="sr-only">EKOHFIT</h1>
            <Image src="/logo-ekohfit.png" alt="" width={900} height={854} priority className="hero-in h-auto w-[min(72vw,22rem)] drop-shadow-[0_6px_24px_rgba(15,27,40,0.6)] lg:w-[min(36vw,36rem)]" style={{ ["--d" as string]: "60ms" }} />
            <div className="hero-in flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row" style={{ ["--d" as string]: "220ms" }}>
              <Button href="/reservation/" className="sm:flex-none"><CalendarCheck aria-hidden className="h-5 w-5" /> Réserver une séance</Button>
              <Button href="/prestations/" variant="outline" className="bg-navy/60 sm:bg-transparent">Découvrir les prestations <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Button>
            </div>
          </div>
        </div>
      </section>

      {/* DOMAINES */}
      <section aria-label="Domaines d’intervention" className="border-y border-gold/20 bg-navy-800 text-offwhite">
        <ul className="container-x grid grid-cols-2 gap-x-4 gap-y-5 py-7 md:grid-cols-3 lg:grid-cols-5">
          {domains.map((d) => { const I = icons[d.icon]; return (
            <li key={d.title} className="flex items-center gap-3">
              <I aria-hidden className="h-8 w-8 shrink-0 text-gold" />
              <span><span className="block text-xs font-bold uppercase tracking-wide">{d.title}</span><span className="block text-xs text-offwhite/70">{d.text}</span></span>
            </li>); })}
        </ul>
      </section>

      {/* PRESTATIONS */}
      <section className="section-y on-light">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title="Nos prestations" eyebrow="Coaching" />
            <Link href="/prestations/" className="link-u inline-flex min-h-11 items-center gap-2 font-bold">Voir toutes les prestations <ArrowRight aria-hidden className="h-4 w-4" /></Link>
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((s, i) => <li key={s.slug}><Reveal delay={i * 90} className="h-full"><ServiceCard service={s} /></Reveal></li>)}
          </ul>
        </div>
      </section>

      {/* À PROPOS */}
      <section className="bg-navy text-offwhite section-y">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal><div className="zoom-frame overflow-hidden rounded-card"><Media src={aboutPhoto?.src ?? null} pos={aboutPhoto?.pos} alt="La coach EKOHFIT debout dans le gymnase" label="Portrait de la coach à ajouter" sizes="(min-width:1024px) 40vw, 100vw" className="aspect-[4/5] w-full" /></div></Reveal>
          <Reveal delay={120}>
            <SectionHeading tone="dark" eyebrow="À propos" title={site.coachName ?? "La coach EKOHFIT"} lead={profile.bio[0]} />
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-gold/30 pt-6">
              {profile.stats.map((st) => (
                <div key={st.label}><dt className="order-2 text-xs font-bold uppercase tracking-wide text-offwhite/80">{st.label}</dt><dd className="font-display text-5xl font-bold text-gold">{st.value}</dd></div>
              ))}
            </dl>
            <Button href="/a-propos/" className="mt-7">En savoir plus <ArrowRight aria-hidden className="h-4 w-4" /></Button>
          </Reveal>
        </div>
      </section>

      {/* AVIS */}
      <section className="section-y on-light">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title="Ils me font confiance" eyebrow="Avis" />
            <Link href="/avis/" className="link-u inline-flex min-h-11 items-center gap-2 font-bold">Voir la page avis <ArrowRight aria-hidden className="h-4 w-4" /></Link>
          </Reveal>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {reviews.map((r, i) => (
              <li key={r.author}><Reveal delay={i * 90} className="card-lift flex h-full flex-col rounded-card border border-navy/10 bg-white p-6 shadow-soft">
                <Quote aria-hidden className="h-7 w-7 text-gold-dark" />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed">{r.text}</blockquote>
                <p className="mt-5 font-bold">{r.author}</p><p className="text-sm text-navy/70">{r.role}</p>
              </Reveal></li>
            ))}
          </ul>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-offwhite">
        <Image src="/logo-mark.png" alt="" width={400} height={390} aria-hidden className="absolute -right-16 top-1/2 -z-10 h-auto w-80 -translate-y-1/2 opacity-10" />
        <Reveal className="container-x flex flex-wrap items-center justify-between gap-6">
          <SectionHeading tone="dark" eyebrow="Portfolio" title="Découvrez mon portfolio" />
          <Button href="/portfolio/">Voir le portfolio <ArrowRight aria-hidden className="h-4 w-4" /></Button>
        </Reveal>
      </section>

      {/* CTA FINAL */}
      <section className="section-y on-light">
        <Reveal className="container-x">
          <div className="rounded-card bg-gold p-8 text-navy sm:p-12">
            <h2 className="text-4xl sm:text-6xl">Prêt à passer à l’action ?</h2>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/reservation/" variant="navy">Réserver une séance</Button>
              <Button href="/contact/" variant="outline-dark">Nous contacter</Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
