<script setup lang="ts">
// Cette page n'existe que pour être prérendue : à la fin du build,
// nuxt.config.ts la renomme en 404.html, le fichier que Cloudflare Pages
// sert pour toute URL inconnue. Elle réutilise error.vue tel quel pour
// qu'il n'y ait qu'un seul dessin de page d'erreur.
import type { NuxtError } from '#app'
import PageErreur from '~/error.vue'

const erreur = { statusCode: 404, message: 'Page introuvable' } as NuxtError

useHead({ meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <PageErreur :error="erreur" />
</template>
