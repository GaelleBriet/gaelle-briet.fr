<script setup lang="ts">
import type { Project } from '~/content/projects'

defineProps<{ project: Project }>()
</script>

<template>
  <article class="card" :class="`card--${project.status}`">
    <p class="card__tab">{{ project.tab }}</p>
    <p class="card__index">{{ project.index }}</p>

    <div class="card__body">
      <div class="card__photo photo-corners">
        <img
          v-if="project.image"
          class="card__image"
          :src="project.image.src"
          :srcset="project.image.srcset"
          :sizes="project.image.sizes"
          :alt="project.image.alt"
          :width="project.image.width"
          :height="project.image.height"
          loading="lazy"
          decoding="async"
        >
        <!-- Les coins ne tiennent que le cadre vide : sur une vraie capture
             ils mangeaient les angles de l'image. -->
        <template v-if="!project.image">
          <span class="photo-corner photo-corner--tl" />
          <span class="photo-corner photo-corner--tr" />
          <span class="photo-corner photo-corner--bl" />
          <span class="photo-corner photo-corner--br" />
        </template>
      </div>

      <h3 class="card__title">{{ project.title }}</h3>
      <p class="card__text">{{ project.text }}</p>
      <a
        v-if="project.caseStudy"
        class="card__link"
        :href="project.caseStudy.href"
      >{{ project.caseStudy.label }}</a>
      <p class="card__stack">{{ project.stack }}</p>

      <a
        class="btn btn--sm"
        :class="project.action.external ? 'btn--outline-teal' : 'btn--outline-ink'"
        :href="project.action.href"
        :target="project.action.external ? '_blank' : undefined"
        :rel="project.action.external ? 'noopener' : undefined"
      ><svg
        v-if="project.action.external"
        class="btn__icon"
        viewBox="0 0 16 16"
        width="15"
        height="15"
        aria-hidden="true"
      ><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>{{ project.action.label }}</a>
    </div>
  </article>
</template>

<style scoped>
/* Fiche cartonnée : l'onglet dépasse en haut, d'où la marge de 30 px. */
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  background: var(--cream-card);
  border: var(--border);
  box-shadow: var(--shadow-card);
}

/* Emplacement libre : carton non rempli, donc pointillés et pas d'ombre. */
.card--libre {
  border: var(--border-dash);
  box-shadow: none;
}

/* ---------- Onglet ---------- */

/* La position de l'onglet passe par des variables : la règle mobile peut
   ainsi les remettre à zéro sans lutter contre la spécificité des modificateurs. */
.card__tab {
  position: absolute;
  top: -30px;
  left: var(--tab-left, -1.5px);
  right: var(--tab-right, auto);
  height: 30px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  box-sizing: border-box;
  white-space: nowrap;
  border: var(--border);
  border-bottom: none;
  font-family: var(--font-mono);
  font-size: var(--fs-mono-sm);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono);
  text-transform: uppercase;
}

.card--service .card__tab {
  background: var(--teal);
  color: var(--cream);
}

.card--construction {
  --tab-left: 29%;
}

.card--construction .card__tab {
  background: var(--mustard);
  color: var(--ink);
}

.card--libre {
  --tab-left: auto;
  --tab-right: -1.5px;
}

.card--libre .card__tab {
  border: var(--border-dot);
  border-bottom: none;
  background: var(--cream-card);
  color: var(--ink);
}

.card__index {
  position: absolute;
  top: 12px;
  left: 12px;
  font-family: var(--font-mono);
  font-size: var(--fs-mono-sm);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono);
  text-transform: uppercase;
}

/* ---------- Corps ---------- */

.card__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 14px;
  padding: 36px 24px 26px;
}

/* Capture posée de travers, tenue par quatre coins photo. */
.card__photo {
  position: relative;
  aspect-ratio: 16 / 10;
  margin: 6px 6px 20px;
  border: var(--border);
  background: var(--cream);
  box-shadow: var(--shadow-photo);
  transform: rotate(1deg);
  overflow: hidden;
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.card--construction .card__photo {
  transform: rotate(-1deg);
}

.card--libre .card__photo {
  border: var(--border-dash);
  transform: none;
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 200ms ease;
}

@media (hover: hover) and (pointer: fine) and (min-width: 761px) {
  .card--service .card__photo:hover {
    transform: rotate(1deg) translateY(-3px);
    box-shadow: 4px 4px 0 var(--ink);
  }

  .card--construction .card__photo:hover {
    transform: rotate(-1deg) translateY(-3px);
    box-shadow: 4px 4px 0 var(--ink);
  }

  .card--service .card__photo:hover .card__image,
  .card--construction .card__photo:hover .card__image {
    transform: scale(1.04);
  }
}

.card__title {
  font-size: var(--fs-h3);
}

.card__text {
  font-size: var(--fs-card-body);
  line-height: var(--lh-body);
  text-wrap: pretty;
}

/* `margin-top: auto` cale le bloc bas de fiche quelles que soient
   les longueurs de texte : les trois filets restent alignés. */
.card__stack {
  margin-top: auto;
  padding-top: 14px;
  border-top: var(--rule);
  font-family: var(--font-mono);
  font-size: var(--fs-mono-sm);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono-sm);
  text-transform: uppercase;
}

/* Lien vers l'étude de cas, sous le texte : un simple lien souligné qui ne
   concurrence pas le bouton, et ne décale pas le filet du bas de fiche. */
.card__link {
  align-self: flex-start;
  font-size: var(--fs-card-body);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.card__link:hover {
  color: var(--coral);
}

/* Sous 760 px tous les onglets s'alignent à gauche. */
@media (max-width: 760px) {
  .card--construction,
  .card--libre {
    --tab-left: -1.5px;
    --tab-right: auto;
  }

  .card__photo,
  .card--construction .card__photo {
    transform: none;
  }
}
</style>
