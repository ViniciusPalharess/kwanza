<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700"
  >
    <div class="flex items-center justify-between mb-4">
      <h2 class="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
        <Users class="w-5 h-5 text-brand-600" /> Usuários & Permissões
      </h2>
      <button
        type="button"
        class="text-brand-600 dark:text-brand-400 text-sm font-semibold flex items-center gap-1"
        @click="$emit('criar')"
      >
        <Plus class="w-4 h-4" /> Adicionar
      </button>
    </div>
    <ul class="space-y-2">
      <li
        v-for="user in users"
        :key="user.id"
        class="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 rounded-lg px-3 py-2"
      >
        <div
          class="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-semibold shrink-0"
        >
          {{ user.initials }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
            {{ user.name }}
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ user.role }}</p>
        </div>
        <span
          class="text-xs font-semibold px-2 py-0.5 rounded-full"
          :class="roleColors[user.role]"
          >{{ user.role }}</span
        >
        <button
          type="button"
          class="text-slate-400 hover:text-brand-600"
          @click="$emit('editar', user)"
        >
          <Pencil class="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          class="text-slate-400 hover:text-red-500"
          @click="$emit('excluir', user)"
        >
          <Trash2 class="w-3.5 h-3.5" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Users, Pencil, Trash2, Plus } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  components: { Users, Pencil, Trash2, Plus },
  emits: ['criar', 'editar', 'excluir'],
})
export default class UsuariosPermissoesView extends Vue {
  // public
  @Prop({ type: Array, required: true })
  public users!: Array<{ id: number; name: string; initials: string; role: string }>
  // public
  @Prop({ type: Object, required: true })
  public roleColors!: Record<string, string>
}
</script>

<style></style>
