<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  CalendarCheck,
  Trophy,
  BarChart2,
  Award,
  CreditCard,
  Settings,
  MoreVertical,
  Bell,
  HelpCircle,
  Clock3,
  Flame,
  UserPlus,
} from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import ProfileModal from '@/components/profile/ProfileModal.vue'
import defaultAvatar from '@/assets/images/default-avatar.png'

const userStore = useUserStore()
const router = useRouter()

const joinedAtFormatted = computed(() => {
  if (!userStore.user.joinedAt) return ''
  return new Date(userStore.user.joinedAt).toLocaleDateString('pt-BR')
})

const moreLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/participants', label: 'Pessoas', icon: Users },
  { to: '/courses', label: 'Cursos', icon: BookOpen },
  { to: '/attendance', label: 'Frequência', icon: CalendarCheck },
  { to: '/ranking', label: 'Competências e Ranking', icon: Trophy },
  { to: '/content', label: 'Conteúdos', icon: FileText },
  { to: '/reports', label: 'Relatórios', icon: BarChart2 },
  { to: '/certificates', label: 'Certificados', icon: Award },
  { to: '/cards', label: 'Cartas', icon: CreditCard },
]

const showMore = ref(false)
const showUserMenu = ref(false)
const showProfileModal = ref(false)

function handleLogout() {
  userStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="z-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shrink-0">
    <div class="flex items-center gap-3 pl-4 sm:pl-6 pr-2 sm:pr-3 h-12">
      <RouterLink to="/dashboard" class="shrink-0">
        <p class="text-lg font-bold text-brand-700 dark:text-brand-400 leading-tight">Projeto Kwanza</p>
      </RouterLink>

      <div class="flex items-center gap-1.5 ml-auto">
        <!-- Menu do usuário -->
        <div class="relative" @mouseenter="showUserMenu = true" @mouseleave="showUserMenu = false">
          <button type="button" class="flex items-center gap-2 pl-1" @click="showUserMenu = !showUserMenu">
            <img
              :src="userStore.user.avatarUrl || defaultAvatar"
              alt="Foto de perfil"
              class="w-7 h-7 rounded-full object-cover shrink-0"
            />
            <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 hidden sm:block">{{ userStore.user.name }}</p>
          </button>

          <template v-if="showUserMenu">
            <div class="absolute right-0 top-full w-96 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg z-20 p-4">
              <div class="flex items-start gap-3">
                <img
                  :src="userStore.user.avatarUrl || defaultAvatar"
                  alt="Foto de perfil"
                  class="w-14 h-14 rounded-full object-cover shrink-0"
                />
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-slate-900 dark:text-white truncate">{{ userStore.user.name }}</p>
                  <p class="text-xs">
                    <button
                      type="button"
                      class="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
                      @click="showProfileModal = true; showUserMenu = false"
                    >
                      Meus Dados
                    </button>
                    <span class="text-slate-300 dark:text-slate-600"> | </span>
                    <button type="button" class="text-brand-600 dark:text-brand-400 font-semibold hover:underline" @click="handleLogout">
                      Sair
                    </button>
                  </p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{{ userStore.user.email }}</p>
                </div>
                <div class="text-right shrink-0">
                  <p class="text-xl font-bold text-brand-600 dark:text-brand-400 leading-none">{{ userStore.user.score }}</p>
                  <p class="text-[11px] text-slate-400">pontos</p>
                </div>
              </div>

              <p class="text-xs text-slate-400 dark:text-slate-500 mt-3">Usuário Kwanza desde {{ joinedAtFormatted }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                Nível {{ userStore.user.level }} · {{ userStore.user.levelName }}
                <HelpCircle class="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
              </p>

              <hr class="my-3 border-slate-100 dark:border-slate-700" />

              <p class="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Minha Experiência</p>
              <div class="space-y-1">
                <div class="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-slate-600 dark:text-slate-300">
                  <span class="flex items-center gap-1.5"><Clock3 class="w-3.5 h-3.5 text-slate-400" /> Horas acumuladas</span>
                  <span class="text-xs font-semibold bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{{ userStore.user.hours }}h</span>
                </div>
                <RouterLink
                  to="/attendance"
                  class="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-slate-600 dark:text-slate-300"
                  @click="showUserMenu = false"
                >
                  <span class="flex items-center gap-1.5"><CalendarCheck class="w-3.5 h-3.5 text-slate-400" /> Frequência</span>
                  <span class="text-xs font-semibold bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{{ userStore.user.attendance }}%</span>
                </RouterLink>
                <div class="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-slate-600 dark:text-slate-300">
                  <span class="flex items-center gap-1.5"><Flame class="w-3.5 h-3.5 text-slate-400" /> Sequência</span>
                  <span class="text-xs font-semibold bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{{ userStore.user.streakDays }} dias</span>
                </div>
                <div class="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-slate-600 dark:text-slate-300">
                  <span class="flex items-center gap-1.5"><UserPlus class="w-3.5 h-3.5 text-slate-400" /> Convites realizados</span>
                  <span class="text-xs font-semibold bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{{ userStore.user.invites }}</span>
                </div>
              </div>
            </div>
          </template>
        </div>

        <button
          type="button"
          class="relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
          title="Notificações"
        >
          <Bell class="w-5 h-5" />
          <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-800"></span>
        </button>

        <RouterLink
          to="/settings"
          class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
          active-class="text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10"
          title="Configurações"
        >
          <Settings class="w-5 h-5" />
        </RouterLink>

        <!-- Opções de tela -->
        <div class="relative">
          <button
            type="button"
            class="flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            title="Mais opções"
            @click="showMore = !showMore"
          >
            <MoreVertical class="w-5 h-5" />
          </button>

          <template v-if="showMore">
            <div class="fixed inset-0 z-10" @click="showMore = false" />
            <div class="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg z-20 py-1.5">
              <RouterLink
                v-for="link in moreLinks"
                :key="link.to"
                :to="link.to"
                class="flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                active-class="text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10"
                @click="showMore = false"
              >
                <component :is="link.icon" class="w-4 h-4" />
                {{ link.label }}
              </RouterLink>
            </div>
          </template>
        </div>
      </div>
    </div>
  </header>

  <ProfileModal v-if="showProfileModal" @close="showProfileModal = false" />
</template>
