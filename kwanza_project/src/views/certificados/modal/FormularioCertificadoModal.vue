<template>
  <modal
    :title="
      viewOnly ? 'Detalhes do certificado' : editingId ? 'Editar certificado' : 'Emitir certificado'
    "
    @close="$emit('fechar')"
  >
    <form class="form" @submit.prevent="$emit('salvar')">
      <div class="field">
        <label class="label">Participante</label>
        <input
          v-model="form.name"
          :disabled="viewOnly"
          required
          list="cert-participant-options"
          type="text"
          class="input"
        />
        <datalist id="cert-participant-options">
          <option v-for="name in participantNames" :key="name" :value="name" />
        </datalist>
      </div>
      <div class="field">
        <label class="label">Curso</label>
        <input
          v-model="form.course"
          :disabled="viewOnly"
          required
          list="cert-course-options"
          type="text"
          class="input"
        />
        <datalist id="cert-course-options">
          <option v-for="title in courseTitles" :key="title" :value="title" />
        </datalist>
      </div>
      <div class="field-row">
        <div class="field">
          <label class="label">Carga (h)</label>
          <input v-model="form.hours" :disabled="viewOnly" type="number" min="1" class="input" />
        </div>
        <div class="field">
          <label class="label">Status</label>
          <select v-model="form.status" :disabled="viewOnly" class="input">
            <option>Emitido</option>
            <option>Elegível</option>
            <option>Pendente</option>
          </select>
        </div>
      </div>
      <div class="actions">
        <button type="button" class="button-secondary" @click="$emit('fechar')">
          {{ viewOnly ? 'Fechar' : 'Cancelar' }}
        </button>
        <button v-if="!viewOnly" type="submit" class="button-primary">
          {{ editingId ? 'Salvar alterações' : 'Emitir certificado' }}
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
export default class FormularioCertificadoModal extends Vue {
  // public
  @Prop({ type: Boolean, default: false })
  public viewOnly!: boolean
  // public
  @Prop({ type: [Number, String], default: null })
  public editingId!: number | string | null
  // public
  @Prop({ type: Object, required: true })
  public form!: { name: string; course: string; hours: number; status: string; date: string }
  // public
  @Prop({ type: Array, required: true })
  public participantNames!: string[]
  // public
  @Prop({ type: Array, required: true })
  public courseTitles!: string[]
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
.input:disabled {
  opacity: 0.6;
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
