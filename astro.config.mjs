import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Site vitrine : rendu statique (SSG) pour toutes les pages Astro,
// l'adaptateur Vercel sert uniquement à activer les fonctions serverless
// du dossier /api (formulaire de contact) à côté du site statique.
export default defineConfig({
  output: 'static',
  adapter: vercel(),
});
