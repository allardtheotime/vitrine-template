# CLAUDE.md — Template vitrine (v2)
# Ce fichier est lu par Claude Code avant toute action sur le projet.
# Chaque règle est non négociable. En cas de doute, demander confirmation.

---

## 1. Contexte du projet

Tu travailles sur un site vitrine démo pour un indépendant/TPE belge, généré par le
skill `build-site-vitrine` à partir de `BRIEFING.md`, `CLIENT.md` et `DESIGN.md`
d'un projet du pipeline "Vente de site".

Stack : Astro (rendu statique) + Tailwind CSS v3 + Sveltia CMS.
Déploiement : **Vercel** (self-hosted par Théotime, compte pro `allard.theotime@gmail.com`,
maintenance récurrente facturée au client — pas de transfert de compte).
Source de données : `src/content-draft.json` — c'est la seule source de vérité du projet.
Formulaire de contact : fonction serverless Vercel (`api/contact.ts`), pas de webhook externe.

---

## 2. Stack autorisée — liste exhaustive

```
astro
@astrojs/vercel
tailwindcss
@vercel/node   (types pour les fonctions serverless de /api)
```

**Aucune autre dépendance n'est autorisée sans validation explicite.**
Ne pas installer : react, vue, svelte, axios, lodash, framer-motion, ou toute autre librairie
côté client — le site reste zéro-JS sauf pour le formulaire de contact et le menu mobile.
Si tu penses avoir besoin d'une dépendance externe, demande confirmation avant d'agir.

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
│       └── DemoNotice.astro
├── layouts/
│   └── BaseLayout.astro        ← layout unique, site one-page
├── pages/
│   ├── index.astro
│   └── mentions-legales.astro  ← toujours présente
├── content-draft.json          ← SEULE source de données
└── styles/
    └── global.css              ← uniquement les variables CSS

public/
└── admin/
    ├── index.html               ← point d'entrée Sveltia CMS
    └── config.yml                ← à adapter (repo GitHub du client) à chaque clonage

