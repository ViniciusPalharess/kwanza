<script setup>
import { CheckCircle2, X, XCircle } from 'lucide-vue-next'
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()

const VARIANTS = {
  success: {
    icon: CheckCircle2,
    wrap: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    icon_color: 'text-emerald-500',
  },
  error: {
    icon: XCircle,
    wrap: 'bg-red-50 text-red-700 border-red-100',
    icon_color: 'text-red-500',
  },
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-100 flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toastStore.toasts"
          :key="toast.id"
          class="flex items-start gap-2 rounded-xl border shadow-lg px-4 py-3 text-sm font-medium"
          :class="(VARIANTS[toast.type] || VARIANTS.success).wrap"
        >
          <component
            :is="(VARIANTS[toast.type] || VARIANTS.success).icon"
            class="w-5 h-5 shrink-0"
            :class="(VARIANTS[toast.type] || VARIANTS.success).icon_color"
          />
          <p class="flex-1">{{ toast.message }}</p>
          <button
            type="button"
            class="shrink-0 opacity-60 hover:opacity-100 transition"
            @click="toastStore.dismiss(toast.id)"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(16px);
}
</style>
