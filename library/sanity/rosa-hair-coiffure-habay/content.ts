import { client, imageUrl, imageOriginalUrl, imageSrcSet } from './sanity';

// Récupère le document Sanity unique du site (singleton `siteContent`) et le
// reforme dans une structure {meta,site,theme,sections} — héritée de l'ancien
// content-draft.json — pour que les pages et composants restent inchangés
// quel que soit le schéma Sanity brut. Appelé une fois par build (site statique).
// Adapté de library/sanity/lilot-pates-namur : bandeau congés, tarifs, soin
// signature, réalisations, horaires détaillés.
// rosa-hair-coiffure-habay : repris de library/sanity/laetitia-coiffure-arlon, + mapsUrl,
// icône de la barre mobile, lien WhatsApp (à la place du SMS).
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
      maps_url: doc.mapsUrl,
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
      mobile_cta_text: doc.mobileCtaText,
      mobile_cta_link: doc.mobileCtaLink,
      mobile_cta_icon: doc.mobileCtaIcon,
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
      announcement: {
        visible: (doc.announcementVisible ?? false) && Boolean(doc.announcementTitle),
        title: doc.announcementTitle,
        text: doc.announcementText,
      },
      hero: {
        visible: doc.heroVisible ?? false,
        eyebrow: doc.heroEyebrow,
        title: doc.heroTitle,
        subtitle: doc.heroSubtitle,
        cta_text: doc.heroCtaText,
        cta_link: doc.heroCtaLink,
        cta2_text: doc.heroCta2Text,
        cta2_link: doc.heroCta2Link,
        image: imageUrl(doc.heroImage, 1200),
        image_srcset: imageSrcSet(doc.heroImage, [480, 800, 1200]),
        image_alt: doc.heroImageAlt,
        badges: doc.heroBadges ?? [],
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
      spotlight: {
        visible: (doc.spotlightVisible ?? false) && Boolean(doc.spotlightTitle),
        eyebrow: doc.spotlightEyebrow,
        title: doc.spotlightTitle,
        text: doc.spotlightText,
        items: doc.spotlightItems ?? [],
        price: doc.spotlightPrice,
        price_note: doc.spotlightPriceNote,
        cta_text: doc.spotlightCtaText,
        cta_link: doc.spotlightCtaLink,
        image: imageUrl(doc.spotlightImage, 900),
        image_srcset: imageSrcSet(doc.spotlightImage, [400, 700, 900]),
        image_alt: doc.spotlightImageAlt,
      },
      gallery: {
        visible: doc.galleryVisible ?? false,
        title: doc.galleryTitle,
        subtitle: doc.gallerySubtitle,
        facebook_label: doc.galleryFacebookLabel,
        images: (doc.galleryImages ?? [])
          .filter((g: any) => g.image?.asset)
          .map((g: any) => ({
            src: imageUrl(g.image, 600),
            srcset: imageSrcSet(g.image, [300, 600, 900]),
            alt: g.alt,
          })),
      },
      about: {
        visible: doc.aboutVisible ?? false,
        title: doc.aboutTitle,
        subtitle: doc.aboutSubtitle,
        text: doc.aboutText,
        image: imageUrl(doc.aboutImage, 1000),
        image_srcset: imageSrcSet(doc.aboutImage, [400, 700, 1000]),
        image_alt: doc.aboutImageAlt,
        image2: imageUrl(doc.aboutImage2, 400),
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
      contact: {
        title: doc.contactTitle,
        intro: doc.contactIntro,
        access: doc.contactAccess,
        whatsapp_text: doc.contactWhatsappText,
        form_title: doc.formTitle,
        opening_hours: (doc.openingHours ?? []).map((h: any) => ({ day: h.day, hours: h.hours, note: h.note })),
      },
    },
  };
}

const QUERY = /* groq */ `*[_type == "siteContent"][0]`;
