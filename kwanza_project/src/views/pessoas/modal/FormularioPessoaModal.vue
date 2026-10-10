<template>
  <Modal :title="titulo" @close="$emit('fechar')">
    <div class="flex flex-col items-center mb-4">
      <div
        class="relative w-20 h-20"
        :class="!viewOnly && 'group cursor-pointer'"
        @click="!viewOnly && openFilePicker()"
      >
        <img
          :src="form.avatarUrl || defaultAvatar"
          alt="Foto de perfil"
          class="w-20 h-20 rounded-full object-cover"
        />
        <div
          v-if="!viewOnly"
          class="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
        >
          <Camera class="w-6 h-6 text-white" />
        </div>
      </div>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileChange"
      />
      <button
        v-if="!viewOnly && form.avatarUrl"
        type="button"
        class="text-xs text-red-500 mt-2 flex items-center gap-1"
        @click="form.avatarUrl = ''"
      >
        <Trash2 class="w-3 h-3" /> Remover foto
      </button>
      <p v-else-if="!viewOnly" class="text-xs text-slate-400 mt-2">Clique na foto para adicionar</p>
    </div>

    <form class="space-y-3" @submit.prevent="$emit('salvar')">
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
          >Nome completo</label
        >
        <input
          v-model="form.name"
          :disabled="viewOnly"
          required
          type="text"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
            >Tipo</label
          >
          <select
            v-model="form.role"
            :disabled="viewOnly"
            class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60"
          >
            <option v-for="role in roleOptions" :key="role" :value="role">{{ role }}</option>
          </select>
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
            >Telefone</label
          >
          <input
            v-model="form.phone"
            :disabled="viewOnly"
            type="text"
            class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
      </div>
      <template v-if="form.role === 'Participante'">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
              >Nível</label
            >
            <input
              v-model="form.level"
              :disabled="viewOnly"
              type="number"
              min="1"
              max="6"
              class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60"
            />
          </div>
          <div>
            <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
              >Pontos</label
            >
            <input
              v-model="form.score"
              :disabled="viewOnly"
              type="number"
              min="0"
              class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60"
            />
          </div>
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300"
            >Frequência (%)</label
          >
          <input
            v-model="form.attendance"
            :disabled="viewOnly"
            type="number"
            min="0"
            max="100"
            class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 disabled:opacity-60"
          />
        </div>
      </template>
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
          {{ editingId ? 'Salvar alterações' : 'Criar cadastro' }}
        </button>
      </div>
    </form>
  </Modal>
</template>

<script lang="ts">
import { Trash2, Camera } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Modal from '@/components/modal/Modal.vue'
import defaultAvatar from '@/assets/images/default-avatar.png'

@Component({
  components: { Modal, Trash2, Camera },
  emits: ['salvar', 'fechar'],
})
export default class FormularioPessoaModal extends Vue {
  // public
  @Prop({ type: Boolean, default: false })
  public viewOnly!: boolean
  // public
  @Prop({ type: [Number, String], default: null })
  public editingId!: number | string | null
  // public
  @Prop({ type: Object, required: true })
  public form!: {
    name: string
    phone: string
    role: string
    level: number
    score: number
    attendance: number
    avatarUrl: string
  }
  // public
  @Prop({ type: Array, required: true })
  public roleOptions!: string[]

  // public
  public defaultAvatar = defaultAvatar

  // public
  public get titulo() {
    return this.viewOnly ? 'Detalhes' : this.editingId ? 'Editar cadastro' : 'Novo cadastro'
  }

  // public
  public openFilePicker() {
    ;(this.$refs.fileInput as HTMLInputElement | undefined)?.click()
  }

  // public
  public handleFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      this.form.avatarUrl = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}
</script>

<style></style>
