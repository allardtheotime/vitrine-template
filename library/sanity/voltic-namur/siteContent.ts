import {defineField, defineType} from 'sanity'

// Document singleton (_id "siteContent"), cf. sanity.config.ts. Base : schéma
// générique du template, étendu pour ce client (DJ) selon DESIGN.md : références,
// agenda, vidéos/mixes, galerie créditée, booking, kit presse, Instagram.
// Le sur-titre de chaque section sert aussi de libellé dans le menu ; le numéro
// (01, 02…) est calculé au build selon les sections visibles.
export const siteContent = defineType({
  name: 'siteContent',
  title: 'Contenu du site',
  type: 'document',
  groups: [
    {name: 'meta', title: 'Méta'},
    {name: 'site', title: 'Entreprise'},
    {name: 'theme', title: 'Thème'},
    {name: 'hero', title: 'Accueil'},
    {name: 'references', title: 'Références'},
    {name: 'agenda', title: 'Agenda'},
    {name: 'services', title: 'Prestations'},
    {name: 'about', title: 'Histoire'},
    {name: 'media', title: 'Vidéos & mixes'},
    {name: 'gallery', title: 'Photos'},
    {name: 'testimonials', title: 'Avis'},
    {name: 'booking', title: 'Booking'},
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
    defineField({name: 'tagline', title: 'Accroche (titre Google et pied de page)', type: 'string', group: 'site', validation: (r) => r.required()}),
    defineField({name: 'seoTitle', title: 'Titre Google', type: 'string', group: 'site', description: 'ex. "Voltic — DJ house à Bruxelles et Namur"'}),
    defineField({name: 'sector', title: 'Secteur', type: 'string', group: 'site'}),
    defineField({name: 'phone', title: 'Téléphone', type: 'string', group: 'site'}),
    defineField({name: 'email', title: 'Email', type: 'string', group: 'site'}),
    defineField({name: 'address', title: 'Adresse', type: 'string', group: 'site'}),
    defineField({name: 'zone', title: 'Zone (texte court)', type: 'string', group: 'site', description: 'ex. "Bruxelles, Namur et environs"'}),
    defineField({name: 'instagram', title: 'Lien Instagram', type: 'url', group: 'site'}),
    defineField({name: 'instagramLabel', title: 'Libellé du bouton Instagram', type: 'string', group: 'site', description: 'ex. "Écrire sur Instagram"'}),
    defineField({name: 'tiktok', title: 'Lien TikTok', type: 'url', group: 'site'}),
    defineField({name: 'facebook', title: 'Lien Facebook', type: 'url', group: 'site'}),
    defineField({name: 'navCtaText', title: 'Bouton de l\'en-tête', type: 'string', group: 'site', description: 'ex. "Booker une date"'}),
    defineField({name: 'navCtaLink', title: 'Lien du bouton de l\'en-tête', type: 'string', group: 'site', description: 'ex. "#booking"'}),
    defineField({name: 'legalName', title: 'Nom légal', type: 'string', group: 'site'}),
    defineField({name: 'legalForm', title: 'Forme juridique', type: 'string', group: 'site'}),
    defineField({name: 'bceNumber', title: 'Numéro BCE', type: 'string', group: 'site'}),
    defineField({name: 'vatNumber', title: 'Numéro de TVA', type: 'string', group: 'site'}),
    defineField({name: 'regulatedProfession', title: 'Profession réglementée', type: 'boolean', group: 'site', initialValue: false}),
    defineField({name: 'regulatoryAuthority', title: 'Autorité de tutelle', type: 'string', group: 'site'}),
    defineField({name: 'licenseNumber', title: 'Numéro d\'agrément', type: 'string', group: 'site'}),

    // --- theme ---
    defineField({name: 'colorPrimary', title: 'Couleur primaire', type: 'string', group: 'theme', validation: (r) => r.required()}),
    defineField({name: 'colorPrimaryHover', title: 'Couleur primaire (survol)', type: 'string', group: 'theme'}),
    defineField({name: 'colorPrimaryText', title: 'Couleur primaire pour petit texte', type: 'string', group: 'theme'}),
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
    defineField({name: 'heroEyebrow', title: 'Surtitre', type: 'string', group: 'hero', description: 'ex. "DJ house · Bruxelles & Namur"'}),
    defineField({name: 'heroTitle', title: 'Titre', type: 'string', group: 'hero'}),
    defineField({name: 'heroStatus', title: 'Ligne de statut', type: 'string', group: 'hero', description: 'ex. "House — Bruxelles & Namur — Résident Doktor Jack". À tenir à jour.'}),
    defineField({name: 'heroSubtitle', title: 'Sous-titre', type: 'text', rows: 2, group: 'hero'}),
    defineField({name: 'heroBadges', title: 'Badges', type: 'array', of: [{type: 'string'}], group: 'hero'}),
    defineField({name: 'heroCtaText', title: 'Bouton principal', type: 'string', group: 'hero'}),
    defineField({name: 'heroCtaLink', title: 'Lien du bouton principal', type: 'string', group: 'hero'}),
    defineField({name: 'heroCta2Text', title: 'Bouton secondaire', type: 'string', group: 'hero'}),
    defineField({name: 'heroCta2Link', title: 'Lien du bouton secondaire', type: 'string', group: 'hero'}),
    defineField({name: 'heroImage', title: 'Image', type: 'image', group: 'hero', options: {hotspot: true}}),
    defineField({name: 'heroImageAlt', title: 'Texte alternatif de l\'image', type: 'string', group: 'hero'}),

    // --- références ---
    defineField({name: 'referencesVisible', title: 'Visible', type: 'boolean', group: 'references', initialValue: true}),
    defineField({name: 'referencesTitle', title: 'Titre (lecteurs d\'écran)', type: 'string', group: 'references', description: 'ex. "Ils l\'ont programmé"'}),
    defineField({name: 'referencesItems', title: 'Lieux et médias', type: 'array', of: [{type: 'string'}], group: 'references', description: 'En texte uniquement, jamais de logo tiers.'}),

    // --- agenda ---
    defineField({name: 'agendaVisible', title: 'Visible', type: 'boolean', group: 'agenda', initialValue: true}),
    defineField({name: 'agendaEyebrow', title: 'Surtitre / menu', type: 'string', group: 'agenda', description: 'ex. "Dates"'}),
    defineField({name: 'agendaTitle', title: 'Titre (dates à venir)', type: 'string', group: 'agenda', description: 'ex. "Prochaines dates"'}),
    defineField({name: 'agendaPastTitle', title: 'Titre (aucune date à venir)', type: 'string', group: 'agenda', description: 'ex. "Dernières dates". Affiché automatiquement quand toutes les dates sont passées.'}),
    defineField({name: 'agendaNextLabel', title: 'Étiquette de la prochaine date', type: 'string', group: 'agenda', description: 'ex. "Prochaine date"'}),
    defineField({name: 'agendaItems', title: 'Dates', type: 'array', of: [{type: 'agendaItem'}], group: 'agenda', description: 'Les dates passées disparaissent seules (rebuild quotidien).'}),

    // --- services ---
    defineField({name: 'servicesVisible', title: 'Visible', type: 'boolean', group: 'services', initialValue: true}),
    defineField({name: 'servicesEyebrow', title: 'Surtitre / menu', type: 'string', group: 'services'}),
    defineField({name: 'servicesTitle', title: 'Titre de la section', type: 'string', group: 'services'}),
    defineField({name: 'servicesSubtitle', title: 'Sous-titre de la section', type: 'string', group: 'services'}),
    defineField({name: 'servicesItems', title: 'Prestations', type: 'array', of: [{type: 'serviceItem'}], group: 'services'}),
    defineField({name: 'servicesNote', title: 'Phrase sous les cartes', type: 'string', group: 'services'}),
    defineField({name: 'servicesCtaText', title: 'Bouton sous les cartes', type: 'string', group: 'services'}),

    // --- about ---
    defineField({name: 'aboutVisible', title: 'Visible', type: 'boolean', group: 'about', initialValue: true}),
    defineField({name: 'aboutEyebrow', title: 'Surtitre / menu', type: 'string', group: 'about'}),
    defineField({name: 'aboutTitle', title: 'Titre', type: 'string', group: 'about'}),
    defineField({name: 'aboutSubtitle', title: 'Sous-titre', type: 'string', group: 'about'}),
    defineField({name: 'aboutText', title: 'Texte', type: 'text', rows: 6, group: 'about'}),
    defineField({name: 'aboutImage', title: 'Image', type: 'image', group: 'about', options: {hotspot: true}}),
    defineField({name: 'aboutImageAlt', title: 'Texte alternatif de l\'image', type: 'string', group: 'about'}),
    defineField({name: 'aboutImage2', title: 'Image secondaire (vignette)', type: 'image', group: 'about', options: {hotspot: true}}),
    defineField({name: 'aboutImage2Alt', title: 'Texte alternatif de l\'image secondaire', type: 'string', group: 'about'}),
    defineField({name: 'aboutImage2Caption', title: 'Légende de l\'image secondaire', type: 'string', group: 'about'}),
    defineField({name: 'aboutStats', title: 'Chiffres clés', type: 'array', of: [{type: 'statItem'}], group: 'about'}),

    // --- vidéos & mixes ---
    defineField({name: 'mediaVisible', title: 'Visible', type: 'boolean', group: 'media', initialValue: false, description: 'Laisser masqué tant qu\'aucun lien n\'est fourni.'}),
    defineField({name: 'mediaEyebrow', title: 'Surtitre / menu', type: 'string', group: 'media'}),
    defineField({name: 'mediaTitle', title: 'Titre', type: 'string', group: 'media'}),
    defineField({name: 'mediaItems', title: 'Vidéos et mixes', type: 'array', of: [{type: 'mediaItem'}], group: 'media'}),

    // --- gallery ---
    defineField({name: 'galleryVisible', title: 'Visible', type: 'boolean', group: 'gallery', initialValue: true}),
    defineField({name: 'galleryEyebrow', title: 'Surtitre / menu', type: 'string', group: 'gallery'}),
    defineField({name: 'galleryTitle', title: 'Titre', type: 'string', group: 'gallery'}),
    defineField({name: 'gallerySubtitle', title: 'Sous-titre', type: 'string', group: 'gallery'}),
    defineField({name: 'galleryImages', title: 'Photos', type: 'array', of: [{type: 'galleryImage'}], group: 'gallery'}),
    defineField({name: 'galleryLinkLabel', title: 'Libellé du lien Instagram', type: 'string', group: 'gallery', description: 'ex. "Plus de photos sur Instagram"'}),

    // --- testimonials ---
    defineField({name: 'testimonialsVisible', title: 'Visible', type: 'boolean', group: 'testimonials', initialValue: false}),
    defineField({name: 'testimonialsTitle', title: 'Titre de la section', type: 'string', group: 'testimonials'}),
    defineField({name: 'testimonialsItems', title: 'Témoignages', type: 'array', of: [{type: 'testimonialItem'}], group: 'testimonials'}),

    // --- booking ---
    defineField({name: 'bookingEyebrow', title: 'Surtitre / menu', type: 'string', group: 'booking'}),
    defineField({name: 'bookingTitle', title: 'Titre', type: 'string', group: 'booking'}),
    defineField({name: 'bookingIntro', title: 'Introduction', type: 'text', rows: 2, group: 'booking'}),
    defineField({name: 'bookingEventTypes', title: 'Types d\'événement proposés', type: 'array', of: [{type: 'string'}], group: 'booking'}),
    defineField({name: 'bookingSubmitText', title: 'Texte du bouton d\'envoi', type: 'string', group: 'booking'}),
    defineField({name: 'bookingSuccess', title: 'Message de confirmation', type: 'string', group: 'booking'}),
    defineField({name: 'bookingError', title: 'Message d\'erreur', type: 'string', group: 'booking'}),
    defineField({name: 'pressKitFile', title: 'Kit presse (PDF)', type: 'file', group: 'booking', options: {accept: 'application/pdf'}, description: 'Le bouton n\'apparaît que si un fichier est déposé.'}),
    defineField({name: 'pressKitLabel', title: 'Libellé du bouton kit presse', type: 'string', group: 'booking'}),
  ],
  preview: {
    select: {title: 'siteName', subtitle: 'tagline', media: 'logo'},
  },
})
