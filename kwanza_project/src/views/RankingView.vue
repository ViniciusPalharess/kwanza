<script setup>
import { ref, reactive, computed } from 'vue'
import { Crown, Search, Plus, TrendingUp, MoreVertical, BarChart2, Star } from 'lucide-vue-next'
import { competencyCategories } from '@/data/mockData'
import { useParticipantsStore } from '@/stores/participants'
import { useCompetencyStore } from '@/stores/competencies'
import { useSettingsStore } from '@/stores/settings'
import Modal from '@/components/ui/Modal.vue'

const participantsStore = useParticipantsStore()
const competencyStore = useCompetencyStore()
const settingsStore = useSettingsStore()

const competencyNames = competencyCategories.map((c) => c.name)

// Período de avaliação: contexto único da tela. Ainda não há dados
// segmentados por período no sistema, então por ora existe uma única opção.
const period = ref('2026 — 1º Semestre')

// ---- Visões gerais (agregadas de todos os participantes): ficam fora do
// fluxo principal da tela, acessíveis pelo menu de opções, para manter o
// foco da tela no ranking único de participantes. ----
const showMenu = ref(false)
const showCategoryOverview = ref(false)
const showHighlightsOverview = ref(false)

// ---- Nível de evolução: usa exclusivamente os limiares já cadastrados
// em Configurações (settingsStore.levels), sem inventar novas regras. ----
const sortedLevels = computed(() => [...settingsStore.levels].sort((a, b) => a.xp - b.xp))
function levelFor(score) {
  const levels = sortedLevels.value
  let current = levels[0]
  for (const lvl of levels) {
    if (score >= lvl.xp) current = lvl
  }
  return current
}
function nextLevelFor(score) {
  return sortedLevels.value.find((lvl) => lvl.xp > score) || null
}
function levelProgress(score) {
  const current = levelFor(score)
  const next = nextLevelFor(score)
  if (!next) return 100
  const span = next.xp - current.xp
  return span > 0 ? Math.min(100, Math.round(((score - current.xp) / span) * 100)) : 100
}

// ---- Ranking: sempre derivado da pontuação atual dos participantes,
// recalculado automaticamente (getter reativo, sem botão manual). ----
const ranking = computed(() => participantsStore.sortedByScore)
const podium = computed(() => ranking.value.slice(0, 3))
const podiumOrder = computed(() => [podium.value[1], podium.value[0], podium.value[2]])
const podiumHeights = { 0: 'h-16', 1: 'h-24', 2: 'h-12' }
const podiumRank = { 0: 2, 1: 1, 2: 3 }
const medals = ['🥇', '🥈', '🥉']
function positionFor(person) {
  return ranking.value.indexOf(person) + 1
}

// ---- Competências por participante (a partir dos registros reais) ----
function logsFor(name) {
  return competencyStore.logs.filter((l) => l.name === name)
}
function competencyCountsFor(name) {
  const counts = {}
  logsFor(name).forEach((l) => {
    counts[l.competency] = (counts[l.competency] || 0) + 1
  })
  return Object.entries(counts)
    .map(([competency, count]) => ({ competency, count }))
    .sort((a, b) => b.count - a.count)
}
function pointsByCategoryFor(name) {
  const totals = {}
  logsFor(name).forEach((l) => {
    totals[l.competency] = (totals[l.competency] || 0) + l.points
  })
  return competencyNames
    .map((name2) => ({ competency: name2, points: totals[name2] || 0 }))
    .filter((c) => c.points > 0)
    .sort((a, b) => b.points - a.points)
}
function competencyCountFor(name) {
  return new Set(logsFor(name).map((l) => l.competency)).size
}

// ---- Pontuação por categoria (visão geral do período, somando todos os
// registros reais existentes) ----
const globalPointsByCategory = computed(() => {
  const totals = {}
  competencyStore.logs.forEach((l) => {
    totals[l.competency] = (totals[l.competency] || 0) + l.points
  })
  const list = competencyNames
    .map((name) => ({ competency: name, points: totals[name] || 0 }))
    .filter((c) => c.points > 0)
    .sort((a, b) => b.points - a.points)
  const max = Math.max(1, ...list.map((c) => c.points))
  return list.map((c) => ({ ...c, pct: Math.round((c.points / max) * 100) }))
})

// ---- Destaques por competência (participantes com mais registros na
// competência selecionada) ----
const highlightCompetency = ref(competencyNames[0])
const highlights = computed(() => {
  const counts = {}
  competencyStore.logs
    .filter((l) => l.competency === highlightCompetency.value)
    .forEach((l) => {
      counts[l.name] = (counts[l.name] || 0) + 1
    })
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
})