api/
└── contact.ts                   ← fonction serverless Vercel, seul backend autorisé
```

Ne pas créer de fichiers en dehors de cette structure sans raison explicite.
Ne pas créer de dossiers supplémentaires. Le site reste **one-page** — pas de mode
multi-pages : la simplicité et la vitesse de génération priment sur la démo.

---

## 4. content-draft.json — règles absolues

- Tout texte visible sur le site vient de `content-draft.json`. Aucune exception.
- Toutes les couleurs viennent de `theme.*` via des variables CSS injectées dans `BaseLayout.astro`.
  Aucune couleur hardcodée dans les composants.
- Quatre types de section générables : `hero`, `about`, `services`, `testimonials`
  (chacun avec un champ `visible` qui contrôle son affichage).
- `site.*` et `contact` : le formulaire et les coordonnées de contact se rendent
  **automatiquement** depuis `site.*` — ce n'est jamais une entrée de `sections{}`.
- Noms de champs confirmés : `title`/`subtitle` (jamais `heading`/`subheading`) ;
  les images sont des chaînes d'URL simples ; les services utilisent des icônes emoji ;
  les clés de thème sont `primary`/`secondary`/`font`.
- `meta.is_demo: true` déclenche la pop-up `DemoNotice`. Ne jamais le passer à `false`
  avant la version finale validée par le client.
- **Donnée non fabricable absente** (téléphone, email...) : ne jamais afficher de texte
  "à compléter" à sa place. Les composants (`Footer.astro`, `Contact.astro`) omettent
  déjà la ligne correspondante si la donnée est vide — ne pas contourner ce comportement.
- Si une donnée manque au point de casser une section entière, retirer la section
  (`visible: false`) plutôt que de planter ou d'afficher un vide.

---

## 5. Sveltia CMS

- `public/admin/config.yml` pointe vers `src/content-draft.json` via une collection `files`.
- Le champ `backend.repo` DOIT être mis à jour vers le repo GitHub dédié du client
  (jamais laissé sur le template ni sur un ancien client) à chaque clonage.
- Auth : PAT GitHub fin-grained scopé au repo du client (cf. décision technique du projet :
  Sveltia préféré à Decap/Netlify Identity, ce dernier étant déprécié).

---

## 6. Composants — règles de création et réutilisation

**Avant de créer un composant :**
1. Lire `COMPONENTS.md`
2. Si le composant existe → l'utiliser, passer les bonnes props
3. Si le composant n'existe pas → le créer, puis **mettre à jour `COMPONENTS.md` immédiatement**

**Règles de création :**
- Un composant = un fichier `.astro`
- Toutes les données reçues via props — jamais importées directement depuis `content-draft.json`
  dans un composant de section ou UI (seul `pages/index.astro` et `pages/mentions-legales.astro`
  importent le JSON et distribuent les données en props)
- Chaque prop optionnelle doit avoir une valeur par défaut dans la signature du composant
- Nommage : PascalCase pour les fichiers, kebab-case pour les classes CSS custom (rares, cf. §7)

**Ne jamais modifier un composant existant pour un cas client spécifique.**
Si une variation est nécessaire, créer un nouveau composant avec un nom explicite
(ex: `ServicesGrid4.astro`), puis suivre la règle de promotion dans `COMPONENTS.md`.

---

## 7. CSS — règles Tailwind

- Utiliser exclusivement les classes utilitaires Tailwind
- Zéro CSS custom sauf dans `styles/global.css` pour les variables CSS
- Mobile-first obligatoire : écrire d'abord le style mobile, puis `md:` et `lg:`
- Breakpoints utilisés : `sm` (640px), `md` (768px), `lg` (1024px) uniquement
- Zones tactiles ≥ 44×44px (déjà appliqué globalement dans `global.css`)

---

## 8. Formulaire de contact — fonction serverless Vercel

- `api/contact.ts` reçoit le POST, valide les champs, envoie l'email via l'API Resend.
- Variables d'environnement requises côté Vercel (jamais commitées) : `RESEND_API_KEY`,
  `CONTACT_TO_EMAIL`, `SITE_NAME` (optionnelle) — voir `.env.example`.
- Aucun webhook externe (n8n ou autre) : ce projet a définitivement abandonné cette
  dépendance au profit d'un backend serverless auto-hébergé sur Vercel.
- Le composant `Contact.astro` gère déjà l'appel fetch, le succès et l'erreur — ne pas
  dupliquer cette logique ailleurs.

---

## 9. Images

- Toutes les images sont des URLs (Unsplash, ou upload via Sveltia dans `public/images/`)
- Attribut `alt` obligatoire sur chaque image
- Attribut `loading="lazy"` obligatoire sauf sur l'image hero (above the fold, `eager`)
- Ne jamais référencer une image qui n'a pas été vérifiée comme accessible (pas de lien mort)

---

## 10. SEO — balises obligatoires (déjà dans BaseLayout.astro)

`<title>`, `<meta name="description">`, `<meta name="robots">`, Open Graph (`og:title`,
`og:description`, `og:type`), `<link rel="canonical">`. Ne pas les dupliquer manuellement
dans une page — elles viennent de `BaseLayout.astro`.

---

## 11. Performance — règles non négociables

- Zéro JavaScript côté client sauf : formulaire de contact, menu mobile, pop-up `DemoNotice`
- Pas de police Google Fonts via `<link>` — `font-family` système ou `font-display: swap`
  si une police externe est vraiment nécessaire
- Pas d'animations CSS complexes — transitions simples uniquement, sauf palier L2/L3
  explicitement demandé dans `DESIGN.md`
- PageSpeed mobile cible : 90+. Si une décision technique risque de faire descendre ce
  score, la signaler avant d'agir

---

## 12. Mentions légales — toujours présentes

`pages/mentions-legales.astro` est obligatoire sur chaque projet, générée depuis
`site.legal_name`, `site.legal_form`, `site.bce_number`, `site.vat_number`, `site.address`,
`site.regulated_profession`. Hébergeur mentionné : Vercel Inc.

---

## 13. Ce que Claude Code ne fait jamais

- Ne jamais créer de backend, d'API route ou de base de données en dehors de `api/contact.ts`
- Ne jamais modifier `package.json` pour ajouter une dépendance sans demander confirmation
- Ne jamais hardcoder une couleur, un texte ou un numéro de téléphone dans un composant
- Ne jamais modifier un composant du boilerplate pour l'adapter à un client — créer une variante
- Ne jamais créer de fichier en dehors de la structure définie en section 3
- Ne jamais utiliser `!important` dans le CSS
- Ne jamais laisser `public/admin/config.yml` pointer vers le repo template ou un autre client
- Ne jamais afficher de texte "à compléter"/"en attente" visible sur le site — cf. §4

---

## 14. Workflow à suivre sur chaque nouveau projet

```
1. Lire ce fichier (CLAUDE.md) en entier
2. Lire COMPONENTS.md — inventaire des composants disponibles
3. Lire BRIEFING.md, CLIENT.md, DESIGN.md du projet
4. Remplir src/content-draft.json à partir de ces trois fichiers
5. Mettre à jour public/admin/config.yml → backend.repo vers le repo GitHub du client
6. Identifier les sections visibles (champ "visible": true)
7. Vérifier : npm run build passe sans erreur
8. Créer les composants manquants si nécessaire, mettre à jour COMPONENTS.md
9. Vérifier : aucun texte hardcodé, aucune couleur hardcodée, alt sur toutes les images,
   aucun "à compléter" visible
```
