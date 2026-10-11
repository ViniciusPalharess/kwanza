<template>
  <div class="card">
    <h2 class="title"><database-backup class="title-icon" /> Backup & Segurança</h2>
    <p class="subtitle">Último backup: {{ lastBackup }} · Auditoria ativa</p>
    <div class="actions">
      <botao :acao="AcaoBotao.outro" descricao="Fazer backup" @click="$emit('fazerBackup')" />
      <botao :acao="AcaoBotao.outro" descricao="Restaurar" />
    </div>
  </div>
</template>

<script lang="ts">
import { DatabaseBackup } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Botao from '@/components/botao/Botao.vue'
import { AcaoBotao } from '@/enums/AcaoBotao'

@Component({
  components: { DatabaseBackup, Botao },
  emits: ['fazerBackup'],
})
export default class BackupSegurancaView extends Vue {
  // public
  public AcaoBotao = AcaoBotao
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
</style>
