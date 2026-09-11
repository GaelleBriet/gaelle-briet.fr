// Les trois petites annonces de la colonne droite de « Travaillons ensemble ».
// Textes repris mot pour mot de textes.md.
// Les rotations et chevauchements sont du dessin : ils vivent dans Clipping.vue.

export interface Clipping {
  label: string
  lines: string[]
  /** Dernière ligne, coupée en deux pour insérer le lien mailto. */
  emailLine?: {
    before: string
    after: string
  }
}

export const clippings: Clipping[] = [
  {
    label: 'Je cherche',
    lines: [
      'PME, startup, agence ou association. Projet à créer, faire évoluer ou clarifier. Périmètre encore flou accepté.',
    ],
    emailLine: {
      before: 'Écrire à ',
      after: '.',
    },
  },
  {
    label: 'Je travaille avec',
    lines: [
      'Angular · Vue.js · TypeScript',
      'Applications web & outils métier',
    ],
  },
  {
    label: 'Où / comment',
    lines: [
      'Depuis Cavaillon, en Provence · À distance',
      'Déplacements ponctuels · Temps partiel',
    ],
  },
]
