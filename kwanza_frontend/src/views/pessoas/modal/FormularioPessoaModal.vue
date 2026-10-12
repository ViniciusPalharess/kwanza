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
      <botao
        v-if="!viewOnly && form.avatarUrl"
        :acao="AcaoBotao.texto"
        tamanho="pequeno"
        class="remove-photo"
        descricao="Remover foto"
        @click="form.avatarUrl = ''"
      >
        <template #icone>
          <trash-2 class="remove-photo-icon" />
        </template>
      </botao>
      <p v-else-if="!viewOnly" class="avatar-hint">Clique na foto para adicionar</p>
    </div>

    <form class="form" @submit.prevent="$emit('salvar')">
      <campo-texto label="Nome completo" v-model="form.name" :desabilitado="viewOnly" obrigatorio />
      <div class="field-row">
        <campo-lista label="Tipo" v-model="form.role" :desabilitado="viewOnly" :opcoes="opcoesRole" />
        <campo-texto label="Telefone" v-model="form.phone" :desabilitado="viewOnly" />
      </div>
      <template v-if="form.role === 'Participante'">
        <div class="field-row">
          <campo-texto
            label="Nível"
            v-model="form.level"
            :desabilitado="viewOnly"
            tipo="number"
            min="1"
            max="6"
          />
          <campo-texto
            label="Pontos"
            v-model="form.score"
            :desabilitado="viewOnly"
            tipo="number"
            min="0"
          />
        </div>
        <campo-texto
          label="Frequência (%)"
          v-model="form.attendance"
          :desabilitado="viewOnly"
          tipo="number"
          min="0"
          max="100"
        />
      </template>
      <div class="actions">
        <botao
          :acao="AcaoBotao.cancelar"
          :descricao="viewOnly ? 'Fechar' : 'Cancelar'"
          @click="$emit('fechar')"
        />
        <botao
          v-if="!viewOnly"
          :acao="AcaoBotao.salvar"
          tipo="submit"
          :descricao="editingId ? 'Salvar alterações' : 'Criar cadastro'"
        />
      </div>
    </form>
  </modal>
</template>

<script lang="ts">
import { Trash2, Camera } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Botao from '@/components/botao/Botao.vue'
import CampoLista from '@/components/campolista/CampoLista.vue'
import CampoTexto from '@/components/campotexto/CampoTexto.vue'
import Modal from '@/components/modal/Modal.vue'
import { AcaoBotao } from '@/enums/AcaoBotao'
import defaultAvatar from '@/assets/images/default-avatar.png'

@Component({
  components: { Modal, Trash2, Camera, Botao, CampoTexto, CampoLista },
  emits: ['salvar', 'fechar'],
})
export default class FormularioPessoaModal extends Vue {
  // public
  public AcaoBotao = AcaoBotao
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
  public get opcoesRole() {
    return this.roleOptions.map((role) => ({ valor: role, texto: role }))
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
  color: var(--danger-text);
  margin-top: 0.5rem;
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

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding-top: 0.5rem;
}
</style>
