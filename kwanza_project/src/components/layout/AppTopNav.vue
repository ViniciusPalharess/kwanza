<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  BookOpen,
  FileText,
  CalendarCheck,
  Target,
  Trophy,
  BarChart2,
  Award,
  CreditCard,
  Settings,
  User,
  LogOut,
  MoreVertical,
  Bell,
} from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import ProfileModal from '@/components/profile/ProfileModal.vue'
import defaultAvatar from '@/assets/images/default-avatar.png'

const userStore = useUserStore()
const router = useRouter()

const moreLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin', label: 'Painel Admin', icon: ShieldCheck },
  { to: '/participants', label: 'Participantes', icon: Users },
  { to: '/courses', label: 'Cursos', icon: BookOpen },
  { to: '/attendance', label: 'Frequência', icon: CalendarCheck },
  { to: '/competencies', label: 'Competências', icon: Target },
  { to: '/ranking', label: 'Ranking', icon: Trophy },
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
              class="w-9 h-9 rounded-full object-cover shrink-0"
            />
            <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 hidden sm:block">{{ userStore.user.name }}</p>
          </button>

          <template v-if="showUserMenu">
            <div class="absolute right-0 top-full w-44 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg z-20 py-1.5">
              <button
                type="button"
                class="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                @click="showProfileModal = true; showUserMenu = false"
              >
                <User class="w-4 h-4" /> Meus Dados
              </button>
              <button
                type="button"
                class="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                @click="handleLogout"
              >
                <LogOut class="w-4 h-4" /> Sair
              </button>
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
