import { defineStore } from 'pinia'
import { calendarMonth } from '@/data/mockData'
import { useParticipantsStore } from '@/stores/participants'

// Pseudo-aleatório determinístico (mesma seed sempre gera o mesmo resultado),
// usado só para espalhar as presenças/faltas de forma realista entre os dias
// e para simular o histórico de meses anteriores na modal de frequência.
function pseudoRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export const useAttendanceStore = defineStore('attendance', {
  state: () => ({
    records: {}, // { [dia]: { [participantId]: boolean } }
    initialized: false,
  }),
  getters: {
    // Todo dia de semana (segunda a sexta) já ocorrido neste mês é um dia de aula.
    elapsedMeetingDays: () => {
      const days = []
      for (let d = 1; d <= calendarMonth.today; d += 1) {
        const weekday = new Date(calendarMonth.year, calendarMonth.month, d).getDay()
        if (weekday !== 0 && weekday !== 6) days.push(d)
      }
      return days
    },
  },
  actions: {
    init() {
      if (this.initialized) return
      const participantsStore = useParticipantsStore()
      const elapsedDays = this.elapsedMeetingDays

      participantsStore.participants.forEach((person) => {
        const targetRate = person.attendance ?? 100
        elapsedDays.forEach((day) => {
          if (!this.records[day]) this.records[day] = {}
          this.records[day][person.id] = pseudoRandom(person.id * 137 + day * 7) < targetRate / 100
        })
      })
      this.initialized = true
    },

    isPresent(day, participantId) {
      return this.records[day]?.[participantId] ?? false
    },

    setPresence(day, participantId, present) {
      if (!this.records[day]) this.records[day] = {}
      this.records[day][participantId] = present
      this.syncCumulative(participantId)
    },

    presenceStats(participantId) {
      const days = this.elapsedMeetingDays
      const present = days.filter((d) => this.isPresent(d, participantId)).length
      return { present, absent: days.length - present, total: days.length }
    },

    cumulativeRate(participantId) {
      const { present, total } = this.presenceStats(participantId)
      return total ? Math.round((present / total) * 100) : 0
    },

    syncCumulative(participantId) {
      const participantsStore = useParticipantsStore()
      participantsStore.update(participantId, { attendance: this.cumulativeRate(participantId) })
    },

    dailySummary(day) {
      const participantsStore = useParticipantsStore()
      const ids = participantsStore.participants.map((p) => p.id)
      const present = ids.filter((id) => this.isPresent(day, id)).length
      const total = ids.length
      return { present, absent: total - present, total, rate: total ? Math.round((present / total) * 100) : 0 }
    },

    // Simula a frequência dos 3 meses anteriores (não temos histórico granular
    // real para eles), centrada na taxa atual do participante.
    monthlyBreakdown(participantId) {
      const current = { monthIndex: calendarMonth.month, rate: this.cumulativeRate(participantId) }
      const baseRate = current.rate
      const previous = [1, 2, 3].map((offset) => {
        const monthIndex = (calendarMonth.month - offset + 12) % 12
        const variance = Math.round((pseudoRandom(participantId * 53 + offset * 191) - 0.5) * 20)
        const rate = Math.min(100, Math.max(0, baseRate + variance))
        return { monthIndex, rate }
      })
      return [current, ...previous]
    },
  },
})
