<template>
  <div class="layout">
    <div class="hero">
      <img :src="authHero" alt="Kênia Clube" class="hero-image" />
    </div>

    <div class="panel">
      <div class="mobile-heading">
        <p class="eyebrow">Projeto Kwanza · Kenia Club</p>
        <h1 class="headline">Cada passo é uma conquista.</h1>
      </div>

      <div class="content">
        <slot />
      </div>

      <p class="footer">© 2026 Kenia Club · Projeto Kwanza</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import authHero from '@/assets/images/auth-hero.png'

@Component({})
export default class LayoutAutenticacao extends Vue {
  // public
  public authHero = authHero
}
</script>

<style scoped>
.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .layout {
    flex-direction: row;
  }
}

.hero {
  display: none;
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .hero {
    display: block;
    width: 65%;
  }
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.5rem 1.5rem;
  background-color: #fff;
  overflow-y: auto;
}

.mobile-heading {
  max-width: 24rem;
  width: 100%;
  margin-bottom: 2rem;
  text-align: center;
}

@media (min-width: 1024px) {
  .mobile-heading {
    display: none;
  }
}

.eyebrow {
  font-size: 0.875rem;
  color: var(--color-brand-600);
  margin-bottom: 0.25rem;
}

.headline {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-slate-900);
}

.content {
  width: 100%;
  max-width: 24rem;
}

.footer {
  font-size: 0.75rem;
  text-align: center;
  color: var(--color-slate-400);
  margin-top: 2rem;
}

@media (min-width: 1024px) {
  .footer {
    display: none;
  }
}
</style>
