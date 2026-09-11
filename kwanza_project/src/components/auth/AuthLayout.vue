<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <div
      class="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-20 bg-gradient-to-br from-brand-800 to-brand-950 text-white relative"
    >
      <div class="max-w-md">
        <p class="text-sm text-brand-200 mb-2">Projeto Kwanza · Kenya Club</p>
        <h1 class="text-4xl font-bold leading-tight mb-4">Cada passo é uma conquista.</h1>
        <p class="text-brand-100 text-lg">
          Acompanhe sua evolução, conquiste medalhas, suba de nível e construa o seu futuro junto ao Kenya Club.
        </p>
      </div>
      <p class="absolute bottom-6 left-12 text-xs text-brand-300">© 2026 Kenya Club · Projeto Kwanza</p>
    </div>

    <div class="flex-1 flex flex-col justify-center items-center px-6 py-10 bg-white lg:w-1/2">
      <div class="lg:hidden max-w-sm w-full mb-8 text-center">
        <p class="text-sm text-brand-600 mb-1">Projeto Kwanza · Kenya Club</p>
        <h1 class="text-2xl font-bold text-slate-900">Cada passo é uma conquista.</h1>
      </div>

      <div class="w-full max-w-sm">
        <slot />
      </div>

      <p class="text-xs text-center text-slate-400 mt-8 lg:hidden">© 2026 Kenya Club · Projeto Kwanza</p>
    </div>
  </div>
</template>
