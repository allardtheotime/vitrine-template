import { client, imageUrl } from './sanity';

// Récupère le document Sanity unique du site et le reforme dans la même
// structure que l'ancien content-draft.json (meta/site/theme/sections),
// pour que les pages et composants existants n'aient rien à changer d'autre
// que leur source de données. Appelé une fois par build (site statique).
export async function getSiteContent() {
  const doc = await client.fetch(QUERY);
  if (!doc) {
    throw new Error(
      "Aucun document 'siteContent' trouvé dans Sanity (dataset production, projet u8gpr4m0). " +
        'Le studio est vide ou la migration initiale a été perdue.',
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
      zone: {
        visible: doc.zoneVisible ?? false,
        title: doc.zoneTitle,
        text: doc.zoneText,
        areas: doc.zoneAreas ?? [],
      },
      realisations: {
        visible: doc.realisationsVisible ?? false,
        title: doc.realisationsTitle,
        items: (doc.realisationsItems ?? []).map((project: any) => ({
          title: project.title,
          images: (project.images ?? []).map((im: any) => ({
            src: imageUrl(im.image, 1600),
            alt: im.alt,
          })),
        })),
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
