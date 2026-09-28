<script setup lang="ts">
import { galleryLabels as labels, type ProjectImage } from '~/content/projects'
import galleryScript from '~/assets/js/project-gallery.js?raw'

defineProps<{
  images: ProjectImage[]
  /** Titre du projet : nomme la bande d'images et la grande vue. */
  title: string
}>()

// Les galeries de la page partagent un seul script : la clé évite le doublon.
// Pas de Vue côté client (features.noScripts), voir docs/adr/0003.
useHead({
  script: [{ key: 'project-gallery', innerHTML: galleryScript, tagPosition: 'bodyClose' }],
})

// Largeur affichée de la vignette dans la fiche, pour le choix dans srcset.
const sizes = '(max-width: 640px) calc(100vw - 108px), (max-width: 960px) calc(50vw - 67px), 317px'
</script>

<template>
  <div class="gallery" data-gallery>
    <!-- Flèches et compteur restent masqués sans project-gallery.js :
         la bande défile alors au doigt, à la molette ou au clavier. -->
    <div class="gallery__strip" data-strip="card">
      <div
        class="gallery__track"
        data-strip-track
        tabindex="0"
        role="region"
        :aria-label="`${labels.region} ${title}`"
      >
        <a
          v-for="image in images"
          :key="image.full.src"
          class="gallery__slide"
          :href="image.full.src"
          data-gallery-open
        >
          <img
            class="gallery__image"
            :src="image.thumb.src"
            :srcset="image.thumb.srcset"
            :sizes="sizes"
            :alt="image.alt"
            width="800"
            height="500"
            loading="lazy"
            decoding="async"
          ><span class="visually-hidden">{{ labels.open }}</span>
        </a>
      </div>
      <button
        type="button"
        class="gallery__arrow gallery__arrow--prev"
        data-strip-prev
        :aria-label="labels.previous"
        hidden
      >
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M10.5 2 4.5 8l6 6" fill="none" stroke="currentColor" stroke-width="2" /></svg>
      </button>
      <button
        type="button"
        class="gallery__arrow gallery__arrow--next"
        data-strip-next
        :aria-label="labels.next"
        hidden
      >
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M5.5 2l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" /></svg>
      </button>
      <p class="gallery__count" data-strip-count hidden>
        <span data-strip-current>1</span> / {{ images.length }}
      </p>
    </div>

    <!-- Grande vue : dans la couche supérieure une fois ouverte, elle échappe
         à la rotation et au rognage de la fiche. -->
    <dialog class="lightbox" :aria-label="title">
      <div class="lightbox__inner">
        <div class="lightbox__track" data-strip-track>
          <figure v-for="image in images" :key="image.full.src" class="lightbox__slide">
            <img
              class="lightbox__image"
              :src="image.full.src"
              :width="image.full.width"
              :height="image.full.height"
              :alt="image.alt"
              loading="lazy"
              decoding="async"
            >
            <figcaption class="lightbox__caption">{{ image.caption }}</figcaption>
          </figure>
        </div>

        <div class="lightbox__bar">
          <button type="button" class="gallery__arrow" data-strip-prev :aria-label="labels.previous" hidden>
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M10.5 2 4.5 8l6 6" fill="none" stroke="currentColor" stroke-width="2" /></svg>
          </button>
          <p class="gallery__count" data-strip-count aria-live="polite" hidden>
            <span data-strip-current>1</span> / {{ images.length }}
          </p>
          <button type="button" class="gallery__arrow" data-strip-next :aria-label="labels.next" hidden>
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M5.5 2l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" /></svg>
          </button>
          <button type="button" class="btn btn--sm btn--outline-ink lightbox__close" data-gallery-close>
            {{ labels.close }}
          </button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
[hidden] {
  display: none !important;
}

/* ---------- Bande de la fiche ---------- */

.gallery,
.gallery__strip {
  position: relative;
  height: 100%;
}

/* Une image par écran, calée par scroll-snap : ça glisse au doigt sans JS. */
.gallery__track {
  display: flex;
  height: 100%;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.gallery__track::-webkit-scrollbar {
  display: none;
}

/* La fiche rogne ce qui dépasse : le contour de focus passe à l'intérieur. */
.gallery__track:focus-visible,
.gallery__slide:focus-visible {
  outline-offset: -3px;
}

.gallery__slide {
  flex: 0 0 100%;
  overflow: hidden;
  scroll-snap-align: start;
}

.gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 200ms ease;
}

/* Petits boutons carrés posés sur la capture, comme des onglets de papier. */
.gallery__arrow {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: var(--border);
  background: var(--cream-card);
  color: var(--ink);
  cursor: pointer;
  transition: background var(--transition), color var(--transition);
}

.gallery__arrow:not(:disabled):hover {
  background: var(--coral);
  color: var(--cream);
}

.gallery__arrow:disabled {
  opacity: .35;
  cursor: default;
}

.gallery__strip .gallery__arrow {
  position: absolute;
  top: 50%;
  translate: 0 -50%;
}

.gallery__arrow--prev {
  left: 8px;
}

.gallery__arrow--next {
  right: 8px;
}

.gallery__count {
  padding: 5px 8px;
  border: var(--border);
  background: var(--cream-card);
  font-family: var(--font-mono);
  font-size: var(--fs-mono-sm);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono);
  line-height: 1;
}

.gallery__strip .gallery__count {
  position: absolute;
  right: 8px;
  bottom: 8px;
}

/* ---------- Grande vue ---------- */

.lightbox {
  width: min(1080px, 100vw - 32px);
  max-width: none;
  max-height: calc(100dvh - 32px);
  padding: 0;
  border: var(--border);
  background: var(--cream-card);
  color: var(--ink);
  overflow: hidden;
}

.lightbox::backdrop {
  background: rgb(46 42 38 / .85);
}

.lightbox__inner {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: calc(100dvh - 32px);
  padding: 18px;
  box-sizing: border-box;
}

.lightbox__track {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.lightbox__track::-webkit-scrollbar {
  display: none;
}

.lightbox__slide {
  display: flex;
  flex: 0 0 100%;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-width: 0;
  margin: 0;
  scroll-snap-align: start;
}

/* La place restante sous la barre, la légende et les marges : l'écran en
   hauteur de MémoPatte tient entier, la capture en largeur aussi. */
.lightbox__image {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: calc(100dvh - 190px);
  border: var(--border);
}

.lightbox__caption {
  max-width: var(--measure);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  text-align: center;
  text-wrap: pretty;
}

.lightbox__bar {
  display: flex;
  align-items: center;
  gap: var(--gap-sm);
  padding-top: 14px;
  border-top: var(--rule);
}

.lightbox__close {
  margin-left: auto;
}

/* Sur téléphone, la grande vue prend tout l'écran. */
@media (max-width: 760px) {
  .lightbox {
    width: 100vw;
    height: 100dvh;
    max-height: none;
    border: none;
  }

  .lightbox__inner {
    height: 100%;
    max-height: none;
    padding: 16px;
  }

  .lightbox__image {
    max-height: calc(100dvh - 170px);
  }
}
</style>
