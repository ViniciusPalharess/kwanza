<template>
  <div class="page">
    <div class="header">
      <div>
        <h1 class="title">Relatórios</h1>
        <p class="subtitle">Análises e indicadores do projeto</p>
      </div>
      <div class="header-actions">
        <button type="button" class="export-button"><file-text class="export-icon" /> PDF</button>
        <button type="button" class="export-button"><sheet class="export-icon" /> Excel</button>
      </div>
    </div>

    <div class="filters-bar">
      <span class="filters-label">Filtros:</span>
      <button v-for="filter in filters" :key="filter" type="button" class="filter-chip">
        {{ filter }} <chevron-down class="filter-chip-icon" />
      </button>
    </div>

    <div class="charts-grid">
      <div class="card">
        <h2 class="card-title">Distribuição de participantes</h2>
        <grafico-rosca :segments="reportDistribution" />
      </div>

      <div class="card">
        <h2 class="card-title">Inscrições por categoria</h2>
        <grafico-rosca :segments="reportEnrollments" :donut="false" />
      </div>

      <div class="card">
        <h2 class="card-title">Evolução de XP × Frequência</h2>
        <grafico-linha :labels="xpEvolutionMonths" :series="xpSeries" />
      </div>

      <div class="card">
        <h2 class="card-title">Horas acumuladas por mês</h2>
        <grafico-barras :labels="xpEvolutionMonths" :values="reportHoursByMonth" color="#2563eb" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { FileText, Sheet, ChevronDown } from 'lucide-vue-next'
import { Component, Vue } from 'vue-facing-decorator'
import {
  reportDistribution,
  reportEnrollments,
  xpEvolutionMonths,
  xpEvolutionValues,
  attendanceMonthlyValues,
  reportHoursByMonth,
} from '@/data/dadosSimulados'
import GraficoRosca from '@/components/graficorosca/GraficoRosca.vue'
import GraficoLinha from '@/components/graficolinha/GraficoLinha.vue'
import GraficoBarras from '@/components/graficobarras/GraficoBarras.vue'

@Component({
  components: { GraficoRosca, GraficoLinha, GraficoBarras, FileText, Sheet, ChevronDown },
})
export default class RelatoriosView extends Vue {
  // public
  public filters = ['Participante', 'Curso', 'Período', 'Competência']
  // public
  public reportDistribution = reportDistribution
  // public
  public reportEnrollments = reportEnrollments
  // public
  public xpEvolutionMonths = xpEvolutionMonths
  // public
  public reportHoursByMonth = reportHoursByMonth

  // public
  public xpSeries = [
    { name: 'XP', color: '#2563eb', values: xpEvolutionValues },
    { name: 'Presença', color: '#16a34a', values: attendanceMonthlyValues.map((v) => v * 50) },
  ]
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
@media (min-width: 640px) {
  .header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.subtitle {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.export-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  background-color: var(--surface);
}

.export-icon {
  width: 1rem;
  height: 1rem;
}

.filters-bar {
  background-color: var(--surface);
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid var(--border-subtle);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.filters-label {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-right: 0.25rem;
}

.filter-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.filter-chip-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.charts-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
}
@media (min-width: 640px) {
  .charts-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.card {
  background-color: var(--surface);
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid var(--border-subtle);
}

.card-title {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}
</style>
