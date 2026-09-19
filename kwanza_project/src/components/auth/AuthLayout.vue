<script setup>
import authHero from '@/assets/images/auth-hero.png'
</script>

<template>
  <div class="h-screen flex flex-col lg:flex-row overflow-hidden">
    <div class="hidden lg:block lg:w-[65%] h-full shrink-0 overflow-hidden">
      <img :src="authHero" alt="Kênia Clube" class="w-full h-full object-cover" />
    </div>

    <div class="flex-1 flex flex-col justify-center items-center px-6 py-10 bg-white overflow-y-auto">
      <div class="lg:hidden max-w-sm w-full mb-8 text-center">
        <p class="text-sm text-brand-600 mb-1">Projeto Kwanza · Kenia Club</p>
        <h1 class="text-2xl font-bold text-slate-900">Cada passo é uma conquista.</h1>
      </div>

      <div class="w-full max-w-sm">
        <slot />
      </div>

      <p class="text-xs text-center text-slate-400 mt-8 lg:hidden">© 2026 Kenia Club · Projeto Kwanza</p>
    </div>
  </div>
</template>
