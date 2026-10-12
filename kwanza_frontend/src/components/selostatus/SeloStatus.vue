<template>
  <span class="badge" :class="variantClass">
    <span class="dot" />
    {{ status }}
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'

const VARIANT_BY_STATUS: Record<string, string> = {
  Ativo: 'emerald',
  Emitido: 'emerald',
  Inativo: 'red',
  Pendente: 'amber',
  Elegível: 'brand',
}

@Component({})
export default class SeloStatus extends Vue {
  // public
  @Prop({ type: String, required: true })
  public status!: string

  // public
  public get variantClass() {
    const variant = VARIANT_BY_STATUS[this.status] || 'slate'
    return `badge--${variant}`
  }
}
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.dot {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 9999px;
}

.badge--emerald {
  background-color: var(--success-subtle-bg);
  color: var(--success-text);
}
.badge--emerald .dot {
  background-color: var(--success-dot);
}

.badge--red {
  background-color: var(--danger-subtle-bg);
  color: var(--danger-text);
}
.badge--red .dot {
  background-color: var(--danger-dot);
}

.badge--amber {
  background-color: var(--warning-subtle-bg);
  color: var(--warning-text);
}
.badge--amber .dot {
  background-color: var(--warning-dot);
}

.badge--brand {
  background-color: var(--accent-subtle-bg);
  color: var(--accent-text);
}
.badge--brand .dot {
  background-color: var(--color-brand-500);
}

.badge--slate {
  background-color: var(--surface-muted);
  color: var(--text-secondary);
}
.badge--slate .dot {
  background-color: var(--text-faint);
}
</style>
