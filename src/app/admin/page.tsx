import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { AdminDashboard } from "@/components/AdminDashboard";

export const metadata: Metadata = { title: "Administration (démonstration)", robots: { index: false, follow: false, nocache: true } };

export default function Page() {
  return (
    <section className="section-y on-light"><div className="container-x">
      <SectionHeading as="h1" eyebrow="Démonstration" title="Administration" className="mb-8" />
      <AdminDashboard />
    </div></section>
  );
}
