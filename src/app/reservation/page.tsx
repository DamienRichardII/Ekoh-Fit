import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { BookingFlow } from "@/components/BookingFlow";

export const metadata: Metadata = { title: "Réservation (démonstration)", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <section className="section-y on-light">
      <div className="container-x">
        <SectionHeading as="h1" eyebrow="Démonstration" title="Réserver une séance" className="mx-auto mb-10 max-w-3xl" />
        <BookingFlow />
      </div>
    </section>
  );
}
