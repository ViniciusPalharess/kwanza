<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Relatórios</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">Análises e indicadores do projeto</p>
      </div>
      <div class="flex gap-2">
        <button
          type="button"
          class="flex items-center gap-2 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800"
        >
          <FileText class="w-4 h-4" /> PDF
        </button>
        <button
          type="button"
          class="flex items-center gap-2 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800"
        >
          <Sheet class="w-4 h-4" /> Excel
        </button>
      </div>
    </div>

    <div
      class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-wrap items-center gap-3"
    >
      <span class="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mr-1"
        >Filtros:</span
      >
      <button
        v-for="filter in filters"
        :key="filter"
        type="button"
        class="flex items-center gap-2 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300"
      >
        {{ filter }} <ChevronDown class="w-3.5 h-3.5" />
      </button>
    </div>

    <div class="grid sm:grid-cols-2 gap-6">
      <div
        class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700"
      >
        <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-4">
          Distribuição de participantes
        </h2>
        <GraficoRosca :segments="reportDistribution" />
      </div>

      <div
        class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700"
      >
        <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-4">
          Inscrições por categoria
        </h2>
        <GraficoRosca :segments="reportEnrollments" :donut="false" />
      </div>

      <div
        class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700"
      >
        <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-4">
          Evolução de XP × Frequência
        </h2>
        <GraficoLinha :labels="xpEvolutionMonths" :series="xpSeries" />
      </div>

      <div
        class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700"
      >
        <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-4">
          Horas acumuladas por mês
        </h2>
        <GraficoBarras :labels="xpEvolutionMonths" :values="reportHoursByMonth" color="#2563eb" />
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

<style></style>
