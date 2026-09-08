// Tous les textes du site. Aucun texte en dur dans les composants.
// Source : textes.md (maquette Claude Design v6.1), repris mot pour mot.

export interface NavLink {
  label: string
  href: string
}

export const site = {
  name: 'Gaëlle Briet',
  subtitle: 'Développeuse web · approche produit',
  email: 'hello@gaelle-briet.fr',
  url: 'https://www.gaelle-briet.fr',
  brandAlt: 'Marque GB',
  sealAlt: 'Sceau Gaëlle Briet',
  stack: 'Angular · Vue.js · TypeScript',
  copyright: '© 2026 Gaëlle Briet · Développeuse web · approche produit',
  links: {
    github: { label: 'GitHub · GaelleBriet', url: 'https://github.com/GaelleBriet' },
    linkedin: { label: 'LinkedIn · gaellebriet', url: 'https://www.linkedin.com/in/gaelle-briet-666184227/' },
  },
  zone: {
    title: 'Provence-Alpes-Côte d\'Azur',
    note: 'Missions à distance, déplacements ponctuels.',
  },
} as const

export const meta = {
  title: 'Gaëlle Briet · Développeuse web, approche produit',
  description:
    'Applications web et outils métier, de l\'idée aux premières versions utilisables. Développeuse front-end freelance en Provence, missions à distance.',
  /** 1200 × 630, régénérable depuis tools/og-image.html (voir le README). */
  image: '/og-image.jpg',
  imageAlt: 'Gaëlle Briet · Des outils qu\'on utilise vraiment',
} as const

export const nav: NavLink[] = [
  { label: 'Projets', href: '#projets' },
  { label: 'Méthode', href: '#methode' },
]

// Le bouton mène à la section « Travaillons ensemble », pas au pied de page.
export const navCta: NavLink = { label: 'Contact', href: '#missions' }

export const hero = {
  eyebrow: 'Applications web et outils métier',
  title: 'Des outils qu\'on utilise vraiment',
  lead: 'Je développe des applications web et des outils métier, de l\'idée aux premières versions utilisables.',
  pitch:
    'Je peux intervenir dès les premières réflexions : comprendre le besoin, poser les bonnes questions, proposer des maquettes et construire une solution adaptée. Parce que livrer la bonne chose m\'intéresse autant que bien la construire.',
  actions: {
    primary: { label: 'Voir les projets', href: '#projets' },
    secondary: { label: 'Écrire', href: 'mailto:hello@gaelle-briet.fr' },
  },
  poster: {
    src: '/images/affiche-1200.webp',
    srcset:
      '/images/affiche-440.webp 440w, /images/affiche-880.webp 880w, /images/affiche-1200.webp 1200w',
    // le cadre a 14 px de rembourrage de chaque côté, d'où les 84 px retirés
    sizes: '(max-width: 600px) calc(100vw - 84px), 432px',
    width: 1200,
    height: 1222,
    alt: 'Affiche de course automobile peinte, années 50 : trois monoplaces en pleine accélération.',
    caption: 'Fig. 01 · Une mission, plusieurs tours de piste.',
    credit: 'Illustration générée par IA.',
  },
} as const

export const method = {
  eyebrow: 'Méthode',
  title: 'Comprendre le besoin, construire le bon outil.',
  paragraphs: [
    'Sur une application métier, le défi n\'est pas seulement technique : il faut comprendre qui s\'en sert, pour quoi, et sous quelles contraintes.',
    'Qu\'il s\'agisse d\'une équipe de maintenance sur site industriel ou d\'une association qui gère ses adhérents, la méthode reste la même : comprendre, clarifier, puis concevoir et construire par étapes courtes et vérifiables.',
  ],
} as const

export const missions = {
  eyebrow: 'Un projet en tête ?',
  title: 'Travaillons ensemble',
  // Le temps que l'auto-entreprise soit immatriculée (pas encore de SIRET) :
  // mention temporaire, à retirer une fois la disponibilité effective.
  availability: 'Disponible pour de nouvelles missions en octobre 2026.',
  portrait: {
    src: '/images/portrait-280.webp',
    srcset: '/images/portrait-280.webp 280w, /images/portrait-600.webp 600w',
    sizes: '140px',
    width: 600,
    height: 600,
    alt: 'Gaëlle Briet',
  },
  paragraphs: [
    'Vous avez un outil à créer, une application à faire évoluer ou simplement un besoin qui n\'est pas encore très clair ?',
    'Je peux intervenir sur la réflexion en amont, les maquettes et le développement front-end, principalement avec Angular, Vue.js et TypeScript.',
    'Je travaille sur des missions ponctuelles ou à temps partiel. Le périmètre et le mode d\'intervention se définissent ensemble, en fonction du projet.',
  ],
  action: { label: 'Me parler de votre projet', href: 'mailto:hello@gaelle-briet.fr' },
} as const

export const footer = {
  columns: {
    zone: 'Zone',
    contact: 'Contact',
    navigation: 'Navigation',
  },
  navigation: [
    { label: 'Accueil', href: '#haut' },
    { label: 'Projets', href: '#projets' },
    { label: 'Méthode', href: '#methode' },
    { label: 'Missions', href: '#missions' },
  ] satisfies NavLink[],
} as const
