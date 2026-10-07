# COMPONENTS.md — Registre des composants
# Lu par Claude Code avant toute création de composant.
# Règle : si le composant existe ici → le réutiliser. S'il n'existe pas → le créer ET l'ajouter ici.
# Mise à jour obligatoire après chaque nouveau composant créé.

---

## Comment lire ce fichier

Chaque composant est documenté avec :
- **Fichier** : chemin exact dans le projet
- **Props** : ce que le composant attend en entrée
- **Usage** : dans quel cas l'utiliser
- **Statut** : Boilerplate (dans le template) / Client (créé pour un client spécifique, réutilisable)

---

## Layout

| Composant | Fichier | Props | Usage | Statut |
|-----------|---------|-------|-------|--------|
| Navbar | `src/components/layout/Navbar.astro` | `siteName`, `logo?`, `links[]`, `ctaText?`, `ctaHref?`, `phone?` | Navigation principale, sticky, menu hamburger mobile (se referme au clic sur un lien interne). Bouton "Appeler" affiché seulement si `phone` fourni. Nav desktop complet en `lg:` (pas `md:`, cf. CLAUDE.md §7) | Boilerplate |
| Footer | `src/components/layout/Footer.astro` | `siteName`, `phone?`, `email?`, `address?`, `legalName?`, `facebook?` | Pied de page ; omet chaque ligne dont la donnée est absente (jamais de "à compléter") | Boilerplate |

---

## Layouts de page

| Composant | Fichier | Props | Usage | Statut |
|-----------|---------|-------|-------|--------|
| BaseLayout | `src/layouts/BaseLayout.astro` | `siteName`, `logo?`, `ogImage?`, `tagline`, `primaryColor`, `primaryHoverColor?`, `secondaryColor`, `fontFamily`, `fontFamilyDisplay?`, `bgColor?`, `surfaceColor?`, `footerColor?`, `textColor?`, `textMutedColor?`, `borderColor?`, `focusColor?`, `navLinks[]`, `phone?`, `email?`, `address?`, `legalName?`, `facebook?`, `isDemo?` | Layout unique (site one-page, sticky-footer `flex min-h-screen flex-col`/`flex-1`). Injecte la palette complète de variables CSS (fallback par défaut si absentes), meta SEO/OG/Twitter, `<Analytics />`, rend Navbar/Footer/DemoNotice | Boilerplate |

---

## Sections

| Composant | Fichier | Props | Usage | Statut |
|-----------|---------|-------|-------|--------|
| Hero | `src/components/sections/Hero.astro` | `title`, `subtitle?`, `ctaText?`, `ctaLink?`, `image?`, `imageAlt?` | Section d'accroche, toujours en premier | Boilerplate |
| About | `src/components/sections/About.astro` | `title`, `subtitle?`, `text`, `image?`, `imageAlt?`, `stats?[]{value, label}` | Présentation de l'entreprise + chiffres clés | Boilerplate |
| Services | `src/components/sections/Services.astro` | `title`, `subtitle?`, `items[]{icon, title, description}` | Grille de services (2-3 colonnes). `icon` = nom Lucide (cf. `Icon.astro`), jamais un emoji | Boilerplate |
| Testimonials | `src/components/sections/Testimonials.astro` | `title?`, `items[]{name, text, rating}` | Grille d'avis clients avec étoiles | Boilerplate |
| Contact | `src/components/sections/Contact.astro` | `phone?`, `email?`, `address?`, `hours?` | Coordonnées + formulaire vers `/api/contact`. Rendue automatiquement depuis `site.*`, jamais une entrée de `sections{}` | Boilerplate |

---

## UI Atoms

