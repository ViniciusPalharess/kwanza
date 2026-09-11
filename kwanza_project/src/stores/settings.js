import { defineStore } from 'pinia'

function initialsFor(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

let nextLevelId = 7
let nextUserId = 5

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    institution: {
      name: 'Kenya Club',
      project: 'Projeto Kwanza',
      email: 'contato@kenyaclub.org',
    },
    levels: [
      { id: 1, name: 'Nível 1 · Semente', xp: 0 },
      { id: 2, name: 'Nível 2 · Broto', xp: 500 },
      { id: 3, name: 'Nível 3 · Raiz', xp: 1200 },
      { id: 4, name: 'Nível 4 · Tronco', xp: 2200 },
      { id: 5, name: 'Nível 5 · Copa', xp: 3500 },
      { id: 6, name: 'Nível 6 · Baobá', xp: 5000 },
    ],
    users: [
      { id: 1, name: 'Amara Nzinga', initials: 'AN', role: 'Administrador' },
      { id: 2, name: 'Kwame Tavares', initials: 'KT', role: 'Coordenador' },
      { id: 3, name: 'Zuri Mendes', initials: 'ZM', role: 'Professor' },
      { id: 4, name: 'Jabari Costa', initials: 'JC', role: 'Monitor' },
    ],
    permissions: {
      cadastrarParticipantes: true,
      registrarPresenca: true,
      emitirCertificados: true,
      gerarCartas: true,
      editarPontuacao: false,
    },
    lastBackup: 'hoje às 03:00',
  }),
  actions: {
    addLevel(payload) {
      this.levels.push({ id: nextLevelId++, ...payload })
      this.levels.sort((a, b) => a.xp - b.xp)
    },
    updateLevel(id, payload) {
      const i = this.levels.findIndex((l) => l.id === id)
      if (i !== -1) this.levels[i] = { ...this.levels[i], ...payload }
      this.levels.sort((a, b) => a.xp - b.xp)
    },
    removeLevel(id) {
      this.levels = this.levels.filter((l) => l.id !== id)
    },
    addUser(payload) {
      this.users.push({ id: nextUserId++, initials: initialsFor(payload.name), ...payload })
    },
    updateUser(id, payload) {
      const i = this.users.findIndex((u) => u.id === id)
      if (i !== -1) {
        this.users[i] = { ...this.users[i], ...payload, initials: initialsFor(payload.name || this.users[i].name) }
      }
    },
    removeUser(id) {
      this.users = this.users.filter((u) => u.id !== id)
    },
    runBackup() {
      const now = new Date()
      this.lastBackup = `hoje às ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    },
  },
})
