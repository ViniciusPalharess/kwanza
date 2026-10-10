<template>
  <div class="page">
    <div>
      <h1 class="title">Certificados</h1>
      <p class="subtitle">Emissão e acompanhamento de certificados</p>
    </div>

    <div class="stats-grid">
      <cartao-estatistica
        label="Emitidos"
        :value="certificateStats.issued"
        :icon="FileCheck"
        variant="emerald"
      />
      <cartao-estatistica label="Elegíveis" :value="certificateStats.eligible" :icon="Star" />
      <cartao-estatistica
        label="Este mês"
        :value="certificateStats.thisMonth"
        :icon="CalendarDays"
      />
      <cartao-estatistica
        label="Carga média"
        :value="`${certificateStats.avgHours}h`"
        :icon="Clock3"
      />
    </div>

    <div class="featured">
      <award class="featured-icon" />
      <h2 class="featured-title">Certificado de Conclusão</h2>
      <p class="featured-subtitle">Kenia Club · Projeto Kwanza</p>
      <p class="featured-text">
        Certificamos que <strong>{{ featuredCertificate.participant }}</strong> concluiu com êxito o
        curso <strong>{{ featuredCertificate.course }}</strong
        >, com carga horária de {{ featuredCertificate.hours }} horas.
      </p>
      <div class="featured-actions">
        <button
          type="button"
          class="featured-button featured-button--light"
          @click="printCertificate"
        >
          <download class="featured-button-icon" /> Download PDF
        </button>
        <button
          type="button"
          class="featured-button featured-button--outline"
          @click="printCertificate"
        >
          <eye class="featured-button-icon" /> Visualizar
        </button>
      </div>
    </div>

    <lista-certificados-view
      :certificados="store.list"
      @criar="openCreate"
      @visualizar="openView"
      @editar="openEdit"
      @excluir="askDelete"
    />

    <formulario-certificado-modal
      v-if="showForm"
      :view-only="viewOnly"
      :editing-id="editingId"
      :form="form"
      :participant-names="participantsStore.participants.map((p) => p.name)"
      :course-titles="coursesStore.list.map((c) => c.title)"
      @fechar="showForm = false"
      @salvar="submitForm"
    />

    <dialogo-confirmacao
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

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.subtitle {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.featured {
  border-radius: 1rem;
  padding: 2rem;
  background: linear-gradient(
    to bottom right,
    var(--color-brand-700),
    var(--color-brand-600),
    var(--color-brand-900)
  );
  color: #fff;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.featured-icon {
  width: 2.5rem;
  height: 2.5rem;
  margin: 0 auto 0.75rem;
  color: var(--color-amber-300);
}

.featured-title {
  font-size: 1.25rem;
  font-weight: 700;
}

.featured-subtitle {
  color: var(--color-brand-100);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.featured-text {
  color: var(--color-brand-50);
  max-width: 32rem;
  margin: 0 auto;
}

.featured-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.featured-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

.featured-button--light {
  background-color: #fff;
  color: var(--color-brand-700);
}

.featured-button--outline {
  background-color: rgb(255 255 255 / 0.1);
  border: 1px solid rgb(255 255 255 / 0.3);
  color: #fff;
}

.featured-button-icon {
  width: 1rem;
  height: 1rem;
}
</style>
