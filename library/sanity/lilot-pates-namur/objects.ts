import {defineField, defineType} from 'sanity'

// Schéma Sanity réutilisable du template — À COPIER dans studio/schemaTypes/
// de chaque nouveau projet client après `sanity init` (cf. CLAUDE.md §5 et
// build-site-vitrine). Ce dossier n'est PAS un Studio Sanity fonctionnel en
// lui-même (pas de sanity.config.ts/package.json — chaque client a son propre
// projet Sanity, impossible à mutualiser ici) : uniquement la définition des
// types, à copier telle quelle puis étendre au cas par cas (ex. une section
// "Réalisations" avec galerie photo, comme fait pour un client artisan/BTP,
// cf. COMPONENTS.md — un type de section propre au client se rajoute dans le
// studio de CE client, pas ici, tant qu'il n'a pas servi sur 3 clients
// différents et mérité une promotion dans ce template).

export const serviceItem = defineType({
  name: 'serviceItem',
  title: 'Service',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icône (nom Lucide)',
      type: 'string',
      description: "Nom de fichier lucide-static sans extension, ex. \"wrench\". Voir CLAUDE.md §9bis.",
      validation: (r) => r.required(),
    }),
    defineField({name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 2, validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'title', subtitle: 'icon'}},
})

export const statItem = defineType({
  name: 'statItem',
  title: 'Chiffre clé',
  type: 'object',
  fields: [
    defineField({name: 'value', title: 'Valeur', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'label', title: 'Libellé', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'value', subtitle: 'label'}},
})

export const testimonialItem = defineType({
  name: 'testimonialItem',
  title: 'Témoignage',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Nom', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'text', title: 'Texte', type: 'text', rows: 3, validation: (r) => r.required()}),
    // Variante client (DESIGN.md §Structure 8) : la note est facultative — les
    // citations reprises de commentaires Facebook n'ont pas de note, et on n'en
    // invente jamais. Sans note, aucune étoile n'est affichée pour la citation.
    defineField({
      name: 'rating',
      title: 'Note (1 à 5, facultative)',
      type: 'number',
      validation: (r) => r.min(1).max(5).integer(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Où la citation a été publiée, ex. "sur Facebook", "sur Google".',
    }),
  ],
  preview: {select: {title: 'name', subtitle: 'text'}},
})

// --- Types propres à ce client (restaurant), cf. DESIGN.md et COMPONENTS.md ---

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Photo',
  type: 'object',
  fields: [
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, validation: (r) => r.required()}),
    defineField({
      name: 'alt',
      title: 'Texte alternatif',
      type: 'string',
      description: 'Description factuelle de la photo (accessibilité), obligatoire.',
      validation: (r) => r.required(),
    }),
  ],
  preview: {select: {title: 'alt', media: 'image'}},
})

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Plat',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Nom', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'description', title: 'Composition', type: 'string'}),
    defineField({
      name: 'price',
      title: 'Prix',
      type: 'string',
      description: 'Format belge, ex. "8,50 €". Laisser vide si la rubrique a un prix unique.',
    }),
  ],
  preview: {select: {title: 'name', subtitle: 'price'}},
})

export const menuPrice = defineType({
  name: 'menuPrice',
  title: 'Prix de rubrique',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Libellé', type: 'string', description: 'ex. "Normal", "Maxi"', validation: (r) => r.required()}),
    defineField({name: 'price', title: 'Prix', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'label', subtitle: 'price'}},
})

export const menuCategory = defineType({
  name: 'menuCategory',
  title: 'Rubrique de la carte',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'note', title: 'Précision', type: 'string', description: 'ex. "Servis avec de l\'emmenthal"'}),
    defineField({
      name: 'prices',
      title: 'Prix unique de la rubrique',
      type: 'array',
      of: [{type: 'menuPrice'}],
      description: 'Pour une rubrique à prix unique (ex. Normal 6,50 € / Maxi 7,50 €), affichés en médaillons.',
    }),
    defineField({name: 'items', title: 'Plats', type: 'array', of: [{type: 'menuItem'}], validation: (r) => r.required().min(1)}),
    defineField({name: 'footnote', title: 'Mention sous la rubrique', type: 'string', description: 'ex. "Tagliatelle, spaghetti ou tortellini : + 2,00 €"'}),
  ],
  preview: {select: {title: 'title', subtitle: 'note'}},
})

export const hoursItem = defineType({
  name: 'hoursItem',
  title: 'Horaire',
  type: 'object',
  fields: [
    defineField({name: 'day', title: 'Jour', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'hours', title: 'Heures', type: 'string', description: 'ex. "11h30 – 15h30" ou "Fermé"', validation: (r) => r.required()}),
    defineField({name: 'note', title: 'Badge', type: 'string', description: 'ex. "non-stop"'}),
  ],
  preview: {select: {title: 'day', subtitle: 'hours'}},
})

export const cateringItem = defineType({
  name: 'cateringItem',
  title: 'Offre traiteur',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
    defineField({name: 'image', title: 'Photo', type: 'image', options: {hotspot: true}}),
    defineField({name: 'imageAlt', title: 'Texte alternatif de la photo', type: 'string'}),
  ],
  preview: {select: {title: 'title', subtitle: 'description', media: 'image'}},
})
