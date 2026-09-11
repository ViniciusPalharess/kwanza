<script setup>
import { ref, reactive } from 'vue'
import { Plus } from 'lucide-vue-next'
import { useCoursesStore } from '@/stores/courses'
import CourseCard from '@/components/CourseCard.vue'
import Modal from '@/components/ui/Modal.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'

const store = useCoursesStore()

const showForm = ref(false)
const editingId = ref(null)
const form = reactive({
  title: '', category: '', description: '', teacher: '', hours: 10, status: 'not_started', progress: 0,
})

function openCreate() {
  editingId.value = null
  Object.assign(form, { title: '', category: '', description: '', teacher: '', hours: 10, status: 'not_started', progress: 0 })
  showForm.value = true
}
function openEdit(course) {
  editingId.value = course.id
  Object.assign(form, { ...course })
  showForm.value = true
}
function submitForm() {
  const payload = { ...form, hours: Number(form.hours), progress: Number(form.progress) }
  if (editingId.value) store.update(editingId.value, payload)
  else store.add(payload)
  showForm.value = false
}

const confirmDeleteId = ref(null)
const confirmDeleteTitle = ref('')
function askDelete(course) {
  confirmDeleteId.value = course.id
  confirmDeleteTitle.value = course.title
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
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Cursos</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">Trilhas de aprendizado e desenvolvimento</p>
      </div>
      <button
        type="button"
        class="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        @click="openCreate"
      >
        <Plus class="w-4 h-4" /> Novo curso
      </button>
    </div>

    <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <CourseCard
        v-for="course in store.list"
        :key="course.id"
        :course="course"
        editable
        @edit="openEdit(course)"
        @delete="askDelete(course)"
      />
    </div>

    <Modal v-if="showForm" :title="editingId ? 'Editar curso' : 'Novo curso'" @close="showForm = false">
      <form class="space-y-3" @submit.prevent="submitForm">
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Título</label>
          <input v-model="form.title" required type="text" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Categoria</label>
            <input v-model="form.category" required type="text" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
          </div>
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Carga horária (h)</label>
            <input v-model="form.hours" type="number" min="1" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
          </div>
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Professor(a)</label>
          <input v-model="form.teacher" required type="text" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Descrição</label>
          <textarea v-model="form.description" rows="2" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Status</label>
            <select v-model="form.status" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2">
              <option value="not_started">Não iniciado</option>
              <option value="in_progress">Em andamento</option>
              <option value="completed">Concluído</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Progresso (%)</label>
            <input v-model="form.progress" type="number" min="0" max="100" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
          </div>
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button type="button" class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300" @click="showForm = false">Cancelar</button>
          <button type="submit" class="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold">
            {{ editingId ? 'Salvar alterações' : 'Criar curso' }}
          </button>
        </div>
      </form>
    </Modal>

    <ConfirmDialog
      v-if="confirmDeleteId"
      :message="`Tem certeza que deseja excluir o curso ${confirmDeleteTitle}?`"
      @confirm="confirmDelete"
      @cancel="confirmDeleteId = null"
    />
  </div>
</template>
