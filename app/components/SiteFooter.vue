<script setup lang="ts">
import { footer, site } from '~/content/site'
</script>

<template>
  <footer id="contact" class="footer">
    <div class="container">
      <div class="footer__columns">
        <section class="footer__column">
          <h2 class="footer__label">{{ footer.columns.zone }}</h2>
          <p class="footer__zone">
            <span class="footer__city">{{ site.zone.title }}</span>
            <span class="footer__region">{{ site.zone.region }}</span>
          </p>
          <p class="footer__note">{{ site.zone.note }}</p>
        </section>

        <section class="footer__column">
          <h2 class="footer__label">{{ footer.columns.contact }}</h2>
          <div class="footer__list">
            <a :href="`mailto:${site.email}`">{{ site.email }}</a>
            <a :href="site.links.github.url" target="_blank" rel="noopener">
              {{ site.links.github.label }}
            </a>
            <a :href="site.links.linkedin.url" target="_blank" rel="noopener">
              {{ site.links.linkedin.label }}
            </a>
          </div>
        </section>

        <nav class="footer__column" :aria-label="footer.columns.navigation">
          <h2 class="footer__label">{{ footer.columns.navigation }}</h2>
          <div class="footer__list">
            <a v-for="link in footer.navigation" :key="link.href" :href="link.href">
              {{ link.label }}
            </a>
          </div>
        </nav>
      </div>

      <div class="footer__baseline">
        <span class="footer__seal">
          <img
            class="footer__seal-image"
            src="/images/sceau.svg"
            :alt="site.sealAlt"
            width="120"
            height="109"
            loading="lazy"
          >
          <span>{{ site.copyright }}</span>
        </span>
        <span>{{ site.stack }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--cream);
  padding-bottom: 29px;
}

.footer__columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
  gap: 34px;
  padding-top: 32px;
  border-top: var(--rule);
}

/* Dès qu'il y a la place, la zone (gros caractères) prend une colonne plus
   large que les deux listes, qui se resserrent à droite. */
@media (min-width: 761px) {
  .footer__columns {
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr) minmax(0, 1fr);
  }
}

.footer__label {
  margin-bottom: 14px;
  font-family: var(--font-mono);
  font-size: var(--fs-mono-sm);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono-lg);
  text-transform: uppercase;
  color: var(--teal);
}

.footer__zone {
  font-family: var(--font-display);
  font-weight: var(--fw-display);
  line-height: 1.2;
}

/* Ville puis région, chacune sur sa ligne : plus de coupure au milieu
   de « Côte d'Azur ». */
.footer__city,
.footer__region {
  display: block;
}

.footer__city {
  font-size: clamp(20px, 5vw, 24px);
}

.footer__region {
  margin-top: 2px;
  font-size: clamp(16px, 4vw, 18px);
}

.footer__note {
  margin-top: 10px;
  font-size: var(--fs-footer);
  line-height: 1.5;
}

.footer__list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
  font-size: 12.5px;
  letter-spacing: .06em;
}

.footer__list a:hover {
  color: var(--coral);
}

/* Au doigt, une ligne de 12,5 px fait une cible de 19 px. On l'élargit
   par padding et on annule d'autant en marge : le rendu ne bouge pas. */
@media (max-width: 760px) {
  .footer__list a {
    padding-block: 6px;
    margin-block: -6px;
  }
}

.footer__baseline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 34px;
  padding-top: 18px;
  border-top: var(--rule);
  font-family: var(--font-mono);
  font-size: var(--fs-mono-sm);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono);
  text-transform: uppercase;
}

.footer__seal {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
}

.footer__seal-image {
  flex: none;
  width: 120px;
  height: auto;
}
</style>
