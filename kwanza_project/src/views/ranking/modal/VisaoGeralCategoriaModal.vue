<template>
  <Modal title="Pontuação por categoria" @close="$emit('fechar')">
    <p class="text-xs text-slate-400 dark:text-slate-500 -mt-2 mb-4">
      Soma dos registros de todos os participantes no período · {{ period }}
    </p>
    <div class="space-y-3">
      <div v-for="cat in categorias" :key="cat.competency">
        <div class="flex items-center justify-between text-sm mb-1">
          <span class="font-medium text-slate-700 dark:text-slate-200">{{ cat.competency }}</span>
          <span class="font-semibold text-slate-500 dark:text-slate-400">{{ cat.points }} pts</span>
        </div>
        <div class="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div class="h-full bg-brand-600 rounded-full" :style="{ width: cat.pct + '%' }" />
        </div>
      </div>
      <p v-if="!categorias.length" class="text-sm text-slate-400 dark:text-slate-500">
        Nenhum registro de competência ainda.
      </p>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Modal from '@/components/modal/Modal.vue'

@Component({
  components: { Modal },
  emits: ['fechar'],
})
export default class VisaoGeralCategoriaModal extends Vue {
  // public
  @Prop({ type: String, required: true })
  public period!: string
  // public
  @Prop({ type: Array, required: true })
  public categorias!: Array<{ competency: string; points: number; pct: number }>
}
</script>

<style></style>
