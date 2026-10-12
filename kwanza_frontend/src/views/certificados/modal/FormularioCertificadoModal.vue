<template>
  <modal
    :title="
      viewOnly ? 'Detalhes do certificado' : editingId ? 'Editar certificado' : 'Emitir certificado'
    "
    @close="$emit('fechar')"
  >
    <form class="form" @submit.prevent="$emit('salvar')">
      <campo-texto
        label="Participante"
        v-model="form.name"
        :desabilitado="viewOnly"
        obrigatorio
        lista="cert-participant-options"
      />
      <datalist id="cert-participant-options">
        <option v-for="name in participantNames" :key="name" :value="name" />
      </datalist>

      <campo-texto
        label="Curso"
        v-model="form.course"
        :desabilitado="viewOnly"
        obrigatorio
        lista="cert-course-options"
      />
      <datalist id="cert-course-options">
        <option v-for="title in courseTitles" :key="title" :value="title" />
      </datalist>

      <div class="field-row">
        <campo-texto
          label="Carga (h)"
          v-model="form.hours"
          :desabilitado="viewOnly"
          tipo="number"
          min="1"
        />
        <campo-lista label="Status" v-model="form.status" :desabilitado="viewOnly" :opcoes="opcoesStatus" />
      </div>
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
          :descricao="editingId ? 'Salvar alterações' : 'Emitir certificado'"
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
export default class FormularioCertificadoModal extends Vue {
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
  public form!: { name: string; course: string; hours: number; status: string; date: string }
  // public
  @Prop({ type: Array, required: true })
  public participantNames!: string[]
  // public
  @Prop({ type: Array, required: true })
  public courseTitles!: string[]

  // public
  public get opcoesStatus() {
    return ['Emitido', 'Elegível', 'Pendente'].map((status) => ({ valor: status, texto: status }))
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
