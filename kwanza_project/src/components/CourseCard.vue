<script setup>
import { RouterLink } from 'vue-router'
import { Clock, RotateCw, CheckCircle2, Play, Pencil, Trash2 } from 'lucide-vue-next'

defineProps({
  course: { type: Object, required: true },
  editable: { type: Boolean, default: false },
})
const emit = defineEmits(['edit', 'delete'])

const statusLabel = {
  completed: 'Concluído',
  in_progress: 'Continuar',
  not_started: 'Iniciar',
}

const statusIcon = {
  completed: CheckCircle2,
  in_progress: RotateCw,
  not_started: Play,
}
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col overflow-hidden">
    <div class="h-28 bg-gradient-to-br from-brand-500 to-brand-800 relative">
      <div v-if="editable" class="absolute top-2 right-2 flex gap-1">
        <button
          type="button"
          class="w-7 h-7 rounded-lg bg-white/90 text-slate-600 flex items-center justify-center hover:bg-white"
          @click="emit('edit')"
        >
          <Pencil class="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          class="w-7 h-7 rounded-lg bg-white/90 text-red-500 flex items-center justify-center hover:bg-white"
          @click="emit('delete')"
        >
          <Trash2 class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
    <div class="p-4 flex flex-col gap-2 flex-1">
      <span class="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wide">{{ course.category }}</span>
      <h3 class="font-bold text-slate-900 dark:text-white">{{ course.title }}</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 flex-1">{{ course.description }}</p>
      <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>{{ course.teacher }}</span>
        <span class="flex items-center gap-1"><Clock class="w-3.5 h-3.5" /> {{ course.hours }}h</span>
      </div>

      <template v-if="course.progress > 0">
        <div class="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Progresso</span>
          <span class="font-semibold text-slate-700 dark:text-slate-200">{{ course.progress }}%</span>
        </div>
        <div class="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div class="h-full bg-brand-600 rounded-full" :style="{ width: course.progress + '%' }" />
        </div>
      </template>

      <RouterLink
        :to="`/courses/${course.id}`"
        class="mt-2 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition"
        :class="course.status === 'completed'
          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
          : 'bg-brand-600 text-white hover:bg-brand-700'"
      >
        <component :is="statusIcon[course.status]" class="w-4 h-4" />
        {{ statusLabel[course.status] }}
      </RouterLink>
    </div>
  </div>
</template>
