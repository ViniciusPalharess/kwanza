<template>
  <modal title="Registrar competência" @close="$emit('fechar')">
    <form class="form" @submit.prevent="$emit('salvar')">
      <div>
        <label class="label">Participante</label>
        <input v-model="form.name" required list="participant-options" type="text" class="input" />
        <datalist id="participant-options">
          <option v-for="name in participantNames" :key="name" :value="name" />
        </datalist>
      </div>
      <div class="field-row">
        <div>
          <label class="label">Competência</label>
          <select v-model="form.competency" class="input">
            <option v-for="name in competencyNames" :key="name" :value="name">{{ name }}</option>
          </select>
        </div>
        <div>
          <label class="label">Data</label>
          <input v-model="form.date" type="text" placeholder="dd/mm/aaaa" class="input" />
        </div>
      </div>
      <div>
        <label class="label">Pontos</label>
        <input v-model="form.points" type="number" min="0" class="input" />
      </div>
      <div>
        <label class="label">Observação</label>
        <textarea v-model="form.description" rows="2" class="input" />
      </div>
      <div class="actions">
        <button type="button" class="button-secondary" @click="$emit('fechar')">Cancelar</button>
        <button type="submit" class="button-primary">Salvar</button>
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
export default class RegistrarCompetenciaModal extends Vue {
  // public
  @Prop({ type: Object, required: true })
  public form!: {
    name: string
    competency: string
    description: string
    points: number
    date: string
  }
  // public
  @Prop({ type: Array, required: true })
  public competencyNames!: string[]
  // public
  @Prop({ type: Array, required: true })
  public participantNames!: string[]
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
