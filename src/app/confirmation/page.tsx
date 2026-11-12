import type { Metadata } from "next";
import { ConfirmationView } from "@/components/ConfirmationView";

export const metadata: Metadata = { title: "Confirmation (démonstration)", robots: { index: false, follow: false } };

export default function Page() {
  return <section className="section-y on-light"><div className="container-x"><ConfirmationView /></div></section>;
}
