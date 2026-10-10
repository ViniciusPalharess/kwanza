<template>
  <layout-autenticacao>
    <p v-if="!isSupabaseConfigured" class="warning-banner">
      Backend ainda não configurado. Defina as variáveis do Supabase em <code>.env.local</code>.
    </p>

    <h2 class="title">Entrar na plataforma</h2>
    <p class="subtitle">Continue a sua jornada de evolução.</p>

    <form class="form" @submit.prevent="handleSubmit">
      <div class="field">
        <label class="label" for="email">E-mail</label>
        <input id="email" v-model="email" type="email" class="input" placeholder="voce@email.com" />
      </div>
      <div class="field">
        <label class="label" for="password">Senha</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="input"
          placeholder="••••••••"
        />
      </div>

      <a href="#" class="forgot-link">Esqueci minha senha</a>

      <button type="submit" :disabled="loading" class="submit-button">
        {{ loading ? 'Entrando...' : 'Entrar' }}
      </button>
    </form>

    <p class="footer-text">
      Novo no projeto?
      <router-link :to="{ name: 'criarConta' }" class="footer-link">Criar conta</router-link>
    </p>
  </layout-autenticacao>
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

<style scoped>
.warning-banner {
  font-size: 0.75rem;
  background-color: var(--warning-subtle-bg);
  color: var(--warning-text);
  border: 1px solid var(--color-amber-200);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--color-slate-900);
}

.subtitle {
  font-size: 0.875rem;
  color: var(--color-slate-500);
  margin-bottom: 1.25rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
  display: block;
  margin-bottom: 0.25rem;
}

.input {
  width: 100%;
  border: 1px solid var(--color-slate-200);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
}
.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-brand-300);
}

.forgot-link {
  font-size: 0.875rem;
  color: var(--accent-text);
  display: block;
  text-align: right;
}

.submit-button {
  width: 100%;
  background-color: var(--accent);
  color: #fff;
  font-weight: 600;
  padding: 0.625rem 0;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease;
}
.submit-button:hover {
  background-color: var(--accent-hover);
}
.submit-button:disabled {
  opacity: 0.6;
}

.footer-text {
  font-size: 0.875rem;
  text-align: center;
  color: var(--color-slate-500);
  margin-top: 1.25rem;
}

.footer-link {
  color: var(--accent-text-strong);
  font-weight: 600;
}
</style>
