<template>
  <div class="card">
    <div class="header">
      <div v-if="icon" class="icon-box" :class="`icon-box--${variant}`">
        <component :is="icon" class="icon" />
      </div>
      <span v-if="percent !== null" class="percent-badge">
        <trending-up class="percent-icon" />
        {{ percent }}%
      </span>
    </div>
    <p class="value">{{ value }}</p>
    <p class="label">{{ label }}</p>
  </div>
</template>

<script lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  components: { TrendingUp },
})
export default class CartaoEstatistica extends Vue {
  // public
  @Prop({ type: String, required: true })
  public label!: string
  // public
  @Prop({ type: [String, Number], required: true })
  public value!: string | number
  // public
  @Prop({ type: Number, default: null })
  public percent!: number | null
  // public
  @Prop({ type: [Object, Function], default: null })
  public icon!: unknown
  // public
  @Prop({ type: String, default: 'brand' })
  public variant!: 'brand' | 'amber' | 'emerald'
}
</script>

<style scoped>
.card {
  background-color: var(--surface);
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid var(--border-subtle);
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.icon-box {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-box--brand {
  background-color: var(--accent-subtle-bg);
  color: var(--accent-text);
}

.icon-box--amber {
  background-color: var(--warning-subtle-bg);
  color: var(--warning-dot);
}

.icon-box--emerald {
  background-color: var(--success-subtle-bg);
  color: var(--success-text);
}

.icon {
  width: 1rem;
  height: 1rem;
}

.percent-badge {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--success-text);
  background-color: var(--success-subtle-bg);
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
}

.percent-icon {
  width: 0.75rem;
  height: 0.75rem;
}

.value {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
}

.label {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.125rem;
}
</style>
