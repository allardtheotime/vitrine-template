# library/ — composants déjà écrits pour des clients

Ces composants ne sont **pas branchés** dans le template : `src/` reste le boilerplate
générique. On copie ici ce dont un nouveau client a besoin, au lieu de relire le repo
d'un ancien client ou de réécrire un composant qui existe déjà.

Règles :
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
| `components/ui/MobileCTABar.astro` | Barre d'action fixe en bas sur mobile | detongre, lilot-pates-namur |
| `components/ui/PillButton.astro` | Bouton pilule, variantes fond clair / sombre | lilot-pates-namur |
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
