import { client, imageUrl } from './sanity';

// Récupère le document Sanity unique du site (singleton `siteContent`) et le
// reforme dans une structure {meta,site,theme,sections} — héritée de l'ancien
// content-draft.json — pour que les pages et composants restent inchangés
// quel que soit le schéma Sanity brut. Appelé une fois par build (site statique).
export async function getSiteContent() {
  const doc = await client.fetch(QUERY);
  if (!doc) {
    throw new Error(
      "Aucun document 'siteContent' trouvé dans Sanity pour ce projet. " +
        'Le Studio est vide ou le contenu initial n\'a pas encore été poussé (cf. build-site-vitrine §Sanity).',
    );
  }

  return {
    meta: {
      is_demo: doc.isDemo ?? false,
    },
    site: {
      name: doc.siteName,
      logo: imageUrl(doc.logo, 400),
      og_image: imageUrl(doc.ogImage, 1200),
      tagline: doc.tagline,
      sector: doc.sector,
      phone: doc.phone,
      email: doc.email,
      address: doc.address,
      hours: doc.hours,
      legal_name: doc.legalName,
      legal_form: doc.legalForm,
      bce_number: doc.bceNumber,
      vat_number: doc.vatNumber,
      regulated_profession: doc.regulatedProfession ?? false,
      regulatory_authority: doc.regulatoryAuthority,
      license_number: doc.licenseNumber,
      facebook: doc.facebook,
    },
    theme: {
      primary: doc.colorPrimary,
      primary_hover: doc.colorPrimaryHover,
      secondary: doc.colorSecondary,
      bg: doc.colorBg,
      surface: doc.colorSurface,
      footer: doc.colorFooter,
      text: doc.colorText,
      text_muted: doc.colorTextMuted,
      border: doc.colorBorder,
      focus: doc.colorFocus,
      font: doc.font,
      font_display: doc.fontDisplay,
    },
    sections: {
      hero: {
        visible: doc.heroVisible ?? false,
        title: doc.heroTitle,
        subtitle: doc.heroSubtitle,
        cta_text: doc.heroCtaText,
        cta_link: doc.heroCtaLink,
        image: imageUrl(doc.heroImage, 1600),
        image_alt: doc.heroImageAlt,
      },
      services: {
        visible: doc.servicesVisible ?? false,
        title: doc.servicesTitle,
        subtitle: doc.servicesSubtitle,
        items: (doc.servicesItems ?? []).map((it: any) => ({
          icon: it.icon,
          title: it.title,
          description: it.description,
        })),
      },
      about: {
        visible: doc.aboutVisible ?? false,
        title: doc.aboutTitle,
        subtitle: doc.aboutSubtitle,
        text: doc.aboutText,
        image: imageUrl(doc.aboutImage, 1600),
        image_alt: doc.aboutImageAlt,
        stats: (doc.aboutStats ?? []).map((s: any) => ({ value: s.value, label: s.label })),
      },
      testimonials: {
        visible: doc.testimonialsVisible ?? false,
        title: doc.testimonialsTitle,
        items: (doc.testimonialsItems ?? []).map((t: any) => ({
          name: t.name,
          text: t.text,
          rating: t.rating,
        })),
      },
    },
  };
}

const QUERY = /* groq */ `*[_type == "siteContent"][0]`;
