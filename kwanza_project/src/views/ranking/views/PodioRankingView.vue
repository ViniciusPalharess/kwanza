<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm p-6"
  >
    <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-4">Ranking</h2>

    <div v-if="podium[0]" class="flex justify-center items-end gap-6 mb-4">
      <button
        v-for="(person, index) in podiumOrder"
        :key="person.id"
        type="button"
        class="flex flex-col items-center"
        @click="$emit('selecionarParticipante', person)"
      >
        <Crown v-if="podiumRank[index] === 1" class="w-5 h-5 text-amber-400 mb-1" />
        <div class="relative">
          <div
            class="rounded-full bg-brand-600 text-white flex items-center justify-center font-bold"
            :class="podiumRank[index] === 1 ? 'w-16 h-16 text-lg' : 'w-12 h-12 text-sm'"
          >
            {{ person.initials }}
          </div>
          <span
            class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] font-bold flex items-center justify-center text-slate-600 dark:text-slate-200"
          >
            {{ podiumRank[index] }}
          </span>
        </div>
        <p class="text-xs font-semibold text-center mt-2 text-slate-800 dark:text-slate-100">
          {{ person.name }}
        </p>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          {{ levelFor(person.score).name }}
        </p>
        <p class="text-xs text-brand-600 dark:text-brand-400 font-bold">{{ person.score }} pts</p>
        <div
          class="w-16 rounded-t-lg bg-gradient-to-b from-brand-100 to-brand-50 dark:from-brand-800 dark:to-brand-900 mt-2"
          :class="podiumHeights[index]"
        />
      </button>
    </div>

    <ul class="divide-y divide-slate-100 dark:divide-slate-700">
      <li v-for="(person, index) in restOfRanking" :key="person.id">
        <button
          type="button"
          class="w-full flex items-center gap-3 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700/40 rounded-lg px-2"
          @click="$emit('selecionarParticipante', person)"
        >
          <span class="w-6 text-sm font-semibold text-slate-400 dark:text-slate-500">{{
            index + 4
          }}</span>
          <div
            class="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-semibold shrink-0"
          >
            {{ person.initials }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
              {{ person.name }}
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              {{ levelFor(person.score).name }}
            </p>
          </div>
          <span class="text-sm font-bold text-slate-800 dark:text-slate-100"
            >{{ person.score }} pts</span
          >
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Crown } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  components: { Crown },
  emits: ['selecionarParticipante'],
})
export default class PodioRankingView extends Vue {
  // public
  @Prop({ type: Array, required: true })
  public podium!: any[]
  // public
  @Prop({ type: Array, required: true })
  public podiumOrder!: any[]
  // public
  @Prop({ type: Object, required: true })
  public podiumHeights!: Record<number, string>
  // public
  @Prop({ type: Object, required: true })
  public podiumRank!: Record<number, number>
  // public
  @Prop({ type: Array, required: true })
  public restOfRanking!: any[]
  // public
  @Prop({ type: Function, required: true })
  public levelFor!: (score: number) => { name: string; xp: number }
}
</script>

<style></style>
