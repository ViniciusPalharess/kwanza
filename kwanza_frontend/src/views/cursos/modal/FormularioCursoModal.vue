<template>
  <modal :title="editingId ? 'Editar curso' : 'Novo curso'" @close="$emit('fechar')">
    <form class="form" @submit.prevent="$emit('salvar')">
      <campo-texto label="Título" v-model="form.title" obrigatorio />
      <div class="field-row">
        <campo-texto label="Categoria" v-model="form.category" obrigatorio />
        <campo-texto label="Carga horária (h)" v-model="form.hours" tipo="number" min="1" />
      </div>
      <campo-texto label="Professor(a)" v-model="form.teacher" obrigatorio />
      <campo-texto label="Descrição" v-model="form.description" multilinha :linhas="2" />
      <div class="field-row">
        <campo-lista label="Status" v-model="form.status" :opcoes="opcoesStatus" />
        <campo-texto label="Progresso (%)" v-model="form.progress" tipo="number" min="0" max="100" />
      </div>
      <div class="actions">
        <botao :acao="AcaoBotao.cancelar" descricao="Cancelar" @click="$emit('fechar')" />
        <botao
          :acao="AcaoBotao.salvar"
          tipo="submit"
          :descricao="editingId ? 'Salvar alterações' : 'Criar curso'"
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
export default class FormularioCursoModal extends Vue {
  // public
  public AcaoBotao = AcaoBotao
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

  // public
  public get opcoesStatus() {
    return [
      { valor: 'not_started', texto: 'Não iniciado' },
      { valor: 'in_progress', texto: 'Em andamento' },
      { valor: 'completed', texto: 'Concluído' },
    ]
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

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding-top: 0.5rem;
}
</style>
