<script setup>
import { ref, reactive } from 'vue'
import { Award, Download, Eye, Plus, FileCheck, Star, CalendarDays, Clock3, Pencil, Trash2 } from 'lucide-vue-next'
import { certificateStats, featuredCertificate } from '@/data/mockData'
import { useCertificatesStore } from '@/stores/certificates'
import { useParticipantsStore } from '@/stores/participants'
import { useCoursesStore } from '@/stores/courses'
import StatCard from '@/components/StatCard.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import Modal from '@/components/ui/Modal.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'

const store = useCertificatesStore()
const participantsStore = useParticipantsStore()
const coursesStore = useCoursesStore()

function todayLabel() {
  const d = new Date()
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}
function printCertificate() {
  window.print()
}

const showForm = ref(false)
const viewOnly = ref(false)
const editingId = ref(null)
const form = reactive({ name: '', course: '', hours: 10, status: 'Emitido', date: '' })

function openCreate() {
  editingId.value = null
  viewOnly.value = false
  Object.assign(form, { name: '', course: '', hours: 10, status: 'Emitido', date: todayLabel() })
  showForm.value = true
}
function openEdit(cert) {
  editingId.value = cert.id
  viewOnly.value = false
  Object.assign(form, { name: cert.name, course: cert.course, hours: cert.hours, status: cert.status, date: cert.date || '' })
  showForm.value = true
}
function openView(cert) {
  editingId.value = cert.id
  viewOnly.value = true
  Object.assign(form, { name: cert.name, course: cert.course, hours: cert.hours, status: cert.status, date: cert.date || '' })
  showForm.value = true
}
function submitForm() {
  const payload = { ...form, hours: Number(form.hours), date: form.date || null }
  if (editingId.value) store.update(editingId.value, payload)
  else store.add(payload)
  showForm.value = false
}

const confirmDeleteId = ref(null)
function askDelete(cert) {
  confirmDeleteId.value = cert.id
}
function confirmDelete() {
  store.remove(confirmDeleteId.value)
  confirmDeleteId.value = null
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Certificados</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">Emissão e acompanhamento de certificados</p>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Emitidos" :value="certificateStats.issued" :icon="FileCheck" icon-bg="bg-emerald-50 dark:bg-emerald-500/10" icon-color="text-emerald-600" />
      <StatCard label="Elegíveis" :value="certificateStats.eligible" :icon="Star" />
      <StatCard label="Este mês" :value="certificateStats.thisMonth" :icon="CalendarDays" />
      <StatCard label="Carga média" :value="`${certificateStats.avgHours}h`" :icon="Clock3" />
    </div>

    <div class="rounded-2xl p-8 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900 text-white text-center relative overflow-hidden">
      <Award class="w-10 h-10 mx-auto mb-3 text-amber-300" />
      <h2 class="text-xl font-bold">Certificado de Conclusão</h2>
      <p class="text-brand-100 text-sm mb-4">Kenia Club · Projeto Kwanza</p>
      <p class="text-brand-50 max-w-lg mx-auto">
        Certificamos que <strong>{{ featuredCertificate.participant }}</strong> concluiu com êxito o curso
        <strong>{{ featuredCertificate.course }}</strong>, com carga horária de {{ featuredCertificate.hours }} horas.
      </p>
      <div class="flex justify-center gap-3 mt-6">
        <button type="button" class="flex items-center gap-2 bg-white text-brand-700 font-semibold px-4 py-2 rounded-lg text-sm" @click="printCertificate">
          <Download class="w-4 h-4" /> Download PDF
        </button>
        <button type="button" class="flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-4 py-2 rounded-lg text-sm" @click="printCertificate">
          <Eye class="w-4 h-4" /> Visualizar
        </button>
      </div>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
      <div class="flex items-center justify-between px-5 pt-5">
        <h2 class="font-bold text-lg text-slate-900 dark:text-white">Todos os certificados</h2>
        <button type="button" class="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition" @click="openCreate">
          <Plus class="w-4 h-4" /> Emitir
        </button>
      </div>

      <div class="overflow-x-auto mt-3">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-slate-400 uppercase border-y border-slate-100 dark:border-slate-700">
              <th class="px-5 py-3 font-semibold">Participante</th>
              <th class="px-5 py-3 font-semibold">Curso</th>
              <th class="px-5 py-3 font-semibold">Carga</th>
              <th class="px-5 py-3 font-semibold">Data</th>
              <th class="px-5 py-3 font-semibold">Status</th>
              <th class="px-5 py-3 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr v-for="cert in store.list" :key="cert.id">
              <td class="px-5 py-3 font-semibold text-slate-800 dark:text-slate-100">{{ cert.name }}</td>
              <td class="px-5 py-3 text-brand-600 dark:text-brand-400">{{ cert.course }}</td>
              <td class="px-5 py-3 text-slate-600 dark:text-slate-300">{{ cert.hours }}h</td>
              <td class="px-5 py-3 text-slate-500 dark:text-slate-400">{{ cert.date ?? '—' }}</td>
              <td class="px-5 py-3"><StatusBadge :status="cert.status" /></td>
              <td class="px-5 py-3">
                <div class="flex items-center justify-end gap-3 text-slate-400">
                  <button type="button" class="hover:text-brand-600" @click="openView(cert)"><Eye class="w-4 h-4" /></button>
                  <button type="button" class="hover:text-brand-600" @click="openEdit(cert)"><Pencil class="w-4 h-4" /></button>
                  <button type="button" class="hover:text-red-500" @click="askDelete(cert)"><Trash2 class="w-4 h-4" /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Modal
      v-if="showForm"
      :title="viewOnly ? 'Detalhes do certificado' : editingId ? 'Editar certificado' : 'Emitir certificado'"
      @close="showForm = false"
    >
      <form class="space-y-3" @submit.prevent="submitForm">
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Participante</label>
          <input v-model="form.name" :disabled="viewOnly" required list="cert-participant-options" type="text" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60" />
          <datalist id="cert-participant-options">
            <option v-for="p in participantsStore.participants" :key="p.id" :value="p.name" />
          </datalist>
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Curso</label>
          <input v-model="form.course" :disabled="viewOnly" required list="cert-course-options" type="text" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60" />
          <datalist id="cert-course-options">
            <option v-for="c in coursesStore.list" :key="c.id" :value="c.title" />
          </datalist>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Carga (h)</label>
            <input v-model="form.hours" :disabled="viewOnly" type="number" min="1" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60" />
          </div>
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Status</label>
            <select v-model="form.status" :disabled="viewOnly" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60">
              <option>Emitido</option>
              <option>Elegível</option>
              <option>Pendente</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button type="button" class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300" @click="showForm = false">
            {{ viewOnly ? 'Fechar' : 'Cancelar' }}
          </button>
          <button v-if="!viewOnly" type="submit" class="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold">
            {{ editingId ? 'Salvar alterações' : 'Emitir certificado' }}
          </button>
        </div>
      </form>
    </Modal>

    <ConfirmDialog
      v-if="confirmDeleteId"
      message="Tem certeza que deseja excluir este certificado?"
      @confirm="confirmDelete"
      @cancel="confirmDeleteId = null"
    />
  </div>
</template>
