<script setup lang="ts">
import { projects, projectsSection } from '~/content/projects'
import { clippings } from '~/content/clippings'
import { hero, meta, method, missions, site } from '~/content/site'

useHead({
  link: [
    { rel: 'canonical', href: site.url },
    // L'affiche est le premier gros élément peint : on la demande
    // dès le head plutôt qu'à la découverte du <img>.
    {
      rel: 'preload',
      as: 'image',
      type: 'image/webp',
      href: hero.poster.src,
      imagesrcset: hero.poster.srcset,
      imagesizes: hero.poster.sizes,
      fetchpriority: 'high',
    },
  ],
  meta: [{ name: 'theme-color', content: '#F3EAD3' }],
})

useSeoMeta({
  title: meta.title,
  description: meta.description,
  ogType: 'website',
  ogLocale: 'fr_FR',
  ogSiteName: site.name,
  ogUrl: site.url,
  ogTitle: meta.title,
  ogDescription: meta.description,
  ogImage: site.url + meta.image,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/jpeg',
  ogImageAlt: meta.imageAlt,
  twitterCard: 'summary_large_image',
  twitterTitle: meta.title,
  twitterDescription: meta.description,
  twitterImage: site.url + meta.image,
  twitterImageAlt: meta.imageAlt,
})
</script>

<template>
  <a class="skip-link" href="#contenu">Aller au contenu</a>

  <SiteHeader />

  <main id="contenu">
    <section id="haut" class="hero">
      <div class="container hero__inner">
        <div class="hero__text">
          <p class="eyebrow">{{ hero.eyebrow }}</p>
          <h1 class="hero__title">{{ hero.title }}</h1>
          <div class="hero__lead">
            <p>{{ hero.lead }}</p>
            <p>{{ hero.pitch }}</p>
          </div>
          <div class="hero__actions">
            <a class="btn btn--primary" :href="hero.actions.primary.href">
              {{ hero.actions.primary.label }}
            </a>
            <a class="btn btn--outline-teal" :href="hero.actions.secondary.href">
              {{ hero.actions.secondary.label }}
            </a>
          </div>
        </div>

        <div class="hero__poster">
          <HeroPoster />
        </div>
      </div>
    </section>

    <section id="projets" class="section">
      <div class="container">
        <div class="projects__head">
          <p class="eyebrow">{{ projectsSection.eyebrow }}</p>
          <h2 class="section__title projects__title">{{ projectsSection.title }}</h2>
        </div>

        <div class="projects__grid">
          <ProjectCard
            v-for="project in projects"
            :key="project.index"
            :project="project"
          />
        </div>
      </div>
    </section>

    <section id="methode" class="section">
      <div class="container method">
        <div class="method__text">
          <p class="eyebrow">{{ method.eyebrow }}</p>
          <h2 class="section__title method__title">{{ method.title }}</h2>
          <div class="method__body">
            <p v-for="paragraph in method.paragraphs" :key="paragraph">{{ paragraph }}</p>
          </div>
        </div>

        <div class="method__sheet">
          <Roadmap />
        </div>
      </div>
    </section>

    <section id="missions" class="section">
      <div class="container missions">
        <div class="missions__text">
          <Portrait />

          <p class="eyebrow">{{ missions.eyebrow }}</p>
          <h2 class="section__title missions__title">{{ missions.title }}</h2>

          <div class="missions__body">
            <p v-for="paragraph in missions.paragraphs" :key="paragraph">{{ paragraph }}</p>
          </div>

          <a class="btn btn--primary missions__action" :href="missions.action.href">
            {{ missions.action.label }}
          </a>
        </div>

        <div class="missions__clippings">
          <Clipping
            v-for="(clipping, index) in clippings"
            :key="clipping.label"
            :clipping="clipping"
            :variant="index + 1"
          />
        </div>
      </div>
    </section>
  </main>

  <SiteFooter />
</template>

<style scoped>
.hero {
  padding-block: 56px 61px;
}

.hero__inner {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--gap-col);
}

.hero__text {
  flex: 1 1 460px;
  /* `min()` plutôt qu'une valeur fixe : sous 356 px de fenêtre,
     une base de 300 px + les gouttières feraient déborder la page. */
  min-width: min(100%, 300px);
}

.hero__title {
  margin-top: 22px;
  font-size: var(--fs-hero);
  line-height: var(--lh-hero);
  /* le grand corps supporte un interlettrage plus serré que les autres titres */
  letter-spacing: -.015em;
}

.hero__lead {
  max-width: var(--measure);
  margin-top: 26px;
  font-size: var(--fs-body-lg);
  line-height: var(--lh-lead);
  text-wrap: pretty;
}

.hero__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 36px;
}

.hero__poster {
  flex: 1 1 400px;
  min-width: min(100%, 280px);
  display: flex;
  justify-content: center;
}

/* ---------- Projets ---------- */

.projects__head {
  margin-bottom: 36px;
}

.projects__title {
  margin-top: 14px;
  max-width: 66%;
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 290px), 1fr));
  gap: 26px;
}

/* ---------- Méthode ---------- */

.method {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: var(--gap-col);
}

.method__text {
  flex: 1 1 420px;
  min-width: min(100%, 300px);
}

.method__title {
  margin-top: 14px;
  max-width: 66%;
}

.method__body {
  max-width: var(--measure);
  margin-top: 22px;
  font-size: var(--fs-body-lg);
  line-height: var(--lh-lead);
  text-wrap: pretty;
}

.method__sheet {
  flex: 1 1 420px;
  min-width: min(100%, 300px);
}

/* ---------- Travaillons ensemble ---------- */

.missions {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 40px 48px;
}

.missions__text {
  flex: 1 1 55%;
  min-width: min(100%, 320px);
}

.missions__title {
  margin-bottom: 30px;
}

.missions__body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 620px;
  font-size: var(--fs-body-lg);
  line-height: var(--lh-lead);
  text-wrap: pretty;
}

.missions__action {
  margin-top: 32px;
}

.missions__clippings {
  display: flex;
  flex-direction: column;
  flex: 1 1 40%;
  min-width: min(100%, 280px);
  padding-top: 4px;
}

@media (max-width: 1000px) {
  .method__title {
    max-width: none;
  }
}
</style>
