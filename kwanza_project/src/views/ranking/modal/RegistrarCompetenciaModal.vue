<template>
  <modal title="Registrar competência" @close="$emit('fechar')">
    <form class="form" @submit.prevent="$emit('salvar')">
      <campo-texto label="Participante" v-model="form.name" obrigatorio lista="participant-options" />
      <datalist id="participant-options">
        <option v-for="name in participantNames" :key="name" :value="name" />
      </datalist>

      <div class="field-row">
        <campo-lista label="Competência" v-model="form.competency" :opcoes="opcoesCompetencia" />
        <campo-texto label="Data" v-model="form.date" placeholder="dd/mm/aaaa" />
      </div>
      <campo-texto label="Pontos" v-model="form.points" tipo="number" min="0" />
      <campo-texto label="Observação" v-model="form.description" multilinha :linhas="2" />
      <div class="actions">
        <botao :acao="AcaoBotao.cancelar" descricao="Cancelar" @click="$emit('fechar')" />
        <botao :acao="AcaoBotao.salvar" tipo="submit" descricao="Salvar" />
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
export default class RegistrarCompetenciaModal extends Vue {
  // public
  public AcaoBotao = AcaoBotao
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

  // public
  public get opcoesCompetencia() {
    return this.competencyNames.map((name) => ({ valor: name, texto: name }))
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
