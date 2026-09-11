import { defineStore } from 'pinia'
import { certificates } from '@/data/mockData'

let nextId = Math.max(...certificates.map((c) => c.id)) + 1

export const useCertificatesStore = defineStore('certificates', {
  state: () => ({
    list: certificates.map((c) => ({ ...c })),
  }),
  actions: {
    add(payload) {
      this.list.unshift({ id: nextId++, date: null, status: 'Pendente', ...payload })
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
