import {defineField, defineType} from 'sanity'

// Types génériques du template (sanity-schema/objects.ts), plus les types propres
// à ce client (DJ) : agenda, photos créditées, vidéos/mixes. Cf. DESIGN.md et
// COMPONENTS.md.

export const serviceItem = defineType({
  name: 'serviceItem',
  title: 'Service',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icône (nom Lucide)',
      type: 'string',
      description: "Nom de fichier lucide-static sans extension, ex. \"disc-3\". Voir CLAUDE.md §9bis.",
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

// Variante lilot-pates-namur : note facultative (jamais d'étoile inventée) + source.
export const testimonialItem = defineType({
  name: 'testimonialItem',
  title: 'Témoignage',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Nom', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'text', title: 'Texte', type: 'text', rows: 3, validation: (r) => r.required()}),
    defineField({name: 'rating', title: 'Note (1 à 5, facultative)', type: 'number', validation: (r) => r.min(1).max(5).integer()}),
    defineField({name: 'source', title: 'Source', type: 'string', description: 'ex. "organisateur, Chez Ginette"'}),
  ],
  preview: {select: {title: 'name', subtitle: 'text'}},
})

// --- Types propres à ce client ---

export const agendaItem = defineType({
  name: 'agendaItem',
  title: 'Date',
  type: 'object',
  fields: [
    defineField({name: 'date', title: 'Date', type: 'date', options: {dateFormat: 'DD/MM/YYYY'}, validation: (r) => r.required()}),
    defineField({name: 'venue', title: 'Lieu / soirée', type: 'string', description: 'ex. "Wave — Jeux d\'Hiver". Laisser vide si pas encore annoncé : seule la ville s\'affiche.'}),
    defineField({name: 'city', title: 'Ville', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'venue', subtitle: 'date', city: 'city'}, prepare: ({title, subtitle, city}) => ({title: title || city, subtitle: `${subtitle} · ${city}`})},
})

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Photo',
  type: 'object',
  fields: [
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, validation: (r) => r.required()}),
    defineField({name: 'alt', title: 'Texte alternatif', type: 'string', description: 'Description factuelle de la photo (accessibilité), obligatoire.', validation: (r) => r.required()}),
    defineField({name: 'credit', title: 'Crédit photo', type: 'string', description: 'ex. "@etapolis". Laisser vide si inconnu.'}),
  ],
  preview: {select: {title: 'alt', subtitle: 'credit', media: 'image'}},
})

export const mediaItem = defineType({
  name: 'mediaItem',
  title: 'Vidéo ou mix',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'url', title: 'Lien (YouTube, SoundCloud, Mixcloud…)', type: 'url', validation: (r) => r.required()}),
    defineField({name: 'subtitle', title: 'Précision', type: 'string', description: 'ex. "Live à Chez Ginette, 2025"'}),
  ],
  preview: {select: {title: 'title', subtitle: 'url'}},
})
