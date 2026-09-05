<script setup lang="ts">
// Les trois fontes du premier écran : Karla pour le texte courant,
// Fraunces pour le titre, Plex Mono pour les surtitres et les boutons.
// `?url` fait résoudre le chemin haché par Vite, donc le preload pointe
// forcément sur le fichier réellement émis par le build.
// Sans ces trois lignes, Lighthouse mobile perd deux points et 0,6 s de LCP.
import fraunces from '@fontsource/fraunces/files/fraunces-latin-500-normal.woff2?url'
import plexMono from '@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-600-normal.woff2?url'
import karla from '@fontsource/karla/files/karla-latin-400-normal.woff2?url'

useHead({
  link: [karla, fraunces, plexMono].map(href => ({
    rel: 'preload',
    as: 'font',
    type: 'font/woff2',
    href,
    crossorigin: '' as const,
  })),
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>
