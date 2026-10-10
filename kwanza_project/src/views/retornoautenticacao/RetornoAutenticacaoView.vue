<template>
  <LayoutAutenticacao>
    <div class="text-center py-10" v-if="status === 'loading'">
      <p class="text-slate-500">Confirmando sua conta...</p>
    </div>
    <div class="text-center py-10" v-else>
      <p class="text-red-600 mb-4">
        Não foi possível confirmar sua conta. O link pode ter expirado.
      </p>
      <RouterLink :to="{ name: 'cadastro' }" class="text-brand-700 font-semibold text-sm"
        >Voltar para o login</RouterLink
      >
    </div>
  </LayoutAutenticacao>
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

<style></style>
