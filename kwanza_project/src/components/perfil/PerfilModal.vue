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
      <campo-texto label="Nome completo" v-model="form.name" />
      <campo-texto label="E-mail" v-model="form.email" tipo="email" />
      <campo-texto label="Telefone" v-model="form.phone" tipo="tel" />
      <campo-texto label="Data de nascimento" v-model="form.birthDate" tipo="date" />
      <campo-texto label="Sobre mim" v-model="form.bio" multilinha :linhas="3" />

      <div class="actions">
        <botao :acao="AcaoBotao.cancelar" descricao="Cancelar" @click="$emit('close')" />
        <botao :acao="AcaoBotao.salvar" tipo="submit" descricao="Salvar alterações" />
      </div>
    </form>
  </modal>
</template>

<script lang="ts">
import { Camera } from 'lucide-vue-next'
import { Component, Vue } from 'vue-facing-decorator'
import Botao from '@/components/botao/Botao.vue'
import CampoTexto from '@/components/campotexto/CampoTexto.vue'
import { useUsuarioStore } from '@/stores/usuario'
import { useToastStore } from '@/stores/toast'
import Modal from '@/components/modal/Modal.vue'
import { AcaoBotao } from '@/enums/AcaoBotao'
import defaultAvatar from '@/assets/images/default-avatar.png'

@Component({
  components: { Modal, Camera, Botao, CampoTexto },
  emits: ['close'],
})
export default class PerfilModal extends Vue {
  // public
  public AcaoBotao = AcaoBotao
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

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding-top: 0.5rem;
}
</style>
