<template>
  <layout-autenticacao>
    <p v-if="!isSupabaseConfigured" class="warning-banner">
      Backend ainda não configurado. Defina as variáveis do Supabase em <code>.env.local</code>.
    </p>

    <template v-if="step === 'choice'">
      <h2 class="choice-title">Criar sua conta</h2>

      <div class="choice-list">
        <button type="button" class="choice-button" @click="step = 'form'">
          <mail class="choice-icon" />
          <span class="choice-label">Continuar com E-mail</span>
        </button>
        <button type="button" disabled class="choice-button choice-button--disabled">
          <icone-google class="choice-icon" />
          <span class="choice-label">Continuar com Google</span>
        </button>
        <button type="button" disabled class="choice-button choice-button--disabled">
          <icone-microsoft class="choice-icon" />
          <span class="choice-label">Continuar com Microsoft</span>
        </button>
      </div>

      <p class="choice-footer">
        Já tem uma conta?
        <router-link :to="{ name: 'cadastro' }" class="footer-link">Entrar</router-link>
      </p>
    </template>

    <template v-else-if="step === 'form'">
      <button type="button" class="back-button" @click="step = 'choice'">← Voltar</button>
      <h2 class="title">Criar conta com e-mail</h2>
      <p class="subtitle">Leva menos de um minuto.</p>

      <form class="form" @submit.prevent="handleSignup">
        <div class="field">
          <label class="label" for="name">Nome</label>
          <input id="name" v-model="name" type="text" class="input" placeholder="Seu nome" />
        </div>
        <div class="field">
          <label class="label" for="email">E-mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="input"
            placeholder="voce@email.com"
          />
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

        <button type="submit" :disabled="loading" class="submit-button">
          {{ loading ? 'Criando conta...' : 'Criar conta' }}
        </button>
      </form>
    </template>

    <template v-else-if="step === 'sent'">
      <div class="sent-wrapper">
        <mail class="sent-icon" />
        <h2 class="title">Confira seu e-mail</h2>
        <p class="subtitle">
          Enviamos um link de confirmação para <strong>{{ email }}</strong
          >. Clique nele para ativar sua conta.
        </p>
        <router-link :to="{ name: 'cadastro' }" class="sent-link">
          Voltar para o login
        </router-link>
      </div>
    </template>
  </layout-autenticacao>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
import { Mail } from 'lucide-vue-next'
import { Component, Vue } from 'vue-facing-decorator'
import { useUsuarioStore } from '@/stores/usuario'
import { useToastStore } from '@/stores/toast'
import { isSupabaseConfigured } from '@/lib/supabase'
import LayoutAutenticacao from '@/components/layoutautenticacao/LayoutAutenticacao.vue'
import IconeGoogle from '@/components/icones/IconeGoogle.vue'
import IconeMicrosoft from '@/components/icones/IconeMicrosoft.vue'

@Component({
  components: { LayoutAutenticacao, IconeGoogle, IconeMicrosoft, Mail, RouterLink },
})
export default class CriarContaView extends Vue {
  // public
  public isSupabaseConfigured = isSupabaseConfigured
  // public
  public step: 'choice' | 'form' | 'sent' = 'choice'
  // public
  public name = ''
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
  public async handleSignup() {
    if (!this.name || !this.email || !this.password) {
      this.toastStore.error('Preencha todos os campos para continuar.')
      return
    }
    if (this.password.length < 6) {
      this.toastStore.error('A senha deve ter pelo menos 6 caracteres.')
      return
    }
    this.loading = true
    const { error: authError } = await this.usuarioStore.signUp({
      name: this.name,
      email: this.email,
      password: this.password,
    })
    this.loading = false
    if (authError) {
      this.toastStore.error(authError)
      return
    }
    this.toastStore.success('Conta criada! Confira seu e-mail para confirmar.')
    this.step = 'sent'
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

.choice-title {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #616161;
  text-align: center;
}

.choice-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.choice-button {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid var(--color-slate-200);
  border-radius: 0.5rem;
  padding: 0.625rem 1rem;
  transition: background-color 0.15s ease;
  font-weight: 500;
  color: #616161;
}
.choice-button:hover {
  background-color: var(--color-slate-50);
}
.choice-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.choice-icon {
  position: absolute;
  left: 1rem;
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-slate-400);
}

.choice-label {
  flex: 1;
  text-align: center;
}

.choice-footer {
  font-size: 0.875rem;
  text-align: center;
  color: #616161;
  margin-top: 1.5rem;
}

.footer-link {
  color: var(--accent-text-strong);
  font-weight: 600;
}

.back-button {
  font-size: 0.875rem;
  color: var(--color-slate-400);
  margin-bottom: 1rem;
}
.back-button:hover {
  color: var(--color-slate-600);
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

.sent-wrapper {
  text-align: center;
  padding: 1.5rem 0;
}

.sent-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: var(--accent);
  margin: 0 auto 1rem;
}

.sent-link {
  display: inline-block;
  margin-top: 1.5rem;
  color: var(--accent-text-strong);
  font-weight: 600;
  font-size: 0.875rem;
}
</style>
