// Les cinq étapes de la feuille de route. Textes repris mot pour mot de textes.md.

export interface RoadmapStep {
  number: string
  title: string
  text: string
}

export const roadmap = {
  header: 'Feuille de route',
  laps: '5 tours',
  /** Libellé en marge de la boucle de retour du 05 vers le 01. */
  loopLabel: 'si nécessaire',
} as const

export const steps: RoadmapStep[] = [
  {
    number: '01',
    title: 'Comprendre',
    text: 'Qui va utiliser l\'outil ? Pour faire quoi ? Dans quel contexte ?',
  },
  {
    number: '02',
    title: 'Clarifier',
    text: 'Trier l\'essentiel du souhaitable. Poser les contraintes et les zones encore floues.',
  },
  {
    number: '03',
    title: 'Concevoir',
    text: 'Écrans, parcours utilisateurs, données, choix techniques : donner une forme au besoin avant de tout développer.',
  },
  {
    number: '04',
    title: 'Construire',
    text: 'Avancer par petites versions utilisables plutôt que tout livrer d\'un bloc.',
  },
  {
    number: '05',
    title: 'Vérifier',
    text: 'Faire essayer, confronter aux usages réels, corriger. Et repartir pour un tour si nécessaire.',
  },
]
