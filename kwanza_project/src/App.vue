<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppTopNav from '@/components/layout/AppTopNav.vue'

const route = useRoute()
const isPublic = computed(() => route.meta.public)
</script>

<template>
  <div v-if="isPublic" class="min-h-screen">
    <router-view />
  </div>
  <div v-else class="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
    <AppTopNav />
    <main class="flex-1 p-4 sm:p-6">
      <router-view />
    </main>
  </div>
</template>
