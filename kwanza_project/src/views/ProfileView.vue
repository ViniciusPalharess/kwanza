<script setup>
import { reactive } from 'vue'
import { Award } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { skills, medals, recentActivities } from '@/data/mockData'
import StatCard from '@/components/StatCard.vue'
import SkillBar from '@/components/SkillBar.vue'
import defaultAvatar from '@/assets/images/default-avatar.png'

const userStore = useUserStore()
const user = userStore.user

const form = reactive({
  name: user.name,
  email: user.email,
  phone: user.phone,
  birthDate: user.birthDate,
  bio: user.bio,
})

function handleSave() {
  userStore.updateProfile({ ...form })
}
</script>

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
        Nível {{ user.level }} · {{ user.levelName }} · {{ user.streakDays }} dias · #{{ user.rankPosition }}
      </p>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard label="Pontuação" :value="user.score" />
      <StatCard label="Horas" :value="`${user.hours}h`" />
      <StatCard label="Frequência" :value="`${user.attendance}%`" />
      <StatCard label="Medalhas" :value="medals.filter((m) => m.unlocked).length" />
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-4">Editar perfil</h2>
      <form class="space-y-3" @submit.prevent="handleSave">
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Nome completo</label>
          <input v-model="form.name" type="text" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200" />
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">E-mail</label>
          <input v-model="form.email" type="email" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200" />
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Telefone</label>
          <input v-model="form.phone" type="tel" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200" />
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Data de nascimento</label>
          <input v-model="form.birthDate" type="date" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200" />
        </div>
        <div>
          <label class="text-sm font-medium block mb-1 text-slate-600 dark:text-slate-300">Sobre mim</label>
          <textarea v-model="form.bio" rows="3" class="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200" />
        </div>
        <button type="submit" class="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 rounded-lg transition">
          Salvar alterações
        </button>
      </form>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-4">Competências</h2>
      <div class="space-y-3">
        <SkillBar v-for="skill in skills" :key="skill.id" :name="skill.name" :value="skill.value" />
      </div>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-4">Medalhas</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          v-for="medal in medals"
          :key="medal.id"
          class="flex flex-col items-center gap-2 rounded-xl p-3 border"
          :class="medal.unlocked ? 'border-slate-100 dark:border-slate-700' : 'border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900'"
        >
          <div
            class="w-12 h-12 rounded-full flex items-center justify-center text-white"
            :style="medal.unlocked ? { backgroundColor: medal.color } : {}"
            :class="!medal.unlocked && 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'"
          >
            <Award class="w-5 h-5" />
          </div>
          <span class="text-xs text-center font-medium" :class="medal.unlocked ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'">
            {{ medal.name }}
          </span>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
      <h2 class="font-bold text-lg text-slate-900 dark:text-white mb-4">Atividades recentes</h2>
      <ul class="divide-y divide-slate-100 dark:divide-slate-700">
        <li v-for="activity in recentActivities.slice(0, 4)" :key="activity.id" class="py-2.5 flex justify-between text-sm">
          <span class="text-slate-700 dark:text-slate-200">{{ activity.text }}</span>
          <span class="text-slate-400 text-xs whitespace-nowrap ml-2">{{ activity.time }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
