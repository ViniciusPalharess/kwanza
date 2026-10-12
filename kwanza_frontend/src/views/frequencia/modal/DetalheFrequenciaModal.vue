<template>
  <modal title="Frequência" @close="$emit('fechar')">
    <div class="person-row">
      <img :src="participant.avatarUrl || defaultAvatar" alt="Foto de perfil" class="avatar" />
      <p class="person-name">{{ participant.name }}</p>
    </div>

    <p class="label">Frequência geral</p>
    <p class="rate">{{ rate }}%</p>
    <div class="track track--main">
      <div class="fill" :style="{ width: rate + '%' }" />
    </div>

    <div class="stats-grid">
      <div>
        <p class="stat-value">{{ stats.present }}</p>
        <p class="stat-label">Presenças</p>
      </div>
      <div>
        <p class="stat-value">{{ stats.absent }}</p>
        <p class="stat-label">Ausências</p>
      </div>
      <div>
        <p class="stat-value">{{ stats.total }}</p>
        <p class="stat-label">Total</p>
      </div>
    </div>

    <hr class="divider" />

    <p class="section-title">Frequência por mês</p>
    <ul class="monthly-list">
      <li v-for="m in monthly" :key="m.monthIndex" class="monthly-row">
        <span class="monthly-label">{{ m.label }}</span>
        <div class="track track--small">
          <div class="fill fill--light" :style="{ width: m.rate + '%' }" />
        </div>
        <span class="monthly-value">{{ m.rate }}%</span>
      </li>
    </ul>

    <hr class="divider" />

    <p class="section-title">Histórico</p>
    <ul class="history-list">
      <li v-for="h in history" :key="h.day" class="history-row">
        <span class="history-label">{{ h.label }}</span>
        <span
          class="history-status"
          :class="h.present ? 'history-status--present' : 'history-status--absent'"
        >
          <check v-if="h.present" class="history-icon" />
          <x v-else class="history-icon" />
          {{ h.present ? 'Presente' : 'Ausente' }}
        </span>
      </li>
    </ul>
  </modal>
</template>

<script lang="ts">
import { Check, X } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Modal from '@/components/modal/Modal.vue'
import defaultAvatar from '@/assets/images/default-avatar.png'

@Component({
  components: { Modal, Check, X },
  emits: ['fechar'],
})
export default class DetalheFrequenciaModal extends Vue {
  // public
  @Prop({ type: Object, required: true })
  public participant!: any
  // public
  @Prop({ type: Object, required: true })
  public stats!: { present: number; absent: number; total: number }
  // public
  @Prop({ type: Number, required: true })
  public rate!: number
  // public
  @Prop({ type: Array, required: true })
  public monthly!: Array<{ monthIndex: number; rate: number; label: string }>
  // public
  @Prop({ type: Array, required: true })
  public history!: Array<{ day: number; label: string; present: boolean }>

  // public
  public defaultAvatar = defaultAvatar
}
</script>

<style scoped>
.person-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  object-fit: cover;
}

.person-name {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
}

.rate {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--accent-text);
  margin-bottom: 0.5rem;
}

.track {
  border-radius: 9999px;
  background-color: var(--surface-muted);
  overflow: hidden;
}

.track--main {
  height: 0.5rem;
  margin-bottom: 1rem;
}

.track--small {
  height: 0.5rem;
  flex: 1;
}

.fill {
  height: 100%;
  border-radius: 9999px;
  background-color: var(--accent);
}

.fill--light {
  background-color: var(--color-brand-500);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
  text-align: center;
  margin-bottom: 1.25rem;
}

.stat-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-strong);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-faint);
}

.divider {
  border-color: var(--border-subtle);
  margin-bottom: 1rem;
}

.section-title {
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.monthly-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.monthly-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.monthly-label {
  width: 3.5rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  flex-shrink: 0;
}

.monthly-value {
  width: 2.5rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  text-align: right;
  flex-shrink: 0;
}

.history-list {
  max-height: 12rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.history-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.875rem;
  border-top: 1px solid var(--border-subtle);
}
.history-row:first-child {
  border-top: none;
}

.history-label {
  color: var(--text-secondary);
}

.history-status {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 600;
}

.history-status--present {
  color: var(--success);
}

.history-status--absent {
  color: var(--danger-text);
}

.history-icon {
  width: 0.875rem;
  height: 0.875rem;
}
</style>
