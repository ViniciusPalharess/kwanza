<script setup>
import { X } from 'lucide-vue-next'

defineProps({
  title: { type: String, required: true },
  maxWidth: { type: String, default: 'max-w-lg' },
})
const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/50" @click="emit('close')" />
      <div
        class="relative bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full p-6 max-h-[90vh] overflow-y-auto"
        :class="maxWidth"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-slate-900 dark:text-white">{{ title }}</h2>
          <button
            type="button"
            class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            @click="emit('close')"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
