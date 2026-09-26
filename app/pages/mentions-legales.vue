<script setup lang="ts">
// Textes : content/mentions-legales.ts.
import { mentionsLegales as page } from '~/content/mentions-legales'
import { site } from '~/content/site'

const url = site.url + page.path

useHead({
  link: [{ rel: 'canonical', href: url }],
  meta: [{ name: 'theme-color', content: '#F3EAD3' }],
})

useSeoMeta({
  title: page.meta.title,
  description: page.meta.description,
})

const blocks = [page.editor, page.hosting]
</script>

<template>
  <a class="skip-link" href="#contenu">Aller au contenu</a>

  <SiteHeader />

  <main id="contenu" class="legal">
    <div class="container">
      <p class="eyebrow">{{ page.eyebrow }}</p>
      <h1 class="legal__title">{{ page.title }}</h1>
      <p class="legal__lead">
        <template v-for="part in page.scope" :key="part.text">
          <a v-if="'href' in part" class="legal__link" :href="part.href">{{ part.text }}</a>
          <template v-else>{{ part.text }}</template>
        </template>
      </p>
    </div>

    <section
      v-for="block in blocks"
      :key="block.title"
      class="legal__section container"
    >
      <h2 class="legal__heading">{{ block.title }}</h2>
      <p v-if="'intro' in block" class="legal__text">{{ block.intro }}</p>
      <dl class="legal__list">
        <div v-for="row in block.rows" :key="row.label" class="legal__row">
          <dt class="legal__label">{{ row.label }}</dt>
          <dd class="legal__value">
            <a v-if="row.href" class="legal__link" :href="row.href">{{ row.value }}</a>
            <template v-else>{{ row.value }}</template>
          </dd>
        </div>
      </dl>
    </section>

    <section class="legal__section container">
      <h2 class="legal__heading">{{ page.privacy.title }}</h2>
      <div class="legal__body">
        <p v-for="p in page.privacy.paragraphs" :key="p">{{ p }}</p>
        <p>
          {{ page.privacy.memopatte.before }}<a
            class="legal__link"
            :href="page.privacy.memopatte.link.href"
          >{{ page.privacy.memopatte.link.label }}</a>{{ page.privacy.memopatte.after }}
        </p>
      </div>
    </section>

    <section class="legal__section legal__section--last container">
      <h2 class="legal__heading">{{ page.property.title }}</h2>
      <div class="legal__body">
        <p v-for="p in page.property.paragraphs" :key="p">{{ p }}</p>
      </div>
    </section>
  </main>

  <SiteFooter />
</template>

<style scoped>
.legal {
  padding-top: 48px;
}

.legal__title {
  margin-top: 22px;
  font-size: var(--fs-hero);
  line-height: var(--lh-hero);
  letter-spacing: -.015em;
}

.legal__lead {
  max-width: 640px;
  margin-top: 26px;
  font-size: var(--fs-body-lg);
  line-height: var(--lh-lead);
  text-wrap: pretty;
}

.legal__section {
  padding-block: 40px 8px;
}

.legal__section:first-of-type {
  margin-top: 36px;
}

.legal__section + .legal__section {
  margin-top: 32px;
  border-top: var(--rule);
}

.legal__section--last {
  padding-bottom: 72px;
}

.legal__heading {
  font-size: 30px;
  line-height: var(--lh-h2);
}

.legal__text,
.legal__body {
  max-width: 720px;
  margin-top: 20px;
  font-size: var(--fs-body-lg);
  line-height: var(--lh-lead);
  text-wrap: pretty;
}

.legal__body {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.legal__list {
  max-width: 720px;
  margin-top: 18px;
}

.legal__row {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 16px;
  padding-block: 12px;
  border-bottom: var(--rule);
}

.legal__row:last-child {
  border-bottom: none;
}

.legal__label {
  padding-top: 4px;
  font-family: var(--font-mono);
  font-size: var(--fs-mono-sm);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono);
  text-transform: uppercase;
  color: var(--teal);
}

.legal__value {
  font-size: var(--fs-body-lg);
  line-height: 1.45;
  overflow-wrap: anywhere;
}

/* Sur petit écran, libellé au-dessus de la valeur. */
@media (max-width: 560px) {
  .legal__row {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .legal__label {
    padding-top: 0;
  }
}

.legal__link {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.legal__link:hover {
  color: var(--coral);
}
</style>
