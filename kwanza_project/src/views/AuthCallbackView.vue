<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import AuthLayout from '@/components/auth/AuthLayout.vue'

const router = useRouter()
const status = ref('loading') // 'loading' | 'error'
let timeoutId
let subscription

onMounted(() => {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      clearTimeout(timeoutId)
      subscription?.unsubscribe()
      router.replace({ name: 'dashboard' })
    }
  })
  subscription = data.subscription

  timeoutId = setTimeout(() => {
    status.value = 'error'
    subscription?.unsubscribe()
  }, 8000)
})

onBeforeUnmount(() => {
  clearTimeout(timeoutId)
  subscription?.unsubscribe()
})
</script>

<template>
  <AuthLayout>
    <div class="text-center py-10" v-if="status === 'loading'">
      <p class="text-slate-500">Confirmando sua conta...</p>
    </div>
    <div class="text-center py-10" v-else>
      <p class="text-red-600 mb-4">Não foi possível confirmar sua conta. O link pode ter expirado.</p>
      <RouterLink :to="{ name: 'login' }" class="text-brand-700 font-semibold text-sm">Voltar para o login</RouterLink>
    </div>
  </AuthLayout>
</template>
