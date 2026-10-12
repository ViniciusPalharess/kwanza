<template>
  <div class="card">
    <h2 class="title"><trophy class="title-icon" /> Pontuação & Níveis</h2>
    <ul class="list">
      <li v-for="level in levels" :key="level.id" class="row">
        <span class="name">{{ level.name }}</span>
        <div class="row-actions">
          <span class="xp-badge">{{ level.xp }}+ XP</span>
          <botao
            :acao="AcaoBotao.outro"
            somente-icone
            class="icon-button"
            @click="$emit('editar', level)"
          >
            <template #icone><pencil class="icon" /></template>
          </botao>
          <botao
            :acao="AcaoBotao.excluir"
            somente-icone
            class="icon-button icon-button--danger"
            @click="$emit('excluir', level)"
          >
            <template #icone><trash-2 class="icon" /></template>
          </botao>
        </div>
      </li>
    </ul>
    <botao :acao="AcaoBotao.adicionar" largura-total descricao="Adicionar nível" @click="$emit('criar')">
      <template #icone><plus class="add-icon" /></template>
    </botao>
  </div>
</template>

<script lang="ts">
import { Trophy, Pencil, Trash2, Plus } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Botao from '@/components/botao/Botao.vue'
import { AcaoBotao } from '@/enums/AcaoBotao'

@Component({
  components: { Trophy, Pencil, Trash2, Plus, Botao },
  emits: ['criar', 'editar', 'excluir'],
})
export default class NiveisPontuacaoView extends Vue {
  // public
  public AcaoBotao = AcaoBotao
  // public
  @Prop({ type: Array, required: true })
  public levels!: Array<{ id: number; name: string; xp: number }>
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

.title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.title-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--accent);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  background-color: var(--surface-sunken);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
}

.name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.row-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.xp-badge {
  font-size: 0.75rem;
  font-weight: 600;
  background-color: var(--accent-subtle-bg);
  color: var(--accent-text-strong);
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
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

.add-icon {
  width: 1rem;
  height: 1rem;
}
</style>
