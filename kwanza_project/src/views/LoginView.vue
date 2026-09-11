<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { isSupabaseConfigured } from '@/lib/supabase'
import AuthLayout from '@/components/auth/AuthLayout.vue'

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleSubmit() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Informe e-mail e senha para continuar.'
    return
  }
  loading.value = true
  const { error: authError } = await userStore.login(email.value, password.value)
  loading.value = false
  if (authError) {
    error.value = authError
    return
  }
  router.push({ name: 'dashboard' })
}
</script>

<template>
  <AuthLayout>
    <p v-if="!isSupabaseConfigured" class="text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-lg px-3 py-2 mb-4">
      Backend ainda não configurado. Defina as variáveis do Supabase em <code>.env.local</code>.
    </p>

    <h2 class="text-xl font-bold mb-1 text-slate-900">Entrar na plataforma</h2>
    <p class="text-sm text-slate-500 mb-5">Continue a sua jornada de evolução.</p>

    <form class="space-y-4" @submit.prevent="handleSubmit">
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

      <a href="#" class="text-sm text-brand-600 block text-right">Esqueci minha senha</a>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition"
      >
        {{ loading ? 'Entrando...' : 'Entrar' }}
      </button>
    </form>

    <p class="text-sm text-center text-slate-500 mt-5">
      Novo no projeto?
      <RouterLink :to="{ name: 'signup' }" class="text-brand-700 font-semibold">Criar conta</RouterLink>
    </p>
  </AuthLayout>
</template>
