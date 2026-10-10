<template>
  <div class="space-y-3">
    <div
      class="hidden md:grid grid-cols-[minmax(0,1fr)_120px_110px_80px_90px_160px_90px] gap-2 px-5 text-xs font-semibold text-slate-400 uppercase"
    >
      <span>Pessoa</span>
      <span>Tipo</span>
      <span>Telefone</span>
      <span>Nível</span>
      <span>Pontos</span>
      <span>Frequência</span>
      <span class="text-right">Ações</span>
    </div>

    <div
      v-for="person in pessoas"
      :key="person.id"
      class="grid grid-cols-2 md:grid-cols-[minmax(0,1fr)_120px_110px_80px_90px_160px_90px] items-center gap-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 px-5 py-3.5 cursor-pointer hover:border-brand-200 dark:hover:border-brand-500/40 transition"
      @click="$emit('visualizar', person)"
    >
      <div class="col-span-2 md:col-span-1 flex items-center gap-3 min-w-0">
        <img
          :src="person.avatarUrl || defaultAvatar"
          alt="Foto de perfil"
          class="w-9 h-9 rounded-full object-cover shrink-0"
        />
        <div class="min-w-0">
          <p class="font-semibold text-slate-800 dark:text-slate-100 truncate">
            {{ person.name }}
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
            {{ emailFor(person.name) }}
          </p>
        </div>
      </div>
      <span>
        <span
          class="text-xs font-semibold px-2 py-0.5 rounded-full"
          :class="roleBadgeClass[person.role]"
          >{{ person.role }}</span
        >
      </span>
      <span class="text-slate-600 dark:text-slate-300 text-sm whitespace-nowrap">{{
        person.phone || '—'
      }}</span>
      <span>
        <span
          v-if="person.role === 'Participante'"
          class="text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full"
          >Nv {{ person.level }}</span
        >
        <span v-else class="text-slate-400">—</span>
      </span>
      <span class="font-semibold text-slate-800 dark:text-slate-100">{{
        person.role === 'Participante' ? person.score : '—'
      }}</span>
      <div v-if="person.role === 'Participante'" class="flex items-center gap-2">
        <div class="h-1.5 flex-1 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            class="h-full bg-brand-600 rounded-full"
            :style="{ width: person.attendance + '%' }"
          />
        </div>
        <span class="text-xs text-slate-500 dark:text-slate-400 w-9 text-right"
          >{{ person.attendance }}%</span
        >
      </div>
      <span v-else class="text-slate-400">—</span>
      <div class="flex items-center justify-end gap-3 text-slate-400">
        <button type="button" class="hover:text-brand-600" @click.stop="$emit('editar', person)">
          <Pencil class="w-4 h-4" />
        </button>
        <button type="button" class="hover:text-red-500" @click.stop="$emit('excluir', person)">
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Pencil, Trash2 } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import { emailFor } from '@/data/dadosSimulados'
import defaultAvatar from '@/assets/images/default-avatar.png'

@Component({
  components: { Pencil, Trash2 },
  emits: ['visualizar', 'editar', 'excluir'],
})
export default class ListaPessoasView extends Vue {
  // public
  @Prop({ type: Array, required: true })
  public pessoas!: any[]
  // public
  @Prop({ type: Object, required: true })
  public roleBadgeClass!: Record<string, string>

  // public
  public emailFor = emailFor
  // public
  public defaultAvatar = defaultAvatar
}
</script>

<style></style>
