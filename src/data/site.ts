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
    email: "contact@ekohfit.com" as string | null,
    phone: null as string | null,
    city: null as string | null,
  },
  // Liens sociaux réels : à renseigner (ne pas inventer)
  socials: [
    { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/karichma-ekoh-a5482632a/" },
    // Lien fourni tel quel : redirection Instagram (l.instagram.com) vers la chaîne YouTube. À remplacer par l'URL du profil Instagram.
    { key: "instagram", label: "Instagram", href: "https://l.instagram.com/?u=https%3A%2F%2Fyoutube.com%2F%40ekohfit%3Fsi%3Dm_lB8okadyZ7xiBO&e=AUCVyuZSW0rxcUd6VlyuU9znG12vWURkf5CEFtqzmc0abWKKaG9gnCT63lSWqMWsEmTQyEd3JP_5OgxvOnB0yavikwBhGe6vKghOZHMIVJDJcFcj41nvPRqZ7_EI" },
    { key: "youtube", label: "YouTube", href: "https://www.youtube.com/@ekohfit" },
  ] as { key: "linkedin" | "instagram" | "youtube"; label: string; href: string }[],
  coachName: "Karichma EKOH" as string | null,
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

/** Navigation du header (desktop + menu mobile). Le footer garde la navigation complète (`nav`). */
const hiddenInHeader = ["/a-propos/", "/avis/", "/contact/"];
export const headerNav = nav.filter((n) => !hiddenInHeader.includes(n.href));

export const domains = [
  { icon: "Dumbbell", title: "Coach sportif", text: "Accompagnement personnalisé" },
  { icon: "Users", title: "Interventions", text: "Clubs · Structures · Écoles" },
  { icon: "Activity", title: "Préparation physique", text: "Individuelle & collective" },
  { icon: "Trophy", title: "Handball", text: "HandFit : Mixte · Flow · Power" },
  { icon: "ClipboardCheck", title: "Suivi personnalisé", text: "Bilan, objectifs, progression" },
] as const;
