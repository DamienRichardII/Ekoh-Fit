import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function BookingStepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <nav aria-label="Progression de la réservation">
      <ol className="flex items-start justify-between gap-1">
        {steps.map((label, i) => {
          const done = i < current, active = i === current;
          return (
            <li key={label} aria-current={active ? "step" : undefined} className="flex flex-1 flex-col items-center gap-2 text-center">
              <span className={cn("grid h-10 w-10 place-items-center rounded-full border-2 text-sm font-bold transition-colors duration-300",
                done && "border-gold bg-gold text-navy", active && "border-navy bg-navy text-gold", !done && !active && "border-navy/25 bg-white text-navy/60")}>
                {done ? <Check aria-hidden className="h-5 w-5" /> : i + 1}
              </span>
              <span className={cn("text-[11px] font-semibold uppercase tracking-wide sm:text-xs", active ? "text-navy" : "text-navy/65")}>
                {label}<span className="sr-only">{done ? " (terminé)" : active ? " (étape en cours)" : ""}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
