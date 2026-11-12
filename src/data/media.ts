export type MediaCategory = "coaching" | "entrainements" | "handball" | "interventions" | "evenements";

/** Photo optimisée (public/media/photos). `pos` = point de focus pour les recadrages (object-position). */
export interface Photo { src: string; w: number; h: number; pos: string }

const p = (n: string, w: number, h: number, pos: string): Photo => ({ src: `/media/photos/ekohfit-${n}.jpg`, w, h, pos });

/** Source : shooting du 21/10/2026 (fichiers « NLG-HB-EKOHFIT », numéro d'origine entre parenthèses). */
export const photos = {
  p03: p("03", 1400, 2100, "50% 18%"),
  p12: p("12", 1400, 2100, "72% 26%"),
  p14: p("14", 1400, 2100, "60% 18%"),
  p15: p("15", 1400, 2100, "55% 24%"),
  p17: p("17", 1400, 2100, "52% 26%"),
  p20: p("20", 1400, 2100, "50% 30%"),
  p22: p("22", 1400, 2100, "50% 22%"),
  p37: p("37", 1400, 2100, "55% 34%"),
  p38: p("38", 1400, 2100, "50% 20%"),
  p40: p("40", 1400, 2100, "50% 26%"),
  p43: p("43", 2000, 1333, "35% 40%"),
  p46: p("46", 2000, 1333, "45% 40%"),
  p47: p("47", 1400, 2100, "50% 32%"),
  p48: p("48", 1400, 2100, "50% 24%"),
  p49: p("49", 1400, 2100, "50% 26%"),
  p71: p("71", 1400, 2100, "55% 30%"),
  p72: p("72", 2000, 1333, "50% 50%"),
} satisfies Record<string, Photo>;

export interface MediaItem {
  id: string;
  kind: "image" | "video";
  /** Image : photo. Vidéo : fichier mp4 + affiche. */
  src: string;
  poster?: string;
  w: number;
  h: number;
  pos: string;
  alt: string;
  category: MediaCategory;
}

export const mediaLabels: Record<MediaCategory | "all", string> = {
  all: "Tout",
  coaching: "Coaching",
  entrainements: "Entraînements",
  handball: "Handball",
  interventions: "Interventions",
  evenements: "Événements",
};

const img = (id: string, ph: Photo, alt: string, category: MediaCategory): MediaItem => ({ id, kind: "image", ...ph, alt, category });
const vid = (n: string, w: number, h: number, alt: string, category: MediaCategory): MediaItem => ({
  id: `v${n}`, kind: "video", src: `/media/videos/ekohfit-C${n}.mp4`, poster: `/media/videos/ekohfit-C${n}.jpg`, w, h, pos: "50% 30%", alt, category,
});

export const media: MediaItem[] = [
  img("m12", photos.p12, "La coach EKOHFIT en séance, en gymnase", "coaching"),
  img("m38", photos.p38, "La coach guide un exercice avec un ballon de gym", "coaching"),
  img("m48", photos.p48, "Exercice avec élastique, encadré par la coach", "coaching"),
  img("m03", photos.p03, "La coach EKOHFIT debout dans le gymnase", "coaching"),
  img("m17", photos.p17, "Parcours de motricité avec plots et mousses", "entrainements"),
  img("m15", photos.p15, "Mise en place d'un exercice de coordination", "entrainements"),
  img("m20", photos.p20, "Rouleau de massage sur tapis de sol", "entrainements"),
  img("m14", photos.p14, "Exercice d'équilibre sur coussin", "entrainements"),
  img("m37", photos.p37, "Lancer de balle en atelier handball", "handball"),
  img("m71", photos.p71, "Atelier de handball : parcours de plots", "handball"),
  img("m43", photos.p43, "Atelier gainage sur ballon, but de handball en fond", "handball"),
  img("m46", photos.p46, "Échanges autour d'un atelier au ballon de gym", "interventions"),
  img("m47", photos.p47, "Atelier élastiques en petit groupe", "interventions"),
  img("m49", photos.p49, "Étirement avec élastique", "interventions"),
  img("m22", photos.p22, "Passage de relais d'un exercice entre deux coachs", "interventions"),
  img("m72", photos.p72, "Photo de groupe à la fin de la séance", "evenements"),
  vid("2085", 720, 1280, "Vidéo : exercice de lancer, démonstration de la coach", "handball"),
  vid("2087", 720, 1280, "Vidéo : la coach accompagne une participante", "coaching"),
  vid("2088", 720, 1280, "Vidéo : exercices d'équilibre et de lancer", "entrainements"),
  vid("2082", 720, 1280, "Vidéo : récupération et étirements en salle", "entrainements"),
  vid("2079", 720, 1280, "Vidéo : travail de mobilité au rouleau", "entrainements"),
  vid("2081", 1280, 720, "Vidéo : gainage sur rouleau", "entrainements"),
];

/** Photo principale du hero (la coach) et portrait « À propos ». */
export const heroPhoto: Photo | null = photos.p12;
export const aboutPhoto: Photo | null = photos.p03;
