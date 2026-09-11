<script setup>
import { ref, reactive } from 'vue'
import { Building2, Trophy, Users, ShieldCheck, DatabaseBackup, Plus, Pencil, Trash2, Upload } from 'lucide-vue-next'
import { useSettingsStore } from '@/stores/settings'
import Modal from '@/components/ui/Modal.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'

const store = useSettingsStore()

const roleOptions = ['Administrador', 'Coordenador', 'Professor', 'Monitor']
const roleColors = {
  Administrador: 'bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300',
  Coordenador: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600',
  Professor: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600',
  Monitor: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
}

// ---- Nível ----
const showLevelForm = ref(false)
const editingLevelId = ref(null)
const levelForm = reactive({ name: '', xp: 0 })
function openCreateLevel() {
  editingLevelId.value = null
  Object.assign(levelForm, { name: '', xp: 0 })
  showLevelForm.value = true
}
function openEditLevel(level) {
  editingLevelId.value = level.id
  Object.assign(levelForm, { name: level.name, xp: level.xp })
  showLevelForm.value = true
}
function submitLevel() {
  const payload = { name: levelForm.name, xp: Number(levelForm.xp) }
  if (editingLevelId.value) store.updateLevel(editingLevelId.value, payload)
  else store.addLevel(payload)
  showLevelForm.value = false
}
const confirmDeleteLevelId = ref(null)
function askDeleteLevel(level) {
  confirmDeleteLevelId.value = level.id
}
function confirmDeleteLevel() {
  store.removeLevel(confirmDeleteLevelId.value)
  confirmDeleteLevelId.value = null
}

