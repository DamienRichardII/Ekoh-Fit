"use client";
import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { media, mediaLabels, type MediaCategory } from "@/data/media";
import { Modal } from "./Modal";
import { cn } from "@/lib/cn";

const cats: Array<MediaCategory | "all"> = ["all", "coaching", "entrainements", "handball", "interventions", "evenements"];

export function Gallery() {
  const [cat, setCat] = useState<MediaCategory | "all">("all");
  const [idx, setIdx] = useState<number | null>(null);
  const list = cat === "all" ? media : media.filter((m) => m.category === cat);
  const step = (d: number) => setIdx((i) => (i === null ? i : (i + d + list.length) % list.length));
  const onKey = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLVideoElement) return; // ne pas gêner les contrôles vidéo
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  };
  const cur = idx !== null ? list[idx] : null;
  return (
    <div>
      <div role="group" aria-label="Filtrer le portfolio" className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
            className={cn("min-h-11 rounded-pill px-5 text-sm font-bold uppercase tracking-wide transition-colors duration-300", cat === c ? "bg-navy text-gold" : "bg-white text-navy ring-1 ring-navy/15 hover:bg-navy/10")}>
            {mediaLabels[c]}
          </button>
        ))}
      </div>
      <ul key={cat} className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {list.map((m, i) => (
          <li key={m.id} className="panel-in" style={{ animationDelay: `${i * 45}ms` }}>
            <button type="button" onClick={() => setIdx(i)} aria-label={`${m.kind === "video" ? "Lire" : "Agrandir"} : ${m.alt}`} className="zoom-frame relative block w-full overflow-hidden rounded-card bg-navy-700 shadow-soft">
              <div className={cn("relative w-full", m.w > m.h ? "aspect-[3/2]" : "aspect-[4/5]")}>
                <Image src={m.kind === "video" ? m.poster! : m.src} alt="" fill sizes="(min-width:1024px) 33vw, 50vw" style={{ objectPosition: m.pos }} className="object-cover" />
              </div>
              {m.kind === "video" && (
                <span aria-hidden className="absolute inset-0 grid place-items-center bg-navy/25">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-gold text-navy shadow-lift"><Play className="h-6 w-6 translate-x-0.5 fill-current" /></span>
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      <Modal open={cur !== null} onClose={() => setIdx(null)} title="Visionneuse du portfolio" onKeyDown={onKey} wide>
        {cur && (
          <figure>
            <div className="flex max-h-[72dvh] justify-center overflow-hidden rounded-lg bg-navy">
              {cur.kind === "video" ? (
                <video key={cur.id} controls playsInline preload="metadata" poster={cur.poster} className="max-h-[72dvh] w-auto max-w-full" aria-label={cur.alt}>
                  <source src={cur.src} type="video/mp4" />
                </video>
              ) : (
                <Image key={cur.id} src={cur.src} alt={cur.alt} width={cur.w} height={cur.h} sizes="90vw" className="max-h-[72dvh] w-auto max-w-full object-contain" />
              )}
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-3">
              <span className="text-sm font-semibold">{cur.alt} <span className="text-navy/70">({(idx ?? 0) + 1}/{list.length})</span></span>
              <span className="flex shrink-0 gap-2">
                <button type="button" onClick={() => step(-1)} aria-label="Média précédent" className="grid h-11 w-11 place-items-center rounded-full bg-navy text-gold hover:bg-navy-700"><ChevronLeft aria-hidden /></button>
                <button type="button" onClick={() => step(1)} aria-label="Média suivant" className="grid h-11 w-11 place-items-center rounded-full bg-navy text-gold hover:bg-navy-700"><ChevronRight aria-hidden /></button>
              </span>
            </figcaption>
          </figure>
        )}
      </Modal>
    </div>
  );
}
