<template>
  <div class="page">
    <div class="header">
      <div>
        <h1 class="title">Cursos</h1>
        <p class="subtitle">Trilhas de aprendizado e desenvolvimento</p>
      </div>
      <button type="button" class="new-button" @click="openCreate">
        <plus class="new-icon" /> Novo curso
      </button>
    </div>

    <div class="grid">
      <cartao-curso
        v-for="course in store.list"
        :key="course.id"
        :course="course"
        editable
        @edit="openEdit(course)"
        @delete="askDelete(course)"
      />
    </div>

    <formulario-curso-modal
      v-if="showForm"
      :editing-id="editingId"
      :form="form"
      @fechar="showForm = false"
      @salvar="submitForm"
    />

    <dialogo-confirmacao
      v-if="confirmDeleteId"
      :message="`Tem certeza que deseja excluir o curso ${confirmDeleteTitle}?`"
      @confirm="confirmDelete"
      @cancel="confirmDeleteId = null"
    />
  </div>
</template>

<script lang="ts">
import { Plus } from 'lucide-vue-next'
import { Component, Vue } from 'vue-facing-decorator'
import { useCursosStore } from '@/stores/cursos'
import CartaoCurso from '@/components/cartaocurso/CartaoCurso.vue'
import DialogoConfirmacao from '@/components/dialogoconfirmacao/DialogoConfirmacao.vue'
import FormularioCursoModal from '@/views/cursos/modal/FormularioCursoModal.vue'

const emptyForm = () => ({
  title: '',
  category: '',
  description: '',
  teacher: '',
  hours: 10,
  status: 'not_started',
  progress: 0,
})

@Component({
  components: { CartaoCurso, DialogoConfirmacao, FormularioCursoModal, Plus },
})
export default class CursosView extends Vue {
  // public
  public showForm = false
  // public
  public editingId: number | string | null = null
  // public
  public form = emptyForm()
  // public
  public confirmDeleteId: number | string | null = null
  // public
  public confirmDeleteTitle = ''

  // public
  public store = useCursosStore()

  // public
  public openCreate() {
    this.editingId = null
    Object.assign(this.form, emptyForm())
    this.showForm = true
  }

  // public
  public openEdit(course: any) {
    this.editingId = course.id
    Object.assign(this.form, { ...course })
    this.showForm = true
  }

  // public
  public submitForm() {
    const payload = {
      ...this.form,
      hours: Number(this.form.hours),
      progress: Number(this.form.progress),
    }
    if (this.editingId) this.store.update(this.editingId, payload)
    else this.store.add(payload)
    this.showForm = false
  }

  // public
  public askDelete(course: any) {
    this.confirmDeleteId = course.id
    this.confirmDeleteTitle = course.title
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

.header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
@media (min-width: 640px) {
  .header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
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

.new-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--accent);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease;
}
.new-button:hover {
  background-color: var(--accent-hover);
}

.new-icon {
  width: 1rem;
  height: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
}
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 1280px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
