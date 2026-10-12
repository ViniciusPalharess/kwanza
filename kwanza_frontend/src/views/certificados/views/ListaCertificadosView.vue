<template>
  <div class="card">
    <div class="header">
      <h2 class="title">Todos os certificados</h2>
      <botao :acao="AcaoBotao.adicionar" descricao="Emitir" @click="$emit('criar')">
        <template #icone>
          <plus class="new-icon" />
        </template>
      </botao>
    </div>

    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr class="head-row">
            <th class="head-cell">Participante</th>
            <th class="head-cell">Curso</th>
            <th class="head-cell">Carga</th>
            <th class="head-cell">Data</th>
            <th class="head-cell">Status</th>
            <th class="head-cell align-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cert in certificados" :key="cert.id" class="row">
            <td class="cell cell--name">{{ cert.name }}</td>
            <td class="cell cell--course">{{ cert.course }}</td>
            <td class="cell cell--muted">{{ cert.hours }}h</td>
            <td class="cell cell--faint">{{ cert.date ?? '—' }}</td>
            <td class="cell"><selo-status :status="cert.status" /></td>
            <td class="cell">
              <div class="row-actions">
                <botao
                  :acao="AcaoBotao.outro"
                  tamanho="pequeno"
                  somente-icone
                  @click="$emit('visualizar', cert)"
                >
                  <template #icone>
                    <eye class="icon" />
                  </template>
                </botao>
                <botao
                  :acao="AcaoBotao.outro"
                  tamanho="pequeno"
                  somente-icone
                  @click="$emit('editar', cert)"
                >
                  <template #icone>
                    <pencil class="icon" />
                  </template>
                </botao>
                <botao
                  :acao="AcaoBotao.excluir"
                  tamanho="pequeno"
                  somente-icone
                  @click="$emit('excluir', cert)"
                >
                  <template #icone>
                    <trash-2 class="icon" />
                  </template>
                </botao>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Plus, Eye, Pencil, Trash2 } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Botao from '@/components/botao/Botao.vue'
import SeloStatus from '@/components/selostatus/SeloStatus.vue'
import { AcaoBotao } from '@/enums/AcaoBotao'

@Component({
  components: { SeloStatus, Botao, Plus, Eye, Pencil, Trash2 },
  emits: ['criar', 'visualizar', 'editar', 'excluir'],
})
export default class ListaCertificadosView extends Vue {
  // public
  public AcaoBotao = AcaoBotao
  // public
  @Prop({ type: Array, required: true })
  public certificados!: any[]
}
</script>

<style scoped>
.card {
  background-color: var(--surface);
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid var(--border-subtle);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.25rem 0;
}

.title {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.new-icon {
  width: 1rem;
  height: 1rem;
}

.table-wrapper {
  overflow-x: auto;
  margin-top: 0.75rem;
}

.table {
  width: 100%;
  font-size: 0.875rem;
  border-collapse: collapse;
}

.head-row {
  text-align: left;
  font-size: 0.75rem;
  color: var(--text-faint);
  text-transform: uppercase;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.head-cell {
  padding: 0.75rem 1.25rem;
  font-weight: 600;
}

.align-right {
  text-align: right;
}

.row {
  border-bottom: 1px solid var(--border-subtle);
}

.cell {
  padding: 0.75rem 1.25rem;
}

.cell--name {
  font-weight: 600;
  color: var(--text-strong);
}

.cell--course {
  color: var(--accent-text);
}

.cell--muted {
  color: var(--text-secondary);
}

.cell--faint {
  color: var(--text-muted);
}

.row-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
}

.icon {
  width: 1rem;
  height: 1rem;
}
</style>
