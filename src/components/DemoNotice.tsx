import { Info } from "lucide-react";
import { cn } from "@/lib/cn";

export function DemoNotice({ children, className, tone = "light" }: { children: React.ReactNode; className?: string; tone?: "light" | "dark" }) {
  return (
    <div role="note" className={cn("flex items-start gap-3 rounded-lg border px-4 py-3 text-sm font-medium",
      tone === "dark" ? "border-gold/50 bg-gold/10 text-offwhite" : "border-navy/20 bg-gold/20 text-navy", className)}>
      <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
