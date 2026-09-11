<script setup>
import { AlertTriangle } from 'lucide-vue-next'

defineProps({
  title: { type: String, default: 'Confirmar exclusão' },
  message: { type: String, required: true },
  confirmLabel: { type: String, default: 'Excluir' },
})
const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/50" @click="emit('cancel')" />
      <div class="relative bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-sm p-6">
        <div class="w-10 h-10 rounded-full bg-red-50 dark:bg-red-500/10 text-red-500 flex items-center justify-center mb-3">
          <AlertTriangle class="w-5 h-5" />
        </div>
        <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-1">{{ title }}</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-5">{{ message }}</p>
        <div class="flex justify-end gap-2">
          <button
            type="button"
            class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300"
            @click="emit('cancel')"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold"
            @click="emit('confirm')"
          >
            {{ confirmLabel }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
