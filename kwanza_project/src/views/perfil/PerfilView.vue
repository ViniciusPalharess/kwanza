<template>
  <div class="max-w-3xl space-y-6">
    <div class="text-center">
      <img
        :src="user.avatarUrl || defaultAvatar"
        alt="Foto de perfil"
        class="w-20 h-20 rounded-full object-cover mx-auto mb-3"
      />
      <h1 class="text-xl font-bold text-slate-900 dark:text-white">{{ user.name }}</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Nível {{ user.level }} · {{ user.levelName }} · {{ user.streakDays }} dias · #{{
          user.rankPosition
        }}
      </p>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <CartaoEstatistica label="Pontuação" :value="user.score" />
      <CartaoEstatistica label="Horas" :value="`${user.hours}h`" />
      <CartaoEstatistica label="Frequência" :value="`${user.attendance}%`" />
      <CartaoEstatistica label="Medalhas" :value="unlockedMedalsCount" />
    </div>

    <FormularioEdicaoPerfilView :form="form" @salvar="handleSave" />

    <div
      class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700"
    >
      <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-4">Competências</h2>
      <div class="space-y-3">
        <BarraCompetencia
          v-for="skill in skills"
          :key="skill.id"
          :name="skill.name"
          :value="skill.value"
        />
      </div>
    </div>

    <div
      class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700"
    >
      <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-4">Medalhas</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          v-for="medal in medals"
          :key="medal.id"
          class="flex flex-col items-center gap-2 rounded-xl p-3 border"
          :class="
            medal.unlocked
              ? 'border-slate-100 dark:border-slate-700'
              : 'border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900'
          "
        >
          <div
            class="w-12 h-12 rounded-full flex items-center justify-center text-white"
            :style="medal.unlocked ? { backgroundColor: medal.color } : {}"
            :class="
              !medal.unlocked && 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
            "
          >
            <Award class="w-5 h-5" />
          </div>
          <span
            class="text-xs text-center font-medium"
            :class="
              medal.unlocked
                ? 'text-slate-700 dark:text-slate-200'
                : 'text-slate-400 dark:text-slate-500'
            "
          >
            {{ medal.name }}
          </span>
        </div>
      </div>
    </div>

    <div
      class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700"
    >
      <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-4">Atividades recentes</h2>
      <ul class="divide-y divide-slate-100 dark:divide-slate-700">
        <li
          v-for="activity in recentActivities.slice(0, 4)"
          :key="activity.id"
          class="py-2.5 flex justify-between text-sm"
        >
          <span class="text-slate-700 dark:text-slate-200">{{ activity.text }}</span>
          <span class="text-slate-400 text-xs whitespace-nowrap ml-2">{{ activity.time }}</span>
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

<style></style>
