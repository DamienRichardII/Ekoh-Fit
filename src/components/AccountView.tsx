"use client";
import { useEffect, useState } from "react";
import { demoAppointments, demoProfile, type DemoAppointment } from "@/data/demo";
import { getService } from "@/data/services";
import { addDays, formatLong, startOfDay } from "@/lib/dates";
import { Tabs } from "./Tabs";
import { Modal } from "./Modal";
import { DemoNotice } from "./DemoNotice";
import { Button } from "./Button";
import { cn } from "@/lib/cn";

const badge = (s: string) => cn("inline-block rounded-pill px-2.5 py-1 text-xs font-bold", s === "Confirmé" && "bg-gold text-navy", s === "En attente" && "bg-navy/10 text-navy", s === "Terminé" && "bg-navy text-offwhite", s === "Annulé" && "bg-red-100 text-red-900");

export function AccountView() {
  const [today, setToday] = useState<Date | null>(null);
  const [sel, setSel] = useState<DemoAppointment | null>(null);
  useEffect(() => { setToday(startOfDay()); }, []);
  if (!today) return <div className="h-64" aria-hidden />;
  const mine = demoAppointments.filter((a) => a.client === "Client démo A");
  const upcoming = demoAppointments.filter((a) => a.dayOffset >= 0 && a.status !== "Annulé").slice(0, 3);
  const history = demoAppointments.filter((a) => a.dayOffset < 0);
  void mine;
  const list = (items: DemoAppointment[], empty: string) => items.length === 0 ? <p className="rounded-card bg-white p-6">{empty}</p> : (
    <ul className="grid gap-3">
      {items.map((a) => (
        <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-navy/10 bg-white p-4 shadow-soft">
          <div><p className="font-bold">{getService(a.service)?.title}</p><p className="text-sm text-navy/75">{formatLong(addDays(today, a.dayOffset))} · {a.time}</p></div>
          <div className="flex items-center gap-3"><span className={badge(a.status)}>{a.status}</span><Button variant="outline-dark" className="!px-4 !py-2" onClick={() => setSel(a)}>Détails</Button></div>
        </li>
      ))}
    </ul>
  );
  return (
    <div>
      <DemoNotice className="mb-6">Espace client de démonstration : aucune connexion réelle, données entièrement fictives.</DemoNotice>
      <Tabs label="Espace client" tabs={[
        { id: "avenir", label: "À venir", content: list(upcoming, "Aucun rendez-vous à venir.") },
        { id: "histo", label: "Historique", content: list(history, "Aucun historique.") },
        { id: "profil", label: "Profil fictif", content: (
          <dl className="divide-y divide-navy/10 rounded-card border border-navy/10 bg-white p-2 text-sm shadow-soft">
            {Object.entries({ Nom: demoProfile.name, "E-mail": demoProfile.email, Téléphone: demoProfile.phone }).map(([k, v]) => <div key={k} className="flex gap-4 p-3"><dt className="w-28 font-bold">{k}</dt><dd>{v}</dd></div>)}
          </dl>) },
      ]} />
      <Modal open={!!sel} onClose={() => setSel(null)} title="Détails de la séance">
        {sel && <div><h2 className="pr-12 text-3xl">Détails de la séance</h2>
          <dl className="mt-4 space-y-2 text-sm"><div><dt className="font-bold">Prestation</dt><dd>{getService(sel.service)?.title}</dd></div><div><dt className="font-bold">Date</dt><dd>{formatLong(addDays(today, sel.dayOffset))} à {sel.time}</dd></div><div><dt className="font-bold">Statut</dt><dd><span className={badge(sel.status)}>{sel.status}</span></dd></div><div><dt className="font-bold">Référence fictive</dt><dd>{sel.id}</dd></div></dl>
          <p className="mt-4 text-xs text-navy/70">Donnée fictive de démonstration.</p></div>}
      </Modal>
    </div>
  );
}
