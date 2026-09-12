import { defineStore } from 'pinia'

let nextId = 0

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [],
  }),
  actions: {
    push(message, type = 'success', duration = 4000) {
      const id = nextId++
      this.toasts.push({ id, message, type })
      if (duration) {
        setTimeout(() => this.dismiss(id), duration)
      }
      return id
    },
    success(message, duration) {
      return this.push(message, 'success', duration)
    },
    error(message, duration) {
      return this.push(message, 'error', duration)
    },
    dismiss(id) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id)
    },
  },
})
