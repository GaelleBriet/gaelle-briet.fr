<script setup lang="ts">
import { hero } from '~/content/site'

const { poster } = hero
</script>

<template>
  <figure class="poster">
    <div class="poster__frame">
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
    </div>
    <figcaption class="poster__caption">{{ poster.caption }}</figcaption>
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
}

.poster__image {
  width: 100%;
  height: auto;
}

.poster__caption {
  max-width: 460px;
  font-family: var(--font-mono);
  font-size: var(--fs-mono-sm);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono);
  text-transform: uppercase;
  text-align: center;
  line-height: 1.7;
}

@media (max-width: 760px) {
  .poster__frame {
    transform: none;
  }
}
</style>
