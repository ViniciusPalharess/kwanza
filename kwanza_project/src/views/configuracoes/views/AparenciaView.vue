<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700"
  >
    <h2 class="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white mb-4">
      <Moon class="w-5 h-5 text-brand-600" /> Aparência
    </h2>
    <div class="flex items-center justify-between">
      <span class="text-sm text-slate-700 dark:text-slate-200">Modo escuro</span>
      <button
        type="button"
        class="w-10 h-6 rounded-full transition"
        :class="dark ? 'bg-brand-600' : 'bg-slate-200 dark:bg-slate-600'"
        @click="$emit('alternar')"
      >
        <span
          class="block w-5 h-5 bg-white rounded-full shadow transition-transform"
          :class="dark ? 'translate-x-4' : 'translate-x-0.5'"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Moon } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  components: { Moon },
  emits: ['alternar'],
})
export default class AparenciaView extends Vue {
  // public
  @Prop({ type: Boolean, required: true })
  public dark!: boolean
}
</script>

<style></style>
