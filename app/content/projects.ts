// Les trois fiches projet.

export type ProjectStatus = 'service' | 'construction' | 'libre'

/** Une image de la galerie d'une fiche. */
export interface ProjectImage {
  /** Vignette de la fiche, toujours en 16:10 : 800 px, et 400 px dans `srcset`. */
  thumb: {
    src: string
    srcset: string
  }
  /** Grande vue, chargée seulement à l'ouverture. */
  full: {
    src: string
    width: number
    height: number
  }
  alt: string
  caption: string
}

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
  /** Galerie de la fiche : la première image sert de vignette. Sans image, cadre vide. */
  images?: ProjectImage[]
  action: {
    label: string
    href: string
    /** true pour les liens sortants (GitHub). */
    external: boolean
  }
  /** Lien vers la page d'étude de cas, s'il y en a une. */
  caseStudy?: {
    label: string
    href: string
  }
  /** Démo en ligne, s'il y en a une : bouton corail avant GitHub, toujours sortant. */
  demo?: {
    label: string
    href: string
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
    // Vignettes : gros plans lisibles ; grande vue : l'écran entier de la démo.
    images: [
      {
        thumb: {
          src: '/images/projets/symbaroum-liste-800.webp',
          srcset: '/images/projets/symbaroum-liste-400.webp 400w, /images/projets/symbaroum-liste-800.webp 800w',
        },
        full: { src: '/images/projets/symbaroum-liste-grand.webp', width: 1600, height: 1000 },
        alt: 'Liste des créatures dans Symbaroum Bestiary Manager, avec leur rang et leurs scores d\'attaque, de défense et d\'endurance',
        caption: 'La liste des créatures : rang, attaque, défense et endurance d\'un coup d\'œil.',
      },
      {
        thumb: {
          src: '/images/projets/symbaroum-fiche-800.webp',
          srcset: '/images/projets/symbaroum-fiche-400.webp 400w, /images/projets/symbaroum-fiche-800.webp 800w',
        },
        full: { src: '/images/projets/symbaroum-fiche-grand.webp', width: 1600, height: 1000 },
        alt: 'Fiche du Haut Troll : attributs et bonus, modificateurs de combat des joueurs, capacités et talents',
        caption: 'La fiche d\'un monstre : ses attributs, et les modificateurs de combat des joueurs qui en découlent.',
      },
      {
        thumb: {
          src: '/images/projets/symbaroum-edition-800.webp',
          srcset: '/images/projets/symbaroum-edition-400.webp 400w, /images/projets/symbaroum-edition-800.webp 800w',
        },
        full: { src: '/images/projets/symbaroum-edition-grand.webp', width: 1600, height: 1000 },
        alt: 'Formulaire de modification de l\'Elfe d\'Automne : identité, résistance et endurance, attributs, traits et talents',
        caption: 'La saisie d\'un monstre : identité, résistance, attributs, traits et talents.',
      },
    ],
    action: {
      label: 'GitHub',
      href: 'https://github.com/GaelleBriet/symbaroum-bestiary',
      external: true,
    },
    caseStudy: {
      label: 'Lire l\'étude de cas',
      href: '/projets/symbaroum-bestiary-manager/',
    },
    demo: {
      label: 'Démo',
      href: 'https://symbaroum-bestiary.vercel.app/?demo',
    },
  },
  {
    index: '02 / 03',
    tab: 'En construction',
    status: 'construction',
    title: 'MémoPatte',
    text: 'Carnet de santé pour animaux : vaccins, vermifuges, poids, rappels. Première version en construction, testée avec des propriétaires au fil des versions.',
    stack: 'Vue.js · En construction',
    images: [
      {
        thumb: {
          src: '/images/projets/memopatte-maquette-800.webp',
          srcset: '/images/projets/memopatte-maquette-400.webp 400w, /images/projets/memopatte-maquette-800.webp 800w',
        },
        // Pas de version plus grande de cette maquette : la grande vue reprend la vignette.
        full: { src: '/images/projets/memopatte-maquette-800.webp', width: 800, height: 500 },
        alt: 'Maquettes de MémoPatte : l\'icône de l\'appli, l\'accueil et le carnet de santé',
        caption: 'Les maquettes de MémoPatte : l\'accueil et le carnet de santé.',
      },
      {
        thumb: {
          src: '/images/projets/memopatte-accueil-800.webp',
          srcset: '/images/projets/memopatte-accueil-400.webp 400w, /images/projets/memopatte-accueil-800.webp 800w',
        },
        full: { src: '/images/projets/memopatte-accueil-grand.webp', width: 739, height: 1600 },
        alt: 'Accueil de MémoPatte : les rappels à faire, dont un vaccin en retard',
        caption: 'L\'accueil : les soins à venir, les retards en premier.',
      },
      {
        thumb: {
          src: '/images/projets/memopatte-carnet-800.webp',
          srcset: '/images/projets/memopatte-carnet-400.webp 400w, /images/projets/memopatte-carnet-800.webp 800w',
        },
        full: { src: '/images/projets/memopatte-carnet-grand.webp', width: 739, height: 1600 },
        alt: 'Carnet de santé de Milo : poids, rappels et traitements en cours',
        caption: 'Le carnet de chaque animal : poids, rappels, vaccins et traitements.',
      },
      {
        thumb: {
          src: '/images/projets/memopatte-poids-800.webp',
          srcset: '/images/projets/memopatte-poids-400.webp 400w, /images/projets/memopatte-poids-800.webp 800w',
        },
        full: { src: '/images/projets/memopatte-poids-grand.webp', width: 739, height: 1600 },
        alt: 'Suivi du poids de Milo : courbe sur six mois',
        caption: 'Le suivi du poids, pesée après pesée.',
      },
      {
        thumb: {
          src: '/images/projets/memopatte-luna-800.webp',
          srcset: '/images/projets/memopatte-luna-400.webp 400w, /images/projets/memopatte-luna-800.webp 800w',
        },
        full: { src: '/images/projets/memopatte-luna-grand.webp', width: 739, height: 1600 },
        alt: 'Carnet de Luna : vaccin à jour et traitement en cours',
        caption: 'Un carnet par animal, chien ou chat.',
      },
    ],
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
      // Même destination que le bouton Contact de la nav.
      href: '#missions',
      external: false,
    },
  },
]

/** Libellés de la galerie des fiches et de sa grande vue. */
export const galleryLabels = {
  /** Suivi du titre du projet : « Captures de Symbaroum Bestiary Manager ». */
  region: 'Captures de',
  previous: 'Image précédente',
  next: 'Image suivante',
  /** Ajouté au nom de chaque vignette, pour les lecteurs d'écran. */
  open: ', agrandir',
  close: 'Fermer',
} as const

export const projectsSection = {
  eyebrow: 'Sélection',
  title: 'Les projets',
} as const
