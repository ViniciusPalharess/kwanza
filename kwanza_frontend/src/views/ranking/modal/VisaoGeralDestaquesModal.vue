<template>
  <modal title="Destaques por competência" @close="$emit('fechar')">
    <campo-lista
      class="select"
      :model-value="highlightCompetency"
      :opcoes="opcoesCompetencia"
      @update:model-value="$emit('selecionarCompetencia', $event)"
    />
    <ul class="list">
      <li v-for="(item, index) in highlights" :key="item.name" class="row">
        <span>{{ medals[index] }}</span>
        <span class="name">{{ item.name }}</span>
        <span class="count">{{ item.count }} registro{{ item.count === 1 ? '' : 's' }}</span>
      </li>
      <li v-if="!highlights.length" class="empty-text">
        Nenhum registro para esta competência ainda.
      </li>
    </ul>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'
import CampoLista from '@/components/campolista/CampoLista.vue'
import Modal from '@/components/modal/Modal.vue'

@Component({
  components: { Modal, CampoLista },
  emits: ['fechar', 'selecionarCompetencia'],
})
export default class VisaoGeralDestaquesModal extends Vue {
  // public
  @Prop({ type: Array, required: true })
  public competencyNames!: string[]
  // public
  @Prop({ type: String, required: true })
  public highlightCompetency!: string
  // public
  @Prop({ type: Array, required: true })
  public highlights!: Array<{ name: string; count: number }>
  // public
  @Prop({ type: Array, required: true })
  public medals!: string[]

  // public
  public get opcoesCompetencia() {
    return this.competencyNames.map((name) => ({ valor: name, texto: name }))
  }
}
</script>

<style scoped>
.select {
  margin-bottom: 1rem;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.name {
  flex: 1;
  font-weight: 500;
  color: var(--text-secondary);
}

.count {
  color: var(--text-muted);
}

.empty-text {
  font-size: 0.875rem;
  color: var(--text-faint);
}
</style>
