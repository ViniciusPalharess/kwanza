<template>
  <modal :title="editingLevelId ? 'Editar nível' : 'Adicionar nível'" @close="$emit('fechar')">
    <form class="form" @submit.prevent="$emit('salvar')">
      <div>
        <label class="label">Nome do nível</label>
        <input
          v-model="form.name"
          required
          type="text"
          placeholder="Nível 7 · Firmamento"
          class="input"
        />
      </div>
      <div>
        <label class="label">XP mínimo</label>
        <input v-model="form.xp" type="number" min="0" class="input" />
      </div>
      <div class="actions">
        <button type="button" class="button-secondary" @click="$emit('fechar')">Cancelar</button>
        <button type="submit" class="button-primary">
          {{ editingLevelId ? 'Salvar' : 'Adicionar' }}
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
export default class FormularioNivelModal extends Vue {
  // public
  @Prop({ type: [Number, String], default: null })
  public editingLevelId!: number | string | null
  // public
  @Prop({ type: Object, required: true })
  public form!: { name: string; xp: number }
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
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
