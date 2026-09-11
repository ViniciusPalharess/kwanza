import { defineStore } from 'pinia'
import { currentUser } from '@/data/mockData'

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    user: { ...currentUser },
  }),
  actions: {
    login(email, password) {
      // TODO: substituir por chamada real à API
      if (email && password) {
        this.isAuthenticated = true
        return true
      }
      return false
    },
    logout() {
      this.isAuthenticated = false
    },
    updateProfile(payload) {
      this.user = { ...this.user, ...payload }
    },
  },
})
