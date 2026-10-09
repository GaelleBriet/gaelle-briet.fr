// Page Mentions légales. Même règle que site.ts : aucun texte dans les composants.
import { site } from './site'

export interface LegalRow {
  label: string
  value: string
  href?: string
}

export const editorPhone = '07 69 46 49 63'

const editorRows: LegalRow[] = [
  { label: 'Éditrice', value: 'Gaëlle Briet, entrepreneure individuelle' },
  { label: 'SIRET', value: '931 812 978 00027' },
  { label: 'Adresse', value: '47 rue Vivienne, 75002 Paris' },
  { label: 'E-mail', value: site.email, href: `mailto:${site.email}` },
  { label: 'Téléphone', value: editorPhone, href: `tel:${editorPhone.replace(/[^\d+]/g, '')}` },
  { label: 'Directrice de la publication', value: 'Gaëlle Briet' },
]

const hostingRows: LegalRow[] = [
  { label: 'Hébergeur', value: 'Cloudflare, Inc.' },
  { label: 'Adresse', value: '101 Townsend St, San Francisco, CA 94107, États-Unis' },
  { label: 'Téléphone', value: '+1 (650) 319-8930', href: 'tel:+16503198930' },
]

export const mentionsLegales = {
  /** Barre finale : Cloudflare Pages sert `dossier/index.html` sous `/dossier/`. */
  path: '/mentions-legales/',
  meta: {
    title: 'Mentions légales · Gaëlle Briet',
    description:
      'Mentions légales de gaelle-briet.fr : éditrice, hébergement, données personnelles, propriété intellectuelle.',
  },
  eyebrow: 'Informations légales',
  title: 'Mentions légales',
  scope: [
    { text: 'Ces mentions valent pour ' },
    { text: 'www.gaelle-briet.fr', href: 'https://www.gaelle-briet.fr/' },
    { text: '.' },
  ],
  editor: {
    title: 'Édition',
    rows: editorRows.filter(row => row.value !== ''),
  },
  hosting: {
    title: 'Hébergement',
    intro: 'Le site est hébergé par Cloudflare Pages, un service de :',
    rows: hostingRows,
  },
  privacy: {
    title: 'Données personnelles',
    paragraphs: [
      'Le site gaelle-briet.fr ne dépose aucun cookie et ne mesure pas son audience. Il n\'a pas de formulaire et ne charge rien depuis un service tiers : polices, images et vidéos sont servies par le site lui-même.',
      `Les e-mails envoyés à ${site.email} ne servent qu'à y répondre.`,
      `Vous pouvez demander l'accès aux données qui vous concernent, leur rectification ou leur effacement en écrivant à ${site.email}, et introduire une réclamation auprès de la CNIL (www.cnil.fr).`,
      'Pour délivrer les pages, l\'hébergeur traite les données techniques de connexion, dont l\'adresse IP.',
    ],
  },
  property: {
    title: 'Propriété intellectuelle',
    paragraphs: [
      'Sauf mention contraire, les textes, images et éléments graphiques de ce site appartiennent à Gaëlle Briet. Toute reproduction, même partielle, demande son accord préalable.',
    ],
  },
} as const
