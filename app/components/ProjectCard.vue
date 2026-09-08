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
      <p class="card__stack">{{ project.stack }}</p>

      <a
        class="btn btn--sm"
        :class="project.action.external ? 'btn--ink' : 'btn--outline-ink'"
        :href="project.action.href"
        :target="project.action.external ? '_blank' : undefined"
        :rel="project.action.external ? 'noopener' : undefined"
      >{{ project.action.label }}</a>
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

/* Même logique de soulèvement que l'affiche du hero, réservée aux fiches
   qui ont une vraie capture (jamais « Place libre », qui n'en a pas). */
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
