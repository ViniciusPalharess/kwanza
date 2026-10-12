<template>
  <div class="page">
    <router-link :to="{ name: 'cursos' }" class="back-link">
      <arrow-left class="back-icon" /> Voltar para Cursos
    </router-link>

    <div v-if="course" class="card">
      <div class="banner" />
      <div class="body">
        <div>
          <span class="category">{{ course.category }}</span>
          <h1 class="title">{{ course.title }}</h1>
          <p class="description">{{ course.description }}</p>
        </div>

        <div class="meta">
          <span class="meta-item"><user class="meta-icon" /> {{ course.teacher }}</span>
          <span class="meta-item"><clock3 class="meta-icon" /> {{ course.hours }}h</span>
        </div>

        <div class="progress-box">
          <div class="progress-row">
            <span>Progresso</span>
            <span class="progress-value">{{ course.progress }}%</span>
          </div>
          <div class="track">
            <div class="fill" :style="{ width: course.progress + '%' }" />
          </div>
        </div>

        <botao
          :acao="AcaoBotao.salvar"
          largura-total
          class="cta"
          :class="course.status === 'completed' ? 'cta--completed' : ''"
        >
          <template #icone>
            <component
              :is="course.status === 'completed' ? CheckCircle2 : RotateCw"
              class="cta-icon"
            />
          </template>
          {{ course.status === 'completed' ? 'Revisar curso' : 'Continuar curso' }}
        </botao>
      </div>
    </div>

    <div v-else class="empty-state">Curso não encontrado.</div>
  </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowLeft, Clock3, User, CheckCircle2, RotateCw } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Botao from '@/components/botao/Botao.vue'
import { AcaoBotao } from '@/enums/AcaoBotao'
import { useCursosStore } from '@/stores/cursos'

@Component({
  components: { RouterLink, ArrowLeft, Clock3, User, CheckCircle2, RotateCw, Botao },
})
export default class DetalheCursoView extends Vue {
  // public
  public AcaoBotao = AcaoBotao
  // public
  @Prop({ type: String, required: true })
  public id!: string

  // public
  public CheckCircle2 = CheckCircle2
  // public
  public RotateCw = RotateCw

  // private
  private store = useCursosStore()

  // public
  public get course() {
    return this.store.byId(this.id)
  }
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 48rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-muted);
}
.back-link:hover {
  color: var(--accent-text);
}

.back-icon {
  width: 1rem;
  height: 1rem;
}

.card {
  background-color: var(--surface);
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
}

.banner {
  height: 10rem;
  background: linear-gradient(to bottom right, var(--color-brand-500), var(--color-brand-800));
}

.body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.category {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent-text);
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.description {
  color: var(--text-muted);
  margin-top: 0.5rem;
}

.meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.meta-icon {
  width: 1rem;
  height: 1rem;
}

.progress-box {
  background-color: var(--surface-sunken);
  border-radius: 0.5rem;
  padding: 1rem;
}

.progress-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
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

.cta--completed {
  background-color: var(--success) !important;
}
.cta--completed:hover:not(:disabled) {
  background-color: var(--success-hover) !important;
}

.cta-icon {
  width: 1rem;
  height: 1rem;
}

.empty-state {
  background-color: var(--surface);
  border-radius: 0.75rem;
  border: 1px solid var(--border-subtle);
  padding: 2rem;
  text-align: center;
  color: var(--text-muted);
}
</style>
