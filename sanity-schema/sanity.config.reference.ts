import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import type {StructureResolver} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// RÉFÉRENCE — après `sanity init`, remplacer le sanity.config.ts généré par
// une copie de ce fichier (garder le vrai projectId que sanity init a déjà
// rempli). Ceci force le document "siteContent" en singleton : pas de liste
// générique, l'éditeur arrive directement dessus, et il est impossible d'en
// créer un deuxième ou de supprimer le seul qui existe depuis le Studio.
const SINGLETON_ID = 'siteContent'
const SINGLETON_TYPE = 'siteContent'

const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.listItem()
        .title('Contenu du site')
        .id(SINGLETON_TYPE)
        .child(S.document().schemaType(SINGLETON_TYPE).documentId(SINGLETON_ID)),
    ])

export default defineConfig({
  name: 'default',
  title: 'REMPLACER-PAR-LE-NOM-DU-CLIENT',

  projectId: 'REMPLACER-PAR-LE-PROJECT-ID', // sanity init l'a déjà rempli — reprendre cette valeur
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => schemaType !== SINGLETON_TYPE),
  },

  document: {
    actions: (input, context) =>
      context.schemaType === SINGLETON_TYPE
        ? input.filter(({action}) => action && !['duplicate', 'delete'].includes(action))
        : input,
  },
})
