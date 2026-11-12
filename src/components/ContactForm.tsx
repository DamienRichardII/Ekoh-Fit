"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import { Button } from "./Button";
import { DemoNotice } from "./DemoNotice";

const schema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom (2 caractères minimum)."),
  email: z.string().trim().email("Indiquez une adresse e-mail valide."),
  phone: z.string().trim().regex(/^$|^[0-9+()\s.-]{8,20}$/, "Numéro invalide (8 à 20 chiffres)."),
  type: z.enum(["information", "devis", "reservation", "autre"], { message: "Choisissez un type de demande." }),
  message: z.string().trim().min(10, "Votre message doit faire au moins 10 caractères."),
});
type Values = z.infer<typeof schema>;

const types = [
  { v: "information", l: "Demande d’information" },
  { v: "devis", l: "Demande de devis" },
  { v: "reservation", l: "Question sur une réservation" },
  { v: "autre", l: "Autre" },
];

export function ContactForm() {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema), defaultValues: { name: "", email: "", phone: "", message: "" },
  });
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get("type") === "devis") setValue("type", "devis");
    const p = q.get("prestation");
    if (p) setValue("message", `Demande de devis pour : ${p.replace(/-/g, " ")}.\n`);
  }, [setValue]);

  if (done) {
    return (
      <div role="status" className="panel-in rounded-card border border-navy/15 bg-white p-6 shadow-soft">
        <h2 className="text-3xl">Simulation terminée</h2>
        <p className="mt-3 text-navy/80">Aucun message n’a été transmis et aucune donnée n’a été conservée.</p>
        <Button variant="navy" className="mt-5" onClick={() => { reset(); setDone(false); }}>Nouvelle simulation</Button>
      </div>
    );
  }
  const f = (id: keyof Values) => ({ "aria-invalid": errors[id] ? (true as const) : undefined, "aria-describedby": errors[id] ? `${id}-err` : undefined });
  const E = ({ id }: { id: keyof Values }) => (errors[id] ? <p id={`${id}-err`} role="alert" className="err">{errors[id]?.message}</p> : null);
  return (
    <form onSubmit={handleSubmit(() => setDone(true))} noValidate className="space-y-5 rounded-card border border-navy/10 bg-white p-5 shadow-soft sm:p-7">
      <DemoNotice>Démonstration : l’envoi est simulé. Aucun message n’est transmis et vos saisies ne sont pas conservées.</DemoNotice>
      <div><label htmlFor="name" className="mb-1.5 block text-sm font-bold">Nom</label><input id="name" autoComplete="name" className="field" {...register("name")} {...f("name")} /><E id="name" /></div>
      <div><label htmlFor="email" className="mb-1.5 block text-sm font-bold">E-mail</label><input id="email" type="email" autoComplete="email" className="field" {...register("email")} {...f("email")} /><E id="email" /></div>
      <div><label htmlFor="phone" className="mb-1.5 block text-sm font-bold">Téléphone <span className="font-normal text-navy/70">(facultatif)</span></label><input id="phone" type="tel" autoComplete="tel" className="field" {...register("phone")} {...f("phone")} /><E id="phone" /></div>
      <div><label htmlFor="type" className="mb-1.5 block text-sm font-bold">Type de demande</label>
        <select id="type" className="field" defaultValue="" {...register("type")} {...f("type")}>
          <option value="" disabled>Choisir…</option>
          {types.map((t) => <option key={t.v} value={t.v}>{t.l}</option>)}
        </select><E id="type" /></div>
      <div><label htmlFor="message" className="mb-1.5 block text-sm font-bold">Message</label><textarea id="message" rows={5} className="field" {...register("message")} {...f("message")} /><E id="message" /></div>
      <Button type="submit" className="w-full sm:w-auto">Envoyer (démonstration) <Send aria-hidden className="h-4 w-4" /></Button>
    </form>
  );
}
