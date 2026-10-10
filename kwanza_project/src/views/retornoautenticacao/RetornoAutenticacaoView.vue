<template>
  <layout-autenticacao>
    <div v-if="status === 'loading'" class="state">
      <p class="loading-text">Confirmando sua conta...</p>
    </div>
    <div v-else class="state">
      <p class="error-text">Não foi possível confirmar sua conta. O link pode ter expirado.</p>
      <router-link :to="{ name: 'cadastro' }" class="link">Voltar para o login</router-link>
    </div>
  </layout-autenticacao>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
import { Component, Vue } from 'vue-facing-decorator'
import { supabase } from '@/lib/supabase'
import LayoutAutenticacao from '@/components/layoutautenticacao/LayoutAutenticacao.vue'

@Component({
  components: { LayoutAutenticacao, RouterLink },
})
export default class RetornoAutenticacaoView extends Vue {
  // public
  public status: 'loading' | 'error' = 'loading'

  // private
  private timeoutId: ReturnType<typeof setTimeout> | undefined = undefined
  // private
  private subscription: { unsubscribe: () => void } | undefined = undefined

  mounted() {
    const { data } = supabase.auth.onAuthStateChange((_event: string, session: unknown) => {
      if (session) {
        clearTimeout(this.timeoutId)
        this.subscription?.unsubscribe()
        this.$router.replace({ name: 'painel' })
      }
    })
    this.subscription = data.subscription

    this.timeoutId = setTimeout(() => {
      this.status = 'error'
      this.subscription?.unsubscribe()
    }, 8000)
  }

  beforeUnmount() {
    clearTimeout(this.timeoutId)
    this.subscription?.unsubscribe()
  }
}
</script>

<style scoped>
.state {
  text-align: center;
  padding: 2.5rem 0;
}

.loading-text {
  color: var(--color-slate-500);
}

.error-text {
  color: var(--color-red-600);
  margin-bottom: 1rem;
}

.link {
  color: var(--accent-text-strong);
  font-weight: 600;
  font-size: 0.875rem;
}
</style>
