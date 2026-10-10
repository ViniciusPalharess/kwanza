<template>
  <Modal :title="editingUserId ? 'Editar usuário' : 'Adicionar usuário'" @close="$emit('fechar')">
    <form class="space-y-3" @submit.prevent="$emit('salvar')">
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
          >Nome</label
        >
        <input
          v-model="form.name"
          required
          type="text"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2"
        />
      </div>
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
          >Papel</label
        >
        <select
          v-model="form.role"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2"
        >
          <option v-for="role in roleOptions" :key="role" :value="role">{{ role }}</option>
        </select>
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
          {{ editingUserId ? 'Salvar' : 'Adicionar' }}
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
export default class FormularioUsuarioModal extends Vue {
  // public
  @Prop({ type: [Number, String], default: null })
  public editingUserId!: number | string | null
  // public
  @Prop({ type: Object, required: true })
  public form!: { name: string; role: string }
  // public
  @Prop({ type: Array, required: true })
  public roleOptions!: string[]
}
</script>

<style></style>
