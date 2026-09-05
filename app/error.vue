<script setup lang="ts">
import type { NuxtError } from '#app'
import { site } from '~/content/site'

const props = defineProps<{ error: NuxtError }>()

const introuvable = computed(() => props.error?.statusCode === 404)

const titre = computed(() =>
  introuvable.value ? 'Cette page n\'existe pas' : 'Quelque chose a lâché',
)

const texte = computed(() =>
  introuvable.value
    ? 'L\'adresse demandée ne mène nulle part. Elle a peut-être changé, ou elle n\'a jamais existé.'
    : 'Le serveur n\'a pas su répondre. Réessayer dans un moment, ou écrire si ça persiste.',
)

useHead({
  title: `${props.error?.statusCode ?? 'Erreur'} · ${site.name}`,
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <div class="error">
    <div class="error__stripe" />

    <main class="container error__inner">
      <p class="error__code">Erreur {{ error?.statusCode ?? '' }}</p>
      <h1 class="error__title">{{ titre }}</h1>
      <p class="error__text">{{ texte }}</p>

      <div class="error__actions">
        <a class="btn btn--primary" href="/">Retour à l'accueil</a>
        <a class="btn btn--outline-teal" :href="`mailto:${site.email}`">Écrire</a>
      </div>

      <img
        class="error__mark"
        src="/images/sceau.svg"
        :alt="site.sealAlt"
        width="120"
        height="109"
      >
    </main>
  </div>
</template>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--cream);
}

/* Le liseré tient lieu d'en-tête : sur une page d'erreur,
   une navigation complète n'aide personne. */
.error__stripe {
  height: 6px;
  background: var(--stripe);
}

.error__inner {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-block: 80px;
}

.error__code {
  font-family: var(--font-mono);
  font-size: var(--fs-nav);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono-lg);
  text-transform: uppercase;
  color: var(--teal);
}

.error__title {
  margin-top: 18px;
  font-size: var(--fs-hero);
  line-height: var(--lh-hero);
  letter-spacing: -.015em;
}

.error__text {
  max-width: var(--measure);
  margin-top: 22px;
  font-size: var(--fs-body-lg);
  line-height: var(--lh-lead);
  text-wrap: pretty;
}

.error__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 36px;
}

.error__mark {
  width: 120px;
  height: auto;
  margin-top: 64px;
}
</style>
