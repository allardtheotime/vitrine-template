# CLAUDE.md — Template vitrine (v3)
# Ce fichier est lu par Claude Code avant toute action sur le projet.
# Chaque règle est non négociable. En cas de doute, demander confirmation.

---

## 1. Contexte du projet

Tu travailles sur un site vitrine démo pour un indépendant/TPE belge, généré par le
skill `build-site-vitrine` à partir de `BRIEFING.md`, `CLIENT.md` et `DESIGN.md`
d'un projet du pipeline "Vente de site".

Stack : Astro (rendu statique) + Tailwind CSS v3 + Sanity (CMS headless).
Déploiement : **Vercel** (self-hosted par Théotime, compte pro `allard.theotime@gmail.com`,
maintenance récurrente facturée au client — pas de transfert de compte, le client n'édite
jamais lui-même le contenu).
Source de données : **Sanity** — un projet Sanity dédié par client (jamais partagé entre
deux clients), dataset `production`, un unique document `siteContent` (singleton).
Studio d'édition déployé sur `<identifiant-client>.sanity.studio`. Le frontend lit ce
document au build via `src/lib/content.ts` (`getSiteContent()`), qui le reforme dans la
structure historique `{meta, site, theme, sections}` héritée de l'ancien
`content-draft.json` — voir §4 et §5.
Formulaire de contact : fonction serverless Vercel (`api/contact.ts`), pas de webhook externe.

---

## 2. Stack autorisée — liste exhaustive

```
astro
@astrojs/vercel
@astrojs/sitemap        (sitemap.xml, nécessite `site:` dans astro.config.mjs)
@vercel/analytics       (Vercel Web Analytics, <Analytics /> dans BaseLayout.astro)
tailwindcss
@vercel/node            (types pour les fonctions serverless de /api)
@fontsource/inter       (police de corps par défaut, auto-hébergée — cf. §11)
lucide-static           (icônes SVG statiques, auto-hébergées — cf. §9bis)
@sanity/client          (lecture du contenu au build, cf. §5)
@sanity/image-url       (construction des URLs d'images Sanity, cf. §5/§9)
```

**Aucune autre dépendance n'est autorisée sans validation explicite.**
Ne pas installer : react, vue, svelte, axios, lodash, framer-motion, ou toute autre librairie
côté client — le site reste zéro-JS sauf pour le formulaire de contact et le menu mobile.
Si tu penses avoir besoin d'une dépendance externe, demande confirmation avant d'agir.

Si `DESIGN.md` demande une police d'affichage différente d'Inter pour les titres,
l'auto-héberger de la même façon (package Fontsource si disponible, sinon `@font-face` +
fichiers dans `public/fonts/`) — ne jamais se contenter d'écrire son nom dans `theme.font`
sans les fichiers correspondants (cf. §11).

Le dossier `studio/` (Sanity Studio, créé par `sanity init` lors du build, cf. §5) est un
projet Node **séparé**, avec son propre `package.json`/`node_modules` — ses dépendances
(`sanity`, `react`, etc.) ne sont pas soumises à cette liste, qui ne régit que le site
Astro public.

---

## 3. Structure de fichiers — respecter exactement

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.astro
│   │   └── Footer.astro
│   ├── sections/
│   │   ├── Hero.astro          ← type générable
│   │   ├── About.astro         ← type générable
│   │   ├── Services.astro      ← type générable
│   │   ├── Testimonials.astro  ← type générable
│   │   └── Contact.astro       ← rendue automatiquement depuis site.*, jamais dans sections{}
│   └── ui/
│       ├── Button.astro
│       ├── SectionWrapper.astro
│       ├── Badge.astro
│       ├── Icon.astro          ← icônes Lucide inline, cf. §9bis
│       └── DemoNotice.astro
├── layouts/
│   └── BaseLayout.astro        ← layout unique, site one-page
├── pages/
│   ├── index.astro
│   ├── mentions-legales.astro             ← toujours présente
│   ├── politique-de-confidentialite.astro ← toujours présente
│   └── 404.astro
├── lib/
│   ├── sanity.ts   ← client Sanity + construction des URLs d'image
│   └── content.ts  ← getSiteContent(), SEULE porte d'entrée vers les données
└── styles/
    └── global.css   ← uniquement les variables CSS + hiérarchie de titres

