<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Play, Award, Pencil, Star, Clock3, CalendarCheck, UserPlus } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { useCoursesStore } from '@/stores/courses'
import { nextGoals, skills } from '@/data/mockData'
import StatCard from '@/components/StatCard.vue'
import SkillBar from '@/components/SkillBar.vue'
import CourseCard from '@/components/CourseCard.vue'

const userStore = useUserStore()
const user = userStore.user
const coursesStore = useCoursesStore()
const inProgressCourses = computed(() => coursesStore.list.filter((c) => c.status !== 'not_started').slice(0, 3))

const percent = Math.round((user.xp / user.xpToNextLevel) * 100)
</script>

<template>
  <div class="space-y-6">
    <!-- Action buttons -->
    <div class="flex flex-wrap gap-3">
      <RouterLink to="/courses/1" class="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
        <Play class="w-4 h-4" /> Iniciar curso
      </RouterLink>
      <RouterLink to="/certificates" class="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold px-4 py-2 rounded-lg transition">
        <Award class="w-4 h-4" /> Visualizar certificado
      </RouterLink>
      <RouterLink to="/profile" class="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold px-4 py-2 rounded-lg transition">
        <Pencil class="w-4 h-4" /> Editar perfil
      </RouterLink>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Pontuação" :value="user.score" :percent="12" :icon="Star" icon-bg="bg-amber-50 dark:bg-amber-500/10" icon-color="text-amber-500" />
      <StatCard label="Horas acumuladas" :value="`${user.hours}h`" :percent="8" :icon="Clock3" />
      <StatCard label="Frequência" :value="`${user.attendance}%`" :icon="CalendarCheck" icon-bg="bg-emerald-50 dark:bg-emerald-500/10" icon-color="text-emerald-600" />
      <StatCard label="Convites realizados" :value="user.invites" :percent="5" :icon="UserPlus" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main column -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-bold text-lg text-slate-900 dark:text-white">Próximo objetivo</h2>
            <span class="text-xs text-slate-500 dark:text-slate-400">Nível {{ user.level + 1 }} · Baobá</span>
          </div>
          <div class="flex justify-between text-sm text-slate-600 dark:text-slate-300 mb-1">
            <span>{{ user.xp }} XP</span>
            <span>{{ user.xpToNextLevel }} XP</span>
          </div>
          <div class="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden mb-4">
            <div class="h-full bg-brand-600 rounded-full" :style="{ width: percent + '%' }" />
          </div>
          <ul class="space-y-3">
            <li v-for="goal in nextGoals" :key="goal.id">
              <div class="flex justify-between text-sm mb-1">
                <span class="text-slate-700 dark:text-slate-200">{{ goal.label }}</span>
                <span class="text-brand-600 dark:text-brand-400 font-semibold">+{{ goal.xp }} XP</span>
              </div>
              <div class="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div class="h-full bg-brand-400 rounded-full" :style="{ width: goal.progress + '%' }" />
              </div>
            </li>
          </ul>
        </div>

        <div>
          <div class="flex items-center justify-between mb-3">
            <h2 class="font-bold text-lg text-slate-900 dark:text-white">Cursos em andamento</h2>
            <RouterLink to="/courses" class="text-sm text-brand-600 dark:text-brand-400 font-semibold">Ver todos</RouterLink>
          </div>
          <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <CourseCard v-for="course in inProgressCourses" :key="course.id" :course="course" />
          </div>
        </div>
      </div>

      <!-- Side column -->
      <div class="space-y-6">
        <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-4">Competências</h2>
          <div class="space-y-3">
            <SkillBar v-for="skill in skills" :key="skill.id" :name="skill.name" :value="skill.value" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
