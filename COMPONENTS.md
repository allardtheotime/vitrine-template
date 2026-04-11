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
| Navbar | `src/components/layout/Navbar.astro` | `siteName`, `links[]`, `ctaText`, `ctaLink`, `primaryColor` | Navigation principale, fixe en haut, hamburger mobile | Boilerplate |
| Footer | `src/components/layout/Footer.astro` | `siteName`, `phone`, `email`, `links[]` | Pied de page avec infos légales | Boilerplate |

---

## Layouts de page

| Composant | Fichier | Props | Usage | Statut |
|-----------|---------|-------|-------|--------|
| BaseLayout | `src/layouts/BaseLayout.astro` | `siteName`, `tagline`, `primaryColor`, `secondaryColor` | Wrapper pour mode one-page | Boilerplate |
| PageLayout | `src/layouts/PageLayout.astro` | `siteName`, `tagline`, `primaryColor`, `secondaryColor`, `title` | Wrapper pour chaque page en mode multi-pages | Boilerplate |

---

## Sections

| Composant | Fichier | Props | Usage | Statut |
|-----------|---------|-------|-------|--------|
| Hero | `src/components/sections/Hero.astro` | `title`, `subtitle`, `ctaText`, `ctaLink`, `bgImage?` | Section d'accroche, toujours en premier | Boilerplate |
| Services | `src/components/sections/Services.astro` | `title`, `items[]{icon, title, description}` | Grille 3 colonnes de services | Boilerplate |
| About | `src/components/sections/About.astro` | `title`, `text`, `image?`, `stats[]{value, label}` | Présentation de l'entreprise + chiffres clés | Boilerplate |
| Testimonials | `src/components/sections/Testimonials.astro` | `items[]{name, text, rating}` | Grille d'avis clients avec étoiles | Boilerplate |
| CTABanner | `src/components/sections/CTABanner.astro` | `title`, `subtitle`, `buttonText`, `ctaLink` | Bandeau d'appel à l'action, fond couleur primaire | Boilerplate |
| Contact | `src/components/sections/Contact.astro` | `phone`, `email`, `address`, `hours`, `web3formsKey`, `siteName` | Formulaire Web3Forms + infos de contact | Boilerplate |

---

## UI Atoms

| Composant | Fichier | Props | Usage | Statut |
|-----------|---------|-------|-------|--------|
| Button | `src/components/ui/Button.astro` | `variant` (primary/secondary/ghost), `size` (sm/md/lg), `href?`, `type?` | Bouton réutilisable partout | Boilerplate |
| SectionWrapper | `src/components/ui/SectionWrapper.astro` | `id?`, `bg?` (bg-white/bg-gray-50), `class?` | Conteneur de section avec padding et max-width | Boilerplate |
| Badge | `src/components/ui/Badge.astro` | `text`, `color?` | Étiquette colorée pour labels et catégories | Boilerplate |

---

## Composants créés pour des clients spécifiques
# Cette section est vide au départ.
# Elle se remplit automatiquement à chaque nouveau composant créé sur un projet client.
# Règle de promotion : un composant remonte dans le template après 3 utilisations sur des projets différents.

| Composant | Fichier | Props | Usage | Clients | Statut |
|-----------|---------|-------|-------|---------|--------|
| — | — | — | — | — | — |

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
| Espace client / login | Hors scope vitrine statique, nécessite un backend |
| Blog avec BDD | Hors scope, nécessite un CMS ou une BDD |
