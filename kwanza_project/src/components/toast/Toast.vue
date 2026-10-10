<template>
  <teleport to="body">
    <div class="toast-list">
      <transition-group name="toast">
        <div
          v-for="toast in toastStore.toasts"
          :key="toast.id"
          class="toast-item"
          :class="variantClass(toast.type)"
        >
          <component :is="iconFor(toast.type)" class="toast-icon" />
          <p class="toast-message">{{ toast.message }}</p>
          <button type="button" class="toast-dismiss" @click="toastStore.dismiss(toast.id)">
            <x class="toast-dismiss-icon" />
          </button>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script lang="ts">
import { CheckCircle2, X, XCircle } from 'lucide-vue-next'
import { Component, Vue } from 'vue-facing-decorator'
import { useToastStore } from '@/stores/toast'

@Component({
  components: { X },
})
export default class Toast extends Vue {
  // public
  public VARIANTS: Record<string, { icon: unknown }> = {
    success: { icon: CheckCircle2 },
    error: { icon: XCircle },
  }

  // public
  public toastStore = useToastStore()

  // public
  public iconFor(type: string) {
    return (this.VARIANTS[type] || this.VARIANTS.success).icon
  }

  // public
  public variantClass(type: string) {
    return this.VARIANTS[type] ? `toast-item--${type}` : 'toast-item--success'
  }
}
</script>

<style scoped>
.toast-list {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: calc(100% - 2rem);
  max-width: 24rem;
}

.toast-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  border-radius: 0.75rem;
  border: 1px solid;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.toast-item--success {
  background-color: var(--color-emerald-50);
  color: var(--color-emerald-700);
  border-color: var(--color-emerald-100);
}

.toast-item--error {
  background-color: var(--color-red-50);
  color: var(--color-red-700);
  border-color: var(--color-red-100);
}

.toast-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.toast-item--success .toast-icon {
  color: var(--color-emerald-500);
}

.toast-item--error .toast-icon {
  color: var(--color-red-500);
}

.toast-message {
  flex: 1;
}

.toast-dismiss {
  flex-shrink: 0;
  opacity: 0.6;
  transition: opacity 0.15s ease;
}

.toast-dismiss:hover {
  opacity: 1;
}

.toast-dismiss-icon {
  width: 1rem;
  height: 1rem;
}

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
