"use client";
import { useEffect, useState } from "react";
import { demoAppointments, demoClients, demoQuotes, demoReviews, type DemoAppointment, type Status } from "@/data/demo";
import { services, getService } from "@/data/services";
import { addDays, formatLong, startOfDay } from "@/lib/dates";
import { Tabs } from "./Tabs";
import { Modal } from "./Modal";
import { DemoNotice } from "./DemoNotice";
import { cn } from "@/lib/cn";

const badge = (s: string) => cn("inline-block rounded-pill px-2.5 py-1 text-xs font-bold", s === "Confirmé" && "bg-gold text-navy", s === "En attente" && "bg-navy/10 text-navy", s === "Terminé" && "bg-navy text-offwhite", s === "Annulé" && "bg-red-100 text-red-900");
const card = "rounded-card border border-navy/10 bg-white p-4 shadow-soft";

export function AdminDashboard() {
  const [today, setToday] = useState<Date | null>(null);
  const [filter, setFilter] = useState<Status | "Tous">("Tous");
  const [sel, setSel] = useState<DemoAppointment | null>(null);
  const [quote, setQuote] = useState<(typeof demoQuotes)[number] | null>(null);
  useEffect(() => { setToday(startOfDay()); }, []);
  if (!today) return <div className="h-64" aria-hidden />;
  const d = (a: DemoAppointment) => formatLong(addDays(today, a.dayOffset));
  const upcoming = demoAppointments.filter((a) => a.dayOffset >= 0).sort((a, b) => a.dayOffset - b.dayOffset);
  const filtered = filter === "Tous" ? demoAppointments : demoAppointments.filter((a) => a.status === filter);
  const bars = [3, 5, 4, 7, 6, 8, 5];
  const kpis = [["Rendez-vous (fictifs)", String(demoAppointments.length)], ["Clients (fictifs)", String(demoClients.length)], ["Demandes de devis", String(demoQuotes.length)], ["Prestations", String(services.length)]];

  const dash = (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">{kpis.map(([k, v]) => <div key={k} className={card}><p className="text-xs font-semibold uppercase text-navy/70">{k}</p><p className="mt-1 font-display text-4xl font-bold">{v}</p></div>)}</div>
      <div className="grid gap-4 xl:grid-cols-2">
        <section className={card} aria-labelledby="up"><h3 id="up" className="mb-3 text-2xl">Prochains rendez-vous</h3>
          <ul className="divide-y divide-navy/10">{upcoming.map((a) => <li key={a.id} className="flex flex-wrap justify-between gap-2 py-3 text-sm"><span><strong>{a.client}</strong> — {getService(a.service)?.title}<br /><span className="text-navy/70">{d(a)} · {a.time}</span></span><span className={badge(a.status)}>{a.status}</span></li>)}</ul></section>
        <section className={card} aria-labelledby="ev"><h3 id="ev" className="mb-3 text-2xl">Évolution (valeurs fictives)</h3>
          <div className="flex h-40 items-end gap-2" role="img" aria-label="Histogramme fictif de 7 jours">{bars.map((b, i) => <div key={i} className="flex-1 rounded-t bg-gold transition-[height] duration-500" style={{ height: `${b * 11}%` }} />)}</div></section>
      </div>
    </div>
  );

  const rdv = (
    <div>
      <label className="mb-3 flex flex-wrap items-center gap-3 text-sm font-bold" htmlFor="st">Statut
        <select id="st" className="field !w-auto" value={filter} onChange={(e) => setFilter(e.target.value as Status | "Tous")}>
          {["Tous", "Confirmé", "En attente", "Terminé", "Annulé"].map((s) => <option key={s}>{s}</option>)}
        </select></label>
      <div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[40rem] border-collapse rounded-card bg-white text-left text-sm shadow-soft">
        <caption className="sr-only">Rendez-vous fictifs</caption>
        <thead className="bg-navy text-offwhite"><tr>{["Client", "Prestation", "Date", "Statut", ""].map((h, i) => <th key={i} scope="col" className="p-3">{h || <span className="sr-only">Action</span>}</th>)}</tr></thead>
        <tbody>{filtered.map((a) => <tr key={a.id} className="border-t border-navy/10"><td className="p-3">{a.client}</td><td className="p-3">{getService(a.service)?.title}</td><td className="p-3">{d(a)} · {a.time}</td><td className="p-3"><span className={badge(a.status)}>{a.status}</span></td><td className="p-3"><button type="button" className="min-h-11 font-bold underline" onClick={() => setSel(a)}>Détails</button></td></tr>)}</tbody></table></div>
      <ul className="grid gap-3 md:hidden">{filtered.map((a) => <li key={a.id} className={card}><p className="font-bold">{a.client}</p><p className="text-sm">{getService(a.service)?.title}</p><p className="text-sm text-navy/70">{d(a)} · {a.time}</p><div className="mt-2 flex items-center justify-between"><span className={badge(a.status)}>{a.status}</span><button type="button" className="min-h-11 font-bold underline" onClick={() => setSel(a)}>Détails</button></div></li>)}</ul>
      {filtered.length === 0 && <p className={card}>Aucun rendez-vous pour ce statut.</p>}
    </div>
  );

  const simple = (items: { id: string; t: string; s: string; extra?: React.ReactNode }[]) => <ul className="grid gap-3">{items.map((i) => <li key={i.id} className={card}><p className="font-bold">{i.t}</p><p className="text-sm text-navy/75">{i.s}</p>{i.extra}</li>)}</ul>;

  return (
    <div>
      <DemoNotice className="mb-6"><strong>Interface de démonstration publique et non protégée.</strong> Aucune donnée réelle : tout est fictif. Ne saisissez aucune information personnelle.</DemoNotice>
      <Tabs label="Administration" orientation="vertical" tabs={[
        { id: "dash", label: "Tableau de bord", content: dash },
        { id: "rdv", label: "Rendez-vous", content: rdv },
        { id: "clients", label: "Clients", content: simple(demoClients.map((c) => ({ id: c.id, t: c.name, s: `${c.email} · ${c.sessions} séance(s)` }))) },
        { id: "presta", label: "Prestations", content: simple(services.map((s) => ({ id: s.slug, t: s.title, s: s.price ?? "Sur devis" }))) },
        { id: "devis", label: "Demandes de devis", content: simple(demoQuotes.map((q) => ({ id: q.id, t: `${q.from} — ${q.type}`, s: q.status, extra: <button type="button" className="mt-1 min-h-11 text-sm font-bold underline" onClick={() => setQuote(q)}>Voir la demande</button> }))) },
        { id: "avis", label: "Avis (aperçu)", content: simple(demoReviews.map((r) => ({ id: r.id, t: `${r.author} — ${r.status}`, s: r.text }))) },
      ]} />
      <Modal open={!!sel} onClose={() => setSel(null)} title="Détail du rendez-vous">
        {sel && <div><h2 className="pr-12 text-3xl">{sel.client}</h2><p className="mt-3 text-sm">{getService(sel.service)?.title}<br />{d(sel)} à {sel.time}</p><p className="mt-3"><span className={badge(sel.status)}>{sel.status}</span></p><p className="mt-4 text-xs text-navy/70">Donnée fictive.</p></div>}
      </Modal>
      <Modal open={!!quote} onClose={() => setQuote(null)} title="Demande de devis">
        {quote && <div><h2 className="pr-12 text-3xl">{quote.from}</h2><p className="mt-2 text-sm font-bold">{quote.type}</p><p className="mt-3 text-sm">{quote.message}</p><p className="mt-4 text-xs text-navy/70">Donnée fictive.</p></div>}
      </Modal>
    </div>
  );
}
