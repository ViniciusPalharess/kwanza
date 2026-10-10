<template>
  <div class="card">
    <div class="header">
      <h2 class="title"><users class="title-icon" /> Usuários & Permissões</h2>
      <button type="button" class="add-button" @click="$emit('criar')">
        <plus class="add-icon" /> Adicionar
      </button>
    </div>
    <ul class="list">
      <li v-for="user in users" :key="user.id" class="row">
        <div class="avatar">{{ user.initials }}</div>
        <div class="info">
          <p class="name">{{ user.name }}</p>
          <p class="role">{{ user.role }}</p>
        </div>
        <span class="role-badge" :class="`role-badge--${roleColors[user.role]}`">{{
          user.role
        }}</span>
        <button type="button" class="icon-button" @click="$emit('editar', user)">
          <pencil class="icon" />
        </button>
        <button
          type="button"
          class="icon-button icon-button--danger"
          @click="$emit('excluir', user)"
        >
          <trash-2 class="icon" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Users, Pencil, Trash2, Plus } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  components: { Users, Pencil, Trash2, Plus },
  emits: ['criar', 'editar', 'excluir'],
})
export default class UsuariosPermissoesView extends Vue {
  // public
  @Prop({ type: Array, required: true })
  public users!: Array<{ id: number; name: string; initials: string; role: string }>
  // public
  @Prop({ type: Object, required: true })
  public roleColors!: Record<string, string>
}
</script>

<style scoped>
.card {
  background-color: var(--surface);
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid var(--border-subtle);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.title-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--accent);
}

.add-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--accent-text);
  font-size: 0.875rem;
  font-weight: 600;
}

.add-icon {
  width: 1rem;
  height: 1rem;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--surface-sunken);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
}

.avatar {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  background-color: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.info {
  flex: 1;
  min-width: 0;
}

.name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-strong);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.role {
  font-size: 0.75rem;
  color: var(--text-muted);
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

.role-badge--emerald {
  background-color: var(--success-subtle-bg);
  color: var(--success-text);
}

.role-badge--amber {
  background-color: var(--warning-subtle-bg);
  color: var(--warning-text);
}

.role-badge--slate {
  background-color: var(--surface-muted);
  color: var(--text-secondary);
}

.icon-button {
  color: var(--text-faint);
}
.icon-button:hover {
  color: var(--accent-text);
}
.icon-button--danger:hover {
  color: var(--danger-text);
}

.icon {
  width: 0.875rem;
  height: 0.875rem;
}
</style>
