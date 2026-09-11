<script setup>
import { computed, reactive } from 'vue'
import { UserCheck, UserX, CalendarCheck, Clock3, Check, X } from 'lucide-vue-next'
import { attendanceSummary, calendarMonth, checkins } from '@/data/mockData'
import StatCard from '@/components/StatCard.vue'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

// Junho/2026 começa numa segunda-feira -> 1 dia de deslocamento antes do dia 1
const leadingBlanks = 1

const days = computed(() => {
  const cells = Array.from({ length: leadingBlanks }, () => null)
  for (let d = 1; d <= calendarMonth.totalDays; d += 1) {
    cells.push(d)
  }
  return cells
})

const checkinList = reactive(checkins.map((c) => ({ ...c })))
const summary = reactive({ ...attendanceSummary })

function markPresent(person) {
  if (!person.present) {
    person.present = true
    summary.present += 1
    summary.absent -= 1
  }
}
function markAbsent(person) {
  if (person.present) {
    person.present = false
    summary.present -= 1
    summary.absent += 1
  }
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Frequência</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">{{ summary.meetingLabel }}</p>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Presentes" :value="summary.present" :icon="UserCheck" icon-bg="bg-emerald-50 dark:bg-emerald-500/10" icon-color="text-emerald-600" />
      <StatCard label="Ausentes" :value="summary.absent" :icon="UserX" icon-bg="bg-red-50 dark:bg-red-500/10" icon-color="text-red-500" />
      <StatCard label="Taxa de presença" :value="`${summary.rate}%`" :icon="CalendarCheck" />
      <StatCard label="Duração média" :value="summary.avgDuration" :icon="Clock3" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-4">Calendário</h2>
        <div class="grid grid-cols-7 gap-1.5 text-center text-xs">
          <span v-for="(d, i) in weekDays" :key="'wd-' + i" class="text-slate-400 font-semibold py-1">{{ d }}</span>
          <template v-for="(day, i) in days" :key="'d-' + i">
            <span v-if="day === null" />
            <span
              v-else
              class="w-8 h-8 flex items-center justify-center rounded-full mx-auto"
              :class="[
                day === calendarMonth.today
                  ? 'bg-amber-400 text-white font-bold'
                  : calendarMonth.meetingDays.includes(day)
                    ? 'bg-brand-600 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-300',
              ]"
            >{{ day }}</span>
          </template>
        </div>
        <div class="flex items-center gap-4 mt-4 text-xs text-slate-500 dark:text-slate-400">
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-brand-600" /> Encontro</span>
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-amber-400" /> Hoje</span>
        </div>
      </div>

      <div class="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 class="font-bold text-lg text-slate-900 dark:text-white px-5 pt-5">Lista de participantes — Check-in</h2>
        <ul class="divide-y divide-slate-100 dark:divide-slate-700 mt-2">
          <li v-for="person in checkinList" :key="person.id" class="flex items-center gap-3 px-5 py-3">
            <div class="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-semibold shrink-0">
              {{ person.initials }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{{ person.name }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Entrada {{ person.entrada }} · Saída {{ person.saida }}</p>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <button
                type="button"
                class="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                :class="person.present ? 'bg-emerald-600 text-white' : 'border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400'"
                @click="markPresent(person)"
              >
                <Check class="w-3.5 h-3.5" /> Presente
              </button>
              <button
                type="button"
                class="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                :class="!person.present ? 'bg-red-500 text-white' : 'border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400'"
                @click="markAbsent(person)"
              >
                <X class="w-3.5 h-3.5" /> Ausente
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
