import type { Metadata, Viewport } from "next";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "@fontsource/barlow-condensed/700-italic.css";
import "@fontsource/barlow-condensed/800-italic.css";
import "@fontsource-variable/inter";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { site } from "@/data/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ekoh-fit.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.title, template: "%s | EKOHFIT" },
  description: site.description,
  openGraph: { title: site.title, description: site.description, locale: "fr_FR", type: "website", url: "/", siteName: "EKOHFIT" },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};
export const viewport: Viewport = { themeColor: "#0F1B28", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="pb-16 lg:pb-0">
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
