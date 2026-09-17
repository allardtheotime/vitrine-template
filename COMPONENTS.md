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
| Navbar | `src/components/layout/Navbar.astro` | `siteName`, `links[]`, `ctaText?`, `ctaHref?` | Navigation principale, sticky, menu hamburger mobile | Boilerplate |
| Footer | `src/components/layout/Footer.astro` | `siteName`, `phone?`, `email?`, `address?`, `legalName?` | Pied de page ; omet chaque ligne dont la donnée est absente (jamais de "à compléter") | Boilerplate |

---

## Layouts de page

| Composant | Fichier | Props | Usage | Statut |
|-----------|---------|-------|-------|--------|
| BaseLayout | `src/layouts/BaseLayout.astro` | `siteName`, `tagline`, `primaryColor`, `secondaryColor`, `fontFamily`, `bgColor?`, `surfaceColor?`, `footerColor?`, `navLinks[]`, `phone?`, `email?`, `address?`, `legalName?`, `isDemo?` | Layout unique (site one-page). Injecte les variables CSS de thème (dont bg/surface/footer, avec fallback par défaut), rend Navbar/Footer/DemoNotice | Boilerplate |

---

## Sections

| Composant | Fichier | Props | Usage | Statut |
|-----------|---------|-------|-------|--------|
| Hero | `src/components/sections/Hero.astro` | `title`, `subtitle?`, `ctaText?`, `ctaLink?`, `image?` | Section d'accroche, toujours en premier | Boilerplate |
| About | `src/components/sections/About.astro` | `title`, `subtitle?`, `text`, `image?`, `stats?[]{value, label}` | Présentation de l'entreprise + chiffres clés | Boilerplate |
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
| MobileCTABar | `src/components/ui/MobileCTABar.astro` | `ctaText`, `ctaHref?`, `phone?` | Barre CTA fixe en bas d'écran, mobile/tablette uniquement (`lg:hidden`) — bouton "Appeler" absent tant que `phone` n'est pas fourni | detongre-construction-virton | Client |

---

## Variantes disponibles
# Variantes des composants boilerplate créées pour des besoins spécifiques.
# Même règle : réutiliser avant de recréer.

| Variante | Fichier | Différence vs original | Clients | Statut |
|----------|---------|----------------------|---------|--------|
| — | — | — | — | — |

---

## Composants refusés / à ne pas créer
# Liste des composants qui ont été demandés et refusés car hors stack ou hors scope.
# Permet de ne pas répondre deux fois à la même question.

| Composant | Raison du refus |
|-----------|----------------|
| Slider/Carousel | Nécessite du JS complexe, nuit aux performances, remplacer par une grille statique |
| Carte Google Maps intégrée | Nécessite une clé API payante, remplacer par un lien Google Maps |
| Espace client / login | Hors scope vitrine statique |
| Blog avec BDD | Hors scope — content-draft.json n'est pas fait pour du contenu illimité |
| Mode multi-pages | Complexité non justifiée pour une démo — le site reste one-page |
