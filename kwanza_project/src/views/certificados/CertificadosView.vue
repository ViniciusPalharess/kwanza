<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Certificados</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Emissão e acompanhamento de certificados
      </p>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <CartaoEstatistica
        label="Emitidos"
        :value="certificateStats.issued"
        :icon="FileCheck"
        icon-bg="bg-emerald-50 dark:bg-emerald-500/10"
        icon-color="text-emerald-600"
      />
      <CartaoEstatistica label="Elegíveis" :value="certificateStats.eligible" :icon="Star" />
      <CartaoEstatistica
        label="Este mês"
        :value="certificateStats.thisMonth"
        :icon="CalendarDays"
      />
      <CartaoEstatistica
        label="Carga média"
        :value="`${certificateStats.avgHours}h`"
        :icon="Clock3"
      />
    </div>

    <div
      class="rounded-2xl p-8 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900 text-white text-center relative overflow-hidden"
    >
      <Award class="w-10 h-10 mx-auto mb-3 text-amber-300" />
      <h2 class="text-xl font-bold">Certificado de Conclusão</h2>
      <p class="text-brand-100 text-sm mb-4">Kenia Club · Projeto Kwanza</p>
      <p class="text-brand-50 max-w-lg mx-auto">
        Certificamos que <strong>{{ featuredCertificate.participant }}</strong> concluiu com êxito o
        curso <strong>{{ featuredCertificate.course }}</strong
        >, com carga horária de {{ featuredCertificate.hours }} horas.
      </p>
      <div class="flex justify-center gap-3 mt-6">
        <button
          type="button"
          class="flex items-center gap-2 bg-white text-brand-700 font-semibold px-4 py-2 rounded-lg text-sm"
          @click="printCertificate"
        >
          <Download class="w-4 h-4" /> Download PDF
        </button>
        <button
          type="button"
          class="flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-4 py-2 rounded-lg text-sm"
          @click="printCertificate"
        >
          <Eye class="w-4 h-4" /> Visualizar
        </button>
      </div>
    </div>

    <ListaCertificadosView
      :certificados="store.list"
      @criar="openCreate"
      @visualizar="openView"
      @editar="openEdit"
      @excluir="askDelete"
    />

    <FormularioCertificadoModal
      v-if="showForm"
      :view-only="viewOnly"
      :editing-id="editingId"
      :form="form"
      :participant-names="participantsStore.participants.map((p) => p.name)"
      :course-titles="coursesStore.list.map((c) => c.title)"
      @fechar="showForm = false"
      @salvar="submitForm"
    />

    <DialogoConfirmacao
      v-if="confirmDeleteId"
      message="Tem certeza que deseja excluir este certificado?"
      @confirm="confirmDelete"
      @cancel="confirmDeleteId = null"
    />
  </div>
</template>

<script lang="ts">
import { Award, Download, Eye, FileCheck, Star, CalendarDays, Clock3 } from 'lucide-vue-next'
import { Component, Vue } from 'vue-facing-decorator'
import { certificateStats, featuredCertificate } from '@/data/dadosSimulados'
import { useCertificadosStore } from '@/stores/certificados'
import { usePessoasStore } from '@/stores/pessoas'
import { useCursosStore } from '@/stores/cursos'
import CartaoEstatistica from '@/components/cartaoestatistica/CartaoEstatistica.vue'
import DialogoConfirmacao from '@/components/dialogoconfirmacao/DialogoConfirmacao.vue'
import ListaCertificadosView from '@/views/certificados/views/ListaCertificadosView.vue'
import FormularioCertificadoModal from '@/views/certificados/modal/FormularioCertificadoModal.vue'

const emptyForm = () => ({ name: '', course: '', hours: 10, status: 'Emitido', date: '' })

function todayLabel() {
  const d = new Date()
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

@Component({
  components: {
    CartaoEstatistica,
    DialogoConfirmacao,
    ListaCertificadosView,
    FormularioCertificadoModal,
    Award,
    Download,
    Eye,
    FileCheck,
    Star,
    CalendarDays,
    Clock3,
  },
})
export default class CertificadosView extends Vue {
  // public
  public certificateStats = certificateStats
  // public
  public featuredCertificate = featuredCertificate
  // public
  public showForm = false
  // public
  public viewOnly = false
  // public
  public editingId: number | string | null = null
  // public
  public form = emptyForm()
  // public
  public confirmDeleteId: number | string | null = null

  // public
  public store = useCertificadosStore()
  // public
  public participantsStore = usePessoasStore()
  // public
  public coursesStore = useCursosStore()

  // public
  public printCertificate() {
    window.print()
  }

  // public
  public openCreate() {
    this.editingId = null
    this.viewOnly = false
    Object.assign(this.form, { ...emptyForm(), date: todayLabel() })
    this.showForm = true
  }

  // public
  public openEdit(cert: any) {
    this.editingId = cert.id
    this.viewOnly = false
    Object.assign(this.form, {
      name: cert.name,
      course: cert.course,
      hours: cert.hours,
      status: cert.status,
      date: cert.date || '',
    })
    this.showForm = true
  }

  // public
  public openView(cert: any) {
    this.editingId = cert.id
    this.viewOnly = true
    Object.assign(this.form, {
      name: cert.name,
      course: cert.course,
      hours: cert.hours,
      status: cert.status,
      date: cert.date || '',
    })
    this.showForm = true
  }

  // public
  public submitForm() {
    const payload = { ...this.form, hours: Number(this.form.hours), date: this.form.date || null }
    if (this.editingId) this.store.update(this.editingId, payload)
    else this.store.add(payload)
    this.showForm = false
  }

  // public
  public askDelete(cert: any) {
    this.confirmDeleteId = cert.id
  }

  // public
  public confirmDelete() {
    this.store.remove(this.confirmDeleteId)
    this.confirmDeleteId = null
  }
}
</script>

<style></style>
