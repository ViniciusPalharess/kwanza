<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Users, UserCheck, BookOpen, Clock3, Award } from 'lucide-vue-next'
import { adminStats, xpEvolutionMonths, xpEvolutionValues, radarSkills, attendanceMonthlyValues } from '@/data/mockData'
import { useParticipantsStore } from '@/stores/participants'
import { useCoursesStore } from '@/stores/courses'
import StatCard from '@/components/StatCard.vue'
import LineAreaChart from '@/components/charts/LineAreaChart.vue'
import RadarChart from '@/components/charts/RadarChart.vue'
import BarChart from '@/components/charts/BarChart.vue'

const participantsStore = useParticipantsStore()
const coursesStore = useCoursesStore()
const top5 = computed(() => participantsStore.sortedByScore.slice(0, 5))
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Painel Administrativo</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">Visão geral do Projeto Kwanza · Kenya Club</p>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <StatCard label="Participantes" :value="participantsStore.participants.length" :percent="9" :icon="Users" />
      <StatCard label="Ativos" :value="adminStats.active" :percent="4" :icon="UserCheck" icon-bg="bg-emerald-50 dark:bg-emerald-500/10" icon-color="text-emerald-600" />
      <StatCard label="Cursos" :value="coursesStore.list.length" :icon="BookOpen" />
      <StatCard label="Horas cadastradas" :value="adminStats.hoursLogged" :percent="6" :icon="Clock3" />
      <StatCard label="Certificados" :value="adminStats.certificates" :percent="11" :icon="Award" icon-bg="bg-amber-50 dark:bg-amber-500/10" icon-color="text-amber-500" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-1">Evolução geral (XP)</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">Crescimento acumulado dos participantes</p>
        <LineAreaChart
          :labels="xpEvolutionMonths"
          :series="[{ name: 'XP acumulado', color: '#2563eb', values: xpEvolutionValues }]"
          area
        />
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-4">Competências (média)</h2>
        <RadarChart :axes="radarSkills" />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-4">Frequência mensal (%)</h2>
        <BarChart :labels="xpEvolutionMonths" :values="attendanceMonthlyValues" :max-y="100" color="#60a5fa" />
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-bold text-lg text-slate-900 dark:text-white">Ranking geral</h2>
          <RouterLink to="/ranking" class="text-sm text-brand-600 dark:text-brand-400 font-semibold">Ver</RouterLink>
        </div>
        <ul class="space-y-3">
          <li v-for="(person, index) in top5" :key="person.id" class="flex items-center gap-3">
            <span class="w-5 text-sm font-semibold text-slate-400 dark:text-slate-500">{{ index + 1 }}</span>
            <div class="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-semibold">
              {{ person.initials }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{{ person.name }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Nível {{ person.level }}</p>
            </div>
            <span class="text-sm font-bold text-slate-800 dark:text-slate-100">{{ person.score }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
