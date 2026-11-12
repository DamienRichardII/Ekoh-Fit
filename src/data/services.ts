import { photos, type Photo } from "./media";

export type Category = "individuel" | "collectif" | "ecoles" | "handball";

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  categories: Category[];
  duration: string | null;
  /** Tarif affiché. `null` = sur devis */
  price: string | null;
  priceNote?: string;
  quote: boolean;
  audience: string;
  steps: string[];
  practical: string[];
  /** true = issu de la grille tarifaire fournie ; false = suggéré par la maquette, à confirmer */
  verified: boolean;
  media: Photo | null;
}

export const categoryLabels: Record<Category | "all", string> = {
  all: "Toutes",
  individuel: "Individuel",
  collectif: "Collectif",
  ecoles: "Écoles / structures",
  handball: "Handball",
};

/** Source : grille tarifaire EKOHFIT « version finale vérifiée » fournie par le client. */
export const services: Service[] = [
  {
    slug: "ekohfit-up",
    title: "EKOHFIT'UP — Découverte",
    short: "Une séance découverte et la présentation du HandFit et de ses bienfaits.",
    description:
      "Une première séance pour découvrir l'univers EKOHFIT : vous testez le HandFit et comprenez ses bienfaits avant de vous engager.",
    categories: ["individuel"],
    duration: null,
    price: "300 €",
    quote: false,
    audience: "Toute personne qui souhaite découvrir le HandFit.",
    steps: ["1 séance découverte", "Présentation du HandFit et de ses bienfaits"],
    practical: ["Durée et lieu : à confirmer avec la coach"],
    verified: true,
    media: photos.p22,
  },
  {
    slug: "harmony",
    title: "EKOHFIT Harmony",
    short: "Un accompagnement sur 8 mois : 7 séances + 1 offerte, soit 8 séances.",
    description:
      "Un parcours suivi sur 8 mois pour installer de nouvelles habitudes et progresser durablement.",
    categories: ["individuel"],
    duration: "8 mois",
    price: "À partir de 3 990 €",
    quote: false,
    audience: "Personnes souhaitant un accompagnement régulier sur la durée.",
    steps: ["Accompagnement sur 8 mois", "7 séances + 1 séance offerte (8 au total)", "1 atelier de réseautage"],
    practical: ["Tarif « à partir de » : montant final à confirmer avec la coach"],
    verified: true,
    media: photos.p38,
  },
  {
    slug: "vitality",
    title: "EKOHFIT Vitality",
    short: "Un accompagnement sur 10 mois : 9 séances + 1 offerte, avec carnet de suivi.",
    description:
      "Le parcours le plus complet : 10 mois d'accompagnement, un carnet de suivi et des ateliers de réseautage.",
    categories: ["individuel"],
    duration: "10 mois",
    price: "À partir de 4 990 €",
    quote: false,
    audience: "Personnes souhaitant un suivi approfondi et un accompagnement long.",
    steps: [
      "Accompagnement sur 10 mois",
      "1 carnet de suivi et d'accompagnement",
      "9 séances + 1 séance offerte (10 au total)",
      "2 ateliers de réseautage, dont un format hybride",
    ],
    practical: ["Tarif « à partir de » : montant final à confirmer avec la coach"],
    verified: true,
    media: photos.p47,
  },
  {
    slug: "offre-particulier",
    title: "Offre particulier — sur mesure",
    short: "Bilan offert, 1 séance offerte, formule de 3 séances individuelles minimum.",
    description:
      "Une formule individuelle construite autour de vos objectifs, à partir de 3 séances.",
    categories: ["individuel"],
    duration: null,
    price: "À partir de 40 €",
    priceNote: "Tarif de départ ; détails à confirmer",
    quote: false,
    audience: "Particuliers qui veulent un coaching individuel adapté.",
    steps: [
      "Bilan offert + 1 séance offerte",
      "Formule de 3 séances individuelles minimum",
      "1 analyse vidéo",
      "Ateliers de réseautage, dont un en format hybride",
    ],
    practical: ["Durée d'une séance : à confirmer"],
    verified: true,
    media: photos.p15,
  },
  {
    slug: "handfit",
    title: "EKOHFIT HandFit",
    short: "HandMixte, HandFlow, HandPower : 20 € la séance ou 50 € les 3 séances.",
    description:
      "Trois formats de HandFit ouverts au public — HandMixte, HandFlow et HandPower — au même tarif.",
    categories: ["collectif", "handball"],
    duration: null,
    price: "20 € la séance",
    priceNote: "ou 50 € les 3 séances",
    quote: false,
    audience: "Tout public.",
    steps: ["Trois formats : HandMixte, HandFlow, HandPower", "Même tarif pour les trois formats"],
    practical: ["Durée, horaires et lieux : à confirmer"],
    verified: true,
    media: photos.p37,
  },
  {
    slug: "coaching-collectif",
    title: "Coaching collectif",
    short: "Séances pour groupes, clubs et équipes.",
    description:
      "Catégorie suggérée par la maquette — contenu et conditions à confirmer avec la coach. Demandez un devis pour votre groupe.",
    categories: ["collectif"],
    duration: null,
    price: null,
    quote: true,
    audience: "Groupes, clubs, équipes.",
    steps: ["Échange sur vos besoins", "Proposition adaptée", "Séances"],
    practical: ["Contenu à confirmer"],
    verified: false,
    media: photos.p43,
  },
  {
    slug: "interventions-ecoles",
    title: "Interventions écoles & structures",
    short: "Séances sportives adaptées aux écoles, entreprises et associations.",
    description:
      "Catégorie suggérée par la maquette — contenu et conditions à confirmer avec la coach. Demandez un devis pour votre structure.",
    categories: ["ecoles"],
    duration: null,
    price: null,
    quote: true,
    audience: "Écoles, associations, entreprises, mairies.",
    steps: ["Échange sur vos besoins", "Proposition adaptée", "Interventions"],
    practical: ["Contenu à confirmer"],
    verified: false,
    media: photos.p46,
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
