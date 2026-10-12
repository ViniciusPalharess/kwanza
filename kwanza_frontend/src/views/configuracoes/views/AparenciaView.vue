<template>
  <div class="card">
    <h2 class="title"><moon class="title-icon" /> Aparência</h2>
    <div class="row">
      <span class="label">Modo escuro</span>
      <button
        type="button"
        class="switch"
        :class="{ 'switch--on': dark }"
        @click="$emit('alternar')"
      >
        <span class="switch-knob" :class="{ 'switch-knob--on': dark }" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Moon } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  components: { Moon },
  emits: ['alternar'],
})
export default class AparenciaView extends Vue {
  // public
  @Prop({ type: Boolean, required: true })
  public dark!: boolean
}
</script>

<style scoped>
.card {
  background-color: var(--surface);
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid var(--border-subtle);
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.title-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--accent);
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.label {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.switch {
  width: 2.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  background-color: var(--border);
  transition: background-color 0.15s ease;
}
.switch--on {
  background-color: var(--accent);
}

.switch-knob {
  display: block;
  width: 1.25rem;
  height: 1.25rem;
  background-color: #fff;
  border-radius: 9999px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.15);
  transform: translateX(0.125rem);
  transition: transform 0.15s ease;
}
.switch-knob--on {
  transform: translateX(1.125rem);
}
</style>
