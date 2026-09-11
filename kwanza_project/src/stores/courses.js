import { defineStore } from 'pinia'
import { courses } from '@/data/mockData'

let nextId = Math.max(...courses.map((c) => c.id)) + 1

export const useCoursesStore = defineStore('courses', {
  state: () => ({
    list: courses.map((c) => ({ ...c })),
  }),
  getters: {
    byId: (state) => (id) => state.list.find((c) => String(c.id) === String(id)),
  },
  actions: {
    add(payload) {
      this.list.push({ id: nextId++, progress: 0, status: 'not_started', ...payload })
    },
    update(id, payload) {
      const index = this.list.findIndex((c) => c.id === id)
      if (index !== -1) this.list[index] = { ...this.list[index], ...payload }
    },
    remove(id) {
      this.list = this.list.filter((c) => c.id !== id)
    },
  },
})
