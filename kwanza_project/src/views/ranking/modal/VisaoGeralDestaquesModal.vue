<template>
  <Modal title="Destaques por competência" @close="$emit('fechar')">
    <select
      :value="highlightCompetency"
      class="w-full text-sm border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 mb-4"
      @change="$emit('selecionarCompetencia', ($event.target as HTMLSelectElement).value)"
    >
      <option v-for="name in competencyNames" :key="name" :value="name">{{ name }}</option>
    </select>
    <ul class="space-y-2">
      <li
        v-for="(item, index) in highlights"
        :key="item.name"
        class="flex items-center gap-2 text-sm"
      >
        <span>{{ medals[index] }}</span>
        <span class="flex-1 font-medium text-slate-700 dark:text-slate-200">{{ item.name }}</span>
        <span class="text-slate-500 dark:text-slate-400"
          >{{ item.count }} registro{{ item.count === 1 ? '' : 's' }}</span
        >
      </li>
      <li v-if="!highlights.length" class="text-sm text-slate-400 dark:text-slate-500">
        Nenhum registro para esta competência ainda.
      </li>
    </ul>
  </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Modal from '@/components/modal/Modal.vue'

@Component({
  components: { Modal },
  emits: ['fechar', 'selecionarCompetencia'],
})
export default class VisaoGeralDestaquesModal extends Vue {
  // public
  @Prop({ type: Array, required: true })
  public competencyNames!: string[]
  // public
  @Prop({ type: String, required: true })
  public highlightCompetency!: string
  // public
  @Prop({ type: Array, required: true })
  public highlights!: Array<{ name: string; count: number }>
  // public
  @Prop({ type: Array, required: true })
  public medals!: string[]
}
</script>

<style></style>
