import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

interface SanityImage {
  asset?: { _ref: string; _type: 'reference' };
}

// Identifiants du projet Sanity DÉDIÉ à ce client — jamais partagés avec un
// autre projet client. Remplacer les deux valeurs ci-dessous après avoir
// exécuté `sanity init` pour ce client (cf. CLAUDE.md §5). Le dataset est
// public en lecture : pas de token nécessaire côté frontend.
export const client = createClient({
  projectId: 'REMPLACER-PAR-LE-PROJECT-ID',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

// Construit une URL d'image optimisée (redimensionnée, format auto) à partir
// d'une référence d'asset Sanity. `width` doit rester cohérent avec la taille
// d'affichage réelle pour éviter de servir des images surdimensionnées.
export function imageUrl(image: SanityImage | undefined, width: number): string | undefined {
  if (!image?.asset) return undefined;
  return builder.image(image).width(width).auto('format').url();
}
