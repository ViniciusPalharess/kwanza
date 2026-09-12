<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppTopNav from '@/components/layout/AppTopNav.vue'
import Toast from '@/components/ui/Toast.vue'

const route = useRoute()
const isPublic = computed(() => route.meta.public)
</script>

<template>
  <Toast />
  <div v-if="isPublic" class="min-h-screen">
    <router-view />
  </div>
  <div v-else class="h-screen bg-slate-50 dark:bg-slate-900 flex flex-col overflow-hidden">
    <AppTopNav />
    <main class="flex-1 overflow-y-auto p-4 sm:p-6">
      <router-view />
    </main>
  </div>
</template>
