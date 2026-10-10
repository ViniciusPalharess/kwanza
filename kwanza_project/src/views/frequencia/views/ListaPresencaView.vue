<template>
  <div class="card">
    <template v-if="hasDataForSelected">
      <h2 class="title">Frequência — {{ selectedDateLabel }}</h2>
      <p class="summary">
        {{ selectedDaySummary.present }} presentes · {{ selectedDaySummary.absent }} ausentes ·
        {{ selectedDaySummary.rate }}%
      </p>

      <ul class="list">
        <li v-for="item in itens" :key="item.person.id" class="row">
          <button
            type="button"
            class="person-button"
            @click="$emit('selecionarParticipante', item.person)"
          >
            <img
              :src="item.person.avatarUrl || defaultAvatar"
              alt="Foto de perfil"
              class="avatar"
            />
            <span class="person-info">
              <p class="person-name">{{ item.person.name }}</p>
              <p class="person-meta">
                {{ item.stats.present }}/{{ item.stats.total }} · {{ item.person.attendance }}%
              </p>
            </span>
          </button>
          <div class="row-actions">
            <button
              type="button"
              class="status-button"
              :class="{ 'status-button--present': item.presente }"
              @click="$emit('marcarPresente', item.person.id)"
            >
              <check class="status-icon" /> Presente
            </button>
            <button
              type="button"
              class="status-button"
              :class="{ 'status-button--absent': !item.presente }"
              @click="$emit('marcarAusente', item.person.id)"
            >
              <x class="status-icon" /> Ausente
            </button>
          </div>
        </li>
      </ul>
    </template>
    <div v-else class="empty-state">
      <p class="empty-text">Não há registros de presença para este dia.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Check, X } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import defaultAvatar from '@/assets/images/default-avatar.png'

@Component({
  components: { Check, X },
  emits: ['selecionarParticipante', 'marcarPresente', 'marcarAusente'],
})
export default class ListaPresencaView extends Vue {
  // public
  @Prop({ type: Boolean, required: true })
  public hasDataForSelected!: boolean
  // public
  @Prop({ type: String, required: true })
  public selectedDateLabel!: string
  // public
  @Prop({ type: Object, default: null })
  public selectedDaySummary!: {
    present: number
    absent: number
    total: number
    rate: number
  } | null
  // public
  @Prop({ type: Array, required: true })
  public itens!: Array<{
    person: any
    stats: { present: number; total: number }
    presente: boolean
  }>

  // public
  public defaultAvatar = defaultAvatar
}
</script>

<style scoped>
.card {
  background-color: var(--surface);
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid var(--border-subtle);
  padding: 1.25rem;
}
@media (min-width: 1024px) {
  .card {
    grid-column: span 2 / span 2;
  }
}

.title {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.summary {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}

.list {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-top: 1px solid var(--border-subtle);
}
.row:first-child {
  border-top: none;
}

.person-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
  text-align: left;
}

.avatar {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  object-fit: cover;
  flex-shrink: 0;
}

.person-info {
  min-width: 0;
}

.person-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-strong);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.person-meta {
  font-size: 0.75rem;
  color: var(--text-faint);
}

.row-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.status-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  color: var(--text-muted);
  transition: all 0.15s ease;
}

.status-button--present {
  background-color: var(--success);
  color: #fff;
  border-color: transparent;
}

.status-button--absent {
  background-color: var(--danger-text);
  color: #fff;
  border-color: transparent;
}

.status-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.empty-state {
  min-height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-text {
  font-size: 0.875rem;
  color: var(--text-faint);
  text-align: center;
  padding: 0 1.5rem;
}
</style>
