<template>
  <div class="card">
    <h2 class="title"><database-backup class="title-icon" /> Backup & Segurança</h2>
    <p class="subtitle">Último backup: {{ lastBackup }} · Auditoria ativa</p>
    <div class="actions">
      <button type="button" class="button" @click="$emit('fazerBackup')">Fazer backup</button>
      <button type="button" class="button">Restaurar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { DatabaseBackup } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  components: { DatabaseBackup },
  emits: ['fazerBackup'],
})
export default class BackupSegurancaView extends Vue {
  // public
  @Prop({ type: String, required: true })
  public lastBackup!: string
}
</script>

<style scoped>
.card {
  background-color: var(--surface);
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid var(--border-subtle);
  grid-column: span 1;
}
@media (min-width: 1024px) {
  .card {
    grid-column: span 2 / span 2;
  }
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.title-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--accent);
}

.subtitle {
  font-size: 0.875rem;
  color: var(--accent-text);
  margin-bottom: 1rem;
}

.actions {
  display: flex;
  gap: 0.75rem;
}

.button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
</style>
