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
  // Lecture au build uniquement : sans CDN, sinon le rebuild déclenché par le
  // webhook juste après une publication peut encore lire l'ancienne version
  // (cas vécu sur laetitia-coiffure-arlon).
  useCdn: false,
});

const builder = createImageUrlBuilder(client);

// Construit une URL d'image optimisée (redimensionnée, format auto) à partir
// d'une référence d'asset Sanity. `width` doit rester cohérent avec la taille
// d'affichage réelle pour éviter de servir des images surdimensionnées.
export function imageUrl(image: SanityImage | undefined, width: number): string | undefined {
  if (!image?.asset) return undefined;
  return builder.image(image).width(width).auto('format').url();
}

// URL de l'asset tel quel (sans transformation) : pour un logo SVG, que le
// pipeline d'images Sanity ne doit pas rasteriser. Utilisé par library/sanity/*/content.ts.
export function imageOriginalUrl(image: SanityImage | undefined): string | undefined {
  if (!image?.asset) return undefined;
  return builder.image(image).url();
}

// srcset pour des images responsives. Ne jamais passer une largeur supérieure à
// l'original : Sanity agrandit l'image et elle devient floue (cas vécu : hero de
// hair-family-arlon, photos de 1208 px étirées en pleine hauteur).
export function imageSrcSet(image: SanityImage | undefined, widths: number[]): string | undefined {
  if (!image?.asset) return undefined;
  return widths.map((w) => `${builder.image(image).width(w).quality(85).auto('format').url()} ${w}w`).join(', ');
}
