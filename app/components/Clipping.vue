<script setup lang="ts">
import type { Clipping } from '~/content/clippings'
import { site } from '~/content/site'

defineProps<{
  clipping: Clipping
  /** 1, 2 ou 3 : choisit le tracé du bord découpé. */
  variant: number
}>()
</script>

<template>
  <div class="clipping" :class="`clipping--${variant}`">
    <!-- Deux épaisseurs de papier : la plus foncée dépasse d'un pixel
         et fait l'épaisseur de la coupure sous le bord déchiré. -->
    <div class="clipping__edge">
      <div class="clipping__paper">
        <span class="clipping__grain" aria-hidden="true" />

        <span class="clipping__rule" aria-hidden="true" />

        <p class="clipping__label">{{ clipping.label }}</p>
        <p class="clipping__text">
          <template v-for="(line, i) in clipping.lines" :key="line">
            <br v-if="i > 0">{{ line }}
          </template>
          <template v-if="clipping.emailLine">
            <br>{{ clipping.emailLine.before }}<a
              class="clipping__email"
              :href="`mailto:${site.email}`"
            >{{ site.email }}</a>{{ clipping.emailLine.after }}
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Papier découpé aux ciseaux : pas d'ombre, c'est posé à plat. */
.clipping {
  position: relative;
  transition: transform 200ms ease;
}

.clipping--1 {
  --cut: polygon(
    0 1.5px, 7% 0, 19% 2px, 34% 0.5px, 52% 2.5px, 68% 0, 83% 1.5px, 100% 0.5px,
    calc(100% - 1px) 38%, 100% 71%, calc(100% - 2px) 100%,
    79% calc(100% - 1px), 61% 100%, 44% calc(100% - 2.5px), 26% 100%,
    11% calc(100% - 1px), 0 100%, 1.5px 64%, 0 33%
  );

  z-index: 1;
  transform: rotate(-2deg);
}

.clipping--2 {
  --cut: polygon(
    1px 0, 13% 2px, 29% 0, 41% 1.5px, 58% 0.5px, 74% 2.5px, 91% 0, 100% 1px,
    calc(100% - 2px) 27%, 100% 55%, calc(100% - 1.5px) 82%, 100% 100%,
    86% calc(100% - 2px), 69% calc(100% - 0.5px), 49% 100%,
    33% calc(100% - 1.5px), 16% 100%, 0 calc(100% - 1px), 2px 58%, 0 22%
  );

  z-index: 2;
  transform: rotate(1.5deg);
  /* le chevauchement mord sur la marge basse de la coupure du dessus,
     jamais sur son texte : il reste 29 px de papier sous la dernière ligne */
  margin-top: -12px;
  margin-left: 10px;
}

.clipping--3 {
  --cut: polygon(
    0 0.5px, 9% 2.5px, 23% 0, 37% 1px, 56% 2px, 72% 0, 88% 1.5px, 100% 2px,
    calc(100% - 1.5px) 46%, 100% 100%,
    82% calc(100% - 1.5px), 64% 100%, 47% calc(100% - 2.5px), 28% 100%,
    12% calc(100% - 1px), 0 100%, 1px 66%, 0 31%
  );

  z-index: 3;
  transform: rotate(-1deg);
  margin-top: -12px;
  margin-right: 10px;
}

.clipping__edge {
  background: var(--paper-edge);
  clip-path: var(--cut);
}

.clipping__paper {
  position: relative;
  margin: 1px;
  padding: 17px 17px 29px;
  background: var(--paper);
  clip-path: var(--cut);
}

/* Grain d'impression : bruit SVG à 6 %, en multiply pour rester dans le papier. */
.clipping__grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: .06;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 120px 120px;
}

/* Le double filet des petites annonces. */
.clipping__rule {
  position: relative;
  display: block;
  margin-bottom: 12px;
  padding-top: 2px;
  border-top: var(--rule);
}

.clipping__rule::after {
  content: '';
  display: block;
  border-top: var(--rule);
}

.clipping__label {
  position: relative;
  margin-bottom: 8px;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono-lg);
  text-transform: uppercase;
  color: var(--teal);
}

.clipping__text {
  position: relative;
  font-size: var(--fs-body);
  line-height: var(--lh-step);
}

.clipping__email {
  border-bottom: var(--rule);
}

.clipping__email:hover {
  color: var(--coral);
  border-bottom-color: var(--coral);
}

/* Une fois la colonne pleine largeur, on remet les coupures à plat
   et on les empile franchement. */
@media (max-width: 1020px) {
  .clipping {
    transform: none;
    margin: 0 0 14px;
  }
}

@media (hover: hover) and (pointer: fine) and (min-width: 1021px) {
  .clipping--1:hover {
    transform: rotate(-0.5deg) translateY(-6px);
    z-index: 10;
  }

  .clipping--2:hover {
    transform: rotate(0.5deg) translateY(-6px);
    z-index: 10;
  }

  .clipping--3:hover {
    transform: rotate(-0.3deg) translateY(-6px);
    z-index: 10;
  }
}

.clipping--1:focus-within {
  transform: rotate(-0.5deg) translateY(-6px);
  z-index: 10;
}

.clipping--2:focus-within {
  transform: rotate(0.5deg) translateY(-6px);
  z-index: 10;
}

.clipping--3:focus-within {
  transform: rotate(-0.3deg) translateY(-6px);
  z-index: 10;
}
</style>
