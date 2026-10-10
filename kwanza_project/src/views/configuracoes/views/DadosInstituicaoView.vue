<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700"
  >
    <h2 class="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white mb-4">
      <Building2 class="w-5 h-5 text-brand-600" /> Dados da instituição
    </h2>
    <div class="flex items-center gap-3 mb-4">
      <div
        class="w-12 h-12 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold"
      >
        KC
      </div>
      <button
        type="button"
        class="flex items-center gap-2 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-sm font-semibold px-3 py-1.5 rounded-lg"
      >
        <Upload class="w-4 h-4" /> Alterar logo
      </button>
    </div>
    <div class="space-y-3">
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
          >Nome</label
        >
        <input
          v-model="institution.name"
          type="text"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2"
        />
      </div>
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
          >Projeto</label
        >
        <input
          v-model="institution.project"
          type="text"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2"
        />
      </div>
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
          >E-mail de contato</label
        >
        <input
          v-model="institution.email"
          type="email"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Building2, Upload } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  components: { Building2, Upload },
})
export default class DadosInstituicaoView extends Vue {
  // public
  @Prop({ type: Object, required: true })
  public institution!: { name: string; project: string; email: string }
}
</script>

<style></style>
