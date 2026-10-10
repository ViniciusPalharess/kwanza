<template>
  <modal title="Meus Dados" @close="$emit('close')">
    <div class="avatar-section">
      <div class="avatar-wrapper" @click="openFilePicker">
        <img :src="form.avatarUrl || defaultAvatar" alt="Foto de perfil" class="avatar-image" />
        <div class="avatar-overlay">
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
      <p class="avatar-hint">Clique na foto para alterar</p>
    </div>

    <form class="form" @submit.prevent="handleSave">
      <div class="field">
        <label class="label">Nome completo</label>
        <input v-model="form.name" type="text" class="input" />
      </div>
      <div class="field">
        <label class="label">E-mail</label>
        <input v-model="form.email" type="email" class="input" />
      </div>
      <div class="field">
        <label class="label">Telefone</label>
        <input v-model="form.phone" type="tel" class="input" />
      </div>
      <div class="field">
        <label class="label">Data de nascimento</label>
        <input v-model="form.birthDate" type="date" class="input" />
      </div>
      <div class="field">
        <label class="label">Sobre mim</label>
        <textarea v-model="form.bio" rows="3" class="input" />
      </div>

      <div class="actions">
        <button type="button" class="button-secondary" @click="$emit('close')">Cancelar</button>
        <button type="submit" class="button-primary">Salvar alterações</button>
      </div>
    </form>
  </modal>
</template>

<script lang="ts">
import { Camera } from 'lucide-vue-next'
import { Component, Vue } from 'vue-facing-decorator'
import { useUsuarioStore } from '@/stores/usuario'
import { useToastStore } from '@/stores/toast'
import Modal from '@/components/modal/Modal.vue'
import defaultAvatar from '@/assets/images/default-avatar.png'

@Component({
  components: { Modal, Camera },
  emits: ['close'],
})
export default class PerfilModal extends Vue {
  // public
  public defaultAvatar = defaultAvatar

  // private
  private usuarioStore = useUsuarioStore()
  // private
  private toastStore = useToastStore()

  // public
  public form = {
    name: this.usuarioStore.user.name,
    email: this.usuarioStore.user.email,
    phone: this.usuarioStore.user.phone,
    birthDate: this.usuarioStore.user.birthDate,
    bio: this.usuarioStore.user.bio,
    avatarUrl: this.usuarioStore.user.avatarUrl,
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

  // public
  public handleSave() {
    this.usuarioStore.updateProfile({ ...this.form })
    this.toastStore.success('Dados atualizados com sucesso.')
    this.$emit('close')
  }
}
</script>

<style scoped>
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.25rem;
}

.avatar-wrapper {
  position: relative;
  width: 6rem;
  height: 6rem;
  cursor: pointer;
}

.avatar-image {
  width: 6rem;
  height: 6rem;
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

.avatar-wrapper:hover .avatar-overlay {
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

.avatar-hint {
  font-size: 0.75rem;
  color: var(--color-slate-400);
  margin-top: 0.5rem;
}

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
.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-brand-200);
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
  background-color: var(--color-brand-600);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
}
.button-primary:hover {
  background-color: var(--color-brand-700);
}
</style>
