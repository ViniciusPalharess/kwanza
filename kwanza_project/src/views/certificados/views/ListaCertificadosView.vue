<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700"
  >
    <div class="flex items-center justify-between px-5 pt-5">
      <h2 class="font-bold text-lg text-slate-900 dark:text-white">Todos os certificados</h2>
      <button
        type="button"
        class="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition"
        @click="$emit('criar')"
      >
        <Plus class="w-4 h-4" /> Emitir
      </button>
    </div>

    <div class="overflow-x-auto mt-3">
      <table class="w-full text-sm">
        <thead>
          <tr
            class="text-left text-xs text-slate-400 uppercase border-y border-slate-100 dark:border-slate-700"
          >
            <th class="px-5 py-3 font-semibold">Participante</th>
            <th class="px-5 py-3 font-semibold">Curso</th>
            <th class="px-5 py-3 font-semibold">Carga</th>
            <th class="px-5 py-3 font-semibold">Data</th>
            <th class="px-5 py-3 font-semibold">Status</th>
            <th class="px-5 py-3 font-semibold text-right">Ações</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
          <tr v-for="cert in certificados" :key="cert.id">
            <td class="px-5 py-3 font-semibold text-slate-800 dark:text-slate-100">
              {{ cert.name }}
            </td>
            <td class="px-5 py-3 text-brand-600 dark:text-brand-400">{{ cert.course }}</td>
            <td class="px-5 py-3 text-slate-600 dark:text-slate-300">{{ cert.hours }}h</td>
            <td class="px-5 py-3 text-slate-500 dark:text-slate-400">{{ cert.date ?? '—' }}</td>
            <td class="px-5 py-3"><SeloStatus :status="cert.status" /></td>
            <td class="px-5 py-3">
              <div class="flex items-center justify-end gap-3 text-slate-400">
                <button
                  type="button"
                  class="hover:text-brand-600"
                  @click="$emit('visualizar', cert)"
                >
                  <Eye class="w-4 h-4" />
                </button>
                <button type="button" class="hover:text-brand-600" @click="$emit('editar', cert)">
                  <Pencil class="w-4 h-4" />
                </button>
                <button type="button" class="hover:text-red-500" @click="$emit('excluir', cert)">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Plus, Eye, Pencil, Trash2 } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import SeloStatus from '@/components/selostatus/SeloStatus.vue'

@Component({
  components: { SeloStatus, Plus, Eye, Pencil, Trash2 },
  emits: ['criar', 'visualizar', 'editar', 'excluir'],
})
export default class ListaCertificadosView extends Vue {
  // public
  @Prop({ type: Array, required: true })
  public certificados!: any[]
}
</script>

<style></style>
