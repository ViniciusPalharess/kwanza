<script setup>
import { Wrench } from 'lucide-vue-next'

defineProps({
  title: { type: String, default: 'Em breve' },
})
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center py-24 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
    <div class="w-14 h-14 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4">
      <Wrench class="w-6 h-6" />
    </div>
    <h1 class="text-xl font-bold text-slate-900 dark:text-white mb-1">{{ title }}</h1>
    <p class="text-sm text-slate-500 dark:text-slate-400">Esta seção está em construção.</p>
  </div>
</template>
