<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowLeft, Clock3, User, CheckCircle2, RotateCw } from 'lucide-vue-next'
import { useCoursesStore } from '@/stores/courses'

const props = defineProps({
  id: { type: String, required: true },
})

const store = useCoursesStore()
const course = computed(() => store.byId(props.id))
</script>

<template>
  <div class="space-y-6 max-w-3xl">
    <RouterLink to="/courses" class="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600">
      <ArrowLeft class="w-4 h-4" /> Voltar para Cursos
    </RouterLink>

    <div v-if="course" class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
      <div class="h-40 bg-gradient-to-br from-brand-500 to-brand-800" />
      <div class="p-6 space-y-5">
        <div>
          <span class="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wide">{{ course.category }}</span>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ course.title }}</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-2">{{ course.description }}</p>
        </div>

        <div class="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <span class="flex items-center gap-1.5"><User class="w-4 h-4" /> {{ course.teacher }}</span>
          <span class="flex items-center gap-1.5"><Clock3 class="w-4 h-4" /> {{ course.hours }}h</span>
        </div>

        <div class="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
          <div class="flex justify-between text-sm mb-1">
            <span class="text-slate-600 dark:text-slate-300">Progresso</span>
            <span class="font-semibold text-slate-800 dark:text-slate-100">{{ course.progress }}%</span>
          </div>
          <div class="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div class="h-full bg-brand-600 rounded-full" :style="{ width: course.progress + '%' }" />
          </div>
        </div>

        <button
          type="button"
          class="w-full flex items-center justify-center gap-2 font-semibold py-2.5 rounded-lg transition"
          :class="course.status === 'completed'
            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
            : 'bg-brand-600 hover:bg-brand-700 text-white'"
        >
          <component :is="course.status === 'completed' ? CheckCircle2 : RotateCw" class="w-4 h-4" />
          {{ course.status === 'completed' ? 'Revisar curso' : 'Continuar curso' }}
        </button>
      </div>
    </div>

    <div v-else class="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-8 text-center text-slate-500 dark:text-slate-400">
      Curso não encontrado.
    </div>
  </div>
</template>
