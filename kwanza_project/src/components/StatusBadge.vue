<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: { type: String, required: true },
})

const stylesByStatus = {
  Ativo: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600',
  Emitido: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600',
  Inativo: 'bg-red-50 dark:bg-red-500/10 text-red-500',
  Pendente: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600',
  Elegível: 'bg-brand-50 dark:bg-brand-500/10 text-brand-600',
}

const dotByStatus = {
  Ativo: 'bg-emerald-500',
  Emitido: 'bg-emerald-500',
  Inativo: 'bg-red-500',
  Pendente: 'bg-amber-500',
  Elegível: 'bg-brand-500',
}

const classes = computed(() => stylesByStatus[props.status] || 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300')
const dot = computed(() => dotByStatus[props.status] || 'bg-slate-400')
</script>

<template>
  <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold" :class="classes">
    <span class="w-1.5 h-1.5 rounded-full" :class="dot" />
    {{ status }}
  </span>
</template>
