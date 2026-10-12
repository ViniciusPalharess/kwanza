<template>
  <div class="skill">
    <div class="skill-header">
      <span class="skill-name">{{ name }}</span>
      <span class="skill-value">{{ value }}</span>
    </div>
    <div class="track">
      <div class="fill" :style="{ width: value + '%' }" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({})
export default class BarraCompetencia extends Vue {
  // public
  @Prop({ type: String, required: true })
  public name!: string
  // public
  @Prop({ type: Number, required: true })
  public value!: number
}
</script>

<style scoped>
.skill-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.skill-name {
  color: var(--text-secondary);
}

.skill-value {
  font-weight: 600;
  color: var(--text-strong);
}

.track {
  height: 0.5rem;
  border-radius: 9999px;
  background-color: var(--surface-muted);
  overflow: hidden;
}

.fill {
  height: 100%;
  border-radius: 9999px;
  background-color: var(--accent);
}
</style>
