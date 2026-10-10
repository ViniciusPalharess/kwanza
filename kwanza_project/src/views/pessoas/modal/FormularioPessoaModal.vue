<template>
  <modal :title="titulo" @close="$emit('fechar')">
    <div class="avatar-section">
      <div
        class="avatar-wrapper"
        :class="{ 'avatar-wrapper--editable': !viewOnly }"
        @click="!viewOnly && openFilePicker()"
      >
        <img :src="form.avatarUrl || defaultAvatar" alt="Foto de perfil" class="avatar-image" />
        <div v-if="!viewOnly" class="avatar-overlay">
          <camera class="avatar-icon" />
        </div>
      </div>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="file-input"
        @change="handleFileChange"
      />
      <button
        v-if="!viewOnly && form.avatarUrl"
        type="button"
        class="remove-photo"
        @click="form.avatarUrl = ''"
      >
        <trash-2 class="remove-photo-icon" /> Remover foto
      </button>
      <p v-else-if="!viewOnly" class="avatar-hint">Clique na foto para adicionar</p>
    </div>

    <form class="form" @submit.prevent="$emit('salvar')">
      <div class="field">
        <label class="label">Nome completo</label>
        <input v-model="form.name" :disabled="viewOnly" required type="text" class="input" />
      </div>
      <div class="field-row">
        <div class="field">
          <label class="label">Tipo</label>
          <select v-model="form.role" :disabled="viewOnly" class="input">
            <option v-for="role in roleOptions" :key="role" :value="role">{{ role }}</option>
          </select>
        </div>
        <div class="field">
          <label class="label">Telefone</label>
          <input v-model="form.phone" :disabled="viewOnly" type="text" class="input" />
        </div>
      </div>
      <template v-if="form.role === 'Participante'">
        <div class="field-row">
          <div class="field">
            <label class="label">Nível</label>
            <input
              v-model="form.level"
              :disabled="viewOnly"
              type="number"
              min="1"
              max="6"
              class="input"
            />
          </div>
          <div class="field">
            <label class="label">Pontos</label>
            <input v-model="form.score" :disabled="viewOnly" type="number" min="0" class="input" />
          </div>
        </div>
        <div class="field">
          <label class="label">Frequência (%)</label>
          <input
            v-model="form.attendance"
            :disabled="viewOnly"
            type="number"
            min="0"
            max="100"
            class="input"
          />
        </div>
      </template>
      <div class="actions">
        <button type="button" class="button-secondary" @click="$emit('fechar')">
          {{ viewOnly ? 'Fechar' : 'Cancelar' }}
        </button>
        <button v-if="!viewOnly" type="submit" class="button-primary">
          {{ editingId ? 'Salvar alterações' : 'Criar cadastro' }}
        </button>
      </div>
    </form>
  </modal>
</template>

<script lang="ts">
import { Trash2, Camera } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Modal from '@/components/modal/Modal.vue'
import defaultAvatar from '@/assets/images/default-avatar.png'

@Component({
  components: { Modal, Trash2, Camera },
  emits: ['salvar', 'fechar'],
})
export default class FormularioPessoaModal extends Vue {
  // public
  @Prop({ type: Boolean, default: false })
  public viewOnly!: boolean
  // public
  @Prop({ type: [Number, String], default: null })
  public editingId!: number | string | null
  // public
  @Prop({ type: Object, required: true })
  public form!: {
    name: string
    phone: string
    role: string
    level: number
    score: number
    attendance: number
    avatarUrl: string
  }
  // public
  @Prop({ type: Array, required: true })
  public roleOptions!: string[]

  // public
  public defaultAvatar = defaultAvatar

  // public
  public get titulo() {
    return this.viewOnly ? 'Detalhes' : this.editingId ? 'Editar cadastro' : 'Novo cadastro'
  }

  // public
  public openFilePicker() {
    ;(this.$refs.fileInput as HTMLInputElement | undefined)?.click()
  }

  // public
  public handleFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      this.form.avatarUrl = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style scoped>
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.avatar-wrapper {
  position: relative;
  width: 5rem;
  height: 5rem;
}
.avatar-wrapper--editable {
  cursor: pointer;
}

.avatar-image {
  width: 5rem;
  height: 5rem;
  border-radius: 9999px;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background-color: rgb(0 0 0 / 0.4);
  opacity: 0;
  transition: opacity 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-wrapper--editable:hover .avatar-overlay {
  opacity: 1;
}

.avatar-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #fff;
}

.file-input {
  display: none;
}

.remove-photo {
  font-size: 0.75rem;
  color: var(--danger-text);
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.remove-photo-icon {
  width: 0.75rem;
  height: 0.75rem;
}

.avatar-hint {
  font-size: 0.75rem;
  color: var(--text-faint);
  margin-top: 0.5rem;
}

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
.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-brand-200);
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
