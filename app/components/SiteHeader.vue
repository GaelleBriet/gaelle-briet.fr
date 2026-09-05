<script setup lang="ts">
import { nav, navCta, site } from '~/content/site'
</script>

<template>
  <header class="header">
    <nav class="header__bar container" aria-label="Navigation principale">
      <a class="brand" href="#haut">
        <img
          class="brand__mark"
          src="/images/marque-gb.svg"
          :alt="site.brandAlt"
          width="118"
          height="42"
        >
        <span class="brand__text">
          <span class="brand__name">{{ site.name }}</span>
          <span class="brand__subtitle">{{ site.subtitle }}</span>
        </span>
      </a>

      <div class="header__links">
        <a
          v-for="link in nav"
          :key="link.href"
          class="header__link"
          :href="link.href"
        >{{ link.label }}</a>
        <a class="btn btn--primary btn--sm btn--nav header__cta" :href="navCta.href">
          {{ navCta.label }}
        </a>
      </div>
    </nav>

    <div class="header__stripe" />
  </header>
</template>

<style scoped>
.header {
  position: relative;
  z-index: 50;
  background: var(--cream);
  border-bottom: var(--rule);
}

.header__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 26px;
  padding-block: 16px;
}

/* Le liseré des trois couleurs : le seul endroit du site où le trio cohabite. */
.header__stripe {
  height: 6px;
  background: var(--stripe);
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand__mark {
  flex: none;
  height: 42px;
  width: auto;
}

.brand__text {
  display: flex;
  flex-direction: column;
  gap: 6px;
  line-height: 1;
}

.brand__name {
  font-family: var(--font-display);
  font-weight: var(--fw-display);
  font-size: var(--fs-brand);
  letter-spacing: var(--track-display);
}

.brand__subtitle {
  font-family: var(--font-mono);
  font-size: var(--fs-brand-sub);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono-lg);
  text-transform: uppercase;
  color: var(--teal);
}

.header__links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 26px;
  font-family: var(--font-mono);
  font-size: var(--fs-nav);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-nav);
  text-transform: uppercase;
}

.header__link:hover {
  color: var(--coral);
}

.header__cta:hover {
  /* le survol du bouton l'emporte sur le survol générique des liens */
  color: var(--cream);
}

/* Sous 760 px la nav se réduit à la marque et au bouton Contact :
   les ancres restent accessibles depuis le pied de page. */
@media (max-width: 760px) {
  .header__link {
    display: none;
  }
}

@media (max-width: 560px) {
  .brand__text {
    display: none;
  }
}
</style>
