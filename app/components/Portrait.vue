<script setup lang="ts">
import { missions } from '~/content/site'

const { portrait } = missions
</script>

<template>
  <div class="portrait photo-corners">
    <img
      class="portrait__image"
      :src="portrait.src"
      :srcset="portrait.srcset"
      :sizes="portrait.sizes"
      :alt="portrait.alt"
      :width="portrait.width"
      :height="portrait.height"
      loading="lazy"
      decoding="async"
    >
    <span class="photo-corner photo-corner--tl" />
    <span class="photo-corner photo-corner--tr" />
    <span class="photo-corner photo-corner--bl" />
    <span class="photo-corner photo-corner--br" />
  </div>
</template>

<style scoped>
.portrait {
  --corner-size: 12px;

  position: relative;
  width: 140px;
  height: 140px;
  margin: 4px 0 28px 4px;
  border: var(--border);
  background: var(--cream);
  box-shadow: var(--shadow-photo);
  transform: rotate(-1deg);
}

.portrait__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 760px) {
  .portrait {
    transform: none;
  }
}
</style>
