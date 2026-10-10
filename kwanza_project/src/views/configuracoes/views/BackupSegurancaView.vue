<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 lg:col-span-2"
  >
    <h2 class="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white mb-2">
      <DatabaseBackup class="w-5 h-5 text-brand-600" /> Backup & Segurança
    </h2>
    <p class="text-sm text-brand-600 dark:text-brand-400 mb-4">
      Último backup: {{ lastBackup }} · Auditoria ativa
    </p>
    <div class="flex gap-3">
      <button
        type="button"
        class="flex items-center gap-2 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-sm font-semibold px-4 py-2 rounded-lg"
        @click="$emit('fazerBackup')"
      >
        Fazer backup
      </button>
      <button
        type="button"
        class="flex items-center gap-2 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-sm font-semibold px-4 py-2 rounded-lg"
      >
        Restaurar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { DatabaseBackup } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  components: { DatabaseBackup },
  emits: ['fazerBackup'],
})
export default class BackupSegurancaView extends Vue {
  // public
  @Prop({ type: String, required: true })
  public lastBackup!: string
}
</script>

<style></style>
