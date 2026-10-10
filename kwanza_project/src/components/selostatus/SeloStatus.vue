<template>
  <span
    class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold"
    :class="classes"
  >
    <span class="w-1.5 h-1.5 rounded-full" :class="dot" />
    {{ status }}
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({})
export default class SeloStatus extends Vue {
  // public
  @Prop({ type: String, required: true })
  public status!: string

  // private
  private stylesByStatus: Record<string, string> = {
    Ativo: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600',
    Emitido: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600',
    Inativo: 'bg-red-50 dark:bg-red-500/10 text-red-500',
    Pendente: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600',
    Elegível: 'bg-brand-50 dark:bg-brand-500/10 text-brand-600',
  }

  // private
  private dotByStatus: Record<string, string> = {
    Ativo: 'bg-emerald-500',
    Emitido: 'bg-emerald-500',
    Inativo: 'bg-red-500',
    Pendente: 'bg-amber-500',
    Elegível: 'bg-brand-500',
  }

  // public
  public get classes() {
    return (
      this.stylesByStatus[this.status] ||
      'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
    )
  }

  // public
  public get dot() {
    return this.dotByStatus[this.status] || 'bg-slate-400'
  }
}
</script>

<style></style>
