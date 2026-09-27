import {defineField, defineType} from 'sanity'

// Document singleton : un seul exemplaire de ce type existe par dataset
// (_id fixé à "siteContent" — cf. sanity.config.ts généré par build-site-vitrine
// pour empêcher toute duplication). Reprend la structure historique de
// content-draft.json (meta/site/theme/sections) pour que le frontend Astro
// (src/lib/content.ts) n'ait presque rien à changer dans sa logique de rendu.
export const siteContent = defineType({
  name: 'siteContent',
  title: 'Contenu du site',
  type: 'document',
  groups: [
    {name: 'meta', title: 'Méta'},
    {name: 'site', title: 'Entreprise'},
    {name: 'theme', title: 'Thème'},
    {name: 'hero', title: 'Accueil'},
    {name: 'services', title: 'Services'},
    {name: 'about', title: 'Qui suis-je'},
    {name: 'testimonials', title: 'Avis'},
  ],
  fields: [
    // --- meta ---
    defineField({
      name: 'isDemo',
      title: 'Site de démonstration',
      type: 'boolean',
      group: 'meta',
      initialValue: true,
      description: 'Déclenche la pop-up "site de démonstration". Ne jamais passer à faux avant validation finale du client.',
    }),

    // --- site ---
    defineField({name: 'siteName', title: 'Nom commercial', type: 'string', group: 'site', validation: (r) => r.required()}),
    defineField({name: 'logo', title: 'Logo', type: 'image', group: 'site'}),
    defineField({name: 'ogImage', title: 'Image de prévisualisation (og:image)', type: 'image', group: 'site'}),
    defineField({name: 'tagline', title: 'Accroche', type: 'string', group: 'site', validation: (r) => r.required()}),
    defineField({name: 'sector', title: 'Secteur', type: 'string', group: 'site'}),
    defineField({name: 'phone', title: 'Téléphone', type: 'string', group: 'site'}),
    defineField({name: 'email', title: 'Email', type: 'string', group: 'site'}),
    defineField({name: 'address', title: 'Adresse', type: 'string', group: 'site'}),
    defineField({name: 'hours', title: 'Horaires', type: 'string', group: 'site'}),
    defineField({name: 'legalName', title: 'Nom légal', type: 'string', group: 'site'}),
    defineField({name: 'legalForm', title: 'Forme juridique', type: 'string', group: 'site'}),
    defineField({name: 'bceNumber', title: 'Numéro BCE', type: 'string', group: 'site'}),
    defineField({name: 'vatNumber', title: 'Numéro de TVA', type: 'string', group: 'site'}),
    defineField({name: 'regulatedProfession', title: 'Profession réglementée', type: 'boolean', group: 'site', initialValue: false}),
    defineField({name: 'regulatoryAuthority', title: 'Autorité de tutelle', type: 'string', group: 'site'}),
    defineField({name: 'licenseNumber', title: 'Numéro d\'agrément', type: 'string', group: 'site'}),
    defineField({name: 'facebook', title: 'Lien Facebook', type: 'url', group: 'site'}),

    // --- theme ---
    defineField({name: 'colorPrimary', title: 'Couleur primaire', type: 'string', group: 'theme', validation: (r) => r.required()}),
    defineField({name: 'colorPrimaryHover', title: 'Couleur primaire (survol)', type: 'string', group: 'theme'}),
    defineField({name: 'colorSecondary', title: 'Couleur secondaire', type: 'string', group: 'theme', validation: (r) => r.required()}),
    defineField({name: 'colorBg', title: 'Couleur de fond', type: 'string', group: 'theme'}),
    defineField({name: 'colorSurface', title: 'Couleur des surfaces', type: 'string', group: 'theme'}),
    defineField({name: 'colorFooter', title: 'Couleur du footer', type: 'string', group: 'theme'}),
    defineField({name: 'colorText', title: 'Couleur du texte', type: 'string', group: 'theme'}),
    defineField({name: 'colorTextMuted', title: 'Couleur du texte atténué', type: 'string', group: 'theme'}),
    defineField({name: 'colorBorder', title: 'Couleur des bordures', type: 'string', group: 'theme'}),
    defineField({name: 'colorFocus', title: 'Couleur de focus', type: 'string', group: 'theme'}),
    defineField({name: 'font', title: 'Police de corps', type: 'string', group: 'theme', validation: (r) => r.required()}),
    defineField({name: 'fontDisplay', title: 'Police d\'affichage (titres)', type: 'string', group: 'theme'}),

    // --- hero ---
    defineField({name: 'heroVisible', title: 'Visible', type: 'boolean', group: 'hero', initialValue: true}),
    defineField({name: 'heroTitle', title: 'Titre', type: 'string', group: 'hero'}),
    defineField({name: 'heroSubtitle', title: 'Sous-titre', type: 'text', rows: 2, group: 'hero'}),
    defineField({name: 'heroCtaText', title: 'Texte du bouton', type: 'string', group: 'hero'}),
    defineField({name: 'heroCtaLink', title: 'Lien du bouton', type: 'string', group: 'hero'}),
    defineField({name: 'heroImage', title: 'Image', type: 'image', group: 'hero', options: {hotspot: true}}),
    defineField({name: 'heroImageAlt', title: 'Texte alternatif de l\'image', type: 'string', group: 'hero'}),

    // --- services ---
    defineField({name: 'servicesVisible', title: 'Visible', type: 'boolean', group: 'services', initialValue: true}),
    defineField({name: 'servicesTitle', title: 'Titre de la section', type: 'string', group: 'services'}),
    defineField({name: 'servicesSubtitle', title: 'Sous-titre de la section', type: 'string', group: 'services'}),
    defineField({name: 'servicesItems', title: 'Services', type: 'array', of: [{type: 'serviceItem'}], group: 'services'}),

    // --- about ---
    defineField({name: 'aboutVisible', title: 'Visible', type: 'boolean', group: 'about', initialValue: true}),
    defineField({name: 'aboutTitle', title: 'Titre', type: 'string', group: 'about'}),
    defineField({name: 'aboutSubtitle', title: 'Sous-titre', type: 'string', group: 'about'}),
    defineField({name: 'aboutText', title: 'Texte', type: 'text', rows: 4, group: 'about'}),
    defineField({name: 'aboutImage', title: 'Image', type: 'image', group: 'about', options: {hotspot: true}}),
    defineField({name: 'aboutImageAlt', title: 'Texte alternatif de l\'image', type: 'string', group: 'about'}),
    defineField({name: 'aboutStats', title: 'Chiffres clés', type: 'array', of: [{type: 'statItem'}], group: 'about'}),

    // --- testimonials ---
    defineField({name: 'testimonialsVisible', title: 'Visible', type: 'boolean', group: 'testimonials', initialValue: true}),
    defineField({name: 'testimonialsTitle', title: 'Titre de la section', type: 'string', group: 'testimonials'}),
    defineField({
      name: 'testimonialsItems',
      title: 'Témoignages',
      type: 'array',
      of: [{type: 'testimonialItem'}],
      group: 'testimonials',
    }),
  ],
  preview: {
    select: {title: 'siteName', subtitle: 'tagline', media: 'logo'},
  },
})
