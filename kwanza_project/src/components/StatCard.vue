<script setup>
import { TrendingUp } from 'lucide-vue-next'

defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  percent: { type: Number, default: null },
  icon: { type: [Object, Function], default: null },
  iconBg: { type: String, default: 'bg-brand-50 dark:bg-brand-500/10' },
  iconColor: { type: String, default: 'text-brand-600' },
})
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
    <div class="flex items-start justify-between mb-3">
      <div v-if="icon" class="w-9 h-9 rounded-lg flex items-center justify-center" :class="iconBg">
        <component :is="icon" class="w-4 h-4" :class="iconColor" />
      </div>
      <span v-if="percent !== null" class="flex items-center gap-0.5 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
        <TrendingUp class="w-3 h-3" />
        {{ percent }}%
      </span>
    </div>
    <p class="text-xl font-bold text-slate-900 dark:text-white">{{ value }}</p>
    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ label }}</p>
  </div>
</template>
