# vitrine-template-v2

Template Astro + Sveltia CMS pour les sites vitrine démo générés par le skill
`build-site-vitrine`. Voir `CLAUDE.md` pour les règles complètes et `COMPONENTS.md`
pour l'inventaire des composants.

## Démarrage local

```bash
npm install
npm run dev
```

## Déploiement

Déployé sur Vercel. La fonction serverless `api/contact.ts` nécessite les variables
d'environnement `RESEND_API_KEY` et `CONTACT_TO_EMAIL` (voir `.env.example`), à
configurer dans les paramètres du projet Vercel.

## CMS

Édition visuelle du contenu via Sveltia CMS, accessible sur `/admin` une fois déployé.
Penser à mettre à jour `public/admin/config.yml` → `backend.repo` avec le repo du client
avant le premier déploiement.
