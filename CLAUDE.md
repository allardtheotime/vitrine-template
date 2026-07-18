# CLAUDE.md — Template vitrine PME
# Ce fichier est lu par Claude Code avant toute action sur le projet.
# Chaque règle est non négociable. En cas de doute, demander confirmation.

---

## 1. Contexte du projet

Tu travailles sur un site vitrine pour une PME ou un artisan français.
Stack : Astro + Tailwind CSS v3 + Web3Forms.
Déploiement : Netlify (statique, zéro serveur).
Source de données : `src/content.json` — c'est la seule source de vérité du projet.

---

## 2. Stack autorisée — liste exhaustive

```
astro
@astrojs/tailwind
tailwindcss
web3forms (via fetch natif, pas de package npm)
```

**Aucune autre dépendance n'est autorisée sans validation explicite.**
Ne pas installer : react, vue, svelte, axios, lodash, framer-motion, ou toute autre librairie.
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
│   │   ├── Hero.astro
│   │   ├── Services.astro
│   │   ├── About.astro
│   │   ├── Testimonials.astro
│   │   ├── Contact.astro
│   │   └── CTABanner.astro
│   └── ui/
│       ├── Button.astro
│       ├── SectionWrapper.astro
│       └── Badge.astro
├── layouts/
│   ├── BaseLayout.astro       ← layout one-page
│   └── PageLayout.astro       ← layout multi-pages
├── pages/
│   ├── index.astro
│   └── mentions-legales.astro ← toujours présente
├── content.json               ← SEULE source de données
└── styles/
    └── global.css             ← uniquement les variables CSS
```

Ne pas créer de fichiers en dehors de cette structure sans raison explicite.
Ne pas créer de dossiers supplémentaires.

---

## 4. content.json — règles absolues

- Tout texte visible sur le site vient de `content.json`. Aucune exception.
- Toutes les couleurs viennent de `content.json` via des variables CSS. Aucune couleur hardcodée dans les composants.
- Les images référencées dans `content.json` sont dans `public/images/`.
- Si une donnée est absente de `content.json`, afficher une valeur par défaut visible (ex: "Texte manquant") plutôt que planter ou afficher vide.

### Structure de content.json à respecter :

```json
{
  "site": {
    "name": "",
    "tagline": "",
    "phone": "",
    "email": "",
    "address": "",
    "hours": "",
    "siret": ""
  },
  "theme": {
    "primary": "#000000",
    "secondary": "#000000",
    "font": "Inter"
  },
  "mode": "onepage",
  "sections": {
    "hero": {
      "visible": true,
      "title": "",
      "subtitle": "",
      "cta_text": "",
      "cta_link": "#contact",
      "bg_image": ""
    },
    "services": {
      "visible": true,
      "title": "Nos services",
      "items": [
        { "icon": "", "title": "", "description": "" }
      ]
    },
    "about": {
      "visible": true,
      "title": "",
      "text": "",
      "image": "",
      "stats": [
        { "value": "", "label": "" }
      ]
    },
    "testimonials": {
      "visible": true,
      "items": [
        { "name": "", "text": "", "rating": 5 }
      ]
    },
    "cta": {
      "visible": true,
      "title": "",
      "subtitle": "",
      "button_text": ""
    },
    "contact": {
      "visible": true,
      "web3forms_key": ""
    }
  }
}
```

---

## 5. Gestion one-page vs multi-pages

Lire `content.json` → champ `"mode"` :

- `"onepage"` → toutes les sections sont dans `pages/index.astro`, navigation par ancres (`#services`, `#contact`…)
- `"multipage"` → chaque section principale devient une page dans `pages/`. La navigation utilise de vraies URLs (`/services`, `/contact`…). `mentions-legales.astro` est toujours présente dans les deux modes.

Ne pas mélanger les deux modes dans un même projet.

---

## 6. Composants — règles de création et réutilisation

**Avant de créer un composant :**
1. Lire `COMPONENTS.md`
2. Si le composant existe → l'utiliser, passer les bonnes props
3. Si le composant n'existe pas → le créer, puis **mettre à jour `COMPONENTS.md` immédiatement**

**Règles de création :**
- Un composant = un fichier `.astro`
- Toutes les données reçues via props — jamais importées directement depuis `content.json` dans un composant
- C'est `pages/index.astro` qui importe `content.json` et distribue les données en props
- Chaque prop doit avoir une valeur par défaut dans la signature du composant
- Nommage : PascalCase pour les fichiers (`HeroWithVideo.astro`), kebab-case pour les classes CSS

