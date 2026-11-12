import { cn } from "@/lib/cn";

export function SectionHeading({
  title, eyebrow, lead, tone = "light", as: Tag = "h2", className,
}: {
  title: string; eyebrow?: string; lead?: string; tone?: "light" | "dark"; as?: "h1" | "h2"; className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && (
        <p className={cn("mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em]", dark ? "text-gold" : "text-navy")}>
          <span aria-hidden className="h-0.5 w-8 bg-gold" /> {eyebrow}
        </p>
      )}
      <Tag className={cn("text-4xl sm:text-5xl lg:text-6xl", dark ? "text-offwhite" : "text-navy")}>{title}</Tag>
      {lead && <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-offwhite/80" : "text-navy/75")}>{lead}</p>}
    </div>
  );
}
