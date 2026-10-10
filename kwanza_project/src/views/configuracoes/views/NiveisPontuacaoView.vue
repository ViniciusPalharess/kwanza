<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700"
  >
    <h2 class="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white mb-4">
      <Trophy class="w-5 h-5 text-brand-600" /> Pontuação & Níveis
    </h2>
    <ul class="space-y-2 mb-4">
      <li
        v-for="level in levels"
        :key="level.id"
        class="flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-900 rounded-lg px-3 py-2"
      >
        <span class="text-sm font-medium text-slate-700 dark:text-slate-200">{{ level.name }}</span>
        <div class="flex items-center gap-2">
          <span
            class="text-xs font-semibold bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 px-2 py-0.5 rounded-full"
            >{{ level.xp }}+ XP</span
          >
          <button
            type="button"
            class="text-slate-400 hover:text-brand-600"
            @click="$emit('editar', level)"
          >
            <Pencil class="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            class="text-slate-400 hover:text-red-500"
            @click="$emit('excluir', level)"
          >
            <Trash2 class="w-3.5 h-3.5" />
          </button>
        </div>
      </li>
    </ul>
    <button
      type="button"
      class="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold py-2.5 rounded-lg transition"
      @click="$emit('criar')"
    >
      <Plus class="w-4 h-4" /> Adicionar nível
    </button>
  </div>
</template>

<script lang="ts">
import { Trophy, Pencil, Trash2, Plus } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  components: { Trophy, Pencil, Trash2, Plus },
  emits: ['criar', 'editar', 'excluir'],
})
export default class NiveisPontuacaoView extends Vue {
  // public
  @Prop({ type: Array, required: true })
  public levels!: Array<{ id: number; name: string; xp: number }>
}
</script>

<style></style>
