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
    {name: 'announcement', title: 'Bandeau annonce'},
    {name: 'monthly', title: 'Menu du mois'},
    {name: 'services', title: 'Le concept'},
    {name: 'modes', title: 'Sur place / à emporter'},
    {name: 'menu', title: 'La carte'},
    {name: 'about', title: 'Notre histoire'},
    {name: 'catering', title: 'Traiteur & événements'},
    {name: 'gallery', title: 'En cuisine'},
    {name: 'testimonials', title: 'Avis'},
    {name: 'contact', title: 'Horaires & contact'},
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
    defineField({name: 'hours', title: 'Horaires (résumé pied de page)', type: 'string', group: 'site'}),
    defineField({name: 'navCtaText', title: 'Bouton de l\'en-tête', type: 'string', group: 'site', description: 'ex. "Voir la carte"'}),
    defineField({name: 'navCtaLink', title: 'Lien du bouton de l\'en-tête', type: 'string', group: 'site', description: 'ex. "#carte"'}),
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
    defineField({name: 'heroEyebrow', title: 'Surtitre', type: 'string', group: 'hero', description: 'ex. "Namur · depuis 1999"'}),
    defineField({name: 'heroTitle', title: 'Titre', type: 'string', group: 'hero'}),
    defineField({name: 'heroSubtitle', title: 'Sous-titre', type: 'text', rows: 2, group: 'hero'}),
    defineField({name: 'heroCtaText', title: 'Texte du bouton', type: 'string', group: 'hero'}),
    defineField({name: 'heroCtaLink', title: 'Lien du bouton', type: 'string', group: 'hero'}),
    defineField({name: 'heroBadges', title: 'Badges', type: 'array', of: [{type: 'string'}], group: 'hero', description: 'ex. Sans gluten, Épeautre, Complètes'}),
    defineField({name: 'heroImage', title: 'Image', type: 'image', group: 'hero', options: {hotspot: true}}),
    defineField({name: 'heroImageAlt', title: 'Texte alternatif de l\'image', type: 'string', group: 'hero'}),

    // --- announcement (propre à ce client) ---
    defineField({name: 'announcementVisible', title: 'Visible', type: 'boolean', group: 'announcement', initialValue: true}),
    defineField({name: 'announcementTitle', title: 'Titre', type: 'string', group: 'announcement'}),
    defineField({name: 'announcementText', title: 'Texte', type: 'text', rows: 3, group: 'announcement'}),

    // --- menu du mois (propre à ce client, affiché dans le hero) ---
    defineField({name: 'monthlyVisible', title: 'Visible', type: 'boolean', group: 'monthly', initialValue: false, description: 'Laisser masqué tant que le menu du mois n\'est pas rempli.'}),
    defineField({name: 'monthlyTitle', title: 'Titre', type: 'string', group: 'monthly', description: 'ex. "Menu du mois"'}),
    defineField({name: 'monthlyLabel', title: 'Mois', type: 'string', group: 'monthly', description: 'ex. "Octobre 2026"'}),
    defineField({name: 'monthlyText', title: 'Texte court', type: 'text', rows: 2, group: 'monthly'}),
    defineField({name: 'monthlyItems', title: 'Plats du menu', type: 'array', of: [{type: 'menuItem'}], group: 'monthly'}),
    defineField({name: 'monthlyPrice', title: 'Prix du menu', type: 'string', group: 'monthly', description: 'ex. "16,00 €"'}),

    // --- services ---
    defineField({name: 'servicesVisible', title: 'Visible', type: 'boolean', group: 'services', initialValue: true}),
    defineField({name: 'servicesTitle', title: 'Titre de la section', type: 'string', group: 'services'}),
    defineField({name: 'servicesSubtitle', title: 'Sous-titre de la section', type: 'string', group: 'services'}),
    defineField({name: 'servicesItems', title: 'Services', type: 'array', of: [{type: 'serviceItem'}], group: 'services'}),

    // --- sur place / à emporter (propre à ce client) ---
    defineField({name: 'modesVisible', title: 'Visible', type: 'boolean', group: 'modes', initialValue: true}),
    defineField({name: 'modesTitle', title: 'Titre', type: 'string', group: 'modes'}),
    defineField({name: 'modesSubtitle', title: 'Sous-titre', type: 'string', group: 'modes'}),
    defineField({name: 'modesDineTitle', title: 'Sur place : titre', type: 'string', group: 'modes'}),
    defineField({name: 'modesDineText', title: 'Sur place : texte', type: 'text', rows: 2, group: 'modes'}),
    defineField({name: 'modesDineImage', title: 'Sur place : photo', type: 'image', options: {hotspot: true}, group: 'modes'}),
    defineField({name: 'modesDineImageAlt', title: 'Sur place : texte alternatif', type: 'string', group: 'modes'}),
    defineField({name: 'modesTakeTitle', title: 'À emporter : titre', type: 'string', group: 'modes'}),
    defineField({name: 'modesTakeText', title: 'À emporter : texte', type: 'text', rows: 2, group: 'modes'}),
    defineField({name: 'modesTakeImage', title: 'À emporter : photo', type: 'image', options: {hotspot: true}, group: 'modes'}),
    defineField({name: 'modesTakeImageAlt', title: 'À emporter : texte alternatif', type: 'string', group: 'modes'}),

    // --- menu (propre à ce client) ---
    defineField({name: 'menuVisible', title: 'Visible', type: 'boolean', group: 'menu', initialValue: true}),
    defineField({name: 'menuTitle', title: 'Titre', type: 'string', group: 'menu'}),
    defineField({name: 'menuSubtitle', title: 'Sous-titre', type: 'string', group: 'menu'}),
    defineField({name: 'menuCategories', title: 'Rubriques', type: 'array', of: [{type: 'menuCategory'}], group: 'menu'}),
    defineField({name: 'menuSupplements', title: 'Suppléments', type: 'string', group: 'menu'}),
    defineField({name: 'menuAllergyNote', title: 'Mention allergies', type: 'string', group: 'menu'}),

    // --- about ---
    defineField({name: 'aboutVisible', title: 'Visible', type: 'boolean', group: 'about', initialValue: true}),
    defineField({name: 'aboutTitle', title: 'Titre', type: 'string', group: 'about'}),
    defineField({name: 'aboutSubtitle', title: 'Sous-titre', type: 'string', group: 'about'}),
    defineField({name: 'aboutText', title: 'Texte', type: 'text', rows: 4, group: 'about'}),
    defineField({name: 'aboutImage', title: 'Image', type: 'image', group: 'about', options: {hotspot: true}}),
    defineField({name: 'aboutImageAlt', title: 'Texte alternatif de l\'image', type: 'string', group: 'about'}),
    defineField({name: 'aboutImage2', title: 'Image secondaire (vignette)', type: 'image', group: 'about', options: {hotspot: true}}),
    defineField({name: 'aboutImage2Alt', title: 'Texte alternatif de l\'image secondaire', type: 'string', group: 'about'}),
    defineField({name: 'aboutImage2Caption', title: 'Légende de l\'image secondaire', type: 'string', group: 'about'}),
    defineField({name: 'aboutStats', title: 'Chiffres clés', type: 'array', of: [{type: 'statItem'}], group: 'about'}),

    // --- traiteur & événements (propre à ce client) ---
    defineField({name: 'cateringVisible', title: 'Visible', type: 'boolean', group: 'catering', initialValue: true}),
    defineField({name: 'cateringTitle', title: 'Titre', type: 'string', group: 'catering'}),
    defineField({name: 'cateringSubtitle', title: 'Sous-titre', type: 'text', rows: 2, group: 'catering'}),
    defineField({name: 'cateringItems', title: 'Offres', type: 'array', of: [{type: 'cateringItem'}], group: 'catering'}),
    defineField({name: 'cateringNote', title: 'Mention (conditions, délai)', type: 'string', group: 'catering'}),
    defineField({name: 'cateringCtaText', title: 'Texte du bouton', type: 'string', group: 'catering', description: 'ex. "Demander une offre"'}),

    // --- gallery (propre à ce client) ---
    defineField({name: 'galleryVisible', title: 'Visible', type: 'boolean', group: 'gallery', initialValue: true}),
    defineField({name: 'galleryTitle', title: 'Titre', type: 'string', group: 'gallery'}),
    defineField({name: 'gallerySubtitle', title: 'Sous-titre', type: 'string', group: 'gallery'}),
    defineField({name: 'galleryImages', title: 'Photos', type: 'array', of: [{type: 'galleryImage'}], group: 'gallery'}),

    // --- testimonials ---
    defineField({name: 'testimonialsVisible', title: 'Visible', type: 'boolean', group: 'testimonials', initialValue: true}),
    defineField({name: 'testimonialsTitle', title: 'Titre de la section', type: 'string', group: 'testimonials'}),
    defineField({name: 'testimonialsRatingValue', title: 'Note globale', type: 'string', group: 'testimonials', description: 'Note réelle, ex. "4,5"'}),
    defineField({name: 'testimonialsRatingLabel', title: 'Libellé de la note globale', type: 'string', group: 'testimonials', description: 'ex. "plus de 600 avis Google"'}),
    defineField({
      name: 'testimonialsItems',
      title: 'Témoignages',
      type: 'array',
      of: [{type: 'testimonialItem'}],
      group: 'testimonials',
    }),

    // --- contact (propre à ce client : horaires détaillés + textes) ---
    defineField({name: 'contactTitle', title: 'Titre', type: 'string', group: 'contact'}),
    defineField({name: 'contactIntro', title: 'Introduction', type: 'string', group: 'contact'}),
    defineField({name: 'contactAccess', title: 'Précision d\'accès', type: 'string', group: 'contact', description: 'ex. "À 3 minutes à pied de la gare"'}),
    defineField({name: 'openingHours', title: 'Horaires détaillés', type: 'array', of: [{type: 'hoursItem'}], group: 'contact'}),
    defineField({name: 'formTitle', title: 'Titre du formulaire', type: 'string', group: 'contact'}),
  ],
  preview: {
    select: {title: 'siteName', subtitle: 'tagline', media: 'logo'},
  },
})
