import {defineField, defineType} from 'sanity'

export const serviceItem = defineType({
  name: 'serviceItem',
  title: 'Service',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icône (nom Lucide)',
      type: 'string',
      description: "Nom de fichier lucide-static sans extension, ex. \"layers\". Voir CLAUDE.md §9bis.",
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

export const realisationImage = defineType({
  name: 'realisationImage',
  title: 'Photo',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Texte alternatif',
      type: 'string',
      description: 'Description factuelle de la photo (accessibilité) — obligatoire.',
      validation: (r) => r.required(),
    }),
  ],
  preview: {select: {title: 'alt', media: 'image'}},
})

export const realisationProject = defineType({
  name: 'realisationProject',
  title: 'Chantier',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titre du chantier', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      of: [{type: 'realisationImage'}],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'title', media: 'images.0.image'},
  },
})

export const testimonialItem = defineType({
  name: 'testimonialItem',
  title: 'Témoignage',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Nom', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'text', title: 'Texte', type: 'text', rows: 3, validation: (r) => r.required()}),
    defineField({
      name: 'rating',
      title: 'Note (1 à 5)',
      type: 'number',
      validation: (r) => r.required().min(1).max(5).integer(),
    }),
  ],
  preview: {select: {title: 'name', subtitle: 'text'}},
})
