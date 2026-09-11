<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const error = ref('')

function handleSubmit() {
  const ok = userStore.login(email.value, password.value)
  if (ok) {
    router.push({ name: 'dashboard' })
  } else {
    error.value = 'Informe e-mail e senha para continuar.'
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center px-6 py-10 bg-gradient-to-b from-brand-800 to-brand-950 text-white">
    <div class="max-w-sm mx-auto w-full">
      <p class="text-sm text-brand-200 mb-2">Projeto Kwanza · Kenya Club</p>
      <h1 class="text-3xl font-bold leading-tight mb-3">Cada passo é uma conquista.</h1>
      <p class="text-brand-100 mb-8">
        Acompanhe sua evolução, conquiste medalhas, suba de nível e construa o seu futuro junto ao Kenya Club.
      </p>

      <div class="bg-white rounded-2xl p-6 text-slate-900 shadow-lg">
        <h2 class="text-xl font-bold mb-1">Entrar na plataforma</h2>
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
            class="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 rounded-lg transition"
          >
            Entrar
          </button>
        </form>

        <p class="text-sm text-center text-slate-500 mt-5">
          Novo no projeto?
          <RouterLink to="/dashboard" class="text-brand-700 font-semibold">Conheça a plataforma</RouterLink>
        </p>
      </div>

      <p class="text-xs text-center text-brand-300 mt-8">© 2026 Kenya Club · Projeto Kwanza</p>
    </div>
  </div>
</template>
