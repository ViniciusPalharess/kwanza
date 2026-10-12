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
          <botao
            :acao="AcaoBotao.texto"
            class="person-button"
            @click="$emit('selecionarParticipante', item.person)"
          >
            <template #icone>
              <img
                :src="item.person.avatarUrl || defaultAvatar"
                alt="Foto de perfil"
                class="avatar"
              />
            </template>
            <span class="person-info">
              <p class="person-name">{{ item.person.name }}</p>
              <p class="person-meta">
                {{ item.stats.present }}/{{ item.stats.total }} · {{ item.person.attendance }}%
              </p>
            </span>
          </botao>
          <div class="row-actions">
            <botao
              :acao="AcaoBotao.outro"
              tamanho="pequeno"
              class="status-button"
              :class="{ 'status-button--present': item.presente }"
              descricao="Presente"
              @click="$emit('marcarPresente', item.person.id)"
            >
              <template #icone>
                <check class="status-icon" />
              </template>
            </botao>
            <botao
              :acao="AcaoBotao.outro"
              tamanho="pequeno"
              class="status-button"
              :class="{ 'status-button--absent': !item.presente }"
              descricao="Ausente"
              @click="$emit('marcarAusente', item.person.id)"
            >
              <template #icone>
                <x class="status-icon" />
              </template>
            </botao>
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
import Botao from '@/components/botao/Botao.vue'
import { AcaoBotao } from '@/enums/AcaoBotao'
import defaultAvatar from '@/assets/images/default-avatar.png'

@Component({
  components: { Check, X, Botao },
  emits: ['selecionarParticipante', 'marcarPresente', 'marcarAusente'],
})
export default class ListaPresencaView extends Vue {
  // public
  public AcaoBotao = AcaoBotao
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
  flex: 1;
  min-width: 0;
  text-align: left;
  gap: 0.75rem !important;
  padding: 0 !important;
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
  font-weight: 600 !important;
  color: var(--text-muted) !important;
}

.status-button--present {
  background-color: var(--success) !important;
  color: #fff !important;
  border-color: transparent !important;
}

.status-button--absent {
  background-color: var(--danger-text) !important;
  color: #fff !important;
  border-color: transparent !important;
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
