<template>
  <modal :title="editingLevelId ? 'Editar nível' : 'Adicionar nível'" @close="$emit('fechar')">
    <form class="form" @submit.prevent="$emit('salvar')">
      <campo-texto
        label="Nome do nível"
        v-model="form.name"
        obrigatorio
        placeholder="Nível 7 · Firmamento"
      />
      <campo-texto label="XP mínimo" v-model="form.xp" tipo="number" min="0" />
      <div class="actions">
        <botao :acao="AcaoBotao.cancelar" descricao="Cancelar" @click="$emit('fechar')" />
        <botao
          :acao="AcaoBotao.salvar"
          tipo="submit"
          :descricao="editingLevelId ? 'Salvar' : 'Adicionar'"
        />
      </div>
    </form>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Botao from '@/components/botao/Botao.vue'
import CampoTexto from '@/components/campotexto/CampoTexto.vue'
import Modal from '@/components/modal/Modal.vue'
import { AcaoBotao } from '@/enums/AcaoBotao'

@Component({
  components: { Modal, Botao, CampoTexto },
  emits: ['salvar', 'fechar'],
})
export default class FormularioNivelModal extends Vue {
  // public
  public AcaoBotao = AcaoBotao
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

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding-top: 0.5rem;
}
</style>
