<template>
  <modal title="Pontuação por categoria" @close="$emit('fechar')">
    <p class="subtitle">Soma dos registros de todos os participantes no período · {{ period }}</p>
    <div class="list">
      <div v-for="cat in categorias" :key="cat.competency">
        <div class="row">
          <span class="row-label">{{ cat.competency }}</span>
          <span class="row-value">{{ cat.points }} pts</span>
        </div>
        <div class="track">
          <div class="fill" :style="{ width: cat.pct + '%' }" />
        </div>
      </div>
      <p v-if="!categorias.length" class="empty-text">Nenhum registro de competência ainda.</p>
    </div>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Modal from '@/components/modal/Modal.vue'

@Component({
  components: { Modal },
  emits: ['fechar'],
})
export default class VisaoGeralCategoriaModal extends Vue {
  // public
  @Prop({ type: String, required: true })
  public period!: string
  // public
  @Prop({ type: Array, required: true })
  public categorias!: Array<{ competency: string; points: number; pct: number }>
}
</script>

<style scoped>
.subtitle {
  font-size: 0.75rem;
  color: var(--text-faint);
  margin-top: -0.5rem;
  margin-bottom: 1rem;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.row-label {
  font-weight: 500;
  color: var(--text-secondary);
}

.row-value {
  font-weight: 600;
  color: var(--text-muted);
}

.track {
  height: 0.5rem;
  border-radius: 9999px;
  background-color: var(--surface-muted);
  overflow: hidden;
}

.fill {
  height: 100%;
  border-radius: 9999px;
  background-color: var(--accent);
}

.empty-text {
  font-size: 0.875rem;
  color: var(--text-faint);
}
</style>
