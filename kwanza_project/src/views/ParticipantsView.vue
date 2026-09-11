<script setup>
import { ref, reactive, computed } from 'vue'
import { UserPlus, Search, ChevronDown, Eye, Pencil, Trash2 } from 'lucide-vue-next'
import { emailFor } from '@/data/mockData'
import { useParticipantsStore } from '@/stores/participants'
import StatusBadge from '@/components/StatusBadge.vue'
import Modal from '@/components/ui/Modal.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'

const store = useParticipantsStore()

const search = ref('')
const page = ref(1)
const pageSize = 8

const filtered = computed(() =>
  store.list.filter((p) => p.name.toLowerCase().includes(search.value.toLowerCase())),
)
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const paged = computed(() => {
  const start = (page.value - 1) * pageSize
  return filtered.value.slice(start, start + pageSize)
})
function goPrev() {
  if (page.value > 1) page.value -= 1
}
function goNext() {
  if (page.value < totalPages.value) page.value += 1
}

// ---- Form modal (criar/editar/ver) ----
const showForm = ref(false)
const viewOnly = ref(false)
const editingId = ref(null)
const form = reactive({ name: '', phone: '', status: 'Ativo', level: 1, score: 0, attendance: 0 })

function openCreate() {
  editingId.value = null
  viewOnly.value = false
  Object.assign(form, { name: '', phone: '', status: 'Ativo', level: 1, score: 0, attendance: 0 })
  showForm.value = true
}
function openEdit(person) {
  editingId.value = person.id
  viewOnly.value = false
  Object.assign(form, {
    name: person.name,
    phone: person.phone,
    status: person.status,
    level: person.level,
    score: person.score,
    attendance: person.attendance,
  })
  showForm.value = true
}
function openView(person) {
  editingId.value = person.id
  viewOnly.value = true
  Object.assign(form, {
    name: person.name,
    phone: person.phone,
    status: person.status,
    level: person.level,
    score: person.score,
    attendance: person.attendance,
  })
  showForm.value = true
}
function submitForm() {
  const payload = {
    name: form.name,
    phone: form.phone,
    status: form.status,
    level: Number(form.level),
    score: Number(form.score),
    attendance: Number(form.attendance),
  }
  if (editingId.value) store.update(editingId.value, payload)
  else store.add(payload)
  showForm.value = false
}

// ---- Confirmação de exclusão ----
const confirmDeleteId = ref(null)
const confirmDeleteName = ref('')
function askDelete(person) {
  confirmDeleteId.value = person.id
  confirmDeleteName.value = person.name
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
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Participantes</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ store.list.length }} jovens no Projeto Kwanza</p>
      </div>
      <button
        type="button"
        class="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        @click="openCreate"
      >
        <UserPlus class="w-4 h-4" /> Novo participante
      </button>
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
      <div class="relative flex-1">
        <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          v-model="search"
          type="text"
          placeholder="Pesquisar por nome ou e-mail..."
          class="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <button
        type="button"
        class="flex items-center justify-between gap-2 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 sm:w-48"
      >
        Todos os status <ChevronDown class="w-4 h-4" />
      </button>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-xs text-slate-400 uppercase border-b border-slate-100 dark:border-slate-700">
            <th class="px-5 py-3 font-semibold">Participante</th>
            <th class="px-5 py-3 font-semibold">Telefone</th>
            <th class="px-5 py-3 font-semibold">Status</th>
            <th class="px-5 py-3 font-semibold">Nível</th>
            <th class="px-5 py-3 font-semibold">Pontos</th>
            <th class="px-5 py-3 font-semibold">Frequência</th>
            <th class="px-5 py-3 font-semibold text-right">Ações</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
          <tr v-for="person in paged" :key="person.id">
            <td class="px-5 py-3">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-semibold shrink-0">
                  {{ person.initials }}
                </div>
                <div class="min-w-0">
                  <p class="font-semibold text-slate-800 dark:text-slate-100 truncate">{{ person.name }}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 truncate">{{ emailFor(person.name) }}</p>
                </div>
              </div>
            </td>
            <td class="px-5 py-3 text-slate-600 dark:text-slate-300 whitespace-nowrap">{{ person.phone }}</td>
            <td class="px-5 py-3"><StatusBadge :status="person.status" /></td>
            <td class="px-5 py-3">
              <span class="text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">Nv {{ person.level }}</span>
            </td>
            <td class="px-5 py-3 font-semibold text-slate-800 dark:text-slate-100">{{ person.score }}</td>
            <td class="px-5 py-3">
              <div class="flex items-center gap-2 min-w-[120px]">
                <div class="h-1.5 flex-1 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div class="h-full bg-brand-600 rounded-full" :style="{ width: person.attendance + '%' }" />
                </div>
                <span class="text-xs text-slate-500 dark:text-slate-400 w-9 text-right">{{ person.attendance }}%</span>
              </div>
            </td>
            <td class="px-5 py-3">
              <div class="flex items-center justify-end gap-3 text-slate-400">
                <button type="button" class="hover:text-brand-600" @click="openView(person)"><Eye class="w-4 h-4" /></button>
                <button type="button" class="hover:text-brand-600" @click="openEdit(person)"><Pencil class="w-4 h-4" /></button>
                <button type="button" class="hover:text-red-500" @click="askDelete(person)"><Trash2 class="w-4 h-4" /></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-between text-sm">
      <span class="text-slate-500 dark:text-slate-400">Página {{ page }} de {{ totalPages }}</span>
      <div class="flex gap-2">
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 disabled:opacity-40"
          :disabled="page === 1"
          @click="goPrev"
        >Anterior</button>
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 disabled:opacity-40"
          :disabled="page === totalPages"
          @click="goNext"
        >Próxima</button>
      </div>
    </div>

    <Modal
      v-if="showForm"
      :title="viewOnly ? 'Detalhes do participante' : editingId ? 'Editar participante' : 'Novo participante'"
      @close="showForm = false"
    >
      <form class="space-y-3" @submit.prevent="submitForm">
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Nome completo</label>
          <input v-model="form.name" :disabled="viewOnly" required type="text" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-brand-200" />
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Telefone</label>
          <input v-model="form.phone" :disabled="viewOnly" type="text" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-brand-200" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Status</label>
            <select v-model="form.status" :disabled="viewOnly" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60">
              <option>Ativo</option>
              <option>Inativo</option>
              <option>Pendente</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Nível</label>
            <input v-model="form.level" :disabled="viewOnly" type="number" min="1" max="6" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Pontos</label>
            <input v-model="form.score" :disabled="viewOnly" type="number" min="0" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60" />
          </div>
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Frequência (%)</label>
            <input v-model="form.attendance" :disabled="viewOnly" type="number" min="0" max="100" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60" />
          </div>
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button type="button" class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300" @click="showForm = false">
            {{ viewOnly ? 'Fechar' : 'Cancelar' }}
          </button>
          <button v-if="!viewOnly" type="submit" class="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold">
            {{ editingId ? 'Salvar alterações' : 'Criar participante' }}
          </button>
        </div>
      </form>
    </Modal>

    <ConfirmDialog
      v-if="confirmDeleteId"
      :message="`Tem certeza que deseja excluir ${confirmDeleteName}? Essa ação não pode ser desfeita.`"
      @confirm="confirmDelete"
      @cancel="confirmDeleteId = null"
    />
  </div>
</template>
