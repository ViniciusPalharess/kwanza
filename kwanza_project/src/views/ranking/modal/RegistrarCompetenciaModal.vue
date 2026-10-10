<template>
  <Modal title="Registrar competência" @close="$emit('fechar')">
    <form class="space-y-3" @submit.prevent="$emit('salvar')">
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
          >Participante</label
        >
        <input
          v-model="form.name"
          required
          list="participant-options"
          type="text"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2"
        />
        <datalist id="participant-options">
          <option v-for="name in participantNames" :key="name" :value="name" />
        </datalist>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
            >Competência</label
          >
          <select
            v-model="form.competency"
            class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2"
          >
            <option v-for="name in competencyNames" :key="name" :value="name">{{ name }}</option>
          </select>
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
            >Data</label
          >
          <input
            v-model="form.date"
            type="text"
            placeholder="dd/mm/aaaa"
            class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
          >Pontos</label
        >
        <input
          v-model="form.points"
          type="number"
          min="0"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2"
        />
      </div>
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
          >Observação</label
        >
        <textarea
          v-model="form.description"
          rows="2"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2"
        />
      </div>
      <div class="flex justify-end gap-2 pt-2">
        <button
          type="button"
          class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300"
          @click="$emit('fechar')"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold"
        >
          Salvar
        </button>
      </div>
    </form>
  </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Modal from '@/components/modal/Modal.vue'

@Component({
  components: { Modal },
  emits: ['salvar', 'fechar'],
})
export default class RegistrarCompetenciaModal extends Vue {
  // public
  @Prop({ type: Object, required: true })
  public form!: {
    name: string
    competency: string
    description: string
    points: number
    date: string
  }
  // public
  @Prop({ type: Array, required: true })
  public competencyNames!: string[]
  // public
  @Prop({ type: Array, required: true })
  public participantNames!: string[]
}
</script>

<style></style>
