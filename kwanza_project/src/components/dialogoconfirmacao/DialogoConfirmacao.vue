<template>
  <teleport to="body">
    <div class="overlay-wrapper">
      <div class="overlay" @click="$emit('cancel')" />
      <div class="dialog">
        <div class="icon-circle">
          <alert-triangle class="icon" />
        </div>
        <h2 class="title">{{ title }}</h2>
        <p class="message">{{ message }}</p>
        <div class="actions">
          <button type="button" class="button-secondary" @click="$emit('cancel')">Cancelar</button>
          <button type="button" class="button-danger" @click="$emit('confirm')">
            {{ confirmLabel }}
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { AlertTriangle } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  components: { AlertTriangle },
  emits: ['confirm', 'cancel'],
})
export default class DialogoConfirmacao extends Vue {
  // public
  @Prop({ type: String, default: 'Confirmar exclusão' })
  public title!: string
  // public
  @Prop({ type: String, required: true })
  public message!: string
  // public
  @Prop({ type: String, default: 'Excluir' })
  public confirmLabel!: string
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
  max-width: 24rem;
  padding: 1.5rem;
}

.icon-circle {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background-color: var(--danger-subtle-bg);
  color: var(--danger-text);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

.title {
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.message {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 1.25rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.button-secondary {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.button-danger {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: var(--danger);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
}

.button-danger:hover {
  background-color: var(--danger-hover);
}
</style>
