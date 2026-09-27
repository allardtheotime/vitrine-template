// Script de seed — pousse le contenu initial d'un nouveau client dans Sanity.
// Usage (depuis le dossier studio/ du client, après `sanity init` et copie du
// schéma, cf. CLAUDE.md §5) :
//
//   node ../../sanity-schema/seed-content.mjs <project-id> <chemin-vers-content-seed.json> <dossier-racine-des-images>
//
// content-seed.json a la même forme que l'ancien content-draft.json : les
// champs image (site.logo, site.og_image, sections.hero.image,
// sections.about.image) sont des chemins relatifs au dossier racine des
// images (ex. "/images/hero.jpg" -> <dossier-racine>/images/hero.jpg).
// Le script les uploade comme assets Sanity et construit le document
// siteContent avec les bonnes références — jamais de couleur/texte à
// inventer, ce fichier ne fait que transporter ce qui est déjà dans le JSON.
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const [, , projectId, seedPath, imagesRoot] = process.argv;

if (!projectId || !seedPath || !imagesRoot) {
  console.error('Usage: node seed-content.mjs <project-id> <content-seed.json> <images-root>');
  process.exit(1);
}

const cliConfig = JSON.parse(readFileSync(process.env.HOME + '/.config/sanity/config.json', 'utf8'));

const client = createClient({
  projectId,
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: cliConfig.authToken,
  useCdn: false,
});

const content = JSON.parse(readFileSync(seedPath, 'utf8'));
const assetCache = new Map();

async function uploadImage(relSrc) {
  if (!relSrc) return undefined;
  if (assetCache.has(relSrc)) return assetCache.get(relSrc);
  const filePath = join(imagesRoot, relSrc.replace(/^\//, ''));
  const buffer = readFileSync(filePath);
  const filename = relSrc.split('/').pop();
  const asset = await client.assets.upload('image', buffer, { filename });
  const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  assetCache.set(relSrc, ref);
  console.log(`  uploaded ${relSrc} -> ${asset._id}`);
  return ref;
}

function cryptoKey() {
  return Math.random().toString(36).slice(2, 10);
}

async function main() {
  const { meta, site, theme, sections } = content;

  console.log('Uploading images...');
  const logo = await uploadImage(site.logo);
  const ogImage = await uploadImage(site.og_image);
  const heroImage = await uploadImage(sections.hero?.image);
  const aboutImage = await uploadImage(sections.about?.image);

  const doc = {
    _id: 'siteContent',
    _type: 'siteContent',
    isDemo: meta.is_demo,

    siteName: site.name,
    logo,
    ogImage,
    tagline: site.tagline,
    sector: site.sector,
    phone: site.phone,
    email: site.email,
    address: site.address,
    hours: site.hours || undefined,
    legalName: site.legal_name,
    legalForm: site.legal_form,
    bceNumber: site.bce_number,
    vatNumber: site.vat_number,
    regulatedProfession: site.regulated_profession,
    regulatoryAuthority: site.regulatory_authority || undefined,
    licenseNumber: site.license_number || undefined,
    facebook: site.facebook || undefined,

    colorPrimary: theme.primary,
    colorPrimaryHover: theme.primary_hover,
    colorSecondary: theme.secondary,
    colorBg: theme.bg,
    colorSurface: theme.surface,
    colorFooter: theme.footer,
    colorText: theme.text,
    colorTextMuted: theme.text_muted,
    colorBorder: theme.border,
    colorFocus: theme.focus,
    font: theme.font,
    fontDisplay: theme.font_display,

    heroVisible: sections.hero?.visible ?? false,
    heroTitle: sections.hero?.title,
    heroSubtitle: sections.hero?.subtitle,
    heroCtaText: sections.hero?.cta_text,
    heroCtaLink: sections.hero?.cta_link,
    heroImage,
    heroImageAlt: sections.hero?.image_alt,

    servicesVisible: sections.services?.visible ?? false,
    servicesTitle: sections.services?.title,
    servicesSubtitle: sections.services?.subtitle || undefined,
    servicesItems: (sections.services?.items ?? []).map((it) => ({
      _type: 'serviceItem',
      _key: cryptoKey(),
      icon: it.icon,
      title: it.title,
      description: it.description,
    })),

    aboutVisible: sections.about?.visible ?? false,
    aboutTitle: sections.about?.title,
    aboutSubtitle: sections.about?.subtitle || undefined,
    aboutText: sections.about?.text,
    aboutImage,
    aboutImageAlt: sections.about?.image_alt,
    aboutStats: (sections.about?.stats ?? []).map((s) => ({
      _type: 'statItem',
      _key: cryptoKey(),
      value: s.value,
      label: s.label,
    })),

    testimonialsVisible: sections.testimonials?.visible ?? false,
    testimonialsTitle: sections.testimonials?.title,
    testimonialsItems: (sections.testimonials?.items ?? []).map((t) => ({
      _type: 'testimonialItem',
      _key: cryptoKey(),
      name: t.name,
      text: t.text,
      rating: t.rating,
    })),
  };

  for (const k of Object.keys(doc)) if (doc[k] === undefined) delete doc[k];

  console.log('Creating siteContent document...');
  const result = await client.createOrReplace(doc);
  console.log('Done:', result._id, result._rev);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
