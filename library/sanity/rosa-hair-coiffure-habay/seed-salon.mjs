// Seed complet pour le schéma « salon » de rosa-hair-coiffure-habay : celui de hair-family-arlon
// (bandeau, hero avec badges, tarifs en rubriques, galerie, salon, avis, horaires, lien Maps)
// + prestation phare (Spotlight), note globale des avis, lien WhatsApp, icône de la barre mobile. Le
// sanity-schema/seed-content.mjs du template ne pousse que les 4 sections génériques.
// Usage (depuis site/, où @sanity/client est installé) :
//   node seed-salon.mjs <project-id> <content-seed.json> <dossier-des-images>
// content-seed.json : forme meta/site/theme/sections, avec sections.menu.categories[],
// sections.spotlight, sections.gallery.images[], sections.testimonials.rating_value/
// rating_label, sections.contact.opening_hours[] et whatsapp_text, site.maps_url et
// site.mobile_cta_icon. Les champs vides ("") ne sont pas poussés.
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const [, , projectId, seedPath, imagesRoot] = process.argv;
const cfg = JSON.parse(readFileSync(process.env.HOME + '/.config/sanity/config.json', 'utf8'));
const client = createClient({ projectId, dataset: 'production', apiVersion: '2024-01-01', token: cfg.authToken, useCdn: false });
const c = JSON.parse(readFileSync(seedPath, 'utf8'));
const cache = new Map();
const key = () => Math.random().toString(36).slice(2, 10);

async function img(rel) {
  if (!rel) return undefined;
  if (cache.has(rel)) return cache.get(rel);
  const asset = await client.assets.upload('image', readFileSync(join(imagesRoot, rel)), { filename: rel });
  const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  cache.set(rel, ref);
  console.log('  uploaded', rel);
  return ref;
}

const { meta, site, theme, sections: s } = c;
const doc = {
  _id: 'siteContent', _type: 'siteContent', isDemo: meta.is_demo,
  siteName: site.name, logo: await img(site.logo), ogImage: await img(site.og_image),
  tagline: site.tagline, sector: site.sector, phone: site.phone, email: site.email, address: site.address,
  mapsUrl: site.maps_url, hours: site.hours,
  navCtaText: site.nav_cta_text, navCtaLink: site.nav_cta_link, mobileCtaText: site.mobile_cta_text, mobileCtaLink: site.mobile_cta_link, mobileCtaIcon: site.mobile_cta_icon,
  legalName: site.legal_name, legalForm: site.legal_form || undefined, bceNumber: site.bce_number, vatNumber: site.vat_number,
  regulatedProfession: site.regulated_profession, facebook: site.facebook || undefined,
  colorPrimary: theme.primary, colorPrimaryHover: theme.primary_hover, colorSecondary: theme.secondary, colorBg: theme.bg,
  colorSurface: theme.surface, colorFooter: theme.footer, colorText: theme.text, colorTextMuted: theme.text_muted,
  colorBorder: theme.border, colorFocus: theme.focus, font: theme.font, fontDisplay: theme.font_display,
  announcementVisible: s.announcement.visible, announcementTitle: s.announcement.title, announcementText: s.announcement.text,
  heroVisible: s.hero.visible, heroEyebrow: s.hero.eyebrow, heroTitle: s.hero.title, heroSubtitle: s.hero.subtitle,
  heroCtaText: s.hero.cta_text, heroCtaLink: s.hero.cta_link, heroCta2Text: s.hero.cta2_text, heroCta2Link: s.hero.cta2_link,
  heroBadges: s.hero.badges, heroImage: await img(s.hero.image), heroImageAlt: s.hero.image_alt,
  servicesVisible: s.services.visible, servicesTitle: s.services.title, servicesSubtitle: s.services.subtitle,
  servicesItems: s.services.items.map((it) => ({ _type: 'serviceItem', _key: key(), ...it })),
  menuVisible: s.menu.visible, menuTitle: s.menu.title, menuSubtitle: s.menu.subtitle,
  menuCategories: s.menu.categories.map((cat) => ({
    _type: 'menuCategory', _key: key(), title: cat.title, note: cat.note, footnote: cat.footnote,
    prices: (cat.prices ?? []).map((p) => ({ _type: 'menuPrice', _key: key(), ...p })),
    items: cat.items.map((it) => ({ _type: 'menuItem', _key: key(), ...it })),
  })),
  menuSupplements: s.menu.supplements, menuAllergyNote: s.menu.allergy_note || undefined,
  spotlightVisible: s.spotlight.visible, spotlightEyebrow: s.spotlight.eyebrow, spotlightTitle: s.spotlight.title,
  spotlightText: s.spotlight.text, spotlightItems: s.spotlight.items, spotlightPrice: s.spotlight.price || undefined,
  spotlightPriceNote: s.spotlight.price_note || undefined, spotlightCtaText: s.spotlight.cta_text, spotlightCtaLink: s.spotlight.cta_link,
  spotlightImage: await img(s.spotlight.image), spotlightImageAlt: s.spotlight.image_alt,
  galleryVisible: s.gallery.visible, galleryTitle: s.gallery.title, gallerySubtitle: s.gallery.subtitle, galleryFacebookLabel: s.gallery.facebook_label,
  galleryImages: [],
  aboutVisible: s.about.visible, aboutTitle: s.about.title, aboutSubtitle: s.about.subtitle, aboutText: s.about.text,
  aboutImage: await img(s.about.image), aboutImageAlt: s.about.image_alt,
  aboutImage2: await img(s.about.image2), aboutImage2Alt: s.about.image2_alt, aboutImage2Caption: s.about.image2_caption,
  aboutStats: s.about.stats.map((st) => ({ _type: 'statItem', _key: key(), ...st })),
  testimonialsVisible: s.testimonials.visible, testimonialsTitle: s.testimonials.title,
  testimonialsRatingValue: s.testimonials.rating_value, testimonialsRatingLabel: s.testimonials.rating_label,
  testimonialsItems: s.testimonials.items.map((t) => ({ _type: 'testimonialItem', _key: key(), ...t })),
  contactTitle: s.contact.title, contactIntro: s.contact.intro, contactAccess: s.contact.access, formTitle: s.contact.form_title,
  contactWhatsappText: s.contact.whatsapp_text,
  openingHours: s.contact.opening_hours.map((h) => ({ _type: 'hoursItem', _key: key(), ...h })),
};
for (const g of s.gallery.images) doc.galleryImages.push({ _type: 'galleryImage', _key: key(), image: await img(g.src), alt: g.alt });
const clean = (o) => JSON.parse(JSON.stringify(o)); // retire les undefined
const res = await client.createOrReplace(clean(doc));
console.log('Done', res._id, res._rev);
