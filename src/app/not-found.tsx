import { Button } from "@/components/Button";
export const metadata = { title: "Page introuvable" };
export default function NotFound() {
  return (
    <section className="bg-navy text-offwhite">
      <div className="container-x flex min-h-[60vh] flex-col items-start justify-center gap-6 py-20">
        <p className="font-display text-8xl font-extrabold italic text-gold">404</p>
        <h1 className="text-4xl sm:text-5xl">Page introuvable</h1>
        <p className="max-w-md text-offwhite/80">Cette page n’existe pas ou a été déplacée.</p>
        <Button href="/">Retour à l’accueil</Button>
      </div>
    </section>
  );
}
