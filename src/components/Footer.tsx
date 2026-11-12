import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { nav, site } from "@/data/site";
import { Logo } from "./Logo";

export function Footer() {
  const { email, phone, city } = site.contact;
  return (
    <footer className="bg-navy-900 text-offwhite">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-offwhite/70">Coaching sportif individuel et collectif, handball et interventions en structures.</p>
        </div>
        <nav aria-label="Pied de page">
          <h2 className="mb-3 font-display text-xl text-gold">Navigation</h2>
          <ul className="grid grid-cols-2 gap-x-4">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="link-u inline-flex min-h-11 items-center text-sm hover:text-gold">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 font-display text-xl text-gold">Contact</h2>
          <ul className="space-y-2 text-sm text-offwhite/85">
            {email && <li className="flex gap-2"><Mail aria-hidden className="h-4 w-4 mt-0.5" /><a href={`mailto:${email}`} className="link-u">{email}</a></li>}
            {phone && <li className="flex gap-2"><Phone aria-hidden className="h-4 w-4 mt-0.5" /><a href={`tel:${phone.replace(/\s/g, "")}`} className="link-u">{phone}</a></li>}
            {city && <li className="flex gap-2"><MapPin aria-hidden className="h-4 w-4 mt-0.5" />{city}</li>}
            {!email && !phone && !city && <li className="text-offwhite/70">Coordonnées bientôt disponibles. En attendant, utilisez le <Link href="/contact/" className="link-u text-gold">formulaire de contact</Link>.</li>}
          </ul>
          <p className="mt-5 text-xs text-offwhite/60">Interfaces de démonstration : <Link href="/mon-compte/" className="link-u">espace client</Link> · <Link href="/admin/" className="link-u">administration</Link></p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-offwhite/60">© {new Date().getFullYear()} EKOHFIT — Tous droits réservés</div>
    </footer>
  );
}
