"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, CalendarCheck, User } from "lucide-react";
import { cn } from "@/lib/cn";

const items = [
  { label: "Accueil", href: "/", Icon: Home },
  { label: "Prestations", href: "/prestations/", Icon: LayoutGrid },
  { label: "Réserver", href: "/reservation/", Icon: CalendarCheck },
  { label: "Compte", href: "/mon-compte/", Icon: User },
];

export function MobileNav() {
  const p = usePathname();
  return (
    <nav aria-label="Navigation rapide" className="fixed inset-x-0 bottom-0 z-30 border-t border-gold/20 bg-navy pb-[env(safe-area-inset-bottom)] lg:hidden">
      <ul className="grid grid-cols-4">
        {items.map(({ label, href, Icon }) => {
          const active = href === "/" ? p === "/" : p.startsWith(href.replace(/\/$/, ""));
          return (
            <li key={href}>
              <Link href={href} aria-current={active ? "page" : undefined}
                className={cn("flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors", active ? "text-gold" : "text-offwhite/80 hover:text-gold")}>
                <Icon aria-hidden className="h-5 w-5" />{label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
