<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Play, Award, Pencil, Star, Clock3, CalendarCheck, UserPlus } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { useCoursesStore } from '@/stores/courses'
import { nextGoals, skills, medals, recentActivities } from '@/data/mockData'
import StatCard from '@/components/StatCard.vue'
import SkillBar from '@/components/SkillBar.vue'
import CourseCard from '@/components/CourseCard.vue'

const userStore = useUserStore()
const user = userStore.user
const coursesStore = useCoursesStore()
const inProgressCourses = computed(() => coursesStore.list.filter((c) => c.status !== 'not_started').slice(0, 3))

const percent = Math.round((user.xp / user.xpToNextLevel) * 100)
const circumference = 2 * Math.PI * 34
</script>

<template>
  <div class="space-y-6">
    <!-- Banner -->
    <div class="rounded-2xl p-6 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-800 text-white relative overflow-hidden">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full bg-white/15 border-2 border-white/40 flex items-center justify-center text-xl font-bold">
            {{ user.initials }}
          </div>
          <div>
            <p class="text-brand-100 text-sm">Bem-vinda de volta,</p>
            <h1 class="text-2xl font-bold">{{ user.name }}</h1>
            <div class="flex flex-wrap gap-2 mt-2 text-xs">
              <span class="bg-white/15 px-2 py-1 rounded-full">Nível {{ user.level }} · {{ user.levelName }}</span>
              <span class="bg-white/15 px-2 py-1 rounded-full">{{ user.streakDays }} dias de streak</span>
              <span class="bg-white/15 px-2 py-1 rounded-full">#{{ user.rankPosition }} no ranking</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-4 self-center md:self-auto">
          <div class="relative w-20 h-20">
            <svg viewBox="0 0 80 80" class="w-20 h-20 -rotate-90">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="8" />
              <circle
                cx="40" cy="40" r="34" fill="none" stroke="white" stroke-width="8"
                stroke-linecap="round"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="circumference * (1 - percent / 100)"
              />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center leading-none">
              <span class="text-sm font-bold">{{ percent }}%</span>
              <span class="text-[10px] text-brand-100">p/ Nível {{ user.level + 1 }}</span>
            </div>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold">{{ user.xp }} XP</p>
            <p class="text-xs text-brand-100">faltam {{ user.xpToNextLevel - user.xp }} XP</p>
          </div>
        </div>
      </div>
    </div>

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

        <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-3">Últimas atividades</h2>
          <ul class="divide-y divide-slate-100 dark:divide-slate-700">
            <li v-for="activity in recentActivities" :key="activity.id" class="py-2.5 flex justify-between text-sm">
              <span class="text-slate-700 dark:text-slate-200">{{ activity.text }}</span>
              <span class="text-slate-400 dark:text-slate-500 text-xs whitespace-nowrap ml-2">{{ activity.time }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Side column -->
      <div class="space-y-6">
        <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-4">Medalhas conquistadas</h2>
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="medal in medals"
              :key="medal.id"
              class="flex flex-col items-center gap-2 rounded-xl p-3 border"
              :class="medal.unlocked ? 'border-slate-100 dark:border-slate-700' : 'border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900'"
            >
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center text-white"
                :style="medal.unlocked ? { backgroundColor: medal.color } : {}"
                :class="!medal.unlocked && 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'"
              >
                <Award class="w-5 h-5" />
              </div>
              <span class="text-xs text-center font-medium" :class="medal.unlocked ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'">
                {{ medal.name }}
              </span>
            </div>
          </div>
        </div>

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
