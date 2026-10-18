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
  projectId: 'p477dt8m',
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

// Logo SVG : URL d'origine, sans redimensionnement ni conversion de format.
export function imageOriginalUrl(image: SanityImage | undefined): string | undefined {
  if (!image?.asset) return undefined;
  return builder.image(image).url();
}

// srcset responsive pour les photos (hero, histoire, galerie).
export function imageSrcSet(image: SanityImage | undefined, widths = [400, 800, 1200]): string | undefined {
  if (!image?.asset) return undefined;
  return widths.map((w) => `${builder.image(image).width(w).auto('format').url()} ${w}w`).join(', ');
}

// URL d'un fichier Sanity (kit presse PDF) à partir de sa référence d'asset
// ("file-<id>-<ext>").
export function fileUrl(file: { asset?: { _ref: string } } | undefined): string | undefined {
  const ref = file?.asset?._ref;
  if (!ref) return undefined;
  const [, id, ext] = ref.split('-');
  return `https://cdn.sanity.io/files/${client.config().projectId}/${client.config().dataset}/${id}.${ext}`;
}
