import {defineField, defineType} from 'sanity'

// Document singleton : un seul exemplaire de ce type existe par dataset
// (_id fixé à "siteContent", cf. sanity.config.ts). Reprend la structure
// historique de content-draft.json (meta/site/theme/sections), étendue pour ce
// client (salon de coiffure) : bandeau congés, tarifs, soin signature,
// réalisations, horaires détaillés. Adapté de library/sanity/lilot-pates-namur.
// rosa-hair-coiffure-habay : repris de library/sanity/laetitia-coiffure-arlon, avec
// mapsUrl (hair-family-arlon), WhatsApp à la place du SMS et icône de la barre mobile.
export const siteContent = defineType({
  name: 'siteContent',
  title: 'Contenu du site',
  type: 'document',
  groups: [
    {name: 'meta', title: 'Méta'},
    {name: 'site', title: 'Entreprise'},
    {name: 'theme', title: 'Thème'},
    {name: 'announcement', title: 'Bandeau congés'},
    {name: 'hero', title: 'Accueil'},
    {name: 'services', title: 'Prestations'},
    {name: 'menu', title: 'Tarifs'},
    {name: 'spotlight', title: 'Prestation phare'},
    {name: 'gallery', title: 'Avant / après'},
    {name: 'about', title: 'Le salon'},
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
    defineField({name: 'phone', title: 'Téléphone', type: 'string', group: 'site', description: 'Format belge, ex. "0491 64 34 46". Vide = boutons Appeler/WhatsApp retirés partout.'}),
    defineField({name: 'email', title: 'Email', type: 'string', group: 'site'}),
    defineField({name: 'address', title: 'Adresse', type: 'string', group: 'site'}),
    defineField({name: 'hours', title: 'Horaires (résumé pied de page)', type: 'string', group: 'site'}),
    defineField({name: 'mapsUrl', title: 'Lien Google Maps (itinéraire)', type: 'url', group: 'site', description: 'Lien de la fiche Google Maps du salon, utilisé par le bouton « Itinéraire ».'}),
    defineField({name: 'navCtaText', title: 'Bouton de l\'en-tête', type: 'string', group: 'site', description: 'ex. "Prendre rendez-vous"'}),
    defineField({name: 'navCtaLink', title: 'Lien du bouton de l\'en-tête', type: 'string', group: 'site', description: 'ex. "#contact"'}),
    defineField({name: 'mobileCtaText', title: 'Second bouton de la barre mobile', type: 'string', group: 'site', description: 'ex. "Tarifs"'}),
    defineField({name: 'mobileCtaLink', title: 'Lien du second bouton de la barre mobile', type: 'string', group: 'site', description: 'ex. "#tarifs" ou "https://wa.me/32491643446"'}),
    defineField({name: 'mobileCtaIcon', title: 'Icône du second bouton de la barre mobile', type: 'string', group: 'site', description: 'Nom Lucide, ex. "message-circle", "list"'}),
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

    // --- announcement (congés, fermetures) ---
    defineField({name: 'announcementVisible', title: 'Visible', type: 'boolean', group: 'announcement', initialValue: false, description: 'À activer pendant les congés, puis désactiver au retour.'}),
    defineField({name: 'announcementTitle', title: 'Titre', type: 'string', group: 'announcement', description: 'ex. "Le salon est en congé"'}),
    defineField({name: 'announcementText', title: 'Texte', type: 'text', rows: 3, group: 'announcement', description: 'ex. "Fermé du 22 décembre au 5 janvier, retour le mardi 6 janvier."'}),

    // --- hero ---
    defineField({name: 'heroVisible', title: 'Visible', type: 'boolean', group: 'hero', initialValue: true}),
    defineField({name: 'heroEyebrow', title: 'Surtitre', type: 'string', group: 'hero'}),
    defineField({name: 'heroTitle', title: 'Titre', type: 'string', group: 'hero'}),
    defineField({name: 'heroSubtitle', title: 'Sous-titre', type: 'text', rows: 2, group: 'hero'}),
    defineField({name: 'heroCtaText', title: 'Bouton principal', type: 'string', group: 'hero'}),
    defineField({name: 'heroCtaLink', title: 'Lien du bouton principal', type: 'string', group: 'hero'}),
    defineField({name: 'heroCta2Text', title: 'Second bouton', type: 'string', group: 'hero'}),
    defineField({name: 'heroCta2Link', title: 'Lien du second bouton', type: 'string', group: 'hero'}),
    defineField({name: 'heroBadges', title: 'Badges', type: 'array', of: [{type: 'string'}], group: 'hero'}),
    defineField({name: 'heroImage', title: 'Image', type: 'image', group: 'hero', options: {hotspot: true}}),
    defineField({name: 'heroImageAlt', title: 'Texte alternatif de l\'image', type: 'string', group: 'hero'}),

    // --- services ---
    defineField({name: 'servicesVisible', title: 'Visible', type: 'boolean', group: 'services', initialValue: true}),
    defineField({name: 'servicesTitle', title: 'Titre de la section', type: 'string', group: 'services'}),
    defineField({name: 'servicesSubtitle', title: 'Sous-titre de la section', type: 'string', group: 'services'}),
    defineField({name: 'servicesItems', title: 'Prestations', type: 'array', of: [{type: 'serviceItem'}], group: 'services'}),

    // --- tarifs ---
    defineField({name: 'menuVisible', title: 'Visible', type: 'boolean', group: 'menu', initialValue: true}),
    defineField({name: 'menuTitle', title: 'Titre', type: 'string', group: 'menu'}),
    defineField({name: 'menuSubtitle', title: 'Sous-titre', type: 'string', group: 'menu'}),
    defineField({name: 'menuCategories', title: 'Rubriques', type: 'array', of: [{type: 'menuCategory'}], group: 'menu'}),
    defineField({name: 'menuSupplements', title: 'Mention sous les tarifs', type: 'text', rows: 2, group: 'menu'}),
    defineField({name: 'menuAllergyNote', title: 'Mention mise en avant', type: 'string', group: 'menu', description: 'ex. "Prix de départ"'}),

    // --- soin signature ---
    defineField({name: 'spotlightVisible', title: 'Visible', type: 'boolean', group: 'spotlight', initialValue: true}),
    defineField({name: 'spotlightEyebrow', title: 'Surtitre', type: 'string', group: 'spotlight'}),
    defineField({name: 'spotlightTitle', title: 'Titre', type: 'string', group: 'spotlight'}),
    defineField({name: 'spotlightText', title: 'Texte', type: 'text', rows: 2, group: 'spotlight'}),
    defineField({name: 'spotlightItems', title: 'Ce qui est compris', type: 'array', of: [{type: 'string'}], group: 'spotlight'}),
    defineField({name: 'spotlightPrice', title: 'Prix', type: 'string', group: 'spotlight', description: 'ex. "79 €"'}),
    defineField({name: 'spotlightPriceNote', title: 'Précision du prix', type: 'string', group: 'spotlight', description: 'ex. "+10 € cheveux longs"'}),
    defineField({name: 'spotlightCtaText', title: 'Texte du bouton', type: 'string', group: 'spotlight'}),
    defineField({name: 'spotlightCtaLink', title: 'Lien du bouton', type: 'string', group: 'spotlight'}),
    defineField({name: 'spotlightImage', title: 'Photo', type: 'image', group: 'spotlight', options: {hotspot: true}}),
    defineField({name: 'spotlightImageAlt', title: 'Texte alternatif de la photo', type: 'string', group: 'spotlight'}),

    // --- réalisations ---
    defineField({name: 'galleryVisible', title: 'Visible', type: 'boolean', group: 'gallery', initialValue: true}),
    defineField({name: 'galleryTitle', title: 'Titre', type: 'string', group: 'gallery'}),
    defineField({name: 'gallerySubtitle', title: 'Sous-titre', type: 'string', group: 'gallery'}),
    defineField({name: 'galleryImages', title: 'Photos', type: 'array', of: [{type: 'galleryImage'}], group: 'gallery'}),
    defineField({name: 'galleryFacebookLabel', title: 'Texte du lien Facebook', type: 'string', group: 'gallery', description: 'ex. "Plus de réalisations sur Facebook"'}),

    // --- le salon ---
    defineField({name: 'aboutVisible', title: 'Visible', type: 'boolean', group: 'about', initialValue: true}),
    defineField({name: 'aboutTitle', title: 'Titre', type: 'string', group: 'about'}),
    defineField({name: 'aboutSubtitle', title: 'Sous-titre', type: 'string', group: 'about'}),
    defineField({name: 'aboutText', title: 'Texte', type: 'text', rows: 5, group: 'about'}),
    defineField({name: 'aboutImage', title: 'Image', type: 'image', group: 'about', options: {hotspot: true}}),
    defineField({name: 'aboutImageAlt', title: 'Texte alternatif de l\'image', type: 'string', group: 'about'}),
    defineField({name: 'aboutImage2', title: 'Image secondaire (vignette)', type: 'image', group: 'about', options: {hotspot: true}}),
    defineField({name: 'aboutImage2Alt', title: 'Texte alternatif de l\'image secondaire', type: 'string', group: 'about'}),
    defineField({name: 'aboutImage2Caption', title: 'Légende de l\'image secondaire', type: 'string', group: 'about'}),
    defineField({name: 'aboutStats', title: 'Chiffres clés', type: 'array', of: [{type: 'statItem'}], group: 'about'}),

    // --- testimonials ---
    defineField({name: 'testimonialsVisible', title: 'Visible', type: 'boolean', group: 'testimonials', initialValue: true}),
    defineField({name: 'testimonialsTitle', title: 'Titre de la section', type: 'string', group: 'testimonials'}),
    defineField({name: 'testimonialsRatingValue', title: 'Note globale', type: 'string', group: 'testimonials', description: 'Note réelle, ex. "4,7"'}),
    defineField({name: 'testimonialsRatingLabel', title: 'Libellé de la note globale', type: 'string', group: 'testimonials', description: 'ex. "44 avis Google"'}),
    defineField({name: 'testimonialsItems', title: 'Témoignages', type: 'array', of: [{type: 'testimonialItem'}], group: 'testimonials'}),

    // --- contact ---
    defineField({name: 'contactTitle', title: 'Titre', type: 'string', group: 'contact'}),
    defineField({name: 'contactIntro', title: 'Introduction', type: 'string', group: 'contact'}),
    defineField({name: 'contactAccess', title: 'Précision d\'accès', type: 'string', group: 'contact'}),
    defineField({name: 'contactWhatsappText', title: 'Texte du lien WhatsApp', type: 'string', group: 'contact', description: 'ex. "Écrire sur WhatsApp". Vide = pas de lien WhatsApp.'}),
    defineField({name: 'openingHours', title: 'Horaires détaillés', type: 'array', of: [{type: 'hoursItem'}], group: 'contact'}),
    defineField({name: 'formTitle', title: 'Titre du formulaire', type: 'string', group: 'contact'}),
  ],
  preview: {
    select: {title: 'siteName', subtitle: 'tagline', media: 'logo'},
  },
})
