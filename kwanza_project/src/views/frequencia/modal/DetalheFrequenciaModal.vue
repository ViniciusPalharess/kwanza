<template>
  <Modal title="Frequência" @close="$emit('fechar')">
    <div class="flex items-center gap-3 mb-5">
      <img
        :src="participant.avatarUrl || defaultAvatar"
        alt="Foto de perfil"
        class="w-12 h-12 rounded-full object-cover"
      />
      <p class="font-bold text-lg text-slate-900 dark:text-white">
        {{ participant.name }}
      </p>
    </div>

    <p class="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Frequência geral</p>
    <p class="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-2">{{ rate }}%</p>
    <div class="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden mb-4">
      <div class="h-full bg-brand-600 rounded-full" :style="{ width: rate + '%' }" />
    </div>

    <div class="grid grid-cols-3 gap-2 text-center mb-5">
      <div>
        <p class="text-lg font-bold text-slate-800 dark:text-slate-100">{{ stats.present }}</p>
        <p class="text-xs text-slate-400 dark:text-slate-500">Presenças</p>
      </div>
      <div>
        <p class="text-lg font-bold text-slate-800 dark:text-slate-100">{{ stats.absent }}</p>
        <p class="text-xs text-slate-400 dark:text-slate-500">Ausências</p>
      </div>
      <div>
        <p class="text-lg font-bold text-slate-800 dark:text-slate-100">{{ stats.total }}</p>
        <p class="text-xs text-slate-400 dark:text-slate-500">Total</p>
      </div>
    </div>

    <hr class="border-slate-100 dark:border-slate-700 mb-4" />

    <p class="font-semibold text-sm text-slate-700 dark:text-slate-200 mb-2">Frequência por mês</p>
    <ul class="space-y-2 mb-5">
      <li v-for="m in monthly" :key="m.monthIndex" class="flex items-center gap-3">
        <span class="w-14 text-xs text-slate-500 dark:text-slate-400 shrink-0">{{ m.label }}</span>
        <div class="h-2 flex-1 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div class="h-full bg-brand-500 rounded-full" :style="{ width: m.rate + '%' }" />
        </div>
        <span class="w-10 text-xs text-slate-500 dark:text-slate-400 text-right shrink-0"
          >{{ m.rate }}%</span
        >
      </li>
    </ul>

    <hr class="border-slate-100 dark:border-slate-700 mb-4" />

    <p class="font-semibold text-sm text-slate-700 dark:text-slate-200 mb-2">Histórico</p>
    <ul class="max-h-48 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
      <li v-for="h in history" :key="h.day" class="flex items-center justify-between py-2 text-sm">
        <span class="text-slate-600 dark:text-slate-300">{{ h.label }}</span>
        <span
          class="flex items-center gap-1 font-semibold"
          :class="h.present ? 'text-emerald-600' : 'text-red-500'"
        >
          <Check v-if="h.present" class="w-3.5 h-3.5" />
          <X v-else class="w-3.5 h-3.5" />
          {{ h.present ? 'Presente' : 'Ausente' }}
        </span>
      </li>
    </ul>
  </Modal>
</template>

<script lang="ts">
import { Check, X } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Modal from '@/components/modal/Modal.vue'
import defaultAvatar from '@/assets/images/default-avatar.png'

@Component({
  components: { Modal, Check, X },
  emits: ['fechar'],
})
export default class DetalheFrequenciaModal extends Vue {
  // public
  @Prop({ type: Object, required: true })
  public participant!: any
  // public
  @Prop({ type: Object, required: true })
  public stats!: { present: number; absent: number; total: number }
  // public
  @Prop({ type: Number, required: true })
  public rate!: number
  // public
  @Prop({ type: Array, required: true })
  public monthly!: Array<{ monthIndex: number; rate: number; label: string }>
  // public
  @Prop({ type: Array, required: true })
  public history!: Array<{ day: number; label: string; present: boolean }>

  // public
  public defaultAvatar = defaultAvatar
}
</script>

<style></style>
