<script setup>
import { ref, reactive, computed } from 'vue'
import { UserPlus, Search, Pencil, Trash2, Camera } from 'lucide-vue-next'
import { emailFor } from '@/data/mockData'
import { useParticipantsStore } from '@/stores/participants'
import Modal from '@/components/ui/Modal.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'
import defaultAvatar from '@/assets/images/default-avatar.png'

const store = useParticipantsStore()

const roleOptions = ['Participante', 'Administrador', 'Professor']
const roleBadgeClass = {
  Participante: 'bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300',
  Administrador: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600',
  Professor: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600',
}

const search = ref('')
const roleFilter = ref('Todos')
const page = ref(1)
const pageSize = 8

const tabs = computed(() => [
  { label: 'Todos', count: store.list.length },
  ...roleOptions.map((role) => ({ label: role, count: store.list.filter((p) => p.role === role).length })),
])

const filtered = computed(() =>
  store.list
    .filter((p) => roleFilter.value === 'Todos' || p.role === roleFilter.value)
    .filter((p) => p.name.toLowerCase().includes(search.value.toLowerCase())),
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
const form = reactive({ name: '', phone: '', role: 'Participante', level: 1, score: 0, attendance: 0, avatarUrl: '' })
const fileInput = ref(null)

function openCreate() {
  editingId.value = null
  viewOnly.value = false
  Object.assign(form, { name: '', phone: '', role: 'Participante', level: 1, score: 0, attendance: 0, avatarUrl: '' })
  showForm.value = true
}
function openEdit(person) {
  editingId.value = person.id
  viewOnly.value = false
  Object.assign(form, {
    name: person.name,
    phone: person.phone,
    role: person.role,
    level: person.level,
    score: person.score,
    attendance: person.attendance,
    avatarUrl: person.avatarUrl || '',
  })
  showForm.value = true
}
function openView(person) {
  editingId.value = person.id
  viewOnly.value = true
  Object.assign(form, {
    name: person.name,
    phone: person.phone,
    role: person.role,
    level: person.level,
    score: person.score,
    attendance: person.attendance,
    avatarUrl: person.avatarUrl || '',
  })
  showForm.value = true
}
function submitForm() {
  const payload = {
    name: form.name,
    phone: form.phone,
    role: form.role,
    level: Number(form.level),
    score: Number(form.score),
    attendance: Number(form.attendance),
    avatarUrl: form.avatarUrl,
  }
  if (editingId.value) store.update(editingId.value, payload)
  else store.add(payload)
  showForm.value = false
}

function openFilePicker() {
  fileInput.value?.click()
}
function handleFileChange(event) {
  const file = event.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    form.avatarUrl = reader.result
  }
  reader.readAsDataURL(file)
}
function removePhoto() {
  form.avatarUrl = ''
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
    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Pessoas</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">{{ store.list.length }} pessoas no Projeto Kwanza</p>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 space-y-4">
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            v-model="search"
            type="text"
            placeholder="Pesquisar por nome ou e-mail..."
            class="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <button
          type="button"
          class="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition shrink-0"
          @click="openCreate"
        >
          <UserPlus class="w-4 h-4" /> Adicionar pessoa
        </button>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.label"
          type="button"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition"
          :class="
            roleFilter === tab.label
              ? 'bg-brand-600 text-white'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
          "
          @click="roleFilter = tab.label; page = 1"
        >
          {{ tab.label }}
          <span
            class="text-xs px-1.5 rounded-full"
            :class="roleFilter === tab.label ? 'bg-white/20' : 'bg-white dark:bg-slate-800'"
          >{{ tab.count }}</span>
        </button>
      </div>

      <div class="space-y-3">
        <div class="hidden md:grid grid-cols-[minmax(0,1fr)_120px_110px_80px_90px_160px_90px] gap-2 px-5 text-xs font-semibold text-slate-400 uppercase">
          <span>Pessoa</span>
          <span>Tipo</span>
          <span>Telefone</span>
          <span>Nível</span>
          <span>Pontos</span>
          <span>Frequência</span>
          <span class="text-right">Ações</span>
        </div>

        <div
          v-for="person in paged"
          :key="person.id"
          class="grid grid-cols-2 md:grid-cols-[minmax(0,1fr)_120px_110px_80px_90px_160px_90px] items-center gap-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 px-5 py-3.5 cursor-pointer hover:border-brand-200 dark:hover:border-brand-500/40 transition"
          @click="openView(person)"
        >
          <div class="col-span-2 md:col-span-1 flex items-center gap-3 min-w-0">
            <img
              :src="person.avatarUrl || defaultAvatar"
              alt="Foto de perfil"
              class="w-9 h-9 rounded-full object-cover shrink-0"
            />
            <div class="min-w-0">
              <p class="font-semibold text-slate-800 dark:text-slate-100 truncate">{{ person.name }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400 truncate">{{ emailFor(person.name) }}</p>
            </div>
          </div>
          <span>
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full" :class="roleBadgeClass[person.role]">{{ person.role }}</span>
          </span>
          <span class="text-slate-600 dark:text-slate-300 text-sm whitespace-nowrap">{{ person.phone || '—' }}</span>
          <span>
            <span v-if="person.role === 'Participante'" class="text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">Nv {{ person.level }}</span>
            <span v-else class="text-slate-400">—</span>
          </span>
          <span class="font-semibold text-slate-800 dark:text-slate-100">{{ person.role === 'Participante' ? person.score : '—' }}</span>
          <div v-if="person.role === 'Participante'" class="flex items-center gap-2">
            <div class="h-1.5 flex-1 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
              <div class="h-full bg-brand-600 rounded-full" :style="{ width: person.attendance + '%' }" />
            </div>
            <span class="text-xs text-slate-500 dark:text-slate-400 w-9 text-right">{{ person.attendance }}%</span>
          </div>
          <span v-else class="text-slate-400">—</span>
          <div class="flex items-center justify-end gap-3 text-slate-400">
            <button type="button" class="hover:text-brand-600" @click.stop="openEdit(person)"><Pencil class="w-4 h-4" /></button>
            <button type="button" class="hover:text-red-500" @click.stop="askDelete(person)"><Trash2 class="w-4 h-4" /></button>
          </div>
        </div>
      </div>
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
      :title="viewOnly ? 'Detalhes' : editingId ? 'Editar cadastro' : 'Novo cadastro'"
      @close="showForm = false"
    >
      <div class="flex flex-col items-center mb-4">
        <div class="relative w-20 h-20" :class="!viewOnly && 'group cursor-pointer'" @click="!viewOnly && openFilePicker()">
          <img :src="form.avatarUrl || defaultAvatar" alt="Foto de perfil" class="w-20 h-20 rounded-full object-cover" />
          <div
            v-if="!viewOnly"
            class="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
          >
            <Camera class="w-6 h-6 text-white" />
          </div>
        </div>
        <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileChange" />
        <button v-if="!viewOnly && form.avatarUrl" type="button" class="text-xs text-red-500 mt-2 flex items-center gap-1" @click="removePhoto">
          <Trash2 class="w-3 h-3" /> Remover foto
        </button>
        <p v-else-if="!viewOnly" class="text-xs text-slate-400 mt-2">Clique na foto para adicionar</p>
      </div>

      <form class="space-y-3" @submit.prevent="submitForm">
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Nome completo</label>
          <input v-model="form.name" :disabled="viewOnly" required type="text" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-brand-200" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Tipo</label>
            <select v-model="form.role" :disabled="viewOnly" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60">
              <option v-for="role in roleOptions" :key="role" :value="role">{{ role }}</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Telefone</label>
            <input v-model="form.phone" :disabled="viewOnly" type="text" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-brand-200" />
          </div>
        </div>
        <template v-if="form.role === 'Participante'">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Nível</label>
              <input v-model="form.level" :disabled="viewOnly" type="number" min="1" max="6" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60" />
            </div>
            <div>
              <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Pontos</label>
              <input v-model="form.score" :disabled="viewOnly" type="number" min="0" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60" />
            </div>
          </div>
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Frequência (%)</label>
            <input v-model="form.attendance" :disabled="viewOnly" type="number" min="0" max="100" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60" />
          </div>
        </template>
        <div class="flex justify-end gap-2 pt-2">
          <button type="button" class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300" @click="showForm = false">
            {{ viewOnly ? 'Fechar' : 'Cancelar' }}
          </button>
          <button v-if="!viewOnly" type="submit" class="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold">
            {{ editingId ? 'Salvar alterações' : 'Criar cadastro' }}
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
