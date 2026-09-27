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
    defineField({
      name: 'rating',
      title: 'Note (1 à 5)',
      type: 'number',
      validation: (r) => r.required().min(1).max(5).integer(),
    }),
  ],
  preview: {select: {title: 'name', subtitle: 'text'}},
})
