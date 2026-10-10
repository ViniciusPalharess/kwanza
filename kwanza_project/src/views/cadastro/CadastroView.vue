<template>
  <LayoutAutenticacao>
    <p
      v-if="!isSupabaseConfigured"
      class="text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-lg px-3 py-2 mb-4"
    >
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
      <RouterLink :to="{ name: 'criarConta' }" class="text-brand-700 font-semibold"
        >Criar conta</RouterLink
      >
    </p>
  </LayoutAutenticacao>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
import { Component, Vue } from 'vue-facing-decorator'
import { useUsuarioStore } from '@/stores/usuario'
import { useToastStore } from '@/stores/toast'
import { isSupabaseConfigured } from '@/lib/supabase'
import LayoutAutenticacao from '@/components/layoutautenticacao/LayoutAutenticacao.vue'

@Component({
  components: { LayoutAutenticacao, RouterLink },
})
export default class CadastroView extends Vue {
  // public
  public isSupabaseConfigured = isSupabaseConfigured
  // public
  public email = ''
  // public
  public password = ''
  // public
  public loading = false

  // private
  private usuarioStore = useUsuarioStore()
  // private
  private toastStore = useToastStore()

  // public
  public async handleSubmit() {
    if (!this.email || !this.password) {
      this.toastStore.error('Informe e-mail e senha para continuar.')
      return
    }
    this.loading = true
    const { error: authError } = await this.usuarioStore.login(this.email, this.password)
    this.loading = false
    if (authError) {
      this.toastStore.error(authError)
      return
    }
    this.$router.push({ name: 'painel' })
  }
}
</script>

<style></style>
