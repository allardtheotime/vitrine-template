import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// Site vitrine : rendu statique (SSG) pour toutes les pages Astro,
// l'adaptateur Vercel sert uniquement à activer les fonctions serverless
// du dossier /api (formulaire de contact) à côté du site statique.
//
// `site` DOIT être mis à jour vers le domaine réel du client à chaque
// clonage (sous-domaine .vercel.app en attendant un nom de domaine propre)
// — utilisé pour le sitemap et les URLs canoniques absolues.
export default defineConfig({
  site: 'https://REMPLACER-PAR-LE-DOMAINE-DU-CLIENT.vercel.app',
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap()],
});
