<template>
  <modal title="Destaques por competência" @close="$emit('fechar')">
    <select
      :value="highlightCompetency"
      class="select"
      @change="$emit('selecionarCompetencia', ($event.target as HTMLSelectElement).value)"
    >
      <option v-for="name in competencyNames" :key="name" :value="name">{{ name }}</option>
    </select>
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
import Modal from '@/components/modal/Modal.vue'

@Component({
  components: { Modal },
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
}
</script>

<style scoped>
.select {
  width: 100%;
  font-size: 0.875rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: var(--input-bg);
  color: var(--text-primary);
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
