<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Mail } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { isSupabaseConfigured } from '@/lib/supabase'
import AuthLayout from '@/components/auth/AuthLayout.vue'
import GoogleIcon from '@/components/icons/GoogleIcon.vue'
import MicrosoftIcon from '@/components/icons/MicrosoftIcon.vue'

const userStore = useUserStore()

const step = ref('choice') // 'choice' | 'form' | 'sent'
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const oauthLoading = ref(null)

async function handleOAuth(provider) {
  error.value = ''
  oauthLoading.value = provider
  const { error: authError } = await userStore.loginWithOAuth(provider)
  if (authError) {
    error.value = authError
    oauthLoading.value = null
  }
}

async function handleSignup() {
  error.value = ''
  if (!name.value || !email.value || !password.value) {
    error.value = 'Preencha todos os campos para continuar.'
    return
  }
  if (password.value.length < 6) {
    error.value = 'A senha deve ter pelo menos 6 caracteres.'
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
    error.value = authError
    return
  }
  step.value = 'sent'
}
</script>

<template>
  <AuthLayout>
    <p v-if="!isSupabaseConfigured" class="text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-lg px-3 py-2 mb-4">
      Backend ainda não configurado. Defina as variáveis do Supabase em <code>.env.local</code>.
    </p>

    <template v-if="step === 'choice'">
      <h2 class="text-xl font-bold mb-1 text-slate-900">Criar sua conta</h2>
      <p class="text-sm text-slate-500 mb-5">Escolha como deseja continuar.</p>

      <div class="space-y-3">
        <button
          type="button"
          @click="step = 'form'"
          class="w-full flex items-center gap-3 border border-slate-200 rounded-lg px-4 py-2.5 hover:bg-slate-50 transition font-medium text-slate-700"
        >
          <Mail class="w-5 h-5 text-slate-400" />
          Continuar com E-mail
        </button>
        <button
          type="button"
          :disabled="!!oauthLoading"
          @click="handleOAuth('google')"
          class="w-full flex items-center gap-3 border border-slate-200 rounded-lg px-4 py-2.5 hover:bg-slate-50 transition font-medium text-slate-700 disabled:opacity-50"
        >
          <GoogleIcon class="w-5 h-5" />
          {{ oauthLoading === 'google' ? 'Redirecionando...' : 'Continuar com Google' }}
        </button>
        <button
          type="button"
          :disabled="!!oauthLoading"
          @click="handleOAuth('azure')"
          class="w-full flex items-center gap-3 border border-slate-200 rounded-lg px-4 py-2.5 hover:bg-slate-50 transition font-medium text-slate-700 disabled:opacity-50"
        >
          <MicrosoftIcon class="w-5 h-5" />
          {{ oauthLoading === 'azure' ? 'Redirecionando...' : 'Continuar com Microsoft' }}
        </button>
      </div>

      <p v-if="error" class="text-sm text-red-600 mt-4">{{ error }}</p>

      <p class="text-sm text-center text-slate-500 mt-6">
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

        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

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
