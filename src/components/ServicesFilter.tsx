"use client";
import { useState } from "react";
import { services, categoryLabels, type Category } from "@/data/services";
import { ServiceCard } from "./ServiceCard";
import { cn } from "@/lib/cn";

const order: Array<Category | "all"> = ["all", "individuel", "collectif", "ecoles", "handball"];

export function ServicesFilter() {
  const [cat, setCat] = useState<Category | "all">("all");
  const list = cat === "all" ? services : services.filter((s) => s.categories.includes(cat));
  return (
    <div>
      <div role="group" aria-label="Filtrer les prestations" className="flex flex-wrap gap-2">
        {order.map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
            className={cn("min-h-11 rounded-pill px-5 text-sm font-bold uppercase tracking-wide transition-colors duration-300",
              cat === c ? "bg-navy text-gold" : "bg-white text-navy ring-1 ring-navy/15 hover:bg-navy/10")}>
            {categoryLabels[c]}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-navy/70" role="status" aria-live="polite">{list.length} prestation{list.length > 1 ? "s" : ""}</p>
      <ul key={cat} className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((s, i) => (
          <li key={s.slug} className="panel-in" style={{ animationDelay: `${i * 60}ms` }}><ServiceCard service={s} /></li>
        ))}
      </ul>
    </div>
  );
}
