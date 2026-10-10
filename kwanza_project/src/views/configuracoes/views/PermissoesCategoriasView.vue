<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700"
  >
    <h2 class="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white mb-4">
      <ShieldCheck class="w-5 h-5 text-brand-600" /> Permissões & Categorias
    </h2>
    <ul class="space-y-3">
      <li v-for="key in permissionKeys" :key="key" class="flex items-center justify-between">
        <span class="text-sm text-slate-700 dark:text-slate-200">
          {{ permissionLabels[key] }}
        </span>
        <button
          type="button"
          class="w-10 h-6 rounded-full transition"
          :class="permissions[key] ? 'bg-brand-600' : 'bg-slate-200 dark:bg-slate-600'"
          @click="permissions[key] = !permissions[key]"
        >
          <span
            class="block w-5 h-5 bg-white rounded-full shadow transition-transform"
            :class="permissions[key] ? 'translate-x-4' : 'translate-x-0.5'"
          />
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ShieldCheck } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  components: { ShieldCheck },
})
export default class PermissoesCategoriasView extends Vue {
  // public
  @Prop({ type: Array, required: true })
  public permissionKeys!: string[]
  // public
  @Prop({ type: Object, required: true })
  public permissionLabels!: Record<string, string>
  // public
  @Prop({ type: Object, required: true })
  public permissions!: Record<string, boolean>
}
</script>

<style></style>
