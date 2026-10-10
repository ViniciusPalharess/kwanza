<template>
  <Modal :title="editingId ? 'Editar curso' : 'Novo curso'" @close="$emit('fechar')">
    <form class="space-y-3" @submit.prevent="$emit('salvar')">
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
          >Título</label
        >
        <input
          v-model="form.title"
          required
          type="text"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2"
        />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
            >Categoria</label
          >
          <input
            v-model="form.category"
            required
            type="text"
            class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
            >Carga horária (h)</label
          >
          <input
            v-model="form.hours"
            type="number"
            min="1"
            class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
          >Professor(a)</label
        >
        <input
          v-model="form.teacher"
          required
          type="text"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2"
        />
      </div>
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
          >Descrição</label
        >
        <textarea
          v-model="form.description"
          rows="2"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2"
        />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
            >Status</label
          >
          <select
            v-model="form.status"
            class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2"
          >
            <option value="not_started">Não iniciado</option>
            <option value="in_progress">Em andamento</option>
            <option value="completed">Concluído</option>
          </select>
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
            >Progresso (%)</label
          >
          <input
            v-model="form.progress"
            type="number"
            min="0"
            max="100"
            class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2"
          />
        </div>
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
          {{ editingId ? 'Salvar alterações' : 'Criar curso' }}
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
export default class FormularioCursoModal extends Vue {
  // public
  @Prop({ type: [Number, String], default: null })
  public editingId!: number | string | null
  // public
  @Prop({ type: Object, required: true })
  public form!: {
    title: string
    category: string
    description: string
    teacher: string
    hours: number
    status: string
    progress: number
  }
}
</script>

<style></style>
