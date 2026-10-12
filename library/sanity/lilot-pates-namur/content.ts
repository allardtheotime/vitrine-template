import { client, imageUrl, imageOriginalUrl, imageSrcSet } from './sanity';

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
      logo: imageOriginalUrl(doc.logo),
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
      nav_cta_text: doc.navCtaText,
      nav_cta_link: doc.navCtaLink,
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
        eyebrow: doc.heroEyebrow,
        title: doc.heroTitle,
        subtitle: doc.heroSubtitle,
        cta_text: doc.heroCtaText,
        cta_link: doc.heroCtaLink,
        image: imageUrl(doc.heroImage, 1200),
        image_srcset: imageSrcSet(doc.heroImage, [480, 800, 1200, 1600]),
        image_alt: doc.heroImageAlt,
        badges: doc.heroBadges ?? [],
      },
      monthly: {
        visible: doc.monthlyVisible ?? false,
        title: doc.monthlyTitle,
        label: doc.monthlyLabel,
        text: doc.monthlyText,
        price: doc.monthlyPrice,
        items: (doc.monthlyItems ?? []).map((it: any) => ({ name: it.name, description: it.description, price: it.price })),
      },
      modes: {
        visible: doc.modesVisible ?? false,
        title: doc.modesTitle,
        subtitle: doc.modesSubtitle,
        dine: {
          title: doc.modesDineTitle,
          text: doc.modesDineText,
          image: imageUrl(doc.modesDineImage, 900),
          image_srcset: imageSrcSet(doc.modesDineImage, [400, 700, 900]),
          image_alt: doc.modesDineImageAlt,
        },
        take: {
          title: doc.modesTakeTitle,
          text: doc.modesTakeText,
          image: imageUrl(doc.modesTakeImage, 900),
          image_srcset: imageSrcSet(doc.modesTakeImage, [400, 700, 900]),
          image_alt: doc.modesTakeImageAlt,
        },
      },
      catering: {
        visible: doc.cateringVisible ?? false,
        title: doc.cateringTitle,
        subtitle: doc.cateringSubtitle,
        note: doc.cateringNote,
        cta_text: doc.cateringCtaText,
        items: (doc.cateringItems ?? []).map((it: any) => ({
          title: it.title,
          description: it.description,
          image: imageUrl(it.image, 800),
          image_srcset: imageSrcSet(it.image, [400, 800]),
          image_alt: it.imageAlt,
        })),
      },
      announcement: {
        visible: doc.announcementVisible ?? false,
        title: doc.announcementTitle,
        text: doc.announcementText,
      },
      menu: {
        visible: doc.menuVisible ?? false,
        title: doc.menuTitle,
        subtitle: doc.menuSubtitle,
        categories: (doc.menuCategories ?? []).map((c: any) => ({
          title: c.title,
          note: c.note,
          footnote: c.footnote,
          prices: (c.prices ?? []).map((p: any) => ({ label: p.label, price: p.price })),
          items: (c.items ?? []).map((it: any) => ({ name: it.name, description: it.description, price: it.price })),
        })),
        supplements: doc.menuSupplements,
        allergy_note: doc.menuAllergyNote,
      },
      gallery: {
        visible: doc.galleryVisible ?? false,
        title: doc.galleryTitle,
        subtitle: doc.gallerySubtitle,
        images: (doc.galleryImages ?? [])
          .filter((g: any) => g.image?.asset)
          .map((g: any) => ({
            src: imageUrl(g.image, 800),
            srcset: imageSrcSet(g.image),
            full: imageUrl(g.image, 1600),
            alt: g.alt,
          })),
      },
      contact: {
        title: doc.contactTitle,
        intro: doc.contactIntro,
        access: doc.contactAccess,
        form_title: doc.formTitle,
        opening_hours: (doc.openingHours ?? []).map((h: any) => ({ day: h.day, hours: h.hours, note: h.note })),
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
        image: imageUrl(doc.aboutImage, 1200),
        image_srcset: imageSrcSet(doc.aboutImage),
        image_alt: doc.aboutImageAlt,
        image2: imageUrl(doc.aboutImage2, 500),
        image2_alt: doc.aboutImage2Alt,
        image2_caption: doc.aboutImage2Caption,
        stats: (doc.aboutStats ?? []).map((s: any) => ({ value: s.value, label: s.label })),
      },
      testimonials: {
        visible: doc.testimonialsVisible ?? false,
        title: doc.testimonialsTitle,
        rating_value: doc.testimonialsRatingValue,
        rating_label: doc.testimonialsRatingLabel,
        items: (doc.testimonialsItems ?? []).map((t: any) => ({
          name: t.name,
          text: t.text,
          rating: t.rating,
          source: t.source,
        })),
      },
    },
  };
}

const QUERY = /* groq */ `*[_type == "siteContent"][0]`;
