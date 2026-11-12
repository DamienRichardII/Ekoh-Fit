"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, CalendarX } from "lucide-react";
import { loadBooking, clearBooking, type BookingChoice } from "@/lib/booking";
import { getService } from "@/data/services";
import { formatLong, fromKey } from "@/lib/dates";
import { Button } from "./Button";

export function ConfirmationView() {
  const [b, setB] = useState<BookingChoice | null | undefined>(undefined);
  useEffect(() => { setB(loadBooking()); }, []);
  if (b === undefined) return <div className="h-64" aria-hidden />;
  const svc = b?.service ? getService(b.service) : null;
  if (!b || !svc || !b.date || !b.slot) {
    return (
      <div className="mx-auto max-w-xl rounded-card bg-white p-8 text-center shadow-soft">
        <CalendarX aria-hidden className="mx-auto h-12 w-12 text-navy/60" />
        <h1 className="mt-4 text-4xl">Aucune simulation en cours</h1>
        <p className="mt-3 text-navy/75">Cette page affiche le récapitulatif d’un parcours de démonstration. Lancez la simulation pour la voir.</p>
        <Button href="/reservation/" className="mt-6">Aller à la réservation</Button>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-xl rounded-card bg-white p-6 shadow-soft sm:p-9">
      <CheckCircle2 aria-hidden className="h-14 w-14 text-gold-dark" />
      <h1 className="mt-4 text-4xl sm:text-5xl">Récapitulatif</h1>
      <p role="status" className="mt-4 rounded-lg bg-gold/25 p-4 font-semibold">Simulation terminée. Aucun rendez-vous n’a été enregistré et aucun e-mail n’a été envoyé.</p>
      <dl className="mt-6 divide-y divide-navy/10 text-sm">
        {[["Prestation", svc.title], ["Date", formatLong(fromKey(b.date))], ["Créneau", b.slot], ["Tarif", `${svc.price ?? "Sur devis"}`]].map(([k, v]) => (
          <div key={k} className="flex gap-4 py-3"><dt className="w-24 shrink-0 font-bold">{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Button href="/" variant="navy" onClick={() => clearBooking()}>Retour à l’accueil</Button>
        <Button href="/reservation/" variant="outline-dark" onClick={() => clearBooking()}>Nouvelle simulation</Button>
      </div>
    </div>
  );
}
