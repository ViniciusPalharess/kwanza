<template>
  <div class="page">
    <!-- Action buttons -->
    <div class="actions-row">
      <router-link
        :to="{ name: 'detalheCurso', params: { id: 1 } }"
        class="action-button action-button--primary"
      >
        <play class="action-icon" /> Iniciar curso
      </router-link>
      <router-link :to="{ name: 'certificados' }" class="action-button action-button--secondary">
        <award class="action-icon" /> Visualizar certificado
      </router-link>
      <router-link :to="{ name: 'perfil' }" class="action-button action-button--secondary">
        <pencil class="action-icon" /> Editar perfil
      </router-link>
    </div>

    <!-- Stat cards -->
    <div class="stats-grid">
      <cartao-estatistica
        label="Pontuação"
        :value="user.score"
        :percent="12"
        :icon="Star"
        variant="amber"
      />
      <cartao-estatistica
        label="Horas acumuladas"
        :value="`${user.hours}h`"
        :percent="8"
        :icon="Clock3"
      />
      <cartao-estatistica
        label="Frequência"
        :value="`${user.attendance}%`"
        :icon="CalendarCheck"
        variant="emerald"
      />
      <cartao-estatistica
        label="Convites realizados"
        :value="user.invites"
        :percent="5"
        :icon="UserPlus"
      />
    </div>

    <div class="content-grid">
      <!-- Main column -->
      <div class="main-column">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Próximo objetivo</h2>
            <span class="card-meta">Nível {{ user.level + 1 }} · Baobá</span>
          </div>
          <div class="xp-row">
            <span>{{ user.xp }} XP</span>
            <span>{{ user.xpToNextLevel }} XP</span>
          </div>
          <div class="track track--main">
            <div class="fill" :style="{ width: percent + '%' }" />
          </div>
          <ul class="goal-list">
            <li v-for="goal in nextGoals" :key="goal.id">
              <div class="goal-row">
                <span class="goal-label">{{ goal.label }}</span>
                <span class="goal-xp">+{{ goal.xp }} XP</span>
              </div>
              <div class="track track--small">
                <div class="fill fill--light" :style="{ width: goal.progress + '%' }" />
              </div>
            </li>
          </ul>
        </div>

        <div>
          <div class="section-header">
            <h2 class="section-title">Cursos em andamento</h2>
            <router-link :to="{ name: 'cursos' }" class="section-link">Ver todos</router-link>
          </div>
          <div class="courses-grid">
            <cartao-curso v-for="course in inProgressCourses" :key="course.id" :course="course" />
          </div>
        </div>
      </div>

      <!-- Side column -->
      <div class="side-column">
        <div class="card">
          <h2 class="card-title card-title--spaced">Competências</h2>
          <div class="skills-list">
            <barra-competencia
              v-for="skill in skills"
              :key="skill.id"
              :name="skill.name"
              :value="skill.value"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
import { Play, Award, Pencil, Star, Clock3, CalendarCheck, UserPlus } from 'lucide-vue-next'
import { Component, Vue } from 'vue-facing-decorator'
import { useUsuarioStore } from '@/stores/usuario'
import { useCursosStore } from '@/stores/cursos'
import { nextGoals, skills } from '@/data/dadosSimulados'
import CartaoEstatistica from '@/components/cartaoestatistica/CartaoEstatistica.vue'
import BarraCompetencia from '@/components/barracompetencia/BarraCompetencia.vue'
import CartaoCurso from '@/components/cartaocurso/CartaoCurso.vue'

@Component({
  components: {
    RouterLink,
    CartaoEstatistica,
    BarraCompetencia,
    CartaoCurso,
    Play,
    Award,
    Pencil,
    Star,
    Clock3,
    CalendarCheck,
    UserPlus,
  },
})
export default class PainelView extends Vue {
  // public
  public nextGoals = nextGoals
  // public
  public skills = skills

  // private
  private usuarioStore = useUsuarioStore()
  // private
  private cursosStore = useCursosStore()

  // public
  public get user() {
    return this.usuarioStore.user
  }

  // public
  public get percent() {
    return Math.round((this.user.xp / this.user.xpToNextLevel) * 100)
  }

  // public
  public get inProgressCourses() {
    return this.cursosStore.list.filter((c) => c.status !== 'not_started').slice(0, 3)
  }
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.actions-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease;
}

.action-button--primary {
  background-color: var(--accent);
  color: #fff;
}
.action-button--primary:hover {
  background-color: var(--accent-hover);
}

.action-button--secondary {
  background-color: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-secondary);
}
.action-button--secondary:hover {
  background-color: var(--surface-hover);
}

.action-icon {
  width: 1rem;
  height: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
}
@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.main-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
@media (min-width: 1024px) {
  .main-column {
    grid-column: span 2 / span 2;
  }
}

.side-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card {
  background-color: var(--surface);
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid var(--border-subtle);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.card-title {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.card-title--spaced {
  margin-bottom: 1rem;
}

.card-meta {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.xp-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.track {
  border-radius: 9999px;
  background-color: var(--surface-muted);
  overflow: hidden;
}

.track--main {
  height: 0.5rem;
  margin-bottom: 1rem;
}

.track--small {
  height: 0.375rem;
}

.fill {
  height: 100%;
  border-radius: 9999px;
  background-color: var(--accent);
}

.fill--light {
  background-color: var(--color-brand-400);
}

.goal-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.goal-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.goal-label {
  color: var(--text-strong);
}

.goal-xp {
  color: var(--accent-text);
  font-weight: 600;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.section-title {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.section-link {
  font-size: 0.875rem;
  color: var(--accent-text);
  font-weight: 600;
}

.courses-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
}
@media (min-width: 640px) {
  .courses-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 1280px) {
  .courses-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
