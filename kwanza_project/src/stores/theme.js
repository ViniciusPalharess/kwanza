import { defineStore } from 'pinia'

const STORAGE_KEY = 'kwanza-theme'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    dark: typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY) === 'dark',
  }),
  actions: {
    init() {
      this.apply()
    },
    toggle() {
      this.dark = !this.dark
      this.apply()
    },
    apply() {
      if (typeof document === 'undefined') return
      document.documentElement.classList.toggle('dark', this.dark)
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, this.dark ? 'dark' : 'light')
      }
    },
  },
})
