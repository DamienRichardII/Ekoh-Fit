/** DONNÉES FICTIVES — démonstration uniquement. Aucune personne réelle. */
export type Status = "Confirmé" | "En attente" | "Terminé" | "Annulé";

export interface DemoAppointment {
  id: string;
  client: string;
  service: string; // slug
  dayOffset: number; // relatif à aujourd'hui
  time: string;
  status: Status;
}

export const demoAppointments: DemoAppointment[] = [
  { id: "RDV-D01", client: "Client démo A", service: "ekohfit-up", dayOffset: 2, time: "10:00", status: "Confirmé" },
  { id: "RDV-D02", client: "Client démo B", service: "offre-particulier", dayOffset: 3, time: "15:00", status: "En attente" },
  { id: "RDV-D03", client: "Client démo C", service: "handfit", dayOffset: 5, time: "17:00", status: "Confirmé" },
  { id: "RDV-D04", client: "Client démo D", service: "harmony", dayOffset: 8, time: "09:00", status: "Confirmé" },
  { id: "RDV-D05", client: "Client démo A", service: "offre-particulier", dayOffset: -6, time: "14:00", status: "Terminé" },
  { id: "RDV-D06", client: "Client démo E", service: "handfit", dayOffset: -9, time: "16:00", status: "Terminé" },
  { id: "RDV-D07", client: "Client démo F", service: "vitality", dayOffset: -14, time: "11:00", status: "Annulé" },
];

export const demoClients = [
  { id: "C-D01", name: "Client démo A", email: "client-a@exemple.invalid", sessions: 4 },
  { id: "C-D02", name: "Client démo B", email: "client-b@exemple.invalid", sessions: 1 },
  { id: "C-D03", name: "Client démo C", email: "client-c@exemple.invalid", sessions: 2 },
  { id: "C-D04", name: "Client démo D", email: "client-d@exemple.invalid", sessions: 6 },
];

export const demoQuotes = [
  { id: "DV-D01", from: "Structure démo 1", type: "Interventions écoles & structures", message: "Exemple fictif de demande de devis pour une intervention en structure.", status: "Nouveau" },
  { id: "DV-D02", from: "Association démo 2", type: "Coaching collectif", message: "Exemple fictif de demande de devis pour un groupe.", status: "En cours" },
];

export const demoReviews = [
  { id: "AV-D01", author: "Auteur fictif 1", text: "Exemple de texte d’avis fictif, uniquement pour visualiser l’interface.", status: "À modérer" },
  { id: "AV-D02", author: "Auteur fictif 2", text: "Autre exemple fictif. Aucun avis réel n’est affiché sur le site public.", status: "Publié (démo)" },
];

export const demoProfile = { name: "Profil démo", email: "profil-demo@exemple.invalid", phone: "Non renseigné" };
