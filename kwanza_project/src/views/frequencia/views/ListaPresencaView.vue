<template>
  <div
    class="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-5"
  >
    <template v-if="hasDataForSelected">
      <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-1">
        Frequência — {{ selectedDateLabel }}
      </h2>
      <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">
        {{ selectedDaySummary.present }} presentes · {{ selectedDaySummary.absent }} ausentes ·
        {{ selectedDaySummary.rate }}%
      </p>

      <ul class="divide-y divide-slate-100 dark:divide-slate-700">
        <li v-for="item in itens" :key="item.person.id" class="flex items-center gap-3 py-3">
          <button
            type="button"
            class="flex items-center gap-3 flex-1 min-w-0 text-left"
            @click="$emit('selecionarParticipante', item.person)"
          >
            <img
              :src="item.person.avatarUrl || defaultAvatar"
              alt="Foto de perfil"
              class="w-9 h-9 rounded-full object-cover shrink-0"
            />
            <span class="min-w-0">
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                {{ item.person.name }}
              </p>
              <p class="text-xs text-slate-400 dark:text-slate-500">
                {{ item.stats.present }}/{{ item.stats.total }} · {{ item.person.attendance }}%
              </p>
            </span>
          </button>
          <div class="flex items-center gap-2 shrink-0">
            <button
              type="button"
              class="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
              :class="
                item.presente
                  ? 'bg-emerald-600 text-white'
                  : 'border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400'
              "
              @click="$emit('marcarPresente', item.person.id)"
            >
              <Check class="w-3.5 h-3.5" /> Presente
            </button>
            <button
              type="button"
              class="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition"
              :class="
                !item.presente
                  ? 'bg-red-500 text-white'
                  : 'border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400'
              "
              @click="$emit('marcarAusente', item.person.id)"
            >
              <X class="w-3.5 h-3.5" /> Ausente
            </button>
          </div>
        </li>
      </ul>
    </template>
    <div v-else class="min-h-[240px] flex items-center justify-center">
      <p class="text-sm text-slate-400 dark:text-slate-500 text-center px-6">
        Não há registros de presença para este dia.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Check, X } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import defaultAvatar from '@/assets/images/default-avatar.png'

@Component({
  components: { Check, X },
  emits: ['selecionarParticipante', 'marcarPresente', 'marcarAusente'],
})
export default class ListaPresencaView extends Vue {
  // public
  @Prop({ type: Boolean, required: true })
  public hasDataForSelected!: boolean
  // public
  @Prop({ type: String, required: true })
  public selectedDateLabel!: string
  // public
  @Prop({ type: Object, default: null })
  public selectedDaySummary!: {
    present: number
    absent: number
    total: number
    rate: number
  } | null
  // public
  @Prop({ type: Array, required: true })
  public itens!: Array<{
    person: any
    stats: { present: number; total: number }
    presente: boolean
  }>

  // public
  public defaultAvatar = defaultAvatar
}
</script>

<style></style>
