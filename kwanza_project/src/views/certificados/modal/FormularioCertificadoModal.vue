<template>
  <Modal
    :title="
      viewOnly ? 'Detalhes do certificado' : editingId ? 'Editar certificado' : 'Emitir certificado'
    "
    @close="$emit('fechar')"
  >
    <form class="space-y-3" @submit.prevent="$emit('salvar')">
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
          >Participante</label
        >
        <input
          v-model="form.name"
          :disabled="viewOnly"
          required
          list="cert-participant-options"
          type="text"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60"
        />
        <datalist id="cert-participant-options">
          <option v-for="name in participantNames" :key="name" :value="name" />
        </datalist>
      </div>
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
          >Curso</label
        >
        <input
          v-model="form.course"
          :disabled="viewOnly"
          required
          list="cert-course-options"
          type="text"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60"
        />
        <datalist id="cert-course-options">
          <option v-for="title in courseTitles" :key="title" :value="title" />
        </datalist>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
            >Carga (h)</label
          >
          <input
            v-model="form.hours"
            :disabled="viewOnly"
            type="number"
            min="1"
            class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60"
          />
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
            >Status</label
          >
          <select
            v-model="form.status"
            :disabled="viewOnly"
            class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60"
          >
            <option>Emitido</option>
            <option>Elegível</option>
            <option>Pendente</option>
          </select>
        </div>
      </div>
      <div class="flex justify-end gap-2 pt-2">
        <button
          type="button"
          class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300"
          @click="$emit('fechar')"
        >
          {{ viewOnly ? 'Fechar' : 'Cancelar' }}
        </button>
        <button
          v-if="!viewOnly"
          type="submit"
          class="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold"
        >
          {{ editingId ? 'Salvar alterações' : 'Emitir certificado' }}
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
export default class FormularioCertificadoModal extends Vue {
  // public
  @Prop({ type: Boolean, default: false })
  public viewOnly!: boolean
  // public
  @Prop({ type: [Number, String], default: null })
  public editingId!: number | string | null
  // public
  @Prop({ type: Object, required: true })
  public form!: { name: string; course: string; hours: number; status: string; date: string }
  // public
  @Prop({ type: Array, required: true })
  public participantNames!: string[]
  // public
  @Prop({ type: Array, required: true })
  public courseTitles!: string[]
}
</script>

<style></style>
