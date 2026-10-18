import { client, imageUrl, imageOriginalUrl, imageSrcSet, fileUrl } from './sanity';

// Récupère le document Sanity unique du site (singleton `siteContent`) et le
// reforme dans une structure {meta,site,theme,sections} — héritée de l'ancien
// content-draft.json — pour que les pages et composants ne connaissent jamais les
// noms de champs Sanity bruts. Appelé une fois par build (site statique).
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
      seo_title: doc.seoTitle,
      sector: doc.sector,
      phone: doc.phone,
      email: doc.email,
      address: doc.address,
      zone: doc.zone,
      instagram: doc.instagram,
      instagram_label: doc.instagramLabel,
      tiktok: doc.tiktok,
      facebook: doc.facebook,
      nav_cta_text: doc.navCtaText,
      nav_cta_link: doc.navCtaLink,
      legal_name: doc.legalName,
      legal_form: doc.legalForm,
      bce_number: doc.bceNumber,
      vat_number: doc.vatNumber,
      regulated_profession: doc.regulatedProfession ?? false,
      regulatory_authority: doc.regulatoryAuthority,
      license_number: doc.licenseNumber,
    },
    theme: {
      primary: doc.colorPrimary,
      primary_hover: doc.colorPrimaryHover,
      primary_text: doc.colorPrimaryText,
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
        status: doc.heroStatus,
        subtitle: doc.heroSubtitle,
        badges: doc.heroBadges ?? [],
        cta_text: doc.heroCtaText,
        cta_link: doc.heroCtaLink,
        cta2_text: doc.heroCta2Text,
        cta2_link: doc.heroCta2Link,
        image: imageUrl(doc.heroImage, 1600),
        image_srcset: imageSrcSet(doc.heroImage, [640, 960, 1280, 1600, 2000]),
        image_alt: doc.heroImageAlt,
      },
      references: {
        visible: (doc.referencesVisible ?? false) && (doc.referencesItems ?? []).length > 0,
        title: doc.referencesTitle,
        items: doc.referencesItems ?? [],
      },
      agenda: buildAgenda(doc),
      services: {
        visible: doc.servicesVisible ?? false,
        eyebrow: doc.servicesEyebrow,
        title: doc.servicesTitle,
        subtitle: doc.servicesSubtitle,
        note: doc.servicesNote,
        cta_text: doc.servicesCtaText,
        items: (doc.servicesItems ?? []).map((it: any) => ({
          icon: it.icon,
          title: it.title,
          description: it.description,
        })),
      },
      about: {
        visible: doc.aboutVisible ?? false,
        eyebrow: doc.aboutEyebrow,
        title: doc.aboutTitle,
        subtitle: doc.aboutSubtitle,
        text: doc.aboutText,
        image: imageUrl(doc.aboutImage, 1200),
        image_srcset: imageSrcSet(doc.aboutImage, [400, 800, 1200]),
        image_alt: doc.aboutImageAlt,
        image2: imageUrl(doc.aboutImage2, 500),
        image2_alt: doc.aboutImage2Alt,
        image2_caption: doc.aboutImage2Caption,
        stats: (doc.aboutStats ?? []).map((s: any) => ({ value: s.value, label: s.label })),
      },
      media: {
        visible: (doc.mediaVisible ?? false) && (doc.mediaItems ?? []).length > 0,
        eyebrow: doc.mediaEyebrow,
        title: doc.mediaTitle,
        items: (doc.mediaItems ?? []).map((m: any) => ({ title: m.title, url: m.url, subtitle: m.subtitle })),
      },
      gallery: {
        visible: (doc.galleryVisible ?? false) && (doc.galleryImages ?? []).length > 0,
        eyebrow: doc.galleryEyebrow,
        title: doc.galleryTitle,
        subtitle: doc.gallerySubtitle,
        link_label: doc.galleryLinkLabel,
        images: (doc.galleryImages ?? [])
          .filter((g: any) => g.image?.asset)
          .map((g: any) => ({
            src: imageUrl(g.image, 800),
            srcset: imageSrcSet(g.image, [400, 800]),
            alt: g.alt,
            credit: g.credit,
          })),
      },
      testimonials: {
        visible: (doc.testimonialsVisible ?? false) && (doc.testimonialsItems ?? []).length > 0,
        title: doc.testimonialsTitle,
        items: (doc.testimonialsItems ?? []).map((t: any) => ({
          name: t.name,
          text: t.text,
          rating: t.rating,
          source: t.source,
        })),
      },
      booking: {
        eyebrow: doc.bookingEyebrow,
        title: doc.bookingTitle,
        intro: doc.bookingIntro,
        event_types: doc.bookingEventTypes ?? [],
        submit_text: doc.bookingSubmitText,
        success: doc.bookingSuccess,
        error: doc.bookingError,
        press_kit_url: fileUrl(doc.pressKitFile),
        press_kit_label: doc.pressKitLabel,
      },
    },
  };
}

// Agenda : dates à venir (à partir d'aujourd'hui, heure de Bruxelles) ; s'il n'y
// en a aucune, bascule sur les dates du dernier mois joué pour que la section ne
// soit jamais vide (DESIGN.md §Structure 4). Un rebuild quotidien fait disparaître
// les dates passées sans intervention.
function buildAgenda(doc: any) {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Brussels' }).format(new Date());
  const items = (doc.agendaItems ?? [])
    .filter((it: any) => it.date && it.city)
    .map((it: any) => ({ date: it.date as string, venue: it.venue as string | undefined, city: it.city as string }))
    .sort((a: any, b: any) => a.date.localeCompare(b.date));

  const upcoming = items.filter((it: any) => it.date >= today);
  const past = items.filter((it: any) => it.date < today);
  const lastMonth = past.length ? past[past.length - 1].date.slice(0, 7) : undefined;
  const recent = lastMonth ? past.filter((it: any) => it.date.startsWith(lastMonth)) : [];

  const mode: 'upcoming' | 'past' = upcoming.length ? 'upcoming' : 'past';
  const list = mode === 'upcoming' ? upcoming.slice(0, 12) : recent;
  const monthLabel = lastMonth
    ? new Intl.DateTimeFormat('fr-BE', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${lastMonth}-01T00:00:00Z`))
    : undefined;

  return {
    visible: (doc.agendaVisible ?? false) && list.length > 0,
    eyebrow: doc.agendaEyebrow,
    mode,
    title: mode === 'upcoming' ? doc.agendaTitle : doc.agendaPastTitle,
    month_label: mode === 'past' && monthLabel ? monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1) : undefined,
    next_label: doc.agendaNextLabel,
    items: list,
  };
}

const QUERY = /* groq */ `*[_type == "siteContent"][0]`;
