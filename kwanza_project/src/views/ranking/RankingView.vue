<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Competências e Ranking</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          A jornada de evolução dos participantes do Projeto Kwanza
        </p>
      </div>
      <select
        v-model="period"
        class="text-sm font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg px-3 py-2"
      >
        <option>{{ period }}</option>
      </select>
    </div>

    <PodioRankingView
      :podium="podium"
      :podium-order="podiumOrder"
      :podium-heights="podiumHeights"
      :podium-rank="podiumRank"
      :rest-of-ranking="restOfRanking"
      :level-for="levelFor"
      @selecionar-participante="openParticipant"
    />

    <div class="grid lg:grid-cols-2 gap-4">
      <PontuacaoCategoriaView :categorias="globalPointsByCategory" />

      <DestaquesCompetenciaView
        :competency-names="competencyNames"
        :highlight-competency="highlightCompetency"
        :highlights="highlights"
        :medals="medals"
        @selecionar-competencia="highlightCompetency = $event"
      />
    </div>

    <ListaParticipantesRankingView
      :participantes="filteredParticipants"
      :ranking="ranking"
      :can-edit-score="canEditScore"
      :search="search"
      :level-for="levelFor"
      :competency-count-for="competencyCountFor"
      @pesquisar="search = $event"
      @selecionar-participante="openParticipant"
      @registrar-competencia="openRegisterForm"
    />

    <DetalheParticipanteModal
      v-if="selectedParticipant"
      :participant="selectedParticipant"
      :history="participantHistory"
      :can-edit-score="canEditScore"
      :level-for="levelFor"
      :next-level-for="nextLevelFor"
      :level-progress="levelProgress"
      :competency-counts-for="competencyCountsFor"
      :points-by-category-for="pointsByCategoryFor"
      @fechar="closeParticipant"
      @registrar-competencia="openRegisterForm"
    />

    <RegistrarCompetenciaModal
      v-if="showRegisterForm"
      :form="form"
      :competency-names="competencyNames"
      :participant-names="participantsStore.participants.map((p) => p.name)"
      @fechar="showRegisterForm = false"
      @salvar="submitRegisterForm"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import { competencyCategories } from '@/data/dadosSimulados'
import { usePessoasStore } from '@/stores/pessoas'
import { useCompetenciasStore } from '@/stores/competencias'
import { useConfiguracoesStore } from '@/stores/configuracoes'
import PodioRankingView from '@/views/ranking/views/PodioRankingView.vue'
import PontuacaoCategoriaView from '@/views/ranking/views/PontuacaoCategoriaView.vue'
import DestaquesCompetenciaView from '@/views/ranking/views/DestaquesCompetenciaView.vue'
import ListaParticipantesRankingView from '@/views/ranking/views/ListaParticipantesRankingView.vue'
import DetalheParticipanteModal from '@/views/ranking/modal/DetalheParticipanteModal.vue'
import RegistrarCompetenciaModal from '@/views/ranking/modal/RegistrarCompetenciaModal.vue'

