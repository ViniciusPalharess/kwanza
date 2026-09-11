<script setup>
import { ref, computed } from 'vue'
import { Crown, Star, Medal } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { useParticipantsStore } from '@/stores/participants'

const userStore = useUserStore()
const user = userStore.user
const participantsStore = useParticipantsStore()

const periods = ['Mensal', 'Semestral', 'Anual']
const activePeriod = ref('Mensal')

const ranking = computed(() => participantsStore.sortedByScore)
const podium = computed(() => ranking.value.slice(0, 3))
const podiumOrder = computed(() => [podium.value[1], podium.value[0], podium.value[2]])
const podiumHeights = { 0: 'h-16', 1: 'h-24', 2: 'h-12' }
const podiumRank = { 0: 2, 1: 1, 2: 3 }
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Ranking</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">Os destaques do Projeto Kwanza</p>
      </div>
      <div class="flex gap-2">
        <button
          v-for="period in periods"
          :key="period"
          type="button"
          class="px-3 py-1.5 rounded-full text-sm font-semibold transition"
          :class="activePeriod === period ? 'bg-brand-600 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300'"
          @click="activePeriod = period"
        >
          {{ period }}
        </button>
      </div>
    </div>

    <div v-if="podium[0]" class="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
      <div class="flex justify-center items-end gap-6">
        <div v-for="(person, index) in podiumOrder" :key="person.id" class="flex flex-col items-center">
          <Crown v-if="podiumRank[index] === 1" class="w-5 h-5 text-amber-400 mb-1" />
          <div class="relative">
            <div
              class="rounded-full bg-brand-600 text-white flex items-center justify-center font-bold"
              :class="podiumRank[index] === 1 ? 'w-16 h-16 text-lg' : 'w-12 h-12 text-sm'"
            >
              {{ person.initials }}
            </div>
            <span class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] font-bold flex items-center justify-center text-slate-600 dark:text-slate-200">
              {{ podiumRank[index] }}
            </span>
          </div>
          <p class="text-xs font-semibold text-center mt-2 text-slate-800 dark:text-slate-100">{{ person.name }}</p>
          <p class="text-xs text-brand-600 dark:text-brand-400 font-bold">{{ person.score }}</p>
          <div class="w-16 rounded-t-lg bg-gradient-to-b from-brand-100 to-brand-50 dark:from-brand-800 dark:to-brand-900 mt-2" :class="podiumHeights[index]" />
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 class="font-bold text-lg text-slate-900 dark:text-white px-5 pt-5">Classificação completa</h2>
      <ul class="divide-y divide-slate-100 dark:divide-slate-700 mt-2">
        <li
          v-for="(person, index) in ranking"
          :key="person.id"
          class="flex items-center gap-3 px-5 py-3"
          :class="person.name === user.name ? 'bg-brand-50/60 dark:bg-brand-500/10' : ''"
        >
          <span class="w-6 text-sm font-semibold text-slate-400 dark:text-slate-500">{{ index + 1 }}</span>
          <div class="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-semibold shrink-0">
            {{ person.initials }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{{ person.name }}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">Nível {{ person.level }} · {{ person.levelName }}</p>
          </div>
          <span v-if="index < 3" class="hidden sm:flex items-center gap-1 text-amber-500">
            <Medal v-for="n in 3 - index" :key="n" class="w-3.5 h-3.5" />
          </span>
          <span class="hidden sm:flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 w-20 justify-end">
            <Star class="w-3 h-3" /> {{ person.xp }} XP
          </span>
          <span class="text-sm font-bold text-slate-800 dark:text-slate-100 w-16 text-right">{{ person.score }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
