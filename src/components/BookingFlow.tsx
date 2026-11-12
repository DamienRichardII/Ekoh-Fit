"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { services, getService } from "@/data/services";
import { BookingStepper } from "./BookingStepper";
import { DemoNotice } from "./DemoNotice";
import { Button } from "./Button";
import { cn } from "@/lib/cn";
import { addDays, formatLong, fromKey, isBookable, isClosed, monthLabel, slotsFor, startOfDay, toKey, MAX_DAYS_AHEAD } from "@/lib/dates";
import { saveBooking, loadBooking } from "@/lib/booking";

const steps = ["Prestation", "Date", "Infos", "Récap"];
const schema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom (2 caractères minimum)."),
  email: z.string().trim().email("Indiquez une adresse e-mail valide."),
  phone: z.string().trim().regex(/^$|^[0-9+()\s.-]{8,20}$/, "Numéro invalide (8 à 20 chiffres)."),
});
type Contact = z.infer<typeof schema>;

export function BookingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);
  const [today, setToday] = useState<Date | null>(null);
  const [view, setView] = useState<{ y: number; m: number } | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Contact>({ resolver: zodResolver(schema), defaultValues: { name: "", email: "", phone: "" } });

  useEffect(() => {
    const t = startOfDay();
    setToday(t);
    setView({ y: t.getFullYear(), m: t.getMonth() });
    const q = new URLSearchParams(window.location.search).get("prestation");
    const saved = loadBooking();
    const s = q && getService(q) ? q : saved?.service ?? null;
    if (s) setService(s);
    if (saved?.date && fromKey(saved.date) >= t) { setDate(saved.date); setSlot(saved.slot); }
  }, []);
  useEffect(() => { if (service || date) saveBooking({ service, date, slot }); }, [service, date, slot]);

  const svc = service ? getService(service) : null;
  const days = useMemo(() => {
    if (!view) return [];
    const first = new Date(view.y, view.m, 1);
    const lead = (first.getDay() + 6) % 7;
    const n = new Date(view.y, view.m + 1, 0).getDate();
    return [...Array(lead).fill(null), ...Array.from({ length: n }, (_, i) => new Date(view.y, view.m, i + 1))] as Array<Date | null>;
  }, [view]);
  const slots = date && today ? slotsFor(fromKey(date)) : [];
  const canPrev = !!view && !!today && (view.y > today.getFullYear() || view.m > today.getMonth());
  const maxD = today ? addDays(today, MAX_DAYS_AHEAD) : null;
  const canNext = !!view && !!maxD && new Date(view.y, view.m + 1, 1) <= maxD;
  const moveMonth = (d: number) => setView((v) => v && ({ y: new Date(v.y, v.m + d, 1).getFullYear(), m: new Date(v.y, v.m + d, 1).getMonth() }));

  const finish = () => { saveBooking({ service, date, slot }); router.push("/confirmation/"); };
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="mx-auto max-w-3xl">
      <DemoNotice className="mb-6"><strong>Démonstration — aucun rendez-vous réel n’est réservé.</strong></DemoNotice>
      <BookingStepper steps={steps} current={step} />
      <div key={step} className="panel-in mt-8 rounded-card border border-navy/10 bg-white p-4 shadow-soft sm:p-7">
        {step === 0 && (
          <fieldset>
            <legend className="mb-4 text-3xl font-display font-bold uppercase">1. Choisissez une prestation</legend>
            <div className="grid gap-3">
              {services.map((s) => (
                <label key={s.slug} className={cn("flex min-h-14 cursor-pointer items-start gap-3 rounded-lg border-2 p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-gold", service === s.slug ? "border-navy bg-gold/15" : "border-navy/15 hover:border-navy/40")}>
                  <input type="radio" name="service" className="mt-1 h-5 w-5 accent-navy" checked={service === s.slug} onChange={() => setService(s.slug)} />
                  <span className="flex-1"><span className="block font-bold">{s.title}</span><span className="block text-sm text-navy/75">{s.price ?? "Sur devis"}{s.priceNote ? ` — ${s.priceNote}` : ""}</span></span>
                </label>
              ))}
            </div>
            {svc?.quote && (
              <div role="status" className="mt-5 rounded-lg bg-navy p-4 text-offwhite">
                <p className="text-sm">Cette prestation se fait <strong>sur devis</strong>. Il n’y a pas de réservation directe.</p>
                <Button href={`/contact/?type=devis&prestation=${svc.slug}`} className="mt-3">Demander un devis <ArrowRight aria-hidden className="h-4 w-4" /></Button>
              </div>
            )}
          </fieldset>
        )}

        {step === 1 && view && today && (
          <div>
            <h2 className="mb-4 text-3xl">2. Date et créneau</h2>
            <div className="mb-3 flex items-center justify-between">
              <button type="button" disabled={!canPrev} onClick={() => moveMonth(-1)} aria-label="Mois précédent" className="grid h-11 w-11 place-items-center rounded-full hover:bg-navy/10 disabled:opacity-30"><ChevronLeft aria-hidden /></button>
              <p className="text-lg font-bold" aria-live="polite">{monthLabel(view.y, view.m)}</p>
              <button type="button" disabled={!canNext} onClick={() => moveMonth(1)} aria-label="Mois suivant" className="grid h-11 w-11 place-items-center rounded-full hover:bg-navy/10 disabled:opacity-30"><ChevronRight aria-hidden /></button>
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center text-xs font-bold uppercase text-navy/70" aria-hidden>
              {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => <span key={i} className="py-1">{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-0.5" role="group" aria-label="Jours du mois">
              {days.map((d, i) => {
                if (!d) return <span key={`e${i}`} />;
                const k = toKey(d), ok = isBookable(d, today), sel = date === k;
                return (
                  <button key={k} type="button" disabled={!ok} aria-pressed={sel}
                    aria-label={`${formatLong(d)}${isClosed(d) ? " (fermé)" : !ok ? " (indisponible)" : ""}`}
                    onClick={() => { setDate(k); setSlot(null); }}
                    className={cn("min-h-11 rounded-lg text-sm font-semibold transition-colors", sel ? "bg-navy text-gold" : ok ? "hover:bg-gold/30" : "text-navy/30 line-through", toKey(today) === k && !sel && "ring-1 ring-navy")}>
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-navy/70">Créneaux fictifs. Dimanche fermé (exemple). Les dates passées ne sont pas sélectionnables.</p>
            {date && (
              <div className="panel-in mt-6">
                <h3 className="mb-3 text-xl">{formatLong(fromKey(date))}</h3>
                {slots.length === 0 ? <p className="text-sm">Plus de créneau ce jour-là. Choisissez une autre date.</p> : (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4" role="group" aria-label="Créneaux horaires">
                    {slots.map((s) => (
                      <button key={s} type="button" aria-pressed={slot === s} onClick={() => setSlot(s)}
                        className={cn("min-h-11 rounded-lg border-2 text-sm font-bold transition-colors", slot === s ? "border-navy bg-navy text-gold" : "border-navy/20 hover:border-navy")}>{s}</button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <form id="contact-step" noValidate onSubmit={handleSubmit((v) => { setContact(v); setStep(3); })} className="space-y-5">
            <h2 className="text-3xl">3. Vos informations</h2>
            <p className="text-sm text-navy/75">Ces informations restent dans cette page le temps de la démonstration. Elles ne sont ni envoyées ni conservées.</p>
            <div><label htmlFor="b-name" className="mb-1.5 block text-sm font-bold">Nom</label><input id="b-name" autoComplete="name" className="field" aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? "b-name-err" : undefined} {...register("name")} />{errors.name && <p id="b-name-err" role="alert" className="err">{errors.name.message}</p>}</div>
            <div><label htmlFor="b-email" className="mb-1.5 block text-sm font-bold">E-mail</label><input id="b-email" type="email" autoComplete="email" className="field" aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? "b-email-err" : undefined} {...register("email")} />{errors.email && <p id="b-email-err" role="alert" className="err">{errors.email.message}</p>}</div>
            <div><label htmlFor="b-phone" className="mb-1.5 block text-sm font-bold">Téléphone <span className="font-normal text-navy/70">(facultatif)</span></label><input id="b-phone" type="tel" autoComplete="tel" className="field" aria-invalid={errors.phone ? true : undefined} aria-describedby={errors.phone ? "b-phone-err" : undefined} {...register("phone")} />{errors.phone && <p id="b-phone-err" role="alert" className="err">{errors.phone.message}</p>}</div>
          </form>
        )}

        {step === 3 && svc && date && slot && contact && (
          <div>
            <h2 className="mb-4 text-3xl">4. Récapitulatif</h2>
            <dl className="divide-y divide-navy/10 rounded-lg border border-navy/15 text-sm">
              {[["Prestation", svc.title], ["Date", formatLong(fromKey(date))], ["Créneau", slot], ["Tarif", `${svc.price ?? "Sur devis"}${svc.priceNote ? ` (${svc.priceNote})` : ""}`], ["Contact", `${contact.name} — ${contact.email}`]].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-0.5 p-3 sm:flex-row sm:gap-4"><dt className="w-28 shrink-0 font-bold">{k}</dt><dd className="break-words">{v}</dd></div>
              ))}
            </dl>
            <div className="mt-5 rounded-lg border-2 border-dashed border-navy/30 p-4">
              <p className="flex items-center gap-2 font-bold"><Lock aria-hidden className="h-4 w-4" /> Paiement — aperçu de la future étape</p>
              <p className="mt-1 text-sm text-navy/75">Le paiement en ligne n’est pas actif. Aucune donnée bancaire n’est demandée ici.</p>
            </div>
            <DemoNotice className="mt-5">Démonstration — aucun rendez-vous réel n’est réservé.</DemoNotice>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 0 ? <Button variant="outline-dark" onClick={back}><ArrowLeft aria-hidden className="h-4 w-4" /> Retour</Button> : <Link href="/prestations/" className="link-u inline-flex min-h-11 items-center text-sm font-bold">Voir les prestations</Link>}
        {step === 0 && <Button disabled={!svc || svc.quote} onClick={() => setStep(1)}>Suivant <ArrowRight aria-hidden className="h-4 w-4" /></Button>}
        {step === 1 && <Button disabled={!date || !slot} onClick={() => setStep(2)}>Suivant <ArrowRight aria-hidden className="h-4 w-4" /></Button>}
        {step === 2 && <Button type="submit" form="contact-step">Suivant <ArrowRight aria-hidden className="h-4 w-4" /></Button>}
        {step === 3 && <Button onClick={finish}>Valider la démonstration</Button>}
      </div>
      {step === 3 && <p className="mt-3 text-center text-xs"><button type="button" onClick={() => { reset(); setContact(null); setStep(2); }} className="underline">Modifier mes informations</button></p>}
    </div>
  );
}
