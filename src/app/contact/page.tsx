import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Contact", description: "Contactez EKOHFIT pour une information, un devis ou une question sur une séance." };

export default function Page() {
  const { email, phone, city } = site.contact;
  return (
    <section className="section-y on-light">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <SectionHeading as="h1" eyebrow="Contact" title="Parlons de votre projet" lead="Posez votre question ou demandez un devis." />
          <ul className="mt-8 space-y-3">
            {email && <li className="flex items-center gap-3"><Mail aria-hidden className="h-5 w-5" /><a className="link-u" href={`mailto:${email}`}>{email}</a></li>}
            {phone && <li className="flex items-center gap-3"><Phone aria-hidden className="h-5 w-5" /><a className="link-u" href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a></li>}
            {city && <li className="flex items-center gap-3"><MapPin aria-hidden className="h-5 w-5" />{city}</li>}
            {!email && !phone && !city && <li className="rounded-lg bg-white p-4 text-sm text-navy/75">Les coordonnées officielles seront publiées prochainement.</li>}
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
