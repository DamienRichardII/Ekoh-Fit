/**
 * Données centrales du site. Les champs à `null` ne sont PAS affichés :
 * renseignez-les quand les informations réelles sont confirmées.
 */
export const site = {
  name: "EKOHFIT",
  title: "EKOHFIT — Coaching sportif",
  description:
    "EKOHFIT : coaching sportif individuel et collectif, handball et interventions en structures. Réservez une séance découverte.",
  // Coordonnées réelles : à renseigner (aucune donnée confirmée à ce jour)
  contact: {
    email: null as string | null,
    phone: null as string | null,
    city: null as string | null,
  },
  // Liens sociaux réels : à renseigner (ne pas inventer)
  socials: [] as { label: string; href: string }[],
  coachName: null as string | null, // nom de la coach à confirmer
};

export const nav = [
  { label: "Accueil", href: "/" },
  { label: "Coaching", href: "/coaching/" },
  { label: "À propos", href: "/a-propos/" },
  { label: "Prestations", href: "/prestations/" },
  { label: "Avis", href: "/avis/" },
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Contact", href: "/contact/" },
];

export const domains = [
  { icon: "Dumbbell", title: "Coach sportif", text: "Accompagnement personnalisé" },
  { icon: "Users", title: "Interventions", text: "Clubs · Structures · Écoles" },
  { icon: "Activity", title: "Préparation physique", text: "Individuelle & collective" },
  { icon: "Trophy", title: "Handball", text: "HandFit : Mixte · Flow · Power" },
  { icon: "ClipboardCheck", title: "Suivi personnalisé", text: "Bilan, objectifs, progression" },
] as const;
