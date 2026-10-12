<template>
  <modal :title="editingUserId ? 'Editar usuário' : 'Adicionar usuário'" @close="$emit('fechar')">
    <form class="form" @submit.prevent="$emit('salvar')">
      <campo-texto label="Nome" v-model="form.name" obrigatorio />
      <campo-lista label="Papel" v-model="form.role" :opcoes="opcoesRole" />
      <div class="actions">
        <botao :acao="AcaoBotao.cancelar" descricao="Cancelar" @click="$emit('fechar')" />
        <botao
          :acao="AcaoBotao.salvar"
          tipo="submit"
          :descricao="editingUserId ? 'Salvar' : 'Adicionar'"
        />
      </div>
    </form>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Botao from '@/components/botao/Botao.vue'
import CampoLista from '@/components/campolista/CampoLista.vue'
import CampoTexto from '@/components/campotexto/CampoTexto.vue'
import Modal from '@/components/modal/Modal.vue'
import { AcaoBotao } from '@/enums/AcaoBotao'

@Component({
  components: { Modal, Botao, CampoTexto, CampoLista },
  emits: ['salvar', 'fechar'],
})
export default class FormularioUsuarioModal extends Vue {
  // public
  public AcaoBotao = AcaoBotao
  // public
  @Prop({ type: [Number, String], default: null })
  public editingUserId!: number | string | null
  // public
  @Prop({ type: Object, required: true })
  public form!: { name: string; role: string }
  // public
  @Prop({ type: Array, required: true })
  public roleOptions!: string[]

  // public
  public get opcoesRole() {
    return this.roleOptions.map((role) => ({ valor: role, texto: role }))
  }
}
</script>

<style scoped>
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
