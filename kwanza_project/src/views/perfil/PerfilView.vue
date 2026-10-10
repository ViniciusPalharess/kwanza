<template>
  <div class="page">
    <div class="header">
      <img :src="user.avatarUrl || defaultAvatar" alt="Foto de perfil" class="avatar" />
      <h1 class="name">{{ user.name }}</h1>
      <p class="meta">
        Nível {{ user.level }} · {{ user.levelName }} · {{ user.streakDays }} dias · #{{
          user.rankPosition
        }}
      </p>
    </div>

    <div class="stats-grid">
      <cartao-estatistica label="Pontuação" :value="user.score" />
      <cartao-estatistica label="Horas" :value="`${user.hours}h`" />
      <cartao-estatistica label="Frequência" :value="`${user.attendance}%`" />
      <cartao-estatistica label="Medalhas" :value="unlockedMedalsCount" />
    </div>

    <formulario-edicao-perfil-view :form="form" @salvar="handleSave" />

    <div class="card">
      <h2 class="card-title">Competências</h2>
      <div class="skills-list">
        <barra-competencia
          v-for="skill in skills"
          :key="skill.id"
          :name="skill.name"
          :value="skill.value"
        />
      </div>
    </div>

    <div class="card">
      <h2 class="card-title">Medalhas</h2>
      <div class="medals-grid">
        <div
          v-for="medal in medals"
          :key="medal.id"
          class="medal-card"
          :class="{ 'medal-card--locked': !medal.unlocked }"
        >
          <div
            class="medal-icon"
            :class="{ 'medal-icon--locked': !medal.unlocked }"
            :style="medal.unlocked ? { backgroundColor: medal.color } : {}"
          >
            <award class="medal-icon-glyph" />
          </div>
          <span class="medal-name" :class="{ 'medal-name--locked': !medal.unlocked }">
            {{ medal.name }}
          </span>
        </div>
      </div>
    </div>

    <div class="card">
      <h2 class="card-title">Atividades recentes</h2>
      <ul class="activity-list">
        <li
          v-for="activity in recentActivities.slice(0, 4)"
          :key="activity.id"
          class="activity-row"
        >
          <span class="activity-text">{{ activity.text }}</span>
          <span class="activity-time">{{ activity.time }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Award } from 'lucide-vue-next'
import { Component, Vue } from 'vue-facing-decorator'
import { useUsuarioStore } from '@/stores/usuario'
import { skills, medals, recentActivities } from '@/data/dadosSimulados'
import CartaoEstatistica from '@/components/cartaoestatistica/CartaoEstatistica.vue'
import BarraCompetencia from '@/components/barracompetencia/BarraCompetencia.vue'
import FormularioEdicaoPerfilView from '@/views/perfil/views/FormularioEdicaoPerfilView.vue'
import defaultAvatar from '@/assets/images/default-avatar.png'

@Component({
  components: { CartaoEstatistica, BarraCompetencia, FormularioEdicaoPerfilView, Award },
})
export default class PerfilView extends Vue {
  // public
  public defaultAvatar = defaultAvatar
  // public
  public skills = skills
  // public
  public medals = medals
  // public
  public recentActivities = recentActivities

  // private
  private usuarioStore = useUsuarioStore()

  // public
  public form = {
    name: this.usuarioStore.user.name,
    email: this.usuarioStore.user.email,
    phone: this.usuarioStore.user.phone,
    birthDate: this.usuarioStore.user.birthDate,
    bio: this.usuarioStore.user.bio,
  }

  // public
  public get user() {
    return this.usuarioStore.user
  }

  // public
  public get unlockedMedalsCount() {
    return this.medals.filter((m) => m.unlocked).length
  }

  // public
  public handleSave() {
    this.usuarioStore.updateProfile({ ...this.form })
  }
}
</script>

<style scoped>
.page {
  max-width: 48rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header {
  text-align: center;
}

.avatar {
  width: 5rem;
  height: 5rem;
  border-radius: 9999px;
  object-fit: cover;
  margin: 0 auto 0.75rem;
}

.name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.meta {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}
@media (min-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.card {
  background-color: var(--surface);
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid var(--border-subtle);
}

.card-title {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.medals-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}
@media (min-width: 640px) {
  .medals-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.medal-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.75rem;
  padding: 0.75rem;
  border: 1px solid var(--border-subtle);
}

.medal-card--locked {
  background-color: var(--surface-sunken);
}

.medal-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.medal-icon--locked {
  background-color: var(--surface-muted);
  color: var(--text-faint);
}

.medal-icon-glyph {
  width: 1.25rem;
  height: 1.25rem;
}

.medal-name {
  font-size: 0.75rem;
  text-align: center;
  font-weight: 500;
  color: var(--text-secondary);
}

.medal-name--locked {
  color: var(--text-faint);
}

.activity-list {
  display: flex;
  flex-direction: column;
}

.activity-row {
  display: flex;
  justify-content: space-between;
  padding: 0.625rem 0;
  font-size: 0.875rem;
  border-top: 1px solid var(--border-subtle);
}
.activity-row:first-child {
  border-top: none;
}

.activity-text {
  color: var(--text-secondary);
}

.activity-time {
  color: var(--text-faint);
  font-size: 0.75rem;
  white-space: nowrap;
  margin-left: 0.5rem;
}
</style>