**Ne jamais modifier un composant existant pour un cas client spécifique.**
Si une variation est nécessaire, créer un nouveau composant avec un nom explicite (ex: `ServicesGrid4.astro`).

---

## 7. CSS — règles Tailwind

- Utiliser exclusivement les classes utilitaires Tailwind
- Zéro CSS custom sauf dans `styles/global.css` pour les variables CSS
- Les variables CSS dans `global.css` :

```css
:root {
  --color-primary: /* injectée depuis content.json via index.astro */ ;
  --color-secondary: /* idem */ ;
}
```

- Mobile-first obligatoire : écrire d'abord le style mobile, puis `md:` et `lg:`
- Breakpoints utilisés : `sm` (640px), `md` (768px), `lg` (1024px) uniquement

---

## 8. Formulaire de contact — Web3Forms

Le formulaire envoie via Web3Forms (fetch natif, zéro package npm).
La clé API est dans `content.json` → `sections.contact.web3forms_key`.

Structure obligatoire du formulaire :

```html
<form id="contact-form">
  <input type="hidden" name="access_key" value={web3formsKey} />
  <input type="hidden" name="subject" value={`Nouveau message - ${siteName}`} />
  <input type="text" name="name" required placeholder="Votre nom" />
  <input type="email" name="email" required placeholder="Votre email" />
  <textarea name="message" required placeholder="Votre message"></textarea>
  <button type="submit">Envoyer</button>
</form>
```

Le script de soumission : fetch vers `https://api.web3forms.com/submit`, méthode POST, Content-Type `application/json`.
Afficher un message de succès dans la page après soumission — pas de redirection.
Afficher un message d'erreur si la soumission échoue.

---

## 9. Images

- Toutes les images dans `public/images/`
- Attribut `alt` obligatoire sur chaque image — utiliser le titre ou la description du composant associé
- Attribut `loading="lazy"` obligatoire sauf sur l'image hero (above the fold)
- Format recommandé : WebP. Si le client fournit du JPEG/PNG, l'utiliser tel quel sans conversion automatique
- Ne jamais référencer d'images externes (URLs tierces) dans les composants

---

## 10. SEO — balises obligatoires dans BaseLayout.astro

```html
<title>{siteName} — {tagline}</title>
<meta name="description" content={tagline} />
<meta name="robots" content="index, follow" />
<meta property="og:title" content={siteName} />
<meta property="og:description" content={tagline} />
<meta property="og:type" content="website" />
<link rel="canonical" href={Astro.url} />
```

---

## 11. Performance — règles non négociables

- Zéro JavaScript côté client sauf pour le formulaire de contact
- Ne pas importer de polices Google Fonts via `<link>` — utiliser la font-family système ou `font-display: swap`
- Pas d'animations CSS complexes — transitions simples (`transition-colors`, `transition-opacity`) uniquement
- PageSpeed mobile cible : 90+. Si une décision technique risque de faire descendre ce score, la signaler avant d'agir

---

## 12. Mentions légales — toujours présentes

La page `mentions-legales.astro` est obligatoire sur chaque projet.
Elle est générée depuis `content.json` → champs `site.name`, `site.siret`, `site.address`, `site.email`.
Contenu minimal obligatoire : éditeur du site, hébergeur (Netlify), contact.

---

## 13. Ce que Claude Code ne fait jamais

- Ne jamais créer de backend, d'API route, de base de données, de fichier serveur
- Ne jamais modifier `package.json` pour ajouter une dépendance sans demander confirmation
- Ne jamais hardcoder une couleur, un texte, un numéro de téléphone dans un composant
- Ne jamais modifier un composant du boilerplate pour l'adapter à un client — créer une variante
- Ne jamais créer de fichier en dehors de la structure définie en section 3
- Ne jamais utiliser `!important` dans le CSS
- Ne jamais créer de compte, d'accès, ou de service externe sans instruction explicite

---

## 14. Workflow à suivre sur chaque nouveau projet

```
1. Lire ce fichier (CLAUDE.md) en entier
2. Lire COMPONENTS.md — inventaire des composants disponibles
3. Lire CLIENT.md — brief du client
4. Lire src/content.json — données du client
5. Identifier les sections visibles (champ "visible": true)
6. Identifier le mode (onepage / multipage)
7. Assembler pages/index.astro avec les composants existants
8. Créer les composants manquants si nécessaire
9. Mettre à jour COMPONENTS.md si un composant a été créé
10. Vérifier : aucun texte hardcodé, aucune couleur hardcodée, alt sur toutes les images
```
