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
  MoreHorizontal,
  Search,
  Bell,
  Sun,
  Moon,
} from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { useThemeStore } from '@/stores/theme'

const userStore = useUserStore()
const themeStore = useThemeStore()
const router = useRouter()

const primaryLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin', label: 'Painel Admin', icon: ShieldCheck },
  { to: '/participants', label: 'Participantes', icon: Users },
  { to: '/courses', label: 'Cursos', icon: BookOpen },
  { to: '/attendance', label: 'Frequência', icon: CalendarCheck },
  { to: '/competencies', label: 'Competências', icon: Target },
  { to: '/ranking', label: 'Ranking', icon: Trophy },
]

const moreLinks = [
  { to: '/content', label: 'Conteúdos', icon: FileText },
  { to: '/reports', label: 'Relatórios', icon: BarChart2 },
  { to: '/certificates', label: 'Certificados', icon: Award },
  { to: '/cards', label: 'Cartas', icon: CreditCard },
  { to: '/settings', label: 'Configurações', icon: Settings },
]

const allLinks = [...primaryLinks, ...moreLinks]

const showMore = ref(false)
const showUserMenu = ref(false)

function handleLogout() {
  userStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="sticky top-0 z-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
    <div class="flex items-center gap-3 px-4 sm:px-6 h-16">
      <RouterLink to="/dashboard" class="shrink-0">
        <p class="text-lg font-bold text-brand-700 dark:text-brand-400 leading-tight">Projeto Kwanza</p>
        <p class="text-xs text-slate-500 dark:text-slate-400 -mt-0.5">Kenya Club</p>
      </RouterLink>

      <!-- Menu horizontal (desktop) -->
      <nav class="hidden lg:flex items-center gap-1 ml-4">
        <RouterLink
          v-for="link in primaryLinks"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition whitespace-nowrap"
          active-class="bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400"
        >
          <component :is="link.icon" class="w-4 h-4" />
          {{ link.label }}
        </RouterLink>

        <!-- Ícone de mais opções -->
        <div class="relative">
          <button
            type="button"
            class="flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            title="Mais páginas"
            @click="showMore = !showMore"
          >
            <MoreHorizontal class="w-5 h-5" />
          </button>

          <template v-if="showMore">
            <div class="fixed inset-0 z-10" @click="showMore = false" />
            <div class="absolute left-0 mt-2 w-52 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg z-20 py-1.5">
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
      </nav>

      <div class="relative flex-1 max-w-xs hidden md:block ml-auto">
        <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar participantes, cursos..."
          class="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
      </div>

      <div class="flex items-center gap-1.5 ml-auto md:ml-0">
        <button
          type="button"
          class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
          :title="themeStore.dark ? 'Ativar tema claro' : 'Ativar tema escuro'"
          @click="themeStore.toggle()"
        >
          <Sun v-if="themeStore.dark" class="w-4.5 h-4.5" />
          <Moon v-else class="w-4.5 h-4.5" />
        </button>

        <button
          type="button"
          class="relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
        >
          <Bell class="w-5 h-5" />
          <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-800"></span>
        </button>

        <!-- Menu do usuário -->
        <div class="relative">
          <button type="button" class="flex items-center gap-2 pl-1" @click="showUserMenu = !showUserMenu">
            <div class="text-right leading-tight hidden sm:block">
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-100">{{ userStore.user.name }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Nível {{ userStore.user.level }} · {{ userStore.user.levelName }}</p>
            </div>
            <div class="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-semibold shrink-0">
              {{ userStore.user.initials }}
            </div>
          </button>

          <template v-if="showUserMenu">
            <div class="fixed inset-0 z-10" @click="showUserMenu = false" />
            <div class="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg z-20 py-1.5">
              <RouterLink
                to="/profile"
                class="flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                @click="showUserMenu = false"
              >
                <User class="w-4 h-4" /> Meu Perfil
              </RouterLink>
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
      </div>
    </div>

    <!-- Menu horizontal com rolagem (mobile/tablet) -->
    <nav class="lg:hidden flex items-center gap-1 px-4 pb-2 overflow-x-auto">
      <RouterLink
        v-for="link in allLinks"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition whitespace-nowrap shrink-0"
        active-class="bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400"
      >
        <component :is="link.icon" class="w-3.5 h-3.5" />
        {{ link.label }}
      </RouterLink>
    </nav>
  </header>
</template>
