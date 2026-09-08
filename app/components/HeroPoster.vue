<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { hero } from '~/content/site'

const { poster } = hero

// Vidéo décorative, chargée seulement au premier survol.
const videoEl = ref<HTMLVideoElement | null>(null)
const sourcesLoaded = ref(false)
const isVideoReady = ref(false)

function canAnimate() {
  if (typeof window === 'undefined') return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function onFrameEnter() {
  if (!canAnimate()) return

  const video = videoEl.value
  if (!video) return

  if (!sourcesLoaded.value) {
    sourcesLoaded.value = true
    void nextTick(() => video.load())
  }

  if (video.readyState >= 3) {
    isVideoReady.value = true
    void video.play()
  } else {
    video.addEventListener('canplay', () => {
      isVideoReady.value = true
      void video.play()
    }, { once: true })
  }
}

function onFrameLeave() {
  const video = videoEl.value
  if (!video) return
  video.pause()
  video.currentTime = 0
  isVideoReady.value = false
}
</script>

<template>
  <figure class="poster">
    <div
      class="poster__frame"
      @mouseenter="onFrameEnter"
      @mouseleave="onFrameLeave"
    >
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
        <!-- Décorative, voir figcaption pour l'alt. -->
        <video
          ref="videoEl"
          class="poster__video"
          :class="{ 'poster__video--ready': isVideoReady }"
          muted
          loop
          playsinline
          preload="none"
          aria-hidden="true"
          tabindex="-1"
        >
          <source v-if="sourcesLoaded" :src="poster.video.webm" type="video/webm">
          <source v-if="sourcesLoaded" :src="poster.video.mp4" type="video/mp4">
        </video>
      </div>
    </div>
    <figcaption class="poster__caption">
      <span class="poster__caption-text">{{ poster.caption }}</span>
      <span class="poster__credit">{{ poster.credit }}</span>
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
.poster__credit {
  display: block;
  margin-top: 2px;
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--ink);
  opacity: .7;
}

@media (max-width: 760px) {
  .poster__frame {
    transform: none;
  }
}
</style>
