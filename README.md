# EKOHFIT — site front-end (v1, démonstration)

Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind CSS 3 · export statique.
Front-end uniquement : aucun backend, paiement, authentification ni envoi d’e-mail.

## Installation et lancement
```bash
npm install
npm run dev        # http://localhost:3000
```

## Build et export statique
```bash
npm run build      # génère le dossier out/
npx serve out      # prévisualisation locale
npm run typecheck && npm run lint
```
`out/` est un site 100 % statique (routes en `/page/index.html`).

## Contenus modifiables
- `src/data/site.ts` : coordonnées, réseaux sociaux, nom de la coach (champs `null`/vides = non affichés).
- `src/data/services.ts` : prestations, tarifs, détails (source : grille tarifaire fournie).
- `src/data/media.ts` : photos, vidéos, photo du hero et portrait (avec point de focus `pos` pour les recadrages). Médias optimisés dans `public/media/photos` et `public/media/videos`.
- `src/data/faq.ts`, `src/app/avis/page.tsx` (tableau `reviews`, vide tant qu’aucun avis vérifié).
- `src/data/demo.ts` : données FICTIVES de l’espace client et de l’admin.
- Couleurs : `tailwind.config.ts` (Navy #0F1B28, Champagne Gold #D7B756, Off White #F5F5F5).

## Ressources manquantes
- **Médias** : 17 photos (sur 27) et 6 vidéos (sur 8) du shooting du 21/10/2026 sont intégrées, redimensionnées (JPEG ≤ 2000 px, vidéos MP4 720p sans son, ~1–2 Mo chacune). Les sources lourdes restent dans `assets/` (ignoré par Git). Vidéos : lecture au clic uniquement (`preload="metadata"`), jamais en autoplay.
- Le visage de la coach (hero, à propos) est identifié d'après les photos ; à confirmer par la cliente, ainsi que le droit à l'image des autres personnes visibles.
- Coordonnées réelles, liens Instagram / TikTok / Snapchat, nom de la coach, qualifications, avis vérifiés.
- Le portfolio Canva n’était pas lisible automatiquement (rendu côté client) : son contenu n’a pas été repris.
- Prestations « Coaching collectif » et « Interventions écoles » : issues de la maquette, marquées « à confirmer », sur devis.
- Les chiffres de la maquette (13 ans, 50 structures, 1000 pratiquants, certification APAS, avis, 50 €…) ne sont volontairement pas repris.
- Logo : `public/logo-ekohfit.png` (fond rendu transparent) et `public/logo-mark.png` (favicon : `src/app/icon.png`), issus de `assets/logo.png`.

## Fonctionnalités simulées
Contact (envoi simulé), réservation en 4 étapes (créneaux fictifs, dimanche fermé, aucun paiement), confirmation, espace client `/mon-compte`, administration `/admin` (publique, non protégée, données fictives). Ces pages sont en `noindex`.
Seuls des choix non sensibles (prestation, date, créneau) sont gardés en `sessionStorage` ; nom, e-mail et téléphone ne sont jamais stockés.

## Intégrations futures
Backend de réservation et agenda, e-mails transactionnels, authentification réelle et protection de l’admin, paiement (Stripe/PayPal), modération des avis, domaine de production (métadonnées `metadataBase`, sitemap).
