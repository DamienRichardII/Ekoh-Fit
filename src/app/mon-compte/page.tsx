import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { AccountView } from "@/components/AccountView";

export const metadata: Metadata = { title: "Espace client (démonstration)", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <section className="section-y on-light"><div className="container-x">
      <SectionHeading as="h1" eyebrow="Démonstration" title="Mon compte" className="mb-8" />
      <AccountView />
    </div></section>
  );
}
