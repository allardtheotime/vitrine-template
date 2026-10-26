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
| `components/sections/ContactHours.astro` | Contact + tableau d'horaires + itinéraire, lien WhatsApp optionnel (`whatsappText`) | lilot-pates-namur, rosa-hair-coiffure-habay |
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
| `components/sections/HeroSplitStatus.astro` | Hero sombre, photo en carte 3:2 (jamais agrandie), 2e bouton libre (itinéraire), statut « Ouvert / Fermé » calculé (heure de Bruxelles) | hair-family-arlon |
| `components/sections/PriceHighlights.astro` | Bandeau de 4 prix repères sous le hero, lien vers la carte | hair-family-arlon |
| `components/sections/GalleryBento.astro` | Galerie en mosaïque (1re photo 2×2), sans JS | hair-family-arlon |
| `components/ui/DemoNoticeThemed.astro` | Pop-up démo avec texte foncé sur le bouton (primaire clair : turquoise, jaune…) | lilot-pates-namur, hair-family-arlon |
| `sanity/hair-family-arlon/` | Schéma salon sans rendez-vous : bandeau, prix repères, tarifs, galerie, horaires, `mapsUrl`, `legalAddress` (siège ≠ adresse du commerce) + `seed-salon.mjs` (seed complet, le seed du template ne couvre que 4 sections) | hair-family-arlon |
| `components/ui/MobileCTABarContrast.astro` | Barre mobile pour un primaire foncé (texte blanc sur le bouton plein) | rosa-hair-coiffure-habay |
| `variants/rosa-hair-coiffure-habay/` | Versions « primaire foncé » (rose bois, texte blanc dessus ; rose clair `--color-primary-light` pour tout ce qui est posé sur fond sombre) de HeroSplit (sans les restes de L'ilôt pâtes), Menu (ancre `#tarifs`), Announcement, ConceptCards (ancre `#prestations`), Spotlight, ContactHours, NavbarDark, FooterDark (filet rose au lieu du tricolore), PillButton, RestaurantLayout (importe `MobileCTABarContrast`) | rosa-hair-coiffure-habay |
| `sanity/rosa-hair-coiffure-habay/` | Schéma salon de laetitia-coiffure-arlon + `mapsUrl`, `mobileCtaIcon`, lien WhatsApp (`contactWhatsappText`) à la place du SMS, prestation phare + `seed-salon.mjs` complet (bandeau, hero, prestations, tarifs, prestation phare, galerie, salon, avis avec note globale, horaires, WhatsApp) | rosa-hair-coiffure-habay |
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
- `PriceHighlights` utilise `--color-primary-text` (texte de la couleur primaire sur fond clair,
  contraste AA) et la classe `.eyebrow-on-light` : à définir dans le global.css du client.
- `RestaurantLayout` importe `DemoNotice` : pour un primaire clair, remplacer l'import par
  `DemoNoticeThemed`. Avec un logo clair, passer aussi les pages légales et la 404 sur ce layout
  (le `BaseLayout` a un en-tête clair où le logo devient invisible).
- Les variantes `variants/rosa-hair-coiffure-habay/` utilisent `--color-primary-light`, `--color-primary-text` et les
  classes `.text-primary-light` / `.border-primary-light` : les définir dans le global.css du client
  (cf. `rosa-hair-coiffure-habay/site/src/styles/global.css`). `DemoNotice` standard convient
  (texte blanc sur primaire foncé).
- Ancres de section héritées de L'ilôt pâtes dans les originaux (`#carte`, `#concept`,
  `#cuisine`, `#histoire`) : les renommer dans la copie du client (`#tarifs`, `#prestations`,
  `#avant-apres`, `#salon` chez rosa-hair-coiffure-habay).
