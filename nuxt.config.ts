import { existsSync } from 'node:fs'
import { rename, rm } from 'node:fs/promises'
import { join } from 'node:path'

// Renseigné par le hook nitro:init, consommé par close.
let publicDir = ''

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-09-05',
  devtools: { enabled: true },

  // Site 100 % statique : `nuxt generate` produit .output/public,
  // servi tel quel par Cloudflare Pages.
  ssr: true,

  nitro: {
    prerender: {
      crawlLinks: true,
      // /introuvable est prérendue puis renommée en 404.html (hook `close`).
      routes: ['/', '/introuvable'],
    },
  },

  hooks: {
    // Nuxt prérend 404.html comme une coquille vide, prévue pour être
    // remplie côté client. Sans JS en production elle resterait blanche.
    // On demande donc à Nitro d'écrire la page /introuvable directement
    // sous le nom 404.html, et de ne pas écrire la coquille. Tout se passe
    // dans le prérendu lui-même : aucun renommage après coup, rien qui
    // dépende de l'ordre des hooks ou du dossier de sortie.
    'nitro:init'(nitro) {
      publicDir = nitro.options.output.publicDir
      nitro.hooks.hook('prerender:generate', (route) => {
        if (route.route === '/404.html') {
          route.skip = true
        }
        if (route.route === '/introuvable') {
          route.fileName = '/404.html'
          console.log('[404] page /introuvable écrite sous 404.html')
        }
      })
    },
    // Filet de sécurité si un runner ignorait l'override ci-dessus.
    async close(nuxt) {
      if (nuxt.options.dev || !publicDir) return
      const source = join(publicDir, 'introuvable/index.html')
      if (!existsSync(source)) return
      await rename(source, join(publicDir, '404.html'))
      await rm(join(publicDir, 'introuvable'), { recursive: true, force: true })
      console.log('[404] filet de sécurité : introuvable/index.html renommé en 404.html')
    },
  },

  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/tokens.css',
    '~/assets/css/base.css',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', href: '/favicon-180.png' },
      ],
    },
  },

  features: {
    inlineStyles: true,
    // La page n'a aucune interactivité : ni onglet, ni menu, ni formulaire.
    // On coupe donc l'hydratation en production — ~195 ko de JS en moins.
    // Le dev garde le HMR.
    noScripts: 'production',
  },

  experimental: {
    payloadExtraction: false,
  },
})
