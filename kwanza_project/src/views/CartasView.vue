<script setup>
import { ref, computed } from 'vue'
import { FileText, Printer, Download } from 'lucide-vue-next'
import { useParticipantsStore } from '@/stores/participants'

const participantsStore = useParticipantsStore()
const selectedId = ref(participantsStore.list[0]?.id ?? null)

const selected = computed(() => participantsStore.list.find((p) => p.id === selectedId.value))

// Competências ilustrativas derivadas da pontuação, apenas para compor o texto da carta
function skillsFor(person) {
  if (!person) return []
  const base = person.score % 100
  return [
    { name: 'Comunicação', value: 40 + (base % 40) },
    { name: 'Liderança', value: 35 + ((base + 10) % 40) },
    { name: 'Oratória', value: 30 + ((base + 20) % 40) },
    { name: 'Resolução de Conflitos', value: 33 + ((base + 5) % 40) },
  ]
}

const letterSkills = computed(() => skillsFor(selected.value))
const today = new Date()
const dateLabel = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`

function printLetter() {
  window.print()
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Carta de Recomendação</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">Documento de destaque para vagas e oportunidades</p>
      </div>
      <select
        v-model.number="selectedId"
        class="border border-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg px-3 py-2 text-sm min-w-[200px]"
      >
        <option v-for="p in participantsStore.list" :key="p.id" :value="p.id">{{ p.name }}</option>
      </select>
    </div>

    <div v-if="selected" class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden max-w-3xl">
      <div class="h-24 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-800 flex items-center justify-between px-6">
        <div>
          <p class="text-white font-bold text-lg leading-tight">Kenya Club</p>
          <p class="text-brand-100 text-sm">Projeto Kwanza</p>
        </div>
        <FileText class="w-6 h-6 text-white/70" />
      </div>

      <div class="p-6 space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold shrink-0">
            {{ selected.initials }}
          </div>
          <div>
            <p class="font-bold text-slate-900 dark:text-white">{{ selected.name }}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">Nível {{ selected.level }} · {{ selected.levelName || 'Copa' }} · 120h de formação</p>
          </div>
        </div>

        <p class="font-bold text-slate-900 dark:text-white">A quem possa interessar,</p>

        <p class="text-slate-700 dark:text-slate-300">
          É com grande satisfação que o <strong>Kenya Club</strong>, através do <strong>Projeto Kwanza</strong>, recomenda
          <strong>{{ selected.name }}</strong>, participante exemplar do nosso programa de desenvolvimento juvenil.
        </p>

        <p class="text-slate-700 dark:text-slate-300">
          Ao longo de sua jornada, demonstrou notável evolução, acumulando <strong>{{ selected.score }} pontos</strong>,
          uma frequência de <strong>{{ selected.attendance }}%</strong> e destacando-se pelas seguintes competências:
        </p>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="skill in letterSkills"
            :key="skill.name"
            class="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300"
          >
            {{ skill.name }} · {{ skill.value }}
          </span>
        </div>

        <p class="text-slate-700 dark:text-slate-300">
          Trata-se de um(a) jovem comprometido(a), com forte espírito de liderança, comunicação clara e excelente
          trabalho em equipe. Recomendamos sem reservas para vagas de emprego, estágios e oportunidades de crescimento.
        </p>

        <div class="pt-4 border-t border-slate-100 dark:border-slate-700">
          <p class="font-semibold text-slate-800 dark:text-slate-100">Coordenação · Projeto Kwanza</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">Luanda, {{ dateLabel }}</p>
        </div>
      </div>

      <div class="flex justify-end gap-3 px-6 pb-6">
        <button
          type="button"
          class="flex items-center gap-2 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-semibold px-4 py-2 rounded-lg text-sm"
          @click="printLetter"
        >
          <Printer class="w-4 h-4" /> Imprimir
        </button>
        <button
          type="button"
          class="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-2 rounded-lg text-sm"
          @click="printLetter"
        >
          <Download class="w-4 h-4" /> Gerar PDF
        </button>
      </div>
    </div>
  </div>
</template>