// ---- Usuário ----
const showUserForm = ref(false)
const editingUserId = ref(null)
const userForm = reactive({ name: '', role: roleOptions[0] })
function openCreateUser() {
  editingUserId.value = null
  Object.assign(userForm, { name: '', role: roleOptions[0] })
  showUserForm.value = true
}
function openEditUser(user) {
  editingUserId.value = user.id
  Object.assign(userForm, { name: user.name, role: user.role })
  showUserForm.value = true
}
function submitUser() {
  if (editingUserId.value) store.updateUser(editingUserId.value, { ...userForm })
  else store.addUser({ ...userForm })
  showUserForm.value = false
}
const confirmDeleteUserId = ref(null)
function askDeleteUser(user) {
  confirmDeleteUserId.value = user.id
}
function confirmDeleteUser() {
  store.removeUser(confirmDeleteUserId.value)
  confirmDeleteUserId.value = null
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Configurações</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">Gestão da instituição e da plataforma</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Dados da instituição -->
      <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 class="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white mb-4">
          <Building2 class="w-5 h-5 text-brand-600" /> Dados da instituição
        </h2>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">KC</div>
          <button type="button" class="flex items-center gap-2 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-sm font-semibold px-3 py-1.5 rounded-lg">
            <Upload class="w-4 h-4" /> Alterar logo
          </button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Nome</label>
            <input v-model="store.institution.name" type="text" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
          </div>
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Projeto</label>
            <input v-model="store.institution.project" type="text" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
          </div>
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">E-mail de contato</label>
            <input v-model="store.institution.email" type="email" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
          </div>
        </div>
      </div>

      <!-- Pontuação & Níveis -->
      <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 class="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white mb-4">
          <Trophy class="w-5 h-5 text-brand-600" /> Pontuação & Níveis
        </h2>
        <ul class="space-y-2 mb-4">
          <li v-for="level in store.levels" :key="level.id" class="flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-900 rounded-lg px-3 py-2">
            <span class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ level.name }}</span>
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 px-2 py-0.5 rounded-full">{{ level.xp }}+ XP</span>
              <button type="button" class="text-slate-400 hover:text-brand-600" @click="openEditLevel(level)"><Pencil class="w-3.5 h-3.5" /></button>
              <button type="button" class="text-slate-400 hover:text-red-500" @click="askDeleteLevel(level)"><Trash2 class="w-3.5 h-3.5" /></button>
            </div>
          </li>
        </ul>
        <button
          type="button"
          class="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold py-2.5 rounded-lg transition"
          @click="openCreateLevel"
        >
          <Plus class="w-4 h-4" /> Adicionar nível
        </button>
      </div>

      <!-- Usuários & Permissões -->
      <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
        <div class="flex items-center justify-between mb-4">
          <h2 class="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
            <Users class="w-5 h-5 text-brand-600" /> Usuários & Permissões
          </h2>
          <button type="button" class="text-brand-600 dark:text-brand-400 text-sm font-semibold flex items-center gap-1" @click="openCreateUser">
            <Plus class="w-4 h-4" /> Adicionar
          </button>
        </div>
        <ul class="space-y-2">
          <li v-for="user in store.users" :key="user.id" class="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 rounded-lg px-3 py-2">
            <div class="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-semibold shrink-0">{{ user.initials }}</div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{{ user.name }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">{{ user.role }}</p>
            </div>
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full" :class="roleColors[user.role]">{{ user.role }}</span>
            <button type="button" class="text-slate-400 hover:text-brand-600" @click="openEditUser(user)"><Pencil class="w-3.5 h-3.5" /></button>
            <button type="button" class="text-slate-400 hover:text-red-500" @click="askDeleteUser(user)"><Trash2 class="w-3.5 h-3.5" /></button>
          </li>
        </ul>
      </div>

      <!-- Permissões & Categorias -->
      <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 class="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white mb-4">
          <ShieldCheck class="w-5 h-5 text-brand-600" /> Permissões & Categorias
        </h2>
        <ul class="space-y-3">
          <li v-for="key in ['cadastrarParticipantes', 'registrarPresenca', 'emitirCertificados', 'gerarCartas', 'editarPontuacao']" :key="key" class="flex items-center justify-between">
            <span class="text-sm text-slate-700 dark:text-slate-200">
              {{ {
                cadastrarParticipantes: 'Cadastrar participantes',
                registrarPresenca: 'Registrar presença',
                emitirCertificados: 'Emitir certificados',
                gerarCartas: 'Gerar cartas de recomendação',
                editarPontuacao: 'Editar pontuação',
              }[key] }}
            </span>
            <button
              type="button"
              class="w-10 h-6 rounded-full transition"
              :class="store.permissions[key] ? 'bg-brand-600' : 'bg-slate-200 dark:bg-slate-600'"
              @click="store.permissions[key] = !store.permissions[key]"
            >
              <span
                class="block w-5 h-5 bg-white rounded-full shadow transition-transform"
                :class="store.permissions[key] ? 'translate-x-4' : 'translate-x-0.5'"
              />
            </button>
          </li>
        </ul>
      </div>

      <!-- Backup & Segurança -->
      <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 lg:col-span-2">
        <h2 class="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white mb-2">
          <DatabaseBackup class="w-5 h-5 text-brand-600" /> Backup & Segurança
        </h2>
        <p class="text-sm text-brand-600 dark:text-brand-400 mb-4">Último backup: {{ store.lastBackup }} · Auditoria ativa</p>
        <div class="flex gap-3">
          <button type="button" class="flex items-center gap-2 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-sm font-semibold px-4 py-2 rounded-lg" @click="store.runBackup()">
            Fazer backup
          </button>
          <button type="button" class="flex items-center gap-2 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-sm font-semibold px-4 py-2 rounded-lg">
            Restaurar
          </button>
        </div>
      </div>
    </div>

    <Modal v-if="showLevelForm" :title="editingLevelId ? 'Editar nível' : 'Adicionar nível'" @close="showLevelForm = false">
      <form class="space-y-3" @submit.prevent="submitLevel">
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Nome do nível</label>
          <input v-model="levelForm.name" required type="text" placeholder="Nível 7 · Firmamento" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">XP mínimo</label>
          <input v-model="levelForm.xp" type="number" min="0" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button type="button" class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300" @click="showLevelForm = false">Cancelar</button>
          <button type="submit" class="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold">{{ editingLevelId ? 'Salvar' : 'Adicionar' }}</button>
        </div>
      </form>
    </Modal>

    <Modal v-if="showUserForm" :title="editingUserId ? 'Editar usuário' : 'Adicionar usuário'" @close="showUserForm = false">
      <form class="space-y-3" @submit.prevent="submitUser">
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Nome</label>
          <input v-model="userForm.name" required type="text" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Papel</label>
          <select v-model="userForm.role" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2">
            <option v-for="role in roleOptions" :key="role" :value="role">{{ role }}</option>
          </select>
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button type="button" class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300" @click="showUserForm = false">Cancelar</button>
          <button type="submit" class="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold">{{ editingUserId ? 'Salvar' : 'Adicionar' }}</button>
        </div>
      </form>
    </Modal>

    <ConfirmDialog v-if="confirmDeleteLevelId" message="Tem certeza que deseja excluir este nível?" @confirm="confirmDeleteLevel" @cancel="confirmDeleteLevelId = null" />
    <ConfirmDialog v-if="confirmDeleteUserId" message="Tem certeza que deseja remover este usuário?" @confirm="confirmDeleteUser" @cancel="confirmDeleteUserId = null" />
  </div>
</template>
