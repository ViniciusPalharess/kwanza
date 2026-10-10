<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Cursos</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Trilhas de aprendizado e desenvolvimento
        </p>
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
      <CartaoCurso
        v-for="course in store.list"
        :key="course.id"
        :course="course"
        editable
        @edit="openEdit(course)"
        @delete="askDelete(course)"
      />
    </div>

    <FormularioCursoModal
      v-if="showForm"
      :editing-id="editingId"
      :form="form"
      @fechar="showForm = false"
      @salvar="submitForm"
    />

    <DialogoConfirmacao
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

<style></style>