sanity-schema/        ← schéma Sanity réutilisable, À COPIER dans studio/schemaTypes/
                         de chaque nouveau client (pas un Studio fonctionnel en soi,
                         pas de projectId réel ici) — cf. §5
studio/                ← généré par `sanity init` lors du build de CHAQUE client,
                          absent du template lui-même

api/
└── contact.ts          ← fonction serverless Vercel, seul backend autorisé
```

Ne pas créer de fichiers en dehors de cette structure sans raison explicite.
Ne pas créer de dossiers supplémentaires. Le site reste **one-page** — pas de mode
multi-pages : la simplicité et la vitesse de génération priment sur la démo.

---

## 4. Contenu — règles absolues

- Tout texte visible sur le site vient du document Sanity `siteContent`, via
  `getSiteContent()` (`src/lib/content.ts`). Aucune exception, aucun texte en dur dans
  un composant.
- `getSiteContent()` reforme le document Sanity dans la structure `{meta, site, theme,
  sections}` — **les pages et composants ne connaissent que cette forme**, jamais les
  noms de champs Sanity bruts (`heroTitle`, `colorPrimary`, etc. restent internes à
  `content.ts`).
- Toutes les couleurs viennent de `theme.*` via des variables CSS injectées dans
  `BaseLayout.astro`. Aucune couleur hardcodée dans les composants (ni littérale, ni
  `text-gray-*`/`border-gray-*` Tailwind — utiliser `text-[var(--color-text)]`,
  `text-[var(--color-text-muted)]`, `border-[var(--color-border)]`).
- Quatre types de section générables : `hero`, `about`, `services`, `testimonials`,
  chacun avec un champ `visible` qui contrôle son affichage. Un client peut avoir besoin
  d'une section propre à son métier (ex. galerie de réalisations pour un artisan) — dans
  ce cas, créer le type d'objet Sanity et le composant Astro pour CE client (cf. §6 et
  COMPONENTS.md), sans y toucher ici tant qu'il n'a pas servi sur 3 clients différents.
- `site.*` et `contact` : le formulaire et les coordonnées de contact se rendent
  **automatiquement** depuis `site.*` — ce n'est jamais une entrée de `sections{}`.
- Noms de champs confirmés (forme reconstruite par `content.ts`) : `title`/`subtitle`
  (jamais `heading`/`subheading`) ; les images sont des URLs Sanity CDN déjà résolues
  (`imageUrl()`, cf. §5) ; les services utilisent des icônes **Lucide** (nom de fichier
  `lucide-static` sans extension, ex. `"wrench"` — jamais d'emoji, cf. §9bis) ; les clés
  de thème sont `primary`/`primary_hover`/`secondary`/`bg`/`surface`/`footer`/`text`/
  `text_muted`/`border`/`focus`/`font`/`font_display` (toutes optionnelles sauf
  `primary`/`secondary`/`font`, avec un fallback par défaut dans `BaseLayout.astro`/
  `global.css` si absentes).
- `site.logo`, `site.og_image`, `site.facebook` : optionnels, propagés jusqu'à
  `BaseLayout.astro` (logo header, meta `og:image`/`twitter:image`, lien Facebook du
  footer).
- `meta.is_demo: true` (champ Sanity `isDemo`) déclenche la pop-up `DemoNotice`. Ne
  jamais le passer à `false` avant la version finale validée par le client.
- **Donnée non fabricable absente** (téléphone, email...) : ne jamais afficher de texte
  "à compléter" à sa place. Les composants (`Footer.astro`, `Contact.astro`) omettent
  déjà la ligne correspondante si la donnée est vide — ne pas contourner ce comportement.
- Si une donnée manque au point de casser une section entière, retirer la section
  (`visible: false`) plutôt que de planter ou d'afficher un vide.

---

## 5. Sanity CMS

- **Un projet Sanity par client, jamais partagé** — créé via `sanity init` lors du build
  (cf. `build-site-vitrine`), avec l'organisation Sanity de Théotime. Un seul document
  existe par projet : `_id: "siteContent"`, `_type: "siteContent"` — le schéma
  (`sanity-schema/`, copié dans `studio/schemaTypes/` puis adapté au client) l'empêche
  d'être dupliqué ou supprimé via `sanity.config.ts` (cf. `sanity-schema/sanity.config.reference.ts`).
- **Éditeur unique : Théotime.** Ce modèle n'a jamais vocation à donner un accès CMS au
  client — pas de rôle "Editor" à créer (payant chez Sanity), pas de compte à transmettre.
  Studio accessible sur `https://<identifiant-client>.sanity.studio`.
