import { defineStore } from 'pinia'
import { competencyLogs } from '@/data/mockData'
import { useParticipantsStore } from '@/stores/participants'

const competencyColors = {
  Liderança: '#2563eb',
  Comunicação: '#0284c7',
  Oratória: '#3b82f6',
  'Resolução de Conflitos': '#16a34a',
  Participação: '#d97706',
  Proatividade: '#7c3aed',
  'Trabalho em Equipe': '#0891b2',
  Responsabilidade: '#dc2626',
  Criatividade: '#db2777',
}

function initialsFor(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

let nextId = Math.max(...competencyLogs.map((l) => l.id)) + 1

export const useCompetencyStore = defineStore('competencyLogs', {
  state: () => ({
    logs: competencyLogs.map((l) => ({ ...l })),
  }),
  actions: {
    add(payload) {
      this.logs.unshift({
        id: nextId++,
        initials: initialsFor(payload.name),
        color: competencyColors[payload.competency] || '#2563eb',
        ...payload,
      })
      const points = Number(payload.points) || 0
      if (points) {
        const participantsStore = useParticipantsStore()
        const participant = participantsStore.list.find((p) => p.name === payload.name)
        if (participant) {
          participantsStore.update(participant.id, { score: participant.score + points })
        }
      }
    },
    update(id, payload) {
      const index = this.logs.findIndex((l) => l.id === id)
      if (index !== -1) {
        this.logs[index] = {
          ...this.logs[index],
          ...payload,
          initials: initialsFor(payload.name || this.logs[index].name),
          color: competencyColors[payload.competency] || this.logs[index].color,
        }
      }
    },
    remove(id) {
      this.logs = this.logs.filter((l) => l.id !== id)
    },
  },
})
