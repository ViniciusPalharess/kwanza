<template>
  <div class="card">
    <div class="header">
      <h2 class="title">Participantes</h2>
      <div class="actions">
        <div class="search-wrapper">
          <search class="search-icon" />
          <input
            :value="search"
            type="text"
            placeholder="Buscar participante"
            class="search-input"
            @input="$emit('pesquisar', ($event.target as HTMLInputElement).value)"
          />
        </div>
        <button
          v-if="canEditScore"
          type="button"
          class="register-button"
          @click="$emit('registrarCompetencia', null)"
        >
          <plus class="register-icon" /> Registrar competência
        </button>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr class="head-row">
            <th class="head-cell">#</th>
            <th class="head-cell">Participante</th>
            <th class="head-cell">Nível</th>
            <th class="head-cell align-right">Pontos</th>
            <th class="head-cell align-right">Competências</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="person in participantes"
            :key="person.id"
            class="row"
            @click="$emit('selecionarParticipante', person)"
          >
            <td class="cell cell--position">
              <span v-if="medals[positionFor(person) - 1]">{{
                medals[positionFor(person) - 1]
              }}</span>
              <span v-else>{{ positionFor(person) }}</span>
            </td>
            <td class="cell">
              <div class="person-row">
                <div class="avatar">{{ person.initials }}</div>
                <span class="name">{{ person.name }}</span>
              </div>
            </td>
            <td class="cell cell--muted">{{ levelFor(person.score).name }}</td>
            <td class="cell cell--points align-right">{{ person.score }}</td>
            <td class="cell cell--muted align-right">{{ competencyCountFor(person.name) }}</td>
          </tr>
          <tr v-if="!participantes.length">
            <td colspan="5" class="empty-cell">Nenhum participante encontrado.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Search, Plus } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  components: { Search, Plus },
  emits: ['pesquisar', 'registrarCompetencia', 'selecionarParticipante'],
})
export default class ListaParticipantesRankingView extends Vue {
  // public
  @Prop({ type: Array, required: true })
  public participantes!: any[]
  // public
  @Prop({ type: Array, required: true })
  public ranking!: any[]
  // public
  @Prop({ type: Array, required: true })
  public medals!: string[]
  // public
  @Prop({ type: Boolean, required: true })
  public canEditScore!: boolean
  // public
  @Prop({ type: String, required: true })
  public search!: string
  // public
  @Prop({ type: Function, required: true })
  public levelFor!: (score: number) => { name: string; xp: number }
  // public
  @Prop({ type: Function, required: true })
  public competencyCountFor!: (name: string) => number

  // public
  public positionFor(person: any) {
    return this.ranking.indexOf(person) + 1
  }
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

.header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
@media (min-width: 640px) {
  .header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.title {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-wrapper {
  position: relative;
}

.search-icon {
  width: 1rem;
  height: 1rem;
  color: var(--text-faint);
  position: absolute;
  left: 0.625rem;
  top: 50%;
  transform: translateY(-50%);
}

.search-input {
  padding: 0.375rem 0.75rem 0.375rem 2rem;
  font-size: 0.875rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background-color: var(--input-bg);
  color: var(--text-primary);
}

.register-button {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  background-color: var(--accent);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  white-space: nowrap;
  transition: background-color 0.15s ease;
}
.register-button:hover {
  background-color: var(--accent-hover);
}

.register-icon {
  width: 1rem;
  height: 1rem;
}

.table-wrapper {
  overflow-x: auto;
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
}

.head-cell {
  padding-bottom: 0.5rem;
  padding-right: 0.5rem;
  font-weight: 600;
}

.align-right {
  text-align: right;
}

.row {
  cursor: pointer;
  border-top: 1px solid var(--border-subtle);
  transition: background-color 0.15s ease;
}
.row:hover {
  background-color: var(--surface-hover);
}

.cell {
  padding: 0.625rem 0.5rem;
}

.cell--position {
  color: var(--text-faint);
}

.cell--muted {
  color: var(--text-secondary);
}

.cell--points {
  font-weight: 700;
  color: var(--text-strong);
}

.person-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.avatar {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 9999px;
  background-color: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 600;
  flex-shrink: 0;
}

.name {
  font-weight: 600;
  color: var(--text-strong);
}

.empty-cell {
  padding: 1.5rem 0.5rem;
  text-align: center;
  color: var(--text-faint);
}
</style>
