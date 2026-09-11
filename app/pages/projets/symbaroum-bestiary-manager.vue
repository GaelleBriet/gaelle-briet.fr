<script setup lang="ts">
// Étude de cas Symbaroum. Textes : content/etude-symbaroum.ts.
import { etudeSymbaroum as page } from '~/content/etude-symbaroum'
import { meta as siteMeta, site } from '~/content/site'

const url = site.url + page.path

useHead({
  link: [{ rel: 'canonical', href: url }],
  meta: [{ name: 'theme-color', content: '#F3EAD3' }],
})

useSeoMeta({
  title: page.meta.title,
  description: page.meta.description,
  ogType: 'article',
  ogLocale: 'fr_FR',
  ogSiteName: site.name,
  ogUrl: url,
  ogTitle: page.meta.title,
  ogDescription: page.meta.description,
  // Image de partage commune au site : JPEG 1200 × 630, lu partout.
  ogImage: site.url + siteMeta.image,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/jpeg',
  ogImageAlt: siteMeta.imageAlt,
  twitterCard: 'summary_large_image',
  twitterTitle: page.meta.title,
  twitterDescription: page.meta.description,
  twitterImage: site.url + siteMeta.image,
  twitterImageAlt: siteMeta.imageAlt,
})

// Numéro affiché devant chaque titre de section : 01, 02…
const num = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <a class="skip-link" href="#contenu">Aller au contenu</a>

  <SiteHeader />

  <main id="contenu">
    <section class="case-hero">
      <div class="container">
        <a class="case-back" :href="page.back.href">{{ page.back.label }}</a>

        <div class="case-hero__inner">
          <div class="case-hero__text">
            <p class="eyebrow">{{ page.eyebrow }}</p>
            <h1 class="case-hero__title">{{ page.title }}</h1>
            <p class="case-hero__lead">{{ page.lead }}</p>
          </div>

          <aside class="summary" aria-labelledby="en-bref">
            <h2 id="en-bref" class="summary__tab">{{ page.summary.title }}</h2>
            <dl class="summary__list">
              <div v-for="item in page.summary.items" :key="item.label" class="summary__row">
                <dt class="summary__label">{{ item.label }}</dt>
                <dd class="summary__value">
                  <a
                    v-if="item.href"
                    class="case-link"
                    :href="item.href"
                    target="_blank"
                    rel="noopener"
                  >{{ item.value }}</a>
                  <template v-else>{{ item.value }}</template>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>

    <article class="case">
      <section class="case__section container">
        <h2 class="case__title"><span class="case__num" aria-hidden="true">{{ num(1) }}</span>{{ page.context.title }}</h2>
        <div class="case__body">
          <p v-for="p in page.context.paragraphs" :key="p">{{ p }}</p>
        </div>
      </section>

      <section class="case__section container">
        <h2 class="case__title"><span class="case__num" aria-hidden="true">{{ num(2) }}</span>{{ page.problem.title }}</h2>
        <div class="case__body">
          <p v-for="p in page.problem.paragraphs" :key="p">{{ p }}</p>
          <p>{{ page.problem.quoteIntro }}</p>
          <blockquote class="case__quote"><p>{{ page.problem.quote }}</p></blockquote>
          <p>{{ page.problem.answer }}</p>
        </div>
      </section>

      <section class="case__section container">
        <h2 class="case__title"><span class="case__num" aria-hidden="true">{{ num(3) }}</span>{{ page.approach.title }}</h2>
        <div class="case__body">
          <p>{{ page.approach.intro }}</p>
          <ul class="case__list">
            <li v-for="item in page.approach.items" :key="item.lead">
              <strong>{{ item.lead }}</strong> {{ item.text }}
            </li>
          </ul>
        </div>
      </section>

      <section class="case__section container">
        <h2 class="case__title"><span class="case__num" aria-hidden="true">{{ num(4) }}</span>{{ page.solution.title }}</h2>
        <div class="case__body">
          <p>{{ page.solution.intro }}</p>
          <ul class="case__list">
            <li v-for="item in page.solution.items" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div class="case__figures">
          <figure v-for="figure in page.solution.figures" :key="figure.src" class="case__figure">
            <img
              class="case__image"
              :src="figure.src"
              :srcset="figure.srcset"
              sizes="(max-width: 760px) calc(100vw - 56px), 580px"
              :alt="figure.alt"
              :width="figure.width"
              :height="figure.height"
              loading="lazy"
              decoding="async"
            >
            <figcaption class="case__caption">{{ figure.caption }}</figcaption>
          </figure>
        </div>
      </section>

      <section class="case__section container">
        <h2 class="case__title"><span class="case__num" aria-hidden="true">{{ num(5) }}</span>{{ page.choices.title }}</h2>
        <div class="case__body">
          <div class="case__table-wrap">
            <table class="case__table">
              <thead>
                <tr>
                  <th v-for="h in page.choices.headers" :key="h" scope="col">{{ h }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in page.choices.rows" :key="row[0]">
                  <th scope="row">{{ row[0] }}</th>
                  <td>{{ row[1] }}</td>
                  <td>{{ row[2] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-for="p in page.choices.paragraphs" :key="p">{{ p }}</p>
        </div>
      </section>

      <section class="case__section container">
        <h2 class="case__title"><span class="case__num" aria-hidden="true">{{ num(6) }}</span>{{ page.feedback.title }}</h2>
        <div class="case__body">
          <p v-for="p in page.feedback.paragraphs" :key="p">{{ p }}</p>
        </div>
      </section>

      <section class="case__section container">
        <h2 class="case__title"><span class="case__num" aria-hidden="true">{{ num(7) }}</span>{{ page.status.title }}</h2>
        <div class="case__body">
          <p v-for="p in page.status.paragraphs" :key="p">{{ p }}</p>
        </div>
      </section>

      <div class="container case__end">
        <a class="case-back" :href="page.back.href">{{ page.back.label }}</a>
      </div>
    </article>
  </main>

  <SiteFooter />
</template>

<style scoped>
/* ---------- En-tête ---------- */

.case-hero {
  padding-block: 28px 56px;
}

.case-back {
  font-family: var(--font-mono);
  font-size: var(--fs-nav);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono);
  text-transform: uppercase;
  color: var(--teal);
}

.case-back:hover {
  color: var(--coral);
}

.case-hero__inner {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--gap-col);
  margin-top: 36px;
}

.case-hero__text {
  flex: 1 1 480px;
  min-width: min(100%, 300px);
}

.case-hero__title {
  margin-top: 22px;
  font-size: var(--fs-hero);
  line-height: var(--lh-hero);
  letter-spacing: -.015em;
  text-wrap: balance;
}

.case-hero__lead {
  max-width: 600px;
  margin-top: 26px;
  font-size: var(--fs-body-lg);
  line-height: var(--lh-lead);
  text-wrap: pretty;
}

/* Fiche « En bref » : même carton et même onglet que les fiches projet. */
.summary {
  position: relative;
  flex: 1 1 360px;
  min-width: min(100%, 280px);
  max-width: 460px;
  margin-top: 30px;
  background: var(--cream-card);
  border: var(--border);
  box-shadow: var(--shadow-card);
}

.summary__tab {
  position: absolute;
  top: -30px;
  left: -1.5px;
  height: 30px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border: var(--border);
  border-bottom: none;
  background: var(--teal);
  color: var(--cream);
  font-family: var(--font-mono);
  font-size: var(--fs-mono-sm);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono);
  text-transform: uppercase;
}

