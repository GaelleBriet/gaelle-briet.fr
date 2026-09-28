<script setup lang="ts">
import { hero } from '~/content/site'
import posterVideoScript from '~/assets/js/poster-video.js?raw'

const { poster } = hero

// La vidéo est pilotée par un petit script inline, pas par Vue : Nuxt ne
// sert aucun JS en production (features.noScripts dans nuxt.config.ts).
useHead({
  script: [{ innerHTML: posterVideoScript, tagPosition: 'bodyClose' }],
})
</script>

<template>
  <figure class="poster">
    <div class="poster__frame">
      <div class="poster__image-wrap">
        <img
          class="poster__image"
          :src="poster.src"
          :srcset="poster.srcset"
          :sizes="poster.sizes"
          :alt="poster.alt"
          :width="poster.width"
          :height="poster.height"
          fetchpriority="high"
          decoding="async"
        >
        <!-- Décorative, voir figcaption pour l'alt. Les <source> sont
             ajoutées par poster-video.js au premier déclenchement. -->
        <video
          class="poster__video"
          :data-webm="poster.video.webm"
          :data-mp4="poster.video.mp4"
          muted
          loop
          playsinline
          preload="none"
          aria-hidden="true"
          tabindex="-1"
        />
      </div>
    </div>
    <figcaption class="poster__caption">
      <span class="poster__caption-text">{{ poster.caption }}</span>
      <span class="poster__credit">{{ poster.credit }}</span>
      <!-- Consigne visuelle seulement : la vidéo est décorative et masquée
           aux lecteurs d'écran, la consigne l'est donc aussi. -->
      <span class="poster__hint" aria-hidden="true">{{ poster.touchHint }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.poster {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 0;
}

/* Cadre + passe-partout : le fond crème autour de l'image fait le carton. */
.poster__frame {
  width: 100%;
  /* au toucher, pas de flash gris sur l'affiche (voir poster-video.js) */
  -webkit-tap-highlight-color: transparent;
  max-width: 460px;
  background: var(--cream);
  border: var(--border);
  padding: 14px;
  box-shadow: var(--shadow-frame);
  transform: rotate(1.5deg);
  transition: transform 200ms ease, box-shadow 200ms ease;
}

/* Ne clippe que l'image : le passe-partout reste intact au survol. */
.poster__image-wrap {
  position: relative;
  overflow: hidden;
}

.poster__image {
  width: 100%;
  height: auto;
  transition: transform 200ms ease;
}

/* Masquée jusqu'à ce qu'elle soit prête, pour éviter un flash noir. */
.poster__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 200ms ease, transform 200ms ease;
  pointer-events: none;
}

.poster__video--ready {
  opacity: 1;
}

@media (hover: hover) and (pointer: fine) and (min-width: 761px) {
  .poster__frame:hover {
    transform: rotate(1.5deg) translateY(-4px);
    box-shadow: 7px 7px 0 var(--ink);
  }

  .poster__frame:hover .poster__image,
  .poster__frame:hover .poster__video {
    transform: scale(1.03);
  }
}

.poster__caption {
  max-width: 460px;
  text-align: center;
}

.poster__caption-text {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--fs-mono-sm);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono);
  text-transform: uppercase;
  line-height: 1.7;
}

/* Mention de provenance : discrète, pas de mono ni de capitales pour ne
   pas concurrencer la légende principale. */
.poster__credit,
.poster__hint {
  display: block;
  margin-top: 2px;
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--ink);
  opacity: .7;
}

/* La consigne ne vaut que là où poster-video.js écoute le toucher :
   ni souris (survol), ni mouvement réduit (pas d'animation du tout). */
.poster__hint {
  display: none;
}

@media not ((hover: hover) and (pointer: fine)) {
  .poster__hint {
    display: block;
  }
}

@media (prefers-reduced-motion: reduce) {
  .poster__hint {
    display: none;
  }
}

@media (max-width: 760px) {
  .poster__frame {
    transform: none;
  }
}
</style>
