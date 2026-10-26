# library/ — composants déjà écrits pour des clients

Ces composants ne sont **pas branchés** dans le template : `src/` reste le boilerplate
générique. On copie ici ce dont un nouveau client a besoin, au lieu de relire le repo
d'un ancien client ou de réécrire un composant qui existe déjà.

`MobileCTABar` a été promue dans `src/components/ui/` (4 clients) : les layouts de library/
l'importent depuis là, avec `ctaIcon` pour l'icône du second bouton.

Règles :
- `variants/<client>/` : version d'un composant de library/ adaptée à un autre thème. Ne
  remplace pas l'original ; choisir la version la plus proche du DESIGN.md du nouveau client.
- Copier le fichier dans `src/` du site client, **jamais** le modifier ici pour un client
  précis. Si l'adaptation est générique (bug, prop utile à tous), la reporter ici aussi.
- Chaque composant est documenté dans `COMPONENTS.md` (sections « Composants créés pour des
  clients » et « Variantes »), avec la liste des clients qui l'utilisent.
- Promotion en boilerplate (`src/`) après 3 clients différents, comme avant.
- Quand un nouveau client crée un composant réutilisable, il est copié ici en fin de build.

## Contenu

| Fichier | Rôle | Origine |
|---|---|---|
| `layouts/RestaurantLayout.astro` | BaseLayout + NavbarDark/FooterDark/MobileCTABar | lilot-pates-namur |
| `components/layout/NavbarDark.astro` | En-tête sur fond sombre, logo SVG, bouton appeler rond | lilot-pates-namur |
| `components/layout/FooterDark.astro` | Pied de page 3 colonnes avec horaires | lilot-pates-namur |
| `components/sections/HeroSplit.astro` | Hero sombre photo à droite, badges, encadré « menu du mois » masquable | lilot-pates-namur |
| `components/sections/Announcement.astro` | Bandeau d'actualité (déménagement, fermeture, nouveauté) | lilot-pates-namur |
| `components/sections/ConceptCards.astro` | Étapes / concept en cartes à icône | lilot-pates-namur |
| `components/sections/Menu.astro` | Carte de restaurant en HTML, rubriques à ancres | lilot-pates-namur |
| `components/sections/ServiceModes.astro` | Deux modes côte à côte (sur place / à emporter…) | lilot-pates-namur |
| `components/sections/Catering.astro` | Offres traiteur / événements + CTA | lilot-pates-namur |
| `components/sections/AboutStory.astro` | Histoire avec photo d'archive en surimpression | lilot-pates-namur |
| `components/sections/Gallery.astro` | Galerie de vraies photos, sans JS | lilot-pates-namur |
| `components/sections/Realisations.astro` | Galerie de chantiers (artisans) | detongre-construction-virton |
| `components/sections/ZoneIntervention.astro` | Zone desservie en badges | detongre-construction-virton |
| `components/sections/TestimonialsQuotes.astro` | Avis réels, note globale, sans étoiles inventées | lilot-pates-namur |
| `components/sections/ContactHours.astro` | Contact + tableau d'horaires + itinéraire | lilot-pates-namur |
| `components/ui/PillButton.astro` | Bouton pilule, variantes fond clair / sombre | lilot-pates-namur |
| `components/sections/HeroFullBleed.astro` | Hero photo plein cadre, nom géant, ligne de statut, badges, 2 CTA | voltic-namur |
| `components/sections/ReferenceStrip.astro` | Bandeau de références en texte (lieux, médias), sans logos tiers | voltic-namur |
| `components/sections/Agenda.astro` | Dates à venir, ou dernier mois joué si aucune date future (jamais vide) | voltic-namur |
| `components/sections/BookingForm.astro` | Formulaire de booking (date, lieu, type, nombre) sur `/api/contact`, repli Instagram, kit presse | voltic-namur |
| `components/sections/MediaList.astro` | Cartes vidéos / mixes, miniature YouTube statique, rien de tiers avant clic | voltic-namur |
| `components/ui/SectionHeading.astro` | En-tête de section numéroté « 01 — Titre » | voltic-namur |
| `components/ui/InstagramIcon.astro` | Icône Instagram SVG inline (absente de lucide-static) | voltic-namur |
| `components/sections/Spotlight.astro` | Offre phare : photo, liste de ce qui est compris, prix, CTA | laetitia-coiffure-arlon |
| `variants/voltic-namur/` | Versions thème sombre (texte blanc sur rouge, repli Instagram sans téléphone) de NavbarDark, FooterDark, MobileCTABar, PillButton, ConceptCards, AboutStory, Gallery + `VolticLayout` | voltic-namur |
| `ci/rebuild-quotidien.yml` | GitHub Actions : rebuild nocturne via le Deploy Hook (secret `VERCEL_DEPLOY_HOOK`), utile dès qu'un contenu dépend de la date (agenda). Le push exige le scope gh `workflow` | voltic-namur |
| `sanity/laetitia-coiffure-arlon/` | Schéma salon de coiffure : bandeau congés, tarifs (via `menuCategory`), soin signature, réalisations, horaires, SMS | laetitia-coiffure-arlon |
| `sanity/<client>/` | `objects.ts`, `siteContent.ts`, `content.ts` du client : types Sanity et mapping des champs à reprendre avec les composants | — |

## Dépendances

- Variables CSS : `--color-on-dark`, `--color-on-dark-muted`, `--color-error`, `--shadow-1`,
  `--shadow-2`, classes `.eyebrow` et `.tabular` — déjà dans `src/styles/global.css`
  du template (valeurs neutres, à surcharger selon DESIGN.md).
- `FooterDark` et `Menu` utilisent la classe `.tricolore` (filet vert/blanc/rouge propre à
  un restaurant italien) : la retirer, ou la définir dans le global.css du client.
- Polices d'affichage (`font-display`) : à installer via `@fontsource/*` selon DESIGN.md.
- Les champs Sanity attendus sont ceux de `sanity/lilot-pates-namur/` : copier seulement
  les types et champs des composants retenus.
