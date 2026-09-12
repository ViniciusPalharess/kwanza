import { defineStore } from 'pinia'
import { ranking } from '@/data/mockData'

function initialsFor(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

let nextId = Math.max(...ranking.map((p) => p.id)) + 1

export const useParticipantsStore = defineStore('participants', {
  state: () => ({
    list: ranking.map((p) => ({ role: 'Participante', ...p })),
  }),
  getters: {
    participants: (state) => state.list.filter((p) => p.role === 'Participante'),
    sortedByScore: (state) => [...state.list].filter((p) => p.role === 'Participante').sort((a, b) => b.score - a.score),
  },
  actions: {
    add(payload) {
      this.list.push({
        id: nextId++,
        role: payload.role || 'Participante',
        levelName: payload.levelName || 'Broto',
        xp: payload.score || 0,
        initials: initialsFor(payload.name),
        ...payload,
      })
    },
    update(id, payload) {
      const index = this.list.findIndex((p) => p.id === id)
      if (index !== -1) {
        this.list[index] = {
          ...this.list[index],
          ...payload,
          initials: initialsFor(payload.name || this.list[index].name),
        }
      }
    },
    remove(id) {
      this.list = this.list.filter((p) => p.id !== id)
    },
  },
})