- Contenu initial poussé via `sanity-schema/seed-content.mjs` à partir d'un
  `content-seed.json` (même forme que l'ancien `content-draft.json`) rempli depuis
  `BRIEFING.md`/`CLIENT.md`/`DESIGN.md` — ce fichier de seed et les images locales
  utilisées pour l'upload sont supprimés une fois la migration faite, Sanity devient
  l'unique source de vérité.
- Le dossier `studio/` est un projet Node **indépendant** du site Astro (son propre
  `package.json`, ses propres dépendances React) — ne jamais le construire/déployer avec
  `npm run build` du site. Redéployer le Studio après une modification de schéma :
  `cd studio && npx sanity deploy --url <identifiant-client> --yes`.
- Le site (SSG) lit Sanity **au moment du build**, pas à l'exécution — publier une
  modification dans le Studio ne met donc pas à jour le site tant qu'un nouveau build
  Vercel n'a pas eu lieu. Un webhook Sanity → Vercel Deploy Hook déclenche ce rebuild
  automatiquement sur chaque publication (créés via `vercel deploy-hooks create` et
  l'API de gestion Sanity — cf. `build-site-vitrine`, jamais via le dashboard à la main).
- Images : uploadées comme assets Sanity, jamais comme fichiers dans `public/images/`.
  `src/lib/sanity.ts` (`imageUrl()`) construit l'URL CDN optimisée (redimensionnement +
  format auto) à partir de la référence d'asset — cf. §9.

---

## 6. Composants — règles de création et réutilisation

**Avant de créer un composant :**
1. Lire `COMPONENTS.md`
2. Si le composant existe → l'utiliser, passer les bonnes props
3. Si le composant n'existe pas → le créer, puis **mettre à jour `COMPONENTS.md` immédiatement**

**Règles de création :**
- Un composant = un fichier `.astro`
- Toutes les données reçues via props — jamais d'appel à `getSiteContent()` dans un
  composant de section ou UI (seules les pages dans `pages/` appellent `getSiteContent()`
  et distribuent les données en props)
- Chaque prop optionnelle doit avoir une valeur par défaut dans la signature du composant
- Nommage : PascalCase pour les fichiers, kebab-case pour les classes CSS custom (rares, cf. §7)

**Ne jamais modifier un composant existant pour un cas client spécifique.**
Si une variation est nécessaire, créer un nouveau composant avec un nom explicite
(ex: `ServicesGrid4.astro`), puis suivre la règle de promotion dans `COMPONENTS.md`.

---

## 7. CSS — règles Tailwind

- Utiliser exclusivement les classes utilitaires Tailwind
- Zéro CSS custom sauf dans `styles/global.css` pour les variables CSS et la hiérarchie de titres
- Mobile-first obligatoire : écrire d'abord le style mobile, puis `md:` et `lg:`
- Breakpoints utilisés : `sm` (640px), `md` (768px), `lg` (1024px) uniquement. Le nav
  desktop complet (liens + téléphone + CTA) passe en `lg:` et pas `md:` — en dessous de
  1024px, tout ça ne rentre pas sur une seule ligne (bug déjà rencontré : chevauchement
  du numéro de téléphone avec le dernier lien entre 768 et 1023px).
- Zones tactiles ≥ 44×44px. `global.css` applique `min-height: 44px` globalement sur
  `button, a, input, textarea`, mais **pas** `min-width` — un bouton étroit avec juste
  une icône (ex. le hamburger mobile) peut donc rester en dessous de 44px de large.
  Vérifier/ajouter `min-w-[44px]` au cas par cas sur les boutons icône-seule.
- `min-height: 44px` seul ne centre pas verticalement le texte d'un `<a>`/`<button>` —
  ajouter `inline-flex items-center` (ou `flex items-center`) à chaque fois, sinon le
  texte reste collé en haut de la zone tactile (bug déjà rencontré plusieurs fois :
  liens du header, du footer, de Contact.astro).
- Ne jamais utiliser un modificateur d'opacité Tailwind (`bg-primary/10`) sur une couleur
  qui est une variable CSS (`bg-[var(--color-x)]`) — Tailwind ne sait pas en extraire de
  canal alpha, le fond rend totalement transparent au lieu d'un fond teinté. Utiliser
  `color-mix(in srgb, var(--color-x) 12%, transparent)` en `style` inline à la place
  (cf. `Badge.astro`).
- Ne jamais poser une classe de taille Tailwind (`text-3xl font-bold`, etc.) directement
  sur un `<h1>`/`<h2>`/`<h3>` — la hiérarchie de titres est centralisée dans `global.css`
  (une seule source de vérité) ; une classe codée en dur l'emporte par spécificité CSS et
  rend ce titre à une taille incohérente avec les autres titres du même niveau (bug déjà
  rencontré). Les composants ne portent que la couleur sur un titre
  (`text-[var(--color-text)]`).

---

## 8. Formulaire de contact — fonction serverless Vercel

- `api/contact.ts` reçoit le POST, valide les champs, envoie l'email via l'API Resend.
- Anti-spam intégré : un champ piège invisible (`company`) et une vérification de délai
  minimal entre l'affichage et l'envoi du formulaire (`loaded_at`, 2 secondes) — un bot
  qui remplit tout instantanément ou remplit le champ piège reçoit un succès factice sans
  qu'aucun email ne parte, sans jamais révéler la détection. Ne jamais dupliquer cette
  logique ailleurs ni la retirer.
- Variables d'environnement requises côté Vercel (jamais commitées) : `RESEND_API_KEY`,
  `CONTACT_TO_EMAIL`, `SITE_NAME` (optionnelle) — voir `.env.example`.
- Aucun webhook externe (n8n ou autre) : ce projet a définitivement abandonné cette
  dépendance au profit d'un backend serverless auto-hébergé sur Vercel.
- Le composant `Contact.astro` gère déjà l'appel fetch, le succès et l'erreur — ne pas
  dupliquer cette logique ailleurs.

---

## 9. Images

- Toutes les images sont des assets Sanity, uploadées via le Studio (jamais dans
  `public/images/`). `content.ts` les résout en URL CDN via `imageUrl(image, largeur)`
  (`src/lib/sanity.ts`) — la largeur passée doit rester cohérente avec la taille
  d'affichage réelle (ex. 1600 pour une image pleine largeur, 400 pour un logo).
- Attribut `alt` obligatoire sur chaque image — porté par le champ Sanity dédié
  (`heroImageAlt`, `aboutImageAlt`, etc.), jamais déduit ou codé en dur.
- Attribut `loading="lazy"` obligatoire sauf sur l'image hero (above the fold, `eager`)
- Ne jamais référencer une image qui n'a pas été vérifiée comme accessible (pas de lien mort)

---

## 9bis. Icônes

- Jamais d'emoji comme icône de service — rendu incohérent selon OS/navigateur, pas assez
  professionnel pour un site vitrine. Utiliser le composant `Icon.astro`
  (`src/components/ui/Icon.astro`), qui lit un SVG statique dans `lucide-static` au build
  (`node_modules/lucide-static/icons/<name>.svg`) et l'injecte inline — zéro JS, zéro
  requête réseau côté client.
- Le nom d'icône (`servicesItems[].icon`) doit correspondre exactement à un fichier
  existant dans `lucide-static/icons/`. Si un nom invalide arrive malgré tout jusqu'au
  build, `Icon.astro` retombe sur `circle-help` plutôt que de planter — mais ce n'est
  qu'un filet de sécurité, pas une excuse pour ne pas vérifier le nom avant.

## 10. SEO — balises obligatoires (déjà dans BaseLayout.astro)

`<title>`, `<meta name="description">`, `<meta name="robots">`, Open Graph (`og:title`,
`og:description`, `og:type`, `og:url`, `og:image` si `site.og_image` fourni), Twitter
Card (`summary_large_image`), `<link rel="canonical">`, `sitemap-index.xml` (via
`@astrojs/sitemap`, nécessite `site:` dans `astro.config.mjs` — **à mettre à jour vers le
vrai domaine du client à chaque clonage**, sinon le sitemap/les URLs canoniques pointent
vers un placeholder), `robots.txt`. Ne pas les dupliquer manuellement dans une page —
elles viennent de `BaseLayout.astro`.
Vercel Web Analytics (`<Analytics />` de `@vercel/analytics/astro`) est également inclus
dans `BaseLayout.astro` — cookieless, aucune bannière de consentement requise.

---

## 11. Performance — règles non négociables

- Zéro JavaScript côté client sauf : formulaire de contact, menu mobile, pop-up `DemoNotice`
- Pas de police Google Fonts via `<link>` (requête externe, contraire à l'auto-hébergement).
  Inter est auto-hébergée via `@fontsource/inter` (import dans `global.css`, `font-display:
  swap` déjà géré par le package) — c'est la police par défaut du template.
  **Piège déjà rencontré** : ne jamais ajouter de règle `font-family: var(--font-family)`
  isolée (ex. sur `html{}` dans `global.css`) — Tailwind Preflight applique déjà
  `font-family: var(--font-family), system-ui, sans-serif` via `tailwind.config.cjs`
  (`theme.fontFamily.sans`), fallback inclus. Une règle custom qui ne reprend que la
  variable seule (sans fallback) écrase ce fallback et fait retomber tout le texte sur
  la police par défaut du navigateur dès que `theme.font` ne correspond à aucune police
  réellement chargée. Si un projet a besoin d'une police différente, l'auto-héberger de
  la même façon (import Fontsource ou `@font-face` + fichiers dans `public/fonts/`).
- Pas d'animations CSS complexes — transitions simples uniquement, sauf palier L2/L3
  explicitement demandé dans `DESIGN.md`
- PageSpeed mobile cible : 90+. Si une décision technique risque de faire descendre ce
  score, la signaler avant d'agir

---

## 12. Pages légales — toujours présentes

`pages/mentions-legales.astro`, générée depuis `site.legal_name`, `site.legal_form`,
`site.bce_number`, `site.vat_number`, `site.address`, `site.regulated_profession`.
`pages/politique-de-confidentialite.astro` (RGPD — le formulaire de contact et Vercel
Web Analytics collectent des données). Hébergeur mentionné : Vercel Inc.

---

## 13. Ce que Claude Code ne fait jamais

- Ne jamais créer de backend, d'API route ou de base de données en dehors de `api/contact.ts`
- Ne jamais modifier `package.json` pour ajouter une dépendance sans demander confirmation
- Ne jamais hardcoder une couleur, un texte ou un numéro de téléphone dans un composant
- Ne jamais modifier un composant du boilerplate pour l'adapter à un client — créer une variante
- Ne jamais créer de fichier en dehors de la structure définie en section 3
- Ne jamais utiliser `!important` dans le CSS
- Ne jamais donner d'accès Studio/CMS à un client — éditeur unique : Théotime
- Ne jamais afficher de texte "à compléter"/"en attente" visible sur le site — cf. §4
- Ne jamais utiliser un emoji comme icône de service — toujours `Icon.astro` + Lucide, cf. §9bis

---

## 14. Workflow à suivre sur chaque nouveau projet

```
1. Lire ce fichier (CLAUDE.md) en entier
2. Lire COMPONENTS.md — inventaire des composants disponibles
3. Lire BRIEFING.md, CLIENT.md, DESIGN.md du projet
4. sanity init (nouveau projet Sanity dédié) + copier sanity-schema/ dans studio/schemaTypes/
5. Remplir un content-seed.json à partir de BRIEFING/CLIENT/DESIGN.md, pousser via
   sanity-schema/seed-content.mjs, puis supprimer le seed et les images locales
6. Mettre à jour src/lib/sanity.ts (vrai projectId) et astro.config.mjs (site: réel)
7. Identifier les sections visibles (champs *Visible du schéma)
8. Vérifier : npm run build passe sans erreur
9. Créer les composants manquants si nécessaire, mettre à jour COMPONENTS.md
10. Vérifier : aucun texte hardcodé, aucune couleur hardcodée, alt sur toutes les images,
    aucun "à compléter" visible
```
