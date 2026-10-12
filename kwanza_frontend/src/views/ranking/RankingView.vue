<template>
  <div class="page">
    <div class="header">
      <div>
        <h1 class="title">Competências e Ranking</h1>
        <p class="subtitle">A jornada de evolução dos participantes do Projeto Kwanza</p>
      </div>
      <div class="controls">
        <campo-lista class="period-select" v-model="period" :opcoes="opcoesPeriodo" />

        <div class="menu-wrapper">
          <botao
            :acao="AcaoBotao.outro"
            somente-icone
            class="menu-button"
            title="Visões gerais do período"
            @click="showMenu = !showMenu"
          >
            <template #icone>
              <more-vertical class="menu-icon" />
            </template>
          </botao>

          <template v-if="showMenu">
            <div class="backdrop" @click="showMenu = false" />
            <div class="menu">
              <button type="button" class="menu-item" @click="openCategoryOverview">
                <bar-chart2 class="menu-item-icon" /> Pontuação por categoria (geral)
              </button>
              <button type="button" class="menu-item" @click="openHighlightsOverview">
                <star class="menu-item-icon" /> Destaques por competência
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>

    <podio-ranking-view
      :podium="podium"
      :podium-order="podiumOrder"
      :podium-heights="podiumHeights"
      :podium-rank="podiumRank"
      :level-for="levelFor"
      @selecionar-participante="openParticipant"
    />

    <lista-participantes-ranking-view
      :participantes="filteredParticipants"
      :ranking="ranking"
      :medals="medals"
      :can-edit-score="canEditScore"
      :search="search"
      :level-for="levelFor"
      :competency-count-for="competencyCountFor"
      @pesquisar="search = $event"
      @selecionar-participante="openParticipant"
      @registrar-competencia="openRegisterForm"
    />

    <detalhe-participante-modal
      v-if="selectedParticipant"
      :participant="selectedParticipant"
      :position="positionFor(selectedParticipant)"
      :medal="medals[positionFor(selectedParticipant) - 1] || null"
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

    <visao-geral-categoria-modal
      v-if="showCategoryOverview"
      :period="period"
      :categorias="globalPointsByCategory"
      @fechar="showCategoryOverview = false"
    />

    <visao-geral-destaques-modal
      v-if="showHighlightsOverview"
      :competency-names="competencyNames"
      :highlight-competency="highlightCompetency"
      :highlights="highlights"
      :medals="medals"
      @fechar="showHighlightsOverview = false"
      @selecionar-competencia="highlightCompetency = $event"
    />

    <registrar-competencia-modal
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
import { MoreVertical, BarChart2, Star } from 'lucide-vue-next'
import { Component, Vue } from 'vue-facing-decorator'
import { competencyCategories } from '@/data/dadosSimulados'
import { usePessoasStore } from '@/stores/pessoas'
import { useCompetenciasStore } from '@/stores/competencias'
import { useConfiguracoesStore } from '@/stores/configuracoes'
import Botao from '@/components/botao/Botao.vue'
import CampoLista from '@/components/campolista/CampoLista.vue'
import { AcaoBotao } from '@/enums/AcaoBotao'
import PodioRankingView from '@/views/ranking/views/PodioRankingView.vue'
import ListaParticipantesRankingView from '@/views/ranking/views/ListaParticipantesRankingView.vue'
import DetalheParticipanteModal from '@/views/ranking/modal/DetalheParticipanteModal.vue'
import RegistrarCompetenciaModal from '@/views/ranking/modal/RegistrarCompetenciaModal.vue'
import VisaoGeralCategoriaModal from '@/views/ranking/modal/VisaoGeralCategoriaModal.vue'
import VisaoGeralDestaquesModal from '@/views/ranking/modal/VisaoGeralDestaquesModal.vue'

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
    ListaParticipantesRankingView,
    DetalheParticipanteModal,
    RegistrarCompetenciaModal,
    VisaoGeralCategoriaModal,
    VisaoGeralDestaquesModal,
    MoreVertical,
    BarChart2,
    Star,
    Botao,
    CampoLista,
  },
})
export default class RankingView extends Vue {
  // public
  public AcaoBotao = AcaoBotao
  // public
  public competencyNames = competencyCategories.map((c) => c.name)

  // Período de avaliação: contexto único da tela. Ainda não há dados
  // segmentados por período no sistema, então por ora existe uma única opção.
  // public
  public period = '2026 — 1º Semestre'

  // public
  public podiumHeights: Record<number, string> = { 0: '4rem', 1: '6rem', 2: '3rem' }
  // public
  public podiumRank: Record<number, number> = { 0: 2, 1: 1, 2: 3 }
  // public
  public medals = ['🥇', '🥈', '🥉']

  // public
  public highlightCompetency = this.competencyNames[0]
  // public
  public search = ''

  // public
  public showMenu = false
  // public
  public showCategoryOverview = false
  // public
  public showHighlightsOverview = false

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
  public get opcoesPeriodo() {
    return [{ valor: this.period, texto: this.period }]
  }

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
  public positionFor(person: any) {
    return this.ranking.indexOf(person) + 1
  }

  // public
  public openCategoryOverview() {
    this.showCategoryOverview = true
    this.showMenu = false
  }

  // public
  public openHighlightsOverview() {
    this.showHighlightsOverview = true
    this.showMenu = false
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

.controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.period-select :deep(.campo-lista__select) {
  font-weight: 600;
}

.menu-wrapper {
  position: relative;
}

.menu-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.backdrop {
  position: fixed;
  inset: 0;
  z-index: 10;
}

.menu {
  position: absolute;
  right: 0;
  margin-top: 0.5rem;
  width: 16rem;
  background-color: var(--surface);
  border: 1px solid var(--border-subtle);
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  z-index: 20;
  padding: 0.375rem 0;
}

.menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-align: left;
  transition: background-color 0.15s ease;
}
.menu-item:hover {
  background-color: var(--surface-hover);
}

.menu-item-icon {
  width: 1rem;
  height: 1rem;
}
</style>
