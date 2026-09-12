<script setup>
import { reactive, ref } from 'vue'
import { Camera } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { useToastStore } from '@/stores/toast'
import Modal from '@/components/ui/Modal.vue'
import defaultAvatar from '@/assets/images/default-avatar.png'

const emit = defineEmits(['close'])

const userStore = useUserStore()
const toastStore = useToastStore()
const user = userStore.user

const form = reactive({
  name: user.name,
  email: user.email,
  phone: user.phone,
  birthDate: user.birthDate,
  bio: user.bio,
  avatarUrl: user.avatarUrl,
})

const fileInput = ref(null)

function openFilePicker() {
  fileInput.value?.click()
}

function handleFileChange(event) {
  const file = event.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    form.avatarUrl = reader.result
  }
  reader.readAsDataURL(file)
}

function handleSave() {
  userStore.updateProfile({ ...form })
  toastStore.success('Dados atualizados com sucesso.')
  emit('close')
}
</script>

<template>
  <Modal title="Meus Dados" @close="emit('close')">
    <div class="flex flex-col items-center mb-5">
      <div class="relative w-24 h-24 group cursor-pointer" @click="openFilePicker">
        <img :src="form.avatarUrl || defaultAvatar" alt="Foto de perfil" class="w-24 h-24 rounded-full object-cover" />
        <div
          class="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
        >
          <Camera class="w-6 h-6 text-white" />
        </div>
      </div>
      <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileChange" />
      <p class="text-xs text-slate-400 mt-2">Clique na foto para alterar</p>
    </div>

    <form class="space-y-3" @submit.prevent="handleSave">
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Nome completo</label>
        <input
          v-model="form.name"
          type="text"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">E-mail</label>
        <input
          v-model="form.email"
          type="email"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Telefone</label>
        <input
          v-model="form.phone"
          type="tel"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Data de nascimento</label>
        <input
          v-model="form.birthDate"
          type="date"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>
      <div>
        <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Sobre mim</label>
        <textarea
          v-model="form.bio"
          rows="3"
          class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div class="flex justify-end gap-2 pt-2">
        <button
          type="button"
          class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300"
          @click="emit('close')"
        >
          Cancelar
        </button>
        <button type="submit" class="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold">
          Salvar alterações
        </button>
      </div>
    </form>
  </Modal>
</template>
