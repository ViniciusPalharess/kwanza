<script setup>
import { ref, reactive } from 'vue'
import { Target, Plus, Star, Pencil, Trash2 } from 'lucide-vue-next'
import { competencyCategories } from '@/data/mockData'
import { useCompetencyStore } from '@/stores/competencies'
import { useParticipantsStore } from '@/stores/participants'
import Modal from '@/components/ui/Modal.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'

const store = useCompetencyStore()
const participantsStore = useParticipantsStore()
const competencyNames = competencyCategories.map((c) => c.name)

function todayLabel() {
  const d = new Date()
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

const showForm = ref(false)
const editingId = ref(null)
const form = reactive({ name: '', competency: competencyNames[0], description: '', teacher: '', points: 10, date: '' })

function openCreate() {
  editingId.value = null
  Object.assign(form, {
    name: '',
    competency: competencyNames[0],
    description: 'Demonstrou excelente desempenho durante a atividade em grupo.',
    teacher: 'Prof. Amélia Kunda',
    points: 10,
    date: todayLabel(),
  })
  showForm.value = true
}
function openEdit(log) {
  editingId.value = log.id
  Object.assign(form, { name: log.name, competency: log.competency, description: log.description, teacher: log.teacher, points: log.points, date: log.date })
  showForm.value = true
}
function submitForm() {
  const payload = { ...form, points: Number(form.points) }
  if (editingId.value) store.update(editingId.value, payload)
  else store.add(payload)
  showForm.value = false
}

const confirmDeleteId = ref(null)
function askDelete(log) {
  confirmDeleteId.value = log.id
}
function confirmDelete() {
  store.remove(confirmDeleteId.value)
  confirmDeleteId.value = null
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Competências</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">Registro e avaliação de competências dos participantes</p>
      </div>
      <button
        type="button"
        class="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        @click="openCreate"
      >
        <Plus class="w-4 h-4" /> Registrar competência
      </button>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="cat in competencyCategories" :key="cat.id" class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
          <Target class="w-5 h-5" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1.5">{{ cat.name }}</p>
          <div class="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <div class="h-full bg-brand-600 rounded-full" :style="{ width: cat.value + '%' }" />
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 class="font-bold text-lg text-slate-900 dark:text-white px-5 pt-5">Registros recentes</h2>
      <ul class="divide-y divide-slate-100 dark:divide-slate-700 mt-2">
        <li v-for="log in store.logs" :key="log.id" class="flex items-start gap-3 px-5 py-4">
          <div class="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-semibold shrink-0">
            {{ log.initials }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-100">{{ log.name }}</p>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full" :style="{ backgroundColor: log.color + '1a', color: log.color }">
                {{ log.competency }}
              </span>
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{{ log.description }}</p>
            <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">{{ log.date }} · {{ log.teacher }}</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
              <Star class="w-3 h-3" /> +{{ log.points }}
            </span>
            <button type="button" class="text-slate-400 hover:text-brand-600" @click="openEdit(log)"><Pencil class="w-3.5 h-3.5" /></button>
            <button type="button" class="text-slate-400 hover:text-red-500" @click="askDelete(log)"><Trash2 class="w-3.5 h-3.5" /></button>
          </div>
        </li>
      </ul>
    </div>

    <Modal v-if="showForm" :title="editingId ? 'Editar registro' : 'Registrar competência'" @close="showForm = false">
      <form class="space-y-3" @submit.prevent="submitForm">
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Participante</label>
          <input v-model="form.name" required list="participant-options" type="text" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
          <datalist id="participant-options">
            <option v-for="p in participantsStore.list" :key="p.id" :value="p.name" />
          </datalist>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Competência</label>
            <select v-model="form.competency" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2">
              <option v-for="name in competencyNames" :key="name" :value="name">{{ name }}</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Pontos</label>
            <input v-model="form.points" type="number" min="0" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
          </div>
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Descrição</label>
          <textarea v-model="form.description" rows="2" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Professor(a)</label>
          <input v-model="form.teacher" type="text" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button type="button" class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300" @click="showForm = false">Cancelar</button>
          <button type="submit" class="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold">
            {{ editingId ? 'Salvar alterações' : 'Registrar' }}
          </button>
        </div>
      </form>
    </Modal>

    <ConfirmDialog
      v-if="confirmDeleteId"
      message="Tem certeza que deseja excluir este registro de competência?"
      @confirm="confirmDelete"
      @cancel="confirmDeleteId = null"
    />
  </div>
</template>