.summary__list {
  padding: 14px 24px 18px;
}

.summary__row {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 12px;
  padding-block: 10px;
  border-bottom: var(--rule);
}

.summary__row:last-child {
  border-bottom: none;
}

/* Sur petit écran, libellé au-dessus de la valeur : la valeur garde toute la largeur. */
@media (max-width: 480px) {
  .summary__row {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .summary__label {
    padding-top: 0;
  }
}

.summary__label {
  font-family: var(--font-mono);
  font-size: var(--fs-mono-sm);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono);
  text-transform: uppercase;
  color: var(--teal);
  padding-top: 3px;
}

.summary__value {
  margin: 0;
  font-size: var(--fs-card-body);
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.case-link {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.case-link:hover {
  color: var(--coral);
}

/* ---------- Corps ---------- */

.case__section {
  padding-block: 44px 8px;
}

.case__section + .case__section {
  border-top: var(--rule);
  margin-top: 36px;
}

.case__title {
  display: flex;
  align-items: baseline;
  gap: 16px;
  font-size: 30px;
  line-height: var(--lh-h2);
}

.case__num {
  flex: none;
  font-family: var(--font-mono);
  font-size: var(--fs-nav);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono);
  color: var(--teal);
}

.case__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 720px;
  margin-top: 22px;
  font-size: var(--fs-body-lg);
  line-height: var(--lh-lead);
  text-wrap: pretty;
}

.case__body strong {
  font-weight: 600;
}

.case__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Tiret bleu pétrole devant chaque point, comme sur le reste du site. */
.case__list li {
  position: relative;
  padding-left: 26px;
}

.case__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: .8em;
  width: 14px;
  height: 3px;
  background: var(--teal);
}

/* Citation : en romain, jamais d'italique (règle du brief). */
.case__quote {
  margin: 4px 0;
  padding: 6px 0 6px 22px;
  border-left: 3px solid var(--ink);
  font-family: var(--font-display);
  font-weight: var(--fw-display);
  font-size: 24px;
  line-height: 1.3;
}

/* ---------- Visuels ---------- */

.case__figures {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
  gap: 28px;
  margin-top: 32px;
}

.case__figure {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.case__image {
  width: 100%;
  border: var(--border);
  box-shadow: var(--shadow-photo);
}

.case__caption {
  font-family: var(--font-mono);
  font-size: var(--fs-mono-sm);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono);
  text-transform: uppercase;
}

/* ---------- Tableau des choix ---------- */

.case__table-wrap {
  overflow-x: auto;
}

.case__table {
  width: 100%;
  min-width: 520px;
  border-collapse: collapse;
  font-size: var(--fs-card-body);
  line-height: 1.45;
}

.case__table th,
.case__table td {
  padding: 12px 14px 12px 0;
  text-align: left;
  vertical-align: top;
  border-bottom: var(--rule);
}

.case__table thead th {
  font-family: var(--font-mono);
  font-size: var(--fs-mono-sm);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono);
  text-transform: uppercase;
  color: var(--teal);
}

.case__table tbody th {
  font-weight: 600;
}

.case__end {
  padding-block: 48px 64px;
}
</style>
