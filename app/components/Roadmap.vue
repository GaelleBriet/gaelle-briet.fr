<script setup lang="ts">
import { roadmap, steps } from '~/content/roadmap'
</script>

<template>
  <div class="sheet">
    <span class="sheet__clip" aria-hidden="true" />

    <p class="sheet__header">
      <span>{{ roadmap.header }}</span>
      <span>{{ roadmap.laps }}</span>
    </p>

    <div class="sheet__steps">
      <!-- La boucle de retour du 05 vers le 01 : décor, pas de contenu. -->
      <span class="loop" aria-hidden="true">
        <span class="loop__bottom" />
        <span class="loop__side" />
        <span class="loop__top" />
        <span class="loop__arrow" />
        <span class="loop__label">{{ roadmap.loopLabel }}</span>
      </span>

      <ol>
        <li v-for="step in steps" :key="step.number" class="step">
          <span class="step__number">{{ step.number }}</span>
          <h3 class="step__title">{{ step.title }}</h3>
          <span class="step__text">{{ step.text }}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
/* Feuille posée de travers sur la table, tenue par une pince. */
.sheet {
  position: relative;
  margin-top: 14px;
  background: var(--cream-card);
  border: var(--border);
  box-shadow: var(--shadow-card);
  transform: rotate(1deg);
  /* de la place sous la pince avant l'en-tête */
  padding-top: 19px;
}

.sheet__clip {
  position: absolute;
  top: -11px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: grid;
  place-items: center;
  width: 110px;
  height: 22px;
  border-radius: 4px;
  background: var(--ink);
}

.sheet__clip::after {
  content: '';
  width: 70px;
  height: 6px;
  border-radius: 3px;
  background: var(--cream);
}

.sheet__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gap-sm);
  padding: 10px 22px;
  border-top: var(--border);
  border-bottom: var(--border);
  background: var(--teal);
  color: var(--cream);
  font-family: var(--font-mono);
  font-size: var(--fs-mono-sm);
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono);
  text-transform: uppercase;
}

.sheet__steps {
  position: relative;
  padding: 4px 22px 4px 52px;
}

/* ---------- Étapes ---------- */

.step {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px 18px;
  padding: 17px 0;
  border-bottom: var(--rule);
}

.step:last-child {
  border-bottom: none;
}

.step__number {
  flex: none;
  width: 34px;
  font-family: var(--font-mono);
  font-weight: var(--fw-mono);
  font-size: var(--fs-step-num);
  color: var(--coral);
}

.step__title {
  flex: 0 0 150px;
  font-size: var(--fs-h4);
  line-height: var(--lh-tight);
}

.step__text {
  flex: 1 1 220px;
  min-width: 0;
  font-size: var(--fs-body);
  line-height: var(--lh-step);
  text-wrap: pretty;
}

/* ---------- Boucle de retour ---------- */

.loop {
  position: absolute;
  left: 22px;
  top: 32px;
  bottom: 32px;
  width: 30px;
  pointer-events: none;
}

.loop__bottom,
.loop__side,
.loop__top,
.loop__arrow,
.loop__label {
  position: absolute;
}

/* Du 05 : on part vers la gauche… */
.loop__bottom {
  left: 14px;
  right: 0;
  bottom: 0;
  border-top: 1.5px dashed var(--coral);
}

/* …on remonte… */
.loop__side {
  left: 14px;
  top: 0;
  bottom: 0;
  border-left: 1.5px dashed var(--coral);
}

/* …et on rentre dans le 01. */
.loop__top {
  left: 14px;
  width: 10px;
  top: 0;
  border-top: 1.5px dashed var(--coral);
}

.loop__arrow {
  left: 24px;
  top: -3.5px;
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 6px solid var(--coral);
}

/* Libellé en marge, lu de bas en haut le long du trait. */
.loop__label {
  left: 0;
  top: 50%;
  transform: translateY(-50%) rotate(180deg);
  writing-mode: vertical-rl;
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: var(--fw-mono);
  letter-spacing: var(--track-mono-sm);
  text-transform: uppercase;
  color: var(--coral);
  white-space: nowrap;
}

/* Une fois les colonnes empilées, la feuille se redresse
   et la boucle n'a plus la largeur pour exister. */
@media (max-width: 1000px) {
  .sheet {
    transform: none;
  }
}

@media (max-width: 760px) {
  .loop {
    display: none;
  }

  .sheet__steps {
    padding-left: 22px;
  }
}
</style>
