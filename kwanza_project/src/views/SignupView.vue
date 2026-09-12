<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Mail } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { useToastStore } from '@/stores/toast'
import { isSupabaseConfigured } from '@/lib/supabase'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import GoogleIcon from '@/components/icons/GoogleIcon.vue'
import MicrosoftIcon from '@/components/icons/MicrosoftIcon.vue'

const userStore = useUserStore()
const toastStore = useToastStore()

const step = ref('choice') // 'choice' | 'form' | 'sent'
const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)

async function handleSignup() {
  if (!name.value || !email.value || !password.value) {
    toastStore.error('Preencha todos os campos para continuar.')
    return
  }
  if (password.value.length < 6) {
    toastStore.error('A senha deve ter pelo menos 6 caracteres.')
    return
  }
  loading.value = true
  const { error: authError } = await userStore.signUp({
    name: name.value,
    email: email.value,
    password: password.value,
  })
  loading.value = false
  if (authError) {
    toastStore.error(authError)
    return
  }
  toastStore.success('Conta criada! Confira seu e-mail para confirmar.')
  step.value = 'sent'
}
</script>

<template>
  <AuthLayout>
    <p v-if="!isSupabaseConfigured" class="text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-lg px-3 py-2 mb-4">
      Backend ainda não configurado. Defina as variáveis do Supabase em <code>.env.local</code>.
    </p>

    <template v-if="step === 'choice'">
      <h2 class="text-3xl font-bold mb-8 text-[#616161] text-center">Criar sua conta</h2>

      <div class="space-y-3">
        <button
          type="button"
          @click="step = 'form'"
          class="relative w-full flex items-center border border-slate-200 rounded-lg px-4 py-2.5 hover:bg-slate-50 transition font-medium text-[#616161]"
        >
          <Mail class="absolute left-4 w-5 h-5 text-slate-400" />
          <span class="flex-1 text-center">Continuar com E-mail</span>
        </button>
        <button
          type="button"
          disabled
          class="relative w-full flex items-center border border-slate-200 rounded-lg px-4 py-2.5 transition font-medium text-[#616161] opacity-50 cursor-not-allowed"
        >
          <GoogleIcon class="absolute left-4 w-5 h-5" />
          <span class="flex-1 text-center">Continuar com Google</span>
        </button>
        <button
          type="button"
          disabled
          class="relative w-full flex items-center border border-slate-200 rounded-lg px-4 py-2.5 transition font-medium text-[#616161] opacity-50 cursor-not-allowed"
        >
          <MicrosoftIcon class="absolute left-4 w-5 h-5" />
          <span class="flex-1 text-center">Continuar com Microsoft</span>
        </button>
      </div>

      <p class="text-sm text-center text-[#616161] mt-6">
        Já tem uma conta?
        <RouterLink :to="{ name: 'login' }" class="text-brand-700 font-semibold">Entrar</RouterLink>
      </p>
    </template>

    <template v-else-if="step === 'form'">
      <button type="button" @click="step = 'choice'" class="text-sm text-slate-400 hover:text-slate-600 mb-4">
        ← Voltar
      </button>
      <h2 class="text-xl font-bold mb-1 text-slate-900">Criar conta com e-mail</h2>
      <p class="text-sm text-slate-500 mb-5">Leva menos de um minuto.</p>

      <form class="space-y-4" @submit.prevent="handleSignup">
        <div>
          <label class="text-sm font-medium block mb-1" for="name">Nome</label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300"
            placeholder="Seu nome"
          />
        </div>
        <div>
          <label class="text-sm font-medium block mb-1" for="email">E-mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300"
            placeholder="voce@email.com"
          />
        </div>
        <div>
          <label class="text-sm font-medium block mb-1" for="password">Senha</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition"
        >
          {{ loading ? 'Criando conta...' : 'Criar conta' }}
        </button>
      </form>
    </template>

    <template v-else-if="step === 'sent'">
      <div class="text-center py-6">
        <Mail class="w-10 h-10 text-brand-600 mx-auto mb-4" />
        <h2 class="text-xl font-bold mb-2 text-slate-900">Confira seu e-mail</h2>
        <p class="text-sm text-slate-500">
          Enviamos um link de confirmação para <strong>{{ email }}</strong
          >. Clique nele para ativar sua conta.
        </p>
        <RouterLink :to="{ name: 'login' }" class="inline-block mt-6 text-brand-700 font-semibold text-sm">
          Voltar para o login
        </RouterLink>
      </div>
    </template>
  </AuthLayout>
</template>
