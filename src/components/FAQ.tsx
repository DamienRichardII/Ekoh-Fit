import { ChevronDown } from "lucide-react";
import { faq } from "@/data/faq";

export function FAQ() {
  return (
    <div className="divide-y divide-navy/15 rounded-card border border-navy/15 bg-white">
      {faq.map((f) => (
        <details key={f.q} className="group p-5">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-bold [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown aria-hidden className="h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy/80">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