// ---- Lista de participantes com busca ----
const search = ref('')
const filteredParticipants = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return ranking.value
  return ranking.value.filter((p) => p.name.toLowerCase().includes(term))
})

// ---- Modal de detalhe do participante ----
const selectedParticipant = ref(null)
const showHistory = ref(false)
function openParticipant(person) {
  selectedParticipant.value = person
  showHistory.value = false
}
function closeParticipant() {
  selectedParticipant.value = null
  showHistory.value = false
}
function parseDate(str) {
  const [d, m, y] = str.split('/').map(Number)
  return new Date(y, m - 1, d)
}
const participantHistory = computed(() => {
  if (!selectedParticipant.value) return []
  return [...logsFor(selectedParticipant.value.name)].sort((a, b) => parseDate(b.date) - parseDate(a.date))
})

// ---- Registrar competência ----
const canEditScore = computed(() => settingsStore.permissions.editarPontuacao)
const showRegisterForm = ref(false)
const form = reactive({ name: '', competency: competencyNames[0], description: '', points: 10, date: '' })
function todayLabel() {
  const d = new Date()
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}
function openRegisterForm(person) {
  Object.assign(form, {
    name: person?.name || '',
    competency: competencyNames[0],
    description: '',
    points: 10,
    date: todayLabel(),
  })
  showRegisterForm.value = true
}
function submitRegisterForm() {
  competencyStore.add({ ...form, points: Number(form.points) })
  showRegisterForm.value = false
  const updated = participantsStore.list.find((p) => p.name === form.name)
  if (updated && selectedParticipant.value?.name === form.name) {
    selectedParticipant.value = updated
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Competências e Ranking</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">A jornada de evolução dos participantes do Projeto Kwanza</p>
      </div>
      <div class="flex items-center gap-2">
        <select
          v-model="period"
          class="text-sm font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg px-3 py-2"
        >
          <option>{{ period }}</option>
        </select>

        <div class="relative">
          <button
            type="button"
            class="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            title="Visões gerais do período"
            @click="showMenu = !showMenu"
          >
            <MoreVertical class="w-5 h-5" />
          </button>

          <template v-if="showMenu">
            <div class="fixed inset-0 z-10" @click="showMenu = false" />
            <div class="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg z-20 py-1.5">
              <button
                type="button"
                class="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-left"
                @click="showCategoryOverview = true; showMenu = false"
              >
                <BarChart2 class="w-4 h-4" /> Pontuação por categoria (geral)
              </button>
              <button
                type="button"
                class="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-left"
                @click="showHighlightsOverview = true; showMenu = false"
              >
                <Star class="w-4 h-4" /> Destaques por competência
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Ranking: destaque visual principal -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
      <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-4">Ranking</h2>

      <div v-if="podium[0]" class="flex justify-center items-end gap-6 mb-4">
        <button
          v-for="(person, index) in podiumOrder"
          :key="person.id"
          type="button"
          class="flex flex-col items-center"
          @click="openParticipant(person)"
        >
          <Crown v-if="podiumRank[index] === 1" class="w-5 h-5 text-amber-400 mb-1" />
          <div class="relative">
            <div
              class="rounded-full bg-brand-600 text-white flex items-center justify-center font-bold"
              :class="podiumRank[index] === 1 ? 'w-16 h-16 text-lg' : 'w-12 h-12 text-sm'"
            >
              {{ person.initials }}
            </div>
            <span class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] font-bold flex items-center justify-center text-slate-600 dark:text-slate-200">
              {{ podiumRank[index] }}
            </span>
          </div>
          <p class="text-xs font-semibold text-center mt-2 text-slate-800 dark:text-slate-100">{{ person.name }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ levelFor(person.score).name }}</p>
          <p class="text-xs text-brand-600 dark:text-brand-400 font-bold">{{ person.score }} pts</p>
          <div class="w-16 rounded-t-lg bg-gradient-to-b from-brand-100 to-brand-50 dark:from-brand-800 dark:to-brand-900 mt-2" :class="podiumHeights[index]" />
        </button>
      </div>
      <p v-else class="text-sm text-slate-400 dark:text-slate-500 text-center py-4">Nenhum participante pontuado ainda.</p>
    </div>

    <!-- Participantes -->
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-5">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 class="font-bold text-lg text-slate-900 dark:text-white">Participantes</h2>
        <div class="flex items-center gap-2">
          <div class="relative">
            <Search class="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              v-model="search"
              type="text"
              placeholder="Buscar participante"
              class="pl-8 pr-3 py-1.5 text-sm border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg"
            />
          </div>
          <button
            v-if="canEditScore"
            type="button"
            class="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition whitespace-nowrap"
            @click="openRegisterForm(null)"
          >
            <Plus class="w-4 h-4" /> Registrar competência
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-slate-400 dark:text-slate-500 uppercase">
              <th class="pb-2 pr-2">#</th>
              <th class="pb-2 pr-2">Participante</th>
              <th class="pb-2 pr-2">Nível</th>
              <th class="pb-2 pr-2 text-right">Pontos</th>
              <th class="pb-2 text-right">Competências</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
            <tr
              v-for="person in filteredParticipants"
              :key="person.id"
              class="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/40"
              @click="openParticipant(person)"
            >
              <td class="py-2.5 pr-2 text-slate-400 dark:text-slate-500">
                <span v-if="medals[positionFor(person) - 1]">{{ medals[positionFor(person) - 1] }}</span>
                <span v-else>{{ positionFor(person) }}</span>
              </td>
              <td class="py-2.5 pr-2">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-[11px] font-semibold shrink-0">
                    {{ person.initials }}
                  </div>
                  <span class="font-semibold text-slate-800 dark:text-slate-100">{{ person.name }}</span>
                </div>
              </td>
              <td class="py-2.5 pr-2 text-slate-600 dark:text-slate-300">{{ levelFor(person.score).name }}</td>
              <td class="py-2.5 pr-2 text-right font-bold text-slate-800 dark:text-slate-100">{{ person.score }}</td>
              <td class="py-2.5 text-right text-slate-600 dark:text-slate-300">{{ competencyCountFor(person.name) }}</td>
            </tr>
            <tr v-if="!filteredParticipants.length">
              <td colspan="5" class="py-6 text-center text-slate-400 dark:text-slate-500">Nenhum participante encontrado.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de detalhe do participante: ficha de evolução (ranking + competências) -->
    <Modal v-if="selectedParticipant" :title="selectedParticipant.name" max-width="max-w-xl" @close="closeParticipant">
      <div class="space-y-5">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span
              v-if="medals[positionFor(selectedParticipant) - 1]"
              class="text-lg leading-none"
            >{{ medals[positionFor(selectedParticipant) - 1] }}</span>
            <span class="text-sm font-semibold text-slate-500 dark:text-slate-400">{{ positionFor(selectedParticipant) }}º no ranking</span>
          </div>
          <div class="flex items-center justify-between mb-1">
            <p class="text-sm font-semibold text-slate-700 dark:text-slate-200">{{ levelFor(selectedParticipant.score).name }}</p>
            <p class="text-sm font-bold text-slate-800 dark:text-slate-100">{{ selectedParticipant.score }} pontos</p>
          </div>
          <div class="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <div class="h-full bg-brand-600 rounded-full" :style="{ width: levelProgress(selectedParticipant.score) + '%' }" />
          </div>
          <p v-if="nextLevelFor(selectedParticipant.score)" class="text-xs text-slate-400 dark:text-slate-500 mt-1">
            {{ selectedParticipant.score }} / {{ nextLevelFor(selectedParticipant.score).xp }} pts para {{ nextLevelFor(selectedParticipant.score).name }}
          </p>
          <p v-else class="text-xs text-slate-400 dark:text-slate-500 mt-1">Nível máximo alcançado</p>
        </div>

        <hr class="border-slate-100 dark:border-slate-700" />

        <div>
          <p class="text-sm font-bold text-slate-900 dark:text-white mb-2">Competências</p>
          <ul class="space-y-1.5">
            <li v-for="c in competencyCountsFor(selectedParticipant.name)" :key="c.competency" class="flex items-center justify-between text-sm">
              <span class="text-slate-600 dark:text-slate-300">{{ c.competency }}</span>
              <span class="font-semibold text-slate-800 dark:text-slate-100">{{ c.count }}</span>
            </li>
            <li v-if="!competencyCountsFor(selectedParticipant.name).length" class="text-sm text-slate-400 dark:text-slate-500">Nenhum registro ainda.</li>
          </ul>
        </div>

        <hr class="border-slate-100 dark:border-slate-700" />

        <div>
          <p class="text-sm font-bold text-slate-900 dark:text-white mb-2">Pontuação por categoria</p>
          <ul class="space-y-1.5">
            <li v-for="c in pointsByCategoryFor(selectedParticipant.name)" :key="c.competency" class="flex items-center justify-between text-sm">
              <span class="text-slate-600 dark:text-slate-300">{{ c.competency }}</span>
              <span class="font-semibold text-slate-800 dark:text-slate-100">{{ c.points }} pts</span>
            </li>
            <li v-if="!pointsByCategoryFor(selectedParticipant.name).length" class="text-sm text-slate-400 dark:text-slate-500">Nenhum registro ainda.</li>
          </ul>
        </div>

        <hr class="border-slate-100 dark:border-slate-700" />

        <div v-if="!showHistory" class="flex justify-center gap-2">
          <button
            v-if="canEditScore"
            type="button"
            class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-semibold text-slate-600 dark:text-slate-300"
            @click="openRegisterForm(selectedParticipant)"
          >
            + Registrar competência
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold"
            @click="showHistory = true"
          >
            Ver histórico
          </button>
        </div>

        <div v-else>
          <p class="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
            <TrendingUp class="w-4 h-4 text-brand-600" /> Histórico
          </p>
          <ul class="divide-y divide-slate-100 dark:divide-slate-700 max-h-64 overflow-y-auto">
            <li v-for="log in participantHistory" :key="log.id" class="py-2.5">
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-slate-400 dark:text-slate-500 w-14 shrink-0">{{ log.date }}</span>
                <span class="text-sm font-semibold" :style="{ color: log.color }">{{ log.competency }}</span>
              </div>
              <p class="text-sm text-slate-600 dark:text-slate-300 mt-0.5 pl-16">{{ log.description }}</p>
            </li>
            <li v-if="!participantHistory.length" class="py-4 text-sm text-slate-400 dark:text-slate-500">Nenhum registro ainda.</li>
          </ul>
        </div>
      </div>
    </Modal>

    <!-- Visão geral: Pontuação por categoria (todos os participantes) -->
    <Modal v-if="showCategoryOverview" title="Pontuação por categoria" @close="showCategoryOverview = false">
      <p class="text-xs text-slate-400 dark:text-slate-500 -mt-2 mb-4">Soma dos registros de todos os participantes no período · {{ period }}</p>
      <div class="space-y-3">
        <div v-for="cat in globalPointsByCategory" :key="cat.competency">
          <div class="flex items-center justify-between text-sm mb-1">
            <span class="font-medium text-slate-700 dark:text-slate-200">{{ cat.competency }}</span>
            <span class="font-semibold text-slate-500 dark:text-slate-400">{{ cat.points }} pts</span>
          </div>
          <div class="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <div class="h-full bg-brand-600 rounded-full" :style="{ width: cat.pct + '%' }" />
          </div>
        </div>
        <p v-if="!globalPointsByCategory.length" class="text-sm text-slate-400 dark:text-slate-500">Nenhum registro de competência ainda.</p>
      </div>
    </Modal>

    <!-- Visão geral: Destaques por competência (todos os participantes) -->
    <Modal v-if="showHighlightsOverview" title="Destaques por competência" @close="showHighlightsOverview = false">
      <select
        v-model="highlightCompetency"
        class="w-full text-sm border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 mb-4"
      >
        <option v-for="name in competencyNames" :key="name" :value="name">{{ name }}</option>
      </select>
      <ul class="space-y-2">
        <li v-for="(item, index) in highlights" :key="item.name" class="flex items-center gap-2 text-sm">
          <span>{{ medals[index] }}</span>
          <span class="flex-1 font-medium text-slate-700 dark:text-slate-200">{{ item.name }}</span>
          <span class="text-slate-500 dark:text-slate-400">{{ item.count }} registro{{ item.count === 1 ? '' : 's' }}</span>
        </li>
        <li v-if="!highlights.length" class="text-sm text-slate-400 dark:text-slate-500">Nenhum registro para esta competência ainda.</li>
      </ul>
    </Modal>

    <!-- Registrar competência -->
    <Modal v-if="showRegisterForm" title="Registrar competência" @close="showRegisterForm = false">
      <form class="space-y-3" @submit.prevent="submitRegisterForm">
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Participante</label>
          <input v-model="form.name" required list="participant-options" type="text" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
          <datalist id="participant-options">
            <option v-for="p in participantsStore.participants" :key="p.id" :value="p.name" />
          </datalist>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Competência</label>
            <select v-model="form.competency" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2">
              <option v-for="name in competencyNames" :key="name" :value="name">{{ name }}</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Data</label>
            <input v-model="form.date" type="text" placeholder="dd/mm/aaaa" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
          </div>
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Pontos</label>
          <input v-model="form.points" type="number" min="0" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Observação</label>
          <textarea v-model="form.description" rows="2" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2" />
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button type="button" class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300" @click="showRegisterForm = false">Cancelar</button>
          <button type="submit" class="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold">Salvar</button>
        </div>
      </form>
    </Modal>
  </div>
</template>
