"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, UserRound } from "lucide-react";
import { headerNav, site } from "@/data/site";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { SocialIcon } from "./SocialIcon";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btn.current?.focus(); }
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a,button");
        const all = [btn.current as HTMLElement, ...Array.from(f)];
        const first = all[0], last = all[all.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")));

  return (
    <header className={cn("sticky top-0 z-40 border-b transition-colors duration-300", scrolled || open ? "border-gold/20 bg-navy/90 backdrop-blur-md" : "border-transparent bg-navy")}>
      <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-navy">Aller au contenu</a>
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Navigation principale" className="hidden items-center gap-6 xl:gap-7 lg:flex">
          {headerNav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={isActive(n.href) ? "page" : undefined}
              className={cn("link-u text-sm font-semibold", isActive(n.href) ? "text-gold" : "text-offwhite hover:text-gold")}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-1 lg:flex" aria-label="Réseaux sociaux">
            {site.socials.map((so) => (
              <li key={so.key}>
                <a href={so.href} target="_blank" rel="noopener noreferrer" aria-label={`${so.label} (nouvel onglet)`}
                  className="grid h-11 w-11 place-items-center rounded-full text-offwhite transition-colors duration-300 hover:bg-white/10 hover:text-gold">
                  <SocialIcon name={so.key} />
                </a>
              </li>
            ))}
          </ul>
          <Link href="/mon-compte/" aria-label="Mon compte" aria-current={pathname.startsWith("/mon-compte") ? "page" : undefined}
            className={cn("grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300", pathname.startsWith("/mon-compte") ? "border-gold bg-gold text-navy" : "border-gold/50 text-gold hover:bg-gold hover:text-navy")}>
            <UserRound aria-hidden className="h-5 w-5" />
          </Link>
          <Button href="/reservation/" className="hidden !min-h-11 !px-4 !py-2 lg:inline-flex">Réserver <ArrowRight aria-hidden className="h-4 w-4" /></Button>
          <button ref={btn} type="button" aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((o) => !o)} className="grid h-11 w-11 place-items-center rounded-lg text-offwhite hover:bg-white/10 lg:hidden">
            {open ? <X aria-hidden className="h-6 w-6" /> : <Menu aria-hidden className="h-6 w-6" />}
          </button>
        </div>
      </div>
      <div id="menu-mobile" ref={panel} data-open={open} inert={!open} className="menu-panel absolute inset-x-0 top-full border-b border-gold/20 bg-navy lg:hidden">
        <nav aria-label="Menu mobile" className="container-x flex max-h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto py-4">
          {headerNav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={isActive(n.href) ? "page" : undefined}
              className={cn("flex min-h-12 items-center rounded-lg px-3 text-lg font-semibold", isActive(n.href) ? "bg-white/5 text-gold" : "text-offwhite hover:bg-white/5")}>{n.label}</Link>
          ))}
          <ul className="mt-2 flex gap-2 px-1" aria-label="Réseaux sociaux">
            {site.socials.map((so) => (
              <li key={so.key}>
                <a href={so.href} target="_blank" rel="noopener noreferrer" aria-label={`${so.label} (nouvel onglet)`}
                  className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-navy">
                  <SocialIcon name={so.key} />
                </a>
              </li>
            ))}
          </ul>
          <Button href="/reservation/" className="mt-3 w-full">Réserver <ArrowRight aria-hidden className="h-4 w-4" /></Button>
        </nav>
      </div>
    </header>
  );
}
