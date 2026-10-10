<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-5"
  >
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
      <h2 class="font-bold text-lg text-slate-900 dark:text-white">Participantes</h2>
      <div class="flex items-center gap-2">
        <div class="relative">
          <Search class="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            :value="search"
            type="text"
            placeholder="Buscar participante"
            class="pl-8 pr-3 py-1.5 text-sm border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg"
            @input="$emit('pesquisar', ($event.target as HTMLInputElement).value)"
          />
        </div>
        <button
          v-if="canEditScore"
          type="button"
          class="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition whitespace-nowrap"
          @click="$emit('registrarCompetencia', null)"
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
            v-for="person in participantes"
            :key="person.id"
            class="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/40"
            @click="$emit('selecionarParticipante', person)"
          >
            <td class="py-2.5 pr-2 text-slate-400 dark:text-slate-500">
              {{ ranking.indexOf(person) + 1 }}
            </td>
            <td class="py-2.5 pr-2">
              <div class="flex items-center gap-2">
                <div
                  class="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-[11px] font-semibold shrink-0"
                >
                  {{ person.initials }}
                </div>
                <span class="font-semibold text-slate-800 dark:text-slate-100">{{
                  person.name
                }}</span>
              </div>
            </td>
            <td class="py-2.5 pr-2 text-slate-600 dark:text-slate-300">
              {{ levelFor(person.score).name }}
            </td>
            <td class="py-2.5 pr-2 text-right font-bold text-slate-800 dark:text-slate-100">
              {{ person.score }}
            </td>
            <td class="py-2.5 text-right text-slate-600 dark:text-slate-300">
              {{ competencyCountFor(person.name) }}
            </td>
          </tr>
          <tr v-if="!participantes.length">
            <td colspan="5" class="py-6 text-center text-slate-400 dark:text-slate-500">
              Nenhum participante encontrado.
            </td>
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
}
</script>

<style></style>
