"use client";
import { useEffect, useRef, type ReactNode, type ElementType } from "react";

/** Révélation au défilement. Le contenu est visible par défaut (SSR / sans JS). */
export function Reveal({
  children, delay = 0, as: Tag = "div", className,
}: { children: ReactNode; delay?: number; as?: ElementType; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return; // déjà visible : pas d'animation
    el.classList.add("reveal-pending");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("reveal-in");
            el.classList.remove("reveal-pending");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={className} style={{ ["--d" as string]: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
