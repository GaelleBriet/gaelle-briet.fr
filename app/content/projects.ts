// Les trois fiches projet. Textes repris mot pour mot de textes.md.

export type ProjectStatus = 'service' | 'construction' | 'libre'

export interface Project {
  /** Numéro affiché en haut de la fiche, ex. « 01 / 03 ». */
  index: string
  /** Onglet cartonné en haut de la fiche. */
  tab: string
  /** Pilote la couleur de l'onglet et le style pointillé de la fiche « Place libre ». */
  status: ProjectStatus
  title: string
  text: string
  stack: string
  image?: {
    src: string
    srcset: string
    sizes: string
    width: number
    height: number
    alt: string
  }
  action: {
    label: string
    href: string
    /** true pour les liens sortants (GitHub). */
    external: boolean
  }
}

export const projects: Project[] = [
  {
    index: '01 / 03',
    tab: 'En service',
    status: 'service',
    title: 'Symbaroum Bestiary Manager',
    text: 'Compagnon de jeu pour meneurs de Symbaroum. Conçu pour un utilisateur réel, puis itéré à partir de ce qu\'il en a fait à table.',
    stack: 'Vue.js · TypeScript · Supabase',
    image: {
      src: '/images/symbaroum-capture-800.webp',
      srcset: '/images/symbaroum-capture-400.webp 400w, /images/symbaroum-capture-800.webp 800w',
      sizes: '(max-width: 640px) calc(100vw - 108px), (max-width: 960px) calc(50vw - 67px), 317px',
      width: 800,
      height: 500,
      alt: 'Liste des créatures dans Symbaroum Bestiary Manager',
    },
    action: {
      label: 'Voir sur GitHub',
      href: 'https://github.com/GaelleBriet/symbaroum-bestiary',
      external: true,
    },
  },
  {
    index: '02 / 03',
    tab: 'En construction',
    status: 'construction',
    title: 'MémoPatte',
    text: 'Carnet de santé pour animaux : vaccins, vermifuges, poids, rappels. Première version en construction, testée avec des propriétaires au fil des versions.',
    stack: 'Vue.js · En construction',
    image: {
      src: '/images/memopatte-capture-800.webp',
      srcset: '/images/memopatte-capture-400.webp 400w, /images/memopatte-capture-800.webp 800w',
      sizes: '(max-width: 640px) calc(100vw - 108px), (max-width: 960px) calc(50vw - 67px), 317px',
      width: 800,
      height: 500,
      alt: 'Maquettes de MémoPatte : accueil et carnet de santé',
    },
    action: {
      label: 'Suivre sur GitHub',
      href: 'https://github.com/GaelleBriet/memo-patte-vue',
      external: true,
    },
  },
  {
    index: '03 / 03',
    tab: 'Emplacement libre',
    status: 'libre',
    title: 'Place libre',
    text: 'Prochain projet : un besoin à clarifier, une première version à faire tourner.',
    stack: 'À définir ensemble',
    action: {
      label: 'En parler',
      href: '#contact',
      external: false,
    },
  },
]

export const projectsSection = {
  eyebrow: 'Sélection',
  title: 'Les projets',
} as const
