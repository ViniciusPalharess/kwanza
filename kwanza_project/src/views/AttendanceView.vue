<script setup>
import { ref, computed } from 'vue'
import { Check, X, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { calendarMonth } from '@/data/mockData'
import { useParticipantsStore } from '@/stores/participants'
import { useAttendanceStore } from '@/stores/attendance'
import Modal from '@/components/ui/Modal.vue'
import defaultAvatar from '@/assets/images/default-avatar.png'

const participantsStore = useParticipantsStore()
const attendanceStore = useAttendanceStore()
attendanceStore.init()

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

// ---- Calendário navegável ----
const viewedYear = ref(calendarMonth.year)
const viewedMonth = ref(calendarMonth.month)

const monthLabel = computed(() => `${MONTH_NAMES[viewedMonth.value]} ${viewedYear.value}`)
const daysInViewedMonth = computed(() => new Date(viewedYear.value, viewedMonth.value + 1, 0).getDate())
const firstWeekday = computed(() => new Date(viewedYear.value, viewedMonth.value, 1).getDay())

const days = computed(() => {
  const cells = Array.from({ length: firstWeekday.value }, () => null)
  for (let d = 1; d <= daysInViewedMonth.value; d += 1) {
    cells.push(d)
  }
  return cells
})

function prevMonth() {
  if (viewedMonth.value === 0) {
    viewedMonth.value = 11
    viewedYear.value -= 1
  } else {
    viewedMonth.value -= 1
  }
}
function nextMonth() {
  if (viewedMonth.value === 11) {
    viewedMonth.value = 0
    viewedYear.value += 1
  } else {
    viewedMonth.value += 1
  }
}

function weekdayOf(year, month, day) {
  return new Date(year, month, day).getDay()
}

// ---- Dia selecionado ----
const selectedDay = ref(calendarMonth.today)
const selectedMonth = ref(calendarMonth.month)
const selectedYear = ref(calendarMonth.year)

function selectDay(day) {
  selectedDay.value = day
  selectedMonth.value = viewedMonth.value
  selectedYear.value = viewedYear.value
}

const isDaySelected = (day) =>
  day === selectedDay.value && viewedMonth.value === selectedMonth.value && viewedYear.value === selectedYear.value

// Só existem registros reais para dias de semana já ocorridos no mês mockado.
const hasDataForSelected = computed(() => {
  if (selectedYear.value !== calendarMonth.year || selectedMonth.value !== calendarMonth.month) return false
  if (selectedDay.value > calendarMonth.today) return false
  const wd = weekdayOf(selectedYear.value, selectedMonth.value, selectedDay.value)
  return wd !== 0 && wd !== 6
})
const selectedDaySummary = computed(() => (hasDataForSelected.value ? attendanceStore.dailySummary(selectedDay.value) : null))
const selectedDateLabel = computed(() => `${selectedDay.value} de ${MONTH_NAMES[selectedMonth.value].toLowerCase()}`)

function markPresent(personId) {
  attendanceStore.setPresence(selectedDay.value, personId, true)
}
function markAbsent(personId) {
  attendanceStore.setPresence(selectedDay.value, personId, false)
}

// ---- Modal de frequência geral do participante ----
const selectedParticipant = ref(null)
function openParticipant(person) {
  selectedParticipant.value = person
}

const participantStats = computed(() =>
  selectedParticipant.value ? attendanceStore.presenceStats(selectedParticipant.value.id) : null,
)
const participantRate = computed(() => (selectedParticipant.value ? attendanceStore.cumulativeRate(selectedParticipant.value.id) : 0))
const participantMonthly = computed(() =>
  selectedParticipant.value
    ? attendanceStore.monthlyBreakdown(selectedParticipant.value.id).map((m) => ({ ...m, label: MONTH_NAMES[m.monthIndex] }))
    : [],
)
const participantHistory = computed(() =>
  selectedParticipant.value
    ? [...attendanceStore.elapsedMeetingDays].reverse().map((d) => ({
        day: d,
        label: `${String(d).padStart(2, '0')}/${String(calendarMonth.month + 1).padStart(2, '0')}`,
        present: attendanceStore.isPresent(d, selectedParticipant.value.id),
      }))
    : [],
)
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Frequência</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-bold text-lg text-slate-900 dark:text-white">Calendário</h2>
          <div class="flex items-center gap-1">
            <button type="button" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400" @click="prevMonth">
              <ChevronLeft class="w-4 h-4" />
            </button>
            <span class="text-sm font-medium text-slate-600 dark:text-slate-300 w-28 text-center">{{ monthLabel }}</span>
            <button type="button" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400" @click="nextMonth">
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>
        <div class="grid grid-cols-7 gap-1.5 text-center text-xs">
          <span v-for="(d, i) in weekDays" :key="'wd-' + i" class="text-slate-400 font-semibold py-1">{{ d }}</span>
          <template v-for="(day, i) in days" :key="'d-' + i">
            <span v-if="day === null" />
            <button
              v-else
              type="button"
              class="w-8 h-8 flex items-center justify-center rounded-full mx-auto transition"
              :class="
                isDaySelected(day)
                  ? 'bg-brand-600 text-white font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
              "
              @click="selectDay(day)"
            >{{ day }}</button>
          </template>
        </div>
      </div>

      <div class="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-5">
        <template v-if="hasDataForSelected">
          <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-1">Frequência — {{ selectedDateLabel }}</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">
            {{ selectedDaySummary.present }} presentes · {{ selectedDaySummary.absent }} ausentes · {{ selectedDaySummary.rate }}%
          </p>

          <ul class="divide-y divide-slate-100 dark:divide-slate-700">
            <li v-for="person in participantsStore.participants" :key="person.id" class="flex items-center gap-3 py-3">
              <button type="button" class="flex items-center gap-3 flex-1 min-w-0 text-left" @click="openParticipant(person)">
                <img :src="person.avatarUrl || defaultAvatar" alt="Foto de perfil" class="w-9 h-9 rounded-full object-cover shrink-0" />
                <span class="min-w-0">
                  <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{{ person.name }}</p>
                  <p class="text-xs text-slate-400 dark:text-slate-500">
                    {{ attendanceStore.presenceStats(person.id).present }}/{{ attendanceStore.presenceStats(person.id).total }} · {{ person.attendance }}%
                  </p>
                </span>
              </button>
              <div class="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  class="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                  :class="attendanceStore.isPresent(selectedDay, person.id) ? 'bg-emerald-600 text-white' : 'border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400'"
                  @click="markPresent(person.id)"
                >
                  <Check class="w-3.5 h-3.5" /> Presente
                </button>
                <button
                  type="button"
                  class="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                  :class="!attendanceStore.isPresent(selectedDay, person.id) ? 'bg-red-500 text-white' : 'border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400'"
                  @click="markAbsent(person.id)"
                >
                  <X class="w-3.5 h-3.5" /> Ausente
                </button>
              </div>
            </li>
          </ul>
        </template>
        <div v-else class="min-h-[240px] flex items-center justify-center">
          <p class="text-sm text-slate-400 dark:text-slate-500 text-center px-6">Não há registros de presença para este dia.</p>
        </div>
      </div>
    </div>

    <Modal v-if="selectedParticipant" title="Frequência" @close="selectedParticipant = null">
      <div class="flex items-center gap-3 mb-5">
        <img :src="selectedParticipant.avatarUrl || defaultAvatar" alt="Foto de perfil" class="w-12 h-12 rounded-full object-cover" />
        <p class="font-bold text-lg text-slate-900 dark:text-white">{{ selectedParticipant.name }}</p>
      </div>

      <p class="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Frequência geral</p>
      <p class="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-2">{{ participantRate }}%</p>
      <div class="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden mb-4">
        <div class="h-full bg-brand-600 rounded-full" :style="{ width: participantRate + '%' }" />
      </div>

      <div class="grid grid-cols-3 gap-2 text-center mb-5">
        <div>
          <p class="text-lg font-bold text-slate-800 dark:text-slate-100">{{ participantStats.present }}</p>
          <p class="text-xs text-slate-400 dark:text-slate-500">Presenças</p>
        </div>
        <div>
          <p class="text-lg font-bold text-slate-800 dark:text-slate-100">{{ participantStats.absent }}</p>
          <p class="text-xs text-slate-400 dark:text-slate-500">Ausências</p>
        </div>
        <div>
          <p class="text-lg font-bold text-slate-800 dark:text-slate-100">{{ participantStats.total }}</p>
          <p class="text-xs text-slate-400 dark:text-slate-500">Total</p>
        </div>
      </div>

      <hr class="border-slate-100 dark:border-slate-700 mb-4" />

      <p class="font-semibold text-sm text-slate-700 dark:text-slate-200 mb-2">Frequência por mês</p>
      <ul class="space-y-2 mb-5">
        <li v-for="m in participantMonthly" :key="m.monthIndex" class="flex items-center gap-3">
          <span class="w-14 text-xs text-slate-500 dark:text-slate-400 shrink-0">{{ m.label }}</span>
          <div class="h-2 flex-1 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <div class="h-full bg-brand-500 rounded-full" :style="{ width: m.rate + '%' }" />
          </div>
          <span class="w-10 text-xs text-slate-500 dark:text-slate-400 text-right shrink-0">{{ m.rate }}%</span>
        </li>
      </ul>

      <hr class="border-slate-100 dark:border-slate-700 mb-4" />

      <p class="font-semibold text-sm text-slate-700 dark:text-slate-200 mb-2">Histórico</p>
      <ul class="max-h-48 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
        <li v-for="h in participantHistory" :key="h.day" class="flex items-center justify-between py-2 text-sm">
          <span class="text-slate-600 dark:text-slate-300">{{ h.label }}</span>
          <span class="flex items-center gap-1 font-semibold" :class="h.present ? 'text-emerald-600' : 'text-red-500'">
            <Check v-if="h.present" class="w-3.5 h-3.5" />
            <X v-else class="w-3.5 h-3.5" />
            {{ h.present ? 'Presente' : 'Ausente' }}
          </span>
        </li>
      </ul>
    </Modal>
  </div>
</template>