| Composant | Fichier | Props | Usage | Statut |
|-----------|---------|-------|-------|--------|
| Button | `src/components/ui/Button.astro` | `variant?` (primary/secondary/ghost), `size?` (sm/md/lg), `href?`, `type?`, `class?` | Bouton/lien réutilisable partout | Boilerplate |
| SectionWrapper | `src/components/ui/SectionWrapper.astro` | `id?`, `bg?` ('surface' \| 'bg', défaut 'surface'), `class?` | Conteneur de section avec padding et max-width. `bg` est sémantique (thème), pas une classe Tailwind littérale | Boilerplate |
| Badge | `src/components/ui/Badge.astro` | `text`, `color?` (primary/secondary/neutral) | Étiquette colorée pour labels et catégories | Boilerplate |
| DemoNotice | `src/components/ui/DemoNotice.astro` | `isDemo?` (boolean, défaut `false`) | Pop-up affichée quand `meta.is_demo` est vrai, masquée pour la session via `sessionStorage` | Boilerplate |
| Icon | `src/components/ui/Icon.astro` | `name` (nom de fichier `lucide-static`, ex. `"wrench"`), `class?` (défaut `h-8 w-8`) | Icône SVG Lucide inline, lue au build depuis `node_modules/lucide-static/icons/`. Repli sur `circle-help` si le nom n'existe pas. Zéro JS, zéro requête réseau | Boilerplate |

---

## Composants créés pour des clients spécifiques
# Cette section est vide au départ.
# Elle se remplit automatiquement à chaque nouveau composant créé sur un projet client.
# Règle de promotion : un composant remonte dans le template après 3 utilisations sur des projets différents.