function todayLabel() {
  const d = new Date()
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

function parseDate(str: string) {
  const [d, m, y] = str.split('/').map(Number)
  return new Date(y, m - 1, d)
}

@Component({
  components: {
    PodioRankingView,
    PontuacaoCategoriaView,
    DestaquesCompetenciaView,
    ListaParticipantesRankingView,
    DetalheParticipanteModal,
    RegistrarCompetenciaModal,
  },
})
export default class RankingView extends Vue {
  // public
  public competencyNames = competencyCategories.map((c) => c.name)

  // Período de avaliação: contexto único da tela. Ainda não há dados
  // segmentados por período no sistema, então por ora existe uma única opção.
  // public
  public period = '2026 — 1º Semestre'

  // public
  public podiumHeights: Record<number, string> = { 0: 'h-16', 1: 'h-24', 2: 'h-12' }
  // public
  public podiumRank: Record<number, number> = { 0: 2, 1: 1, 2: 3 }
  // public
  public medals = ['🥇', '🥈', '🥉']

  // public
  public highlightCompetency = this.competencyNames[0]
  // public
  public search = ''

  // public
  public selectedParticipant: any = null

  // public
  public showRegisterForm = false
  // public
  public form = {
    name: '',
    competency: this.competencyNames[0],
    description: '',
    points: 10,
    date: '',
  }

  // public
  public participantsStore = usePessoasStore()
  // public
  public competencyStore = useCompetenciasStore()
  // private
  private settingsStore = useConfiguracoesStore()

  // Nível de evolução: usa exclusivamente os limiares já cadastrados em
  // Configurações (settingsStore.levels), sem inventar novas regras.
  // private
  private get sortedLevels() {
    return [...this.settingsStore.levels].sort((a, b) => a.xp - b.xp)
  }

  // Ranking: sempre derivado da pontuação atual dos participantes,
  // recalculado automaticamente (getter reativo, sem botão manual).
  // public
  public get ranking() {
    return this.participantsStore.sortedByScore
  }

  // public
  public get podium() {
    return this.ranking.slice(0, 3)
  }

  // public
  public get podiumOrder() {
    return [this.podium[1], this.podium[0], this.podium[2]]
  }

  // public
  public get restOfRanking() {
    return this.ranking.slice(3)
  }

  // Pontuação por categoria (visão geral do período, somando todos os
  // registros reais existentes)
  // public
  public get globalPointsByCategory() {
    const totals: Record<string, number> = {}
    this.competencyStore.logs.forEach((l) => {
      totals[l.competency] = (totals[l.competency] || 0) + l.points
    })
    const list = this.competencyNames
      .map((name) => ({ competency: name, points: totals[name] || 0 }))
      .filter((c) => c.points > 0)
      .sort((a, b) => b.points - a.points)
    const max = Math.max(1, ...list.map((c) => c.points))
    return list.map((c) => ({ ...c, pct: Math.round((c.points / max) * 100) }))
  }

  // Destaques por competência (participantes com mais registros na
  // competência selecionada)
  // public
  public get highlights() {
    const counts: Record<string, number> = {}
    this.competencyStore.logs
      .filter((l) => l.competency === this.highlightCompetency)
      .forEach((l) => {
        counts[l.name] = (counts[l.name] || 0) + 1
      })
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
  }

  // public
  public get filteredParticipants() {
    const term = this.search.trim().toLowerCase()
    if (!term) return this.ranking
    return this.ranking.filter((p) => p.name.toLowerCase().includes(term))
  }

  // public
  public get participantHistory() {
    if (!this.selectedParticipant) return []
    return [...this.logsFor(this.selectedParticipant.name)].sort(
      (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime(),
    )
  }

  // public
  public get canEditScore() {
    return this.settingsStore.permissions.editarPontuacao
  }

  // public
  public levelFor(score: number) {
    const levels = this.sortedLevels
    let current = levels[0]
    for (const lvl of levels) {
      if (score >= lvl.xp) current = lvl
    }
    return current
  }

  // public
  public nextLevelFor(score: number) {
    return this.sortedLevels.find((lvl) => lvl.xp > score) || null
  }

  // public
  public levelProgress(score: number) {
    const current = this.levelFor(score)
    const next = this.nextLevelFor(score)
    if (!next) return 100
    const span = next.xp - current.xp
    return span > 0 ? Math.min(100, Math.round(((score - current.xp) / span) * 100)) : 100
  }

  // public
  public competencyCountsFor(name: string) {
    const counts: Record<string, number> = {}
    this.logsFor(name).forEach((l) => {
      counts[l.competency] = (counts[l.competency] || 0) + 1
    })
    return Object.entries(counts)
      .map(([competency, count]) => ({ competency, count }))
      .sort((a, b) => b.count - a.count)
  }

  // public
  public pointsByCategoryFor(name: string) {
    const totals: Record<string, number> = {}
    this.logsFor(name).forEach((l) => {
      totals[l.competency] = (totals[l.competency] || 0) + l.points
    })
    return this.competencyNames
      .map((name2) => ({ competency: name2, points: totals[name2] || 0 }))
      .filter((c) => c.points > 0)
      .sort((a, b) => b.points - a.points)
  }

  // public
  public competencyCountFor(name: string) {
    return new Set(this.logsFor(name).map((l) => l.competency)).size
  }

  // public
  public openParticipant(person: any) {
    this.selectedParticipant = person
  }

  // public
  public closeParticipant() {
    this.selectedParticipant = null
  }

  // public
  public openRegisterForm(person: any) {
    Object.assign(this.form, {
      name: person?.name || '',
      competency: this.competencyNames[0],
      description: '',
      points: 10,
      date: todayLabel(),
    })
    this.showRegisterForm = true
  }

  // public
  public submitRegisterForm() {
    this.competencyStore.add({ ...this.form, points: Number(this.form.points) })
    this.showRegisterForm = false
    const updated = this.participantsStore.list.find((p) => p.name === this.form.name)
    if (updated && this.selectedParticipant?.name === this.form.name) {
      this.selectedParticipant = updated
    }
  }

  // private
  private logsFor(name: string) {
    return this.competencyStore.logs.filter((l) => l.name === name)
  }
}
</script>

<style></style>
