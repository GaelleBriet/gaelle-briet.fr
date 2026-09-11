// Étude de cas Symbaroum Bestiary Manager.
// Textes validés par Gaëlle (brouillon Obsidian du 11 sept. 2026), repris mot pour mot.
// Même règle que site.ts : aucun texte dans les composants.

export interface CaseFigure {
  caption: string
  alt: string
  src: string
  srcset: string
  width: number
  height: number
}

export const etudeSymbaroum = {
  /** Barre finale : Cloudflare Pages sert `dossier/index.html` sous `/dossier/`. */
  path: '/projets/symbaroum-bestiary-manager/',
  meta: {
    title: 'Symbaroum Bestiary Manager · étude de cas · Gaëlle Briet',
    description:
      'Étude de cas : un outil de bestiaire pour maître du jeu, du cadrage produit au développement Vue.js, TypeScript et Supabase, guidé par les retours de son utilisateur.',
  },
  back: { label: '← Tous les projets', href: '/#projets' },
  eyebrow: 'Étude de cas',
  title: 'Symbaroum Bestiary Manager',
  lead: 'Un outil sur tablette pour qu\'un maître du jeu trouve, crée et calcule ses monstres sans ouvrir un livre de règles. Projet mené seule, du cadrage au développement, avec un utilisateur réel.',
  summary: {
    title: 'En bref',
    items: [
      { label: 'Rôle', value: 'cadrage produit, conception, développement' },
      { label: 'Période', value: 'mars à août 2026' },
      { label: 'Stack', value: 'Vue 3, TypeScript, Pinia, Dexie.js, Supabase, Tailwind CSS' },
      { label: 'Statut', value: 'en ligne, en phase de test avec son utilisateur' },
      {
        label: 'Application',
        value: 'symbaroum-bestiary.vercel.app/?demo',
        href: 'https://symbaroum-bestiary.vercel.app/?demo',
      },
      {
        label: 'Code',
        value: 'github.com/GaelleBriet/symbaroum-bestiary',
        href: 'https://github.com/GaelleBriet/symbaroum-bestiary',
      },
    ] as { label: string, value: string, href?: string }[],
  },
  context: {
    title: 'Le contexte',
    paragraphs: [
      'Un maître du jeu de mon entourage mène chaque semaine une table de cinq à six joueurs sur Symbaroum, un jeu de rôle dont les règles sont réparties entre plusieurs livres. Il m\'a demandé un outil pour gérer ses monstres et calculer leurs statistiques en pleine partie, y compris pour une créature improvisée sur le moment.',
      'J\'ai mené le projet en parallèle de la fin de mon master de manager en ingénierie informatique.',
    ],
  },
  problem: {
    title: 'Le vrai problème',
    paragraphs: [
      'La demande parlait de calculs. En creusant avec lui, le problème s\'est déplacé : ce ne sont pas les calculs qui le gênent, c\'est de ne pas pouvoir se fier aux informations. Elles sont dispersées entre plusieurs ouvrages et difficiles à croiser, et une erreur de lecture peut passer inaperçue pendant des semaines.',
      'Un exemple réel : pendant la pause d\'été, en relisant des règles pour préparer la suite de sa campagne, il a découvert qu\'un talent qu\'il pensait accessible ne l\'était pas. Un des personnages avait justement été construit pour l\'obtenir.',
    ],
    quoteIntro: 'La formulation qui l\'a fait réagir le plus fort est devenue la vision du projet :',
    quote: 'Transformer chaque combat en moment de narration, pas en pause de calcul.',
    answer: 'Sa réponse : « c\'est l\'essence même de mon problème ».',
  },
  approach: {
    title: 'La démarche',
    intro: 'J\'ai traité ce projet personnel comme une mission client : je voulais une approche professionnelle, et me former au travail produit.',
    items: [
      {
        lead: 'Cadrage avant le code.',
        text: 'Vision, problème, utilisateur type, analyse de l\'existant, user stories, feuille de route, indicateurs. Aucune maquette ni ligne de code avant la fin de cette étape.',
      },
      {
        lead: 'L\'existant.',
        text: 'Aucun outil ne combinait quatre choses : pensé pour le maître du jeu, statistiques calculées, usage sur tablette autour de la table, et en français.',
      },
      {
        lead: 'Faire valider par l\'utilisateur.',
        text: 'J\'ai proposé plusieurs formulations de la vision. C\'est celle qui l\'a fait réagir qui a été retenue, pas ma préférée.',
      },
      {
        lead: 'Un journal de décisions.',
        text: 'Chaque choix y est noté avec son contexte et les alternatives écartées, pour pouvoir le justifier ou le revoir.',
      },
    ],
  },
  solution: {
    title: 'La solution',
    intro: 'Une application web installable sur tablette, qui fonctionne sans connexion :',
    items: [
      'création et modification de monstres à la volée ;',
      'les 35 créatures du bestiaire de base, classées par race ;',
      'calcul automatique de la défense, de l\'armure et des dégâts selon les traits et talents ;',
      'dégâts affichés en moyenne et en formule de dés ;',
      'recherche par nom, race et résistance ;',
      'données enregistrées sur l\'appareil, puis synchronisées en ligne.',
    ],
    figures: [
      {
        caption: 'Maquette',
        alt: 'Maquette de la fiche monstre du Troll des Bois : attributs, combat et capacités.',
        src: '/images/etudes/symbaroum-maquette-1280.webp',
        srcset: '/images/etudes/symbaroum-maquette-640.webp 640w, /images/etudes/symbaroum-maquette-1280.webp 1280w',
        width: 1280,
        height: 805,
      },
      {
        caption: 'Application',
        alt: 'Fiche du Haut Troll dans l\'application : attributs, attaque et défense des joueurs, dégâts, absorption, capacités et talents.',
        src: '/images/etudes/symbaroum-application-1280.webp',
        srcset: '/images/etudes/symbaroum-application-640.webp 640w, /images/etudes/symbaroum-application-1280.webp 1280w',
        width: 1280,
        height: 802,
      },
    ] satisfies CaseFigure[],
  },
  choices: {
    title: 'Les choix techniques',
    headers: ['Choix', 'Plutôt que', 'Pourquoi'],
    rows: [
      ['Vue 3 et TypeScript', 'Flutter, React', 'un premier produit à livrer seule, pensé pour tablette'],
      ['Dexie.js (IndexedDB)', 'localStorage', 'un bestiaire volumineux, des parties parfois sans connexion'],
      ['Application web installable', 'application Android', 'une adresse à partager, rien à installer depuis un store'],
      ['Supabase', 'Firebase', 'une vraie base PostgreSQL, l\'authentification intégrée, une offre gratuite'],
    ],
    paragraphs: [
      'La principale difficulté était dans les règles : certains talents changent la statistique de départ d\'un calcul. Avec le talent Poigne de fer, par exemple, l\'attaque et la défense ne partent plus de la Précision mais de la Force. Ces règles sont isolées dans des fonctions de calcul séparées de l\'interface, ce qui permet de les vérifier une à une.',
      'Le développement a été fait avec Claude Code et les maquettes avec Claude Design, à partir du cadrage et des règles documentées en amont.',
    ],
  },
  feedback: {
    title: 'Les retours et les itérations',
    paragraphs: [
      'Le maître du jeu teste l\'outil et me transmet un fichier de remarques. En vérifiant ses statistiques, il a fait remonter trois erreurs de calcul et six évolutions, toutes traitées dans le sprint suivant.',
      'La synchronisation en ligne a été avancée avant l\'export de fichiers : non pas après une perte de données, mais pour ne pas attendre qu\'elle arrive.',
    ],
  },
  status: {
    title: 'Où en est le projet',
    paragraphs: [
      'L\'application est en ligne et en phase de test : le maître du jeu vérifie les calculs créature par créature avant de l\'emmener à sa table. Les derniers ajustements de calcul sont en cours.',
    ],
  },
} as const
