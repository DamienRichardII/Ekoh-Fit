import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { Gallery } from "@/components/Gallery";

export const metadata: Metadata = { title: "Portfolio", description: "Galerie EKOHFIT : coaching, entraînements, handball, interventions et événements." };

export default function Page() {
  return (
    <section className="section-y on-light">
      <div className="container-x">
        <SectionHeading as="h1" eyebrow="Galerie" title="Portfolio" lead="Photos et vidéos des séances EKOHFIT. Touchez un média pour l’agrandir ou lancer la vidéo." />
        <div className="mt-10"><Gallery /></div>
      </div>
    </section>
  );
}