| Composant | Fichier | Props | Usage | Clients | Statut |
|-----------|---------|-------|-------|---------|--------|
| ZoneIntervention | `src/components/sections/ZoneIntervention.astro` | `title`, `text`, `areas[]` (noms de villes) | Section dédiée à la zone géographique desservie, avec badges — cf. DESIGN.md quand le client a une zone d'intervention à mettre en avant | detongre-construction-virton | Client |
| Realisations | `src/components/sections/Realisations.astro` | `title`, `items[]{image, alt, caption?}` | Galerie de photos de chantier. Conditionnelle : à ne rendre que si `items.length > 0` (jamais de galerie vide ni de visuels stock) | detongre-construction-virton | Client |
| MobileCTABar | `src/components/ui/MobileCTABar.astro` | `ctaText`, `ctaHref?`, `phone?` | Barre CTA fixe en bas d'écran, mobile/tablette uniquement (`lg:hidden`) — bouton "Appeler" absent tant que `phone` n'est pas fourni. Chez lilot-pates-namur : second bouton vers la carte (`#carte`) au lieu du formulaire | detongre-construction-virton, lilot-pates-namur | Client |
| Announcement | `src/components/sections/Announcement.astro` | `title`, `text?` | Bandeau d'actualité pleine largeur (fond sombre, icône mégaphone), piloté par Sanity (`announcementVisible`) — ex. déménagement | lilot-pates-namur | Client |
| Menu | `src/components/sections/Menu.astro` | `title`, `subtitle?`, `categories[]{title, note?, footnote?, prices[]{label, price}, items[]{name, description?, price?}}`, `supplements?`, `allergyNote?` | Carte de restaurant en HTML (jamais en image), puces d'ancre par rubrique, prix unique en médaillons ou prix à la ligne avec filet pointillé. Zéro JS | lilot-pates-namur | Client |
| Gallery | `src/components/sections/Gallery.astro` | `title`, `subtitle?`, `images[]{src, srcset?, alt}`, `facebook?`, `facebookLabel?` | Galerie de vraies photos (plats, équipe), vignettes carrées, sans visionneuse (zéro JS). Conditionnelle : jamais rendue vide ni avec du stock | lilot-pates-namur | Client |
| ServiceModes | `src/components/sections/ServiceModes.astro` | `title`, `subtitle?`, `dine{title,text,image,image_srcset,image_alt}`, `take{…}` | Deux façons de consommer côte à côte (ex. sur place à l'assiette / à emporter en bol), même recette en photo | lilot-pates-namur | Client |
| Catering | `src/components/sections/Catering.astro` | `title`, `subtitle?`, `note?`, `ctaText?`, `phone?`, `items[]{title, description?, image?, image_srcset?, image_alt?}` | Offres traiteur / événements en cartes (photo ou icône Lucide de repli), mention de conditions, CTA contact + téléphone | lilot-pates-namur | Client |

---

## Variantes disponibles
# Variantes des composants boilerplate créées pour des besoins spécifiques.
# Même règle : réutiliser avant de recréer.

| Variante | Fichier | Différence vs original | Clients | Statut |
|----------|---------|----------------------|---------|--------|
| RestaurantLayout | `src/layouts/RestaurantLayout.astro` | BaseLayout + `NavbarDark`/`FooterDark`/`MobileCTABar`, props `navCtaText?`/`navCtaLink?`/`hours?`/`bceNumber?`/`legalForm?`, lien d'évitement « Aller au contenu », `theme-color` | lilot-pates-namur | Client |
| NavbarDark | `src/components/layout/NavbarDark.astro` | En-tête sur `--color-secondary`, logo SVG clair, bouton « Appeler » en icône ronde (numéro en `aria-label`), CTA pilule or | lilot-pates-namur | Client |
| FooterDark | `src/components/layout/FooterDark.astro` | 3 colonnes (logo + filet tricolore / coordonnées / horaires + Facebook), mention légale avec forme abrégée et BCE | lilot-pates-namur | Client |
| PillButton | `src/components/ui/PillButton.astro` | Pilule, variantes `primary` (texte foncé sur or) / `outline-dark` / `outline-light`, attributs HTML transmis (`target`, `rel`...) | lilot-pates-namur | Client |
| HeroSplit | `src/components/sections/HeroSplit.astro` | Fond sombre, photo à droite (au-dessus sur mobile), `eyebrow?`, `badges[]`, second CTA téléphone, `srcset`, encadré `monthly?` (menu du mois, rendu seulement s'il a des plats) | lilot-pates-namur | Client |
| ConceptCards | `src/components/sections/ConceptCards.astro` | Variante de Services : cartes à icône or dans un cercle `--color-secondary`, élévation au survol | lilot-pates-namur | Client |
| AboutStory | `src/components/sections/AboutStory.astro` | Variante d'About : photo 4/5 + vignette d'archive en surimpression (`image2?`, `image2Caption?`), chiffres clés en Playfair | lilot-pates-namur | Client |
| TestimonialsQuotes | `src/components/sections/TestimonialsQuotes.astro` | Variante de Testimonials : note globale réelle (`ratingValue?`, `ratingLabel?`) avec étoiles partielles, `rating` facultatif par citation (aucune étoile inventée), `source?` | lilot-pates-namur | Client |
| DemoNoticeThemed | `src/components/ui/DemoNoticeThemed.astro` | Couleurs du thème (surface, texte) au lieu des gris codés en dur, bouton pilule texte foncé sur `primary` (contraste AA avec un primaire clair) | lilot-pates-namur | Client |
| ContactHours | `src/components/sections/ContactHours.astro` | Variante de Contact : tableau d'horaires (`openingHours[]{day, hours, note?}`), accès, bouton Itinéraire (Google Maps), titres pilotés par Sanity, même formulaire/anti-spam, bouton désactivé pendant l'envoi | lilot-pates-namur | Client |

---

## Composants refusés / à ne pas créer
# Liste des composants qui ont été demandés et refusés car hors stack ou hors scope.
# Permet de ne pas répondre deux fois à la même question.

| Composant | Raison du refus |
|-----------|----------------|
| Slider/Carousel | Nécessite du JS complexe, nuit aux performances, remplacer par une grille statique |
| Carte Google Maps intégrée | Nécessite une clé API payante, remplacer par un lien Google Maps |
| Espace client / login | Hors scope vitrine statique |
| Blog avec BDD | Hors scope — le schéma Sanity de ce projet n'est pas fait pour du contenu illimité |
| Mode multi-pages | Complexité non justifiée pour une démo — le site reste one-page |
