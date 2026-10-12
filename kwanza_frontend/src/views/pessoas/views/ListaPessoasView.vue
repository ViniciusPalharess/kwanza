<template>
  <div class="list">
    <div class="list-header">
      <span>Pessoa</span>
      <span>Tipo</span>
      <span>Telefone</span>
      <span>Nível</span>
      <span>Pontos</span>
      <span>Frequência</span>
      <span class="align-right">Ações</span>
    </div>

    <div
      v-for="person in pessoas"
      :key="person.id"
      class="row"
      @click="$emit('visualizar', person)"
    >
      <div class="person-cell">
        <img :src="person.avatarUrl || defaultAvatar" alt="Foto de perfil" class="avatar" />
        <div class="person-info">
          <p class="person-name">{{ person.name }}</p>
          <p class="person-email">{{ emailFor(person.name) }}</p>
        </div>
      </div>
      <span>
        <span class="role-badge" :class="roleBadgeClass[person.role]">{{ person.role }}</span>
      </span>
      <span class="phone">{{ person.phone || '—' }}</span>
      <span>
        <span v-if="person.role === 'Participante'" class="level-badge">Nv {{ person.level }}</span>
        <span v-else class="muted">—</span>
      </span>
      <span class="score">{{ person.role === 'Participante' ? person.score : '—' }}</span>
      <div v-if="person.role === 'Participante'" class="attendance-cell">
        <div class="track">
          <div class="fill" :style="{ width: person.attendance + '%' }" />
        </div>
        <span class="attendance-value">{{ person.attendance }}%</span>
      </div>
      <span v-else class="muted">—</span>
      <div class="row-actions">
        <botao
          :acao="AcaoBotao.outro"
          somente-icone
          class="icon-button"
          @click.stop="$emit('editar', person)"
        >
          <template #icone><pencil class="icon" /></template>
        </botao>
        <botao
          :acao="AcaoBotao.excluir"
          somente-icone
          class="icon-button icon-button--danger"
          @click.stop="$emit('excluir', person)"
        >
          <template #icone><trash-2 class="icon" /></template>
        </botao>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Pencil, Trash2 } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Botao from '@/components/botao/Botao.vue'
import { AcaoBotao } from '@/enums/AcaoBotao'
import { emailFor } from '@/data/dadosSimulados'
import defaultAvatar from '@/assets/images/default-avatar.png'

@Component({
  components: { Pencil, Trash2, Botao },
  emits: ['visualizar', 'editar', 'excluir'],
})
export default class ListaPessoasView extends Vue {
  // public
  public AcaoBotao = AcaoBotao
  // public
  @Prop({ type: Array, required: true })
  public pessoas!: any[]
  // public
  @Prop({ type: Object, required: true })
  public roleBadgeClass!: Record<string, string>

  // public
  public emailFor = emailFor
  // public
  public defaultAvatar = defaultAvatar
}
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.list-header {
  display: none;
  gap: 0.5rem;
  padding: 0 1.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-faint);
  text-transform: uppercase;
}
@media (min-width: 768px) {
  .list-header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 120px 110px 80px 90px 160px 90px;
  }
}

.align-right {
  text-align: right;
}

.row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  gap: 0.5rem;
  background-color: var(--surface);
  border-radius: 0.75rem;
  border: 1px solid var(--border-subtle);
  padding: 0.875rem 1.25rem;
  cursor: pointer;
  transition: border-color 0.15s ease;
}
.row:hover {
  border-color: var(--color-brand-200);
}
@media (min-width: 768px) {
  .row {
    grid-template-columns: minmax(0, 1fr) 120px 110px 80px 90px 160px 90px;
  }
}

.person-cell {
  grid-column: span 2 / span 2;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}
@media (min-width: 768px) {
  .person-cell {
    grid-column: span 1 / span 1;
  }
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
  font-weight: 600;
  color: var(--text-strong);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.person-email {
  font-size: 0.75rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.role-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
}

.role-badge--brand {
  background-color: var(--accent-subtle-bg);
  color: var(--accent-text-strong);
}
.role-badge--amber {
  background-color: var(--warning-subtle-bg);
  color: var(--warning-dot);
}
.role-badge--emerald {
  background-color: var(--success-subtle-bg);
  color: var(--success-text);
}

.phone {
  color: var(--text-secondary);
  font-size: 0.875rem;
  white-space: nowrap;
}

.level-badge {
  font-size: 0.75rem;
  font-weight: 600;
  background-color: var(--surface-muted);
  color: var(--text-secondary);
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
}

.muted {
  color: var(--text-faint);
}

.score {
  font-weight: 700;
  color: var(--text-strong);
}

.attendance-cell {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.track {
  height: 0.375rem;
  flex: 1;
  border-radius: 9999px;
  background-color: var(--surface-muted);
  overflow: hidden;
}

.fill {
  height: 100%;
  border-radius: 9999px;
  background-color: var(--accent);
}

.attendance-value {
  font-size: 0.75rem;
  color: var(--text-muted);
  width: 2.25rem;
  text-align: right;
}

.row-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  color: var(--text-faint);
}

.icon-button:hover {
  color: var(--accent-text);
}
.icon-button--danger:hover {
  color: var(--danger-text);
}

.icon {
  width: 1rem;
  height: 1rem;
}
</style>
