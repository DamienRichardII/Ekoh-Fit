import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { ServicesFilter } from "@/components/ServicesFilter";

export const metadata: Metadata = { title: "Prestations", description: "Catalogue des prestations EKOHFIT : coaching individuel, collectif, écoles et structures, handball." };

export default function Page() {
  return (
    <section className="section-y on-light">
      <div className="container-x">
        <SectionHeading as="h1" eyebrow="Catalogue" title="Nos prestations" lead="Les tarifs viennent de la grille tarifaire EKOHFIT. Les montants « à partir de » sont à confirmer avec la coach." />
        <div className="mt-10"><ServicesFilter /></div>
      </div>
    </section>
  );
}
