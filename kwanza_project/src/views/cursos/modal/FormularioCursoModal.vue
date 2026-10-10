<template>
  <modal :title="editingId ? 'Editar curso' : 'Novo curso'" @close="$emit('fechar')">
    <form class="form" @submit.prevent="$emit('salvar')">
      <div class="field">
        <label class="label">Título</label>
        <input v-model="form.title" required type="text" class="input" />
      </div>
      <div class="field-row">
        <div class="field">
          <label class="label">Categoria</label>
          <input v-model="form.category" required type="text" class="input" />
        </div>
        <div class="field">
          <label class="label">Carga horária (h)</label>
          <input v-model="form.hours" type="number" min="1" class="input" />
        </div>
      </div>
      <div class="field">
        <label class="label">Professor(a)</label>
        <input v-model="form.teacher" required type="text" class="input" />
      </div>
      <div class="field">
        <label class="label">Descrição</label>
        <textarea v-model="form.description" rows="2" class="input" />
      </div>
      <div class="field-row">
        <div class="field">
          <label class="label">Status</label>
          <select v-model="form.status" class="input">
            <option value="not_started">Não iniciado</option>
            <option value="in_progress">Em andamento</option>
            <option value="completed">Concluído</option>
          </select>
        </div>
        <div class="field">
          <label class="label">Progresso (%)</label>
          <input v-model="form.progress" type="number" min="0" max="100" class="input" />
        </div>
      </div>
      <div class="actions">
        <button type="button" class="button-secondary" @click="$emit('fechar')">Cancelar</button>
        <button type="submit" class="button-primary">
          {{ editingId ? 'Salvar alterações' : 'Criar curso' }}
        </button>
      </div>
    </form>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Modal from '@/components/modal/Modal.vue'

@Component({
  components: { Modal },
  emits: ['salvar', 'fechar'],
})
export default class FormularioCursoModal extends Vue {
  // public
  @Prop({ type: [Number, String], default: null })
  public editingId!: number | string | null
  // public
  @Prop({ type: Object, required: true })
  public form!: {
    title: string
    category: string
    description: string
    teacher: string
    hours: number
    status: string
    progress: number
  }
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.field-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
  display: block;
  margin-bottom: 0.25rem;
  color: var(--text-secondary);
}

.input {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: var(--input-bg);
  color: var(--text-primary);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding-top: 0.5rem;
}

.button-secondary {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.button-primary {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: var(--accent);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
}
.button-primary:hover {
  background-color: var(--accent-hover);
}
</style>
