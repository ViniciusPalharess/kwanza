<template>
  <teleport to="body">
    <div class="overlay-wrapper">
      <div class="overlay" @click="$emit('close')" />
      <div class="dialog" :style="{ maxWidth }">
        <div class="dialog-header">
          <h2 class="dialog-title">{{ title }}</h2>
          <button type="button" class="close-button" @click="$emit('close')">
            <x class="close-icon" />
          </button>
        </div>
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { X } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  components: { X },
  emits: ['close'],
})
export default class Modal extends Vue {
  // public
  @Prop({ type: String, required: true })
  public title!: string
  // public
  @Prop({ type: String, default: '32rem' })
  public maxWidth!: string
}
</script>

<style scoped>
.overlay-wrapper {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgb(15 23 42 / 0.5);
}

.dialog {
  position: relative;
  background-color: var(--surface);
  border-radius: 0.75rem;
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  width: 100%;
  padding: 1.5rem;
  max-height: 90vh;
  overflow-y: auto;
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.dialog-title {
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
}

.close-button {
  color: var(--text-faint);
}

.close-button:hover {
  color: var(--text-secondary);
}

.close-icon {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
