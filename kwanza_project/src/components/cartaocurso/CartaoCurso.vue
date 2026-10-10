<template>
  <div class="card">
    <div class="banner">
      <div v-if="editable" class="banner-actions">
        <button type="button" class="banner-button" @click="$emit('edit')">
          <pencil class="banner-icon" />
        </button>
        <button type="button" class="banner-button banner-button--danger" @click="$emit('delete')">
          <trash-2 class="banner-icon" />
        </button>
      </div>
    </div>
    <div class="body">
      <span class="category">{{ course.category }}</span>
      <h3 class="title">{{ course.title }}</h3>
      <p class="description">{{ course.description }}</p>
      <div class="meta">
        <span>{{ course.teacher }}</span>
        <span class="meta-hours"><clock class="meta-icon" /> {{ course.hours }}h</span>
      </div>

      <template v-if="course.progress > 0">
        <div class="progress-row">
          <span>Progresso</span>
          <span class="progress-value">{{ course.progress }}%</span>
        </div>
        <div class="track">
          <div class="fill" :style="{ width: course.progress + '%' }" />
        </div>
      </template>

      <router-link
        :to="{ name: 'detalheCurso', params: { id: course.id } }"
        class="cta"
        :class="course.status === 'completed' ? 'cta--completed' : 'cta--default'"
      >
        <component :is="statusIcon[course.status]" class="cta-icon" />
        {{ statusLabel[course.status] }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
import { Clock, RotateCw, CheckCircle2, Play, Pencil, Trash2 } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  components: { RouterLink, Clock, Pencil, Trash2 },
  emits: ['edit', 'delete'],
})
export default class CartaoCurso extends Vue {
  // public
  @Prop({ type: Object, required: true })
  public course!: any
  // public
  @Prop({ type: Boolean, default: false })
  public editable!: boolean

  // public
  public statusLabel: Record<string, string> = {
    completed: 'Concluído',
    in_progress: 'Continuar',
    not_started: 'Iniciar',
  }

  // public
  public statusIcon: Record<string, unknown> = {
    completed: CheckCircle2,
    in_progress: RotateCw,
    not_started: Play,
  }
}
</script>

<style scoped>
.card {
  background-color: var(--surface);
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.banner {
  height: 7rem;
  background: linear-gradient(to bottom right, var(--color-brand-500), var(--color-brand-800));
  position: relative;
}

.banner-actions {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.25rem;
}

.banner-button {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.5rem;
  background-color: rgb(255 255 255 / 0.9);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}
.banner-button:hover {
  background-color: #fff;
}
.banner-button--danger {
  color: var(--danger-text);
}

.banner-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.category {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent-text);
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.title {
  font-weight: 700;
  color: var(--text-primary);
}

.description {
  font-size: 0.875rem;
  color: var(--text-muted);
  flex: 1;
}

.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.meta-hours {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.meta-icon {
  width: 0.875rem;
  height: 0.875rem;
}

.progress-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.progress-value {
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

.cta {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  transition: background-color 0.15s ease;
}

.cta--default {
  background-color: var(--color-brand-600);
}
.cta--default:hover {
  background-color: var(--color-brand-700);
}

.cta--completed {
  background-color: var(--color-emerald-600);
}
.cta--completed:hover {
  background-color: var(--color-emerald-700);
}

.cta-icon {
  width: 1rem;
  height: 1rem;
}
</style>
