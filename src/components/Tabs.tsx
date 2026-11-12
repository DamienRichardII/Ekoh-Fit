"use client";
import { useRef, useState, type ReactNode, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

export interface TabDef { id: string; label: string; content: ReactNode }

export function Tabs({ tabs, label, orientation = "horizontal", className }: { tabs: TabDef[]; label: string; orientation?: "horizontal" | "vertical"; className?: string }) {
  const [active, setActive] = useState(tabs[0].id);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const move = (e: KeyboardEvent, i: number) => {
    const keys = orientation === "vertical" ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"];
    let n = i;
    if (e.key === keys[1]) n = (i + 1) % tabs.length;
    else if (e.key === keys[0]) n = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(tabs[n].id);
    refs.current[tabs[n].id]?.focus();
  };
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  return (
    <div className={cn(orientation === "vertical" && "lg:grid lg:grid-cols-[15rem_1fr] lg:gap-8", className)}>
      <div role="tablist" aria-label={label} aria-orientation={orientation}
        className={cn("-mx-4 flex gap-2 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0", orientation === "vertical" && "lg:sticky lg:top-24 lg:mx-0 lg:flex-col lg:self-start lg:overflow-visible lg:px-0 lg:pb-0")}>
        {tabs.map((t, i) => (
          <button key={t.id} ref={(el) => { refs.current[t.id] = el; }} role="tab" id={`tab-${t.id}`} aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`} tabIndex={active === t.id ? 0 : -1} onClick={() => setActive(t.id)} onKeyDown={(e) => move(e, i)}
            className={cn("min-h-11 shrink-0 whitespace-nowrap rounded-lg px-4 py-2 text-left text-sm font-bold uppercase tracking-wide transition-colors duration-300",
              active === t.id ? "bg-navy text-gold" : "bg-white text-navy hover:bg-navy/10")}>
            {t.label}
          </button>
        ))}
      </div>
      <div key={current.id} role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`} tabIndex={0} className="panel-in mt-4 min-w-0 lg:mt-0">
        {current.content}
      </div>
    </div>
  );
}
