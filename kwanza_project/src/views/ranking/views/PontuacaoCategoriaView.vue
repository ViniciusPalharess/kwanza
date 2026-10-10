<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-5"
  >
    <h2 class="font-bold text-lg text-slate-900 dark:text-white">Pontuação por categoria</h2>
    <p class="text-xs text-slate-400 dark:text-slate-500 mb-4">
      Soma dos registros de todos os participantes no período
    </p>
    <div class="space-y-3">
      <div v-for="cat in categorias" :key="cat.competency">
        <div class="flex items-center justify-between text-sm mb-1">
          <span class="font-medium text-slate-700 dark:text-slate-200">{{ cat.competency }}</span>
          <span class="font-semibold text-slate-500 dark:text-slate-400">{{ cat.points }} pts</span>
        </div>
        <div class="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div class="h-full bg-brand-600 rounded-full" :style="{ width: cat.pct + '%' }" />
        </div>
      </div>
      <p v-if="!categorias.length" class="text-sm text-slate-400 dark:text-slate-500">
        Nenhum registro de competência ainda.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({})
export default class PontuacaoCategoriaView extends Vue {
  // public
  @Prop({ type: Array, required: true })
  public categorias!: Array<{ competency: string; points: number; pct: number }>
}
</script>

<style></style>
