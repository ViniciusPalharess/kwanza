<template>
  <header
    class="z-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shrink-0"
  >
    <div class="flex items-center gap-3 pl-4 sm:pl-6 pr-2 sm:pr-3 h-12">
      <RouterLink :to="{ name: 'painel' }" class="shrink-0">
        <p class="text-lg font-bold text-brand-700 dark:text-brand-400 leading-tight">
          Projeto Kwanza
        </p>
      </RouterLink>

      <div class="flex items-center gap-1.5 ml-auto">
        <!-- Menu do usuário -->
        <div class="relative" @mouseenter="showUserMenu = true" @mouseleave="showUserMenu = false">
          <button
            type="button"
            class="flex items-center gap-2 pl-1"
            @click="showUserMenu = !showUserMenu"
          >
            <img
              :src="usuarioStore.user.avatarUrl || defaultAvatar"
              alt="Foto de perfil"
              class="w-7 h-7 rounded-full object-cover shrink-0"
            />
            <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 hidden sm:block">
              {{ usuarioStore.user.name }}
            </p>
          </button>

          <template v-if="showUserMenu">
            <div
              class="absolute right-0 top-full w-96 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg z-20 p-4"
            >
              <div class="flex items-start gap-3">
                <img
                  :src="usuarioStore.user.avatarUrl || defaultAvatar"
                  alt="Foto de perfil"
                  class="w-14 h-14 rounded-full object-cover shrink-0"
                />
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-slate-900 dark:text-white truncate">
                    {{ usuarioStore.user.name }}
                  </p>
                  <p class="text-xs">
                    <button
                      type="button"
                      class="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
                      @click="openProfileModal"
                    >
                      Meus Dados
                    </button>
                    <span class="text-slate-300 dark:text-slate-600"> | </span>
                    <button
                      type="button"
                      class="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
                      @click="handleLogout"
                    >
                      Sair
                    </button>
                  </p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {{ usuarioStore.user.email }}
                  </p>
                </div>
                <div class="text-right shrink-0">
                  <p class="text-xl font-bold text-brand-600 dark:text-brand-400 leading-none">
                    {{ usuarioStore.user.score }}
                  </p>
                  <p class="text-[11px] text-slate-400">pontos</p>
                </div>
              </div>

              <p class="text-xs text-slate-400 dark:text-slate-500 mt-3">
                Usuário Kwanza desde {{ joinedAtFormatted }}
              </p>
              <p class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                Nível {{ usuarioStore.user.level }} · {{ usuarioStore.user.levelName }}
                <HelpCircle class="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
              </p>

              <hr class="my-3 border-slate-100 dark:border-slate-700" />

              <p class="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                Minha Experiência
              </p>
              <div class="space-y-1">
                <div
                  class="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-slate-600 dark:text-slate-300"
                >
                  <span class="flex items-center gap-1.5"
                    ><Clock3 class="w-3.5 h-3.5 text-slate-400" /> Horas acumuladas</span
                  >
                  <span
                    class="text-xs font-semibold bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full"
                    >{{ usuarioStore.user.hours }}h</span
                  >
                </div>
                <RouterLink
                  :to="{ name: 'frequencia' }"
                  class="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-slate-600 dark:text-slate-300"
                  @click="showUserMenu = false"
                >
                  <span class="flex items-center gap-1.5"
                    ><CalendarCheck class="w-3.5 h-3.5 text-slate-400" /> Frequência</span
                  >
                  <span
                    class="text-xs font-semibold bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full"
                    >{{ usuarioStore.user.attendance }}%</span
                  >
                </RouterLink>
                <div
                  class="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-slate-600 dark:text-slate-300"
                >
                  <span class="flex items-center gap-1.5"
                    ><Flame class="w-3.5 h-3.5 text-slate-400" /> Sequência</span
                  >
                  <span
                    class="text-xs font-semibold bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full"
                    >{{ usuarioStore.user.streakDays }} dias</span
                  >
                </div>
                <div
                  class="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-sm text-slate-600 dark:text-slate-300"
                >
                  <span class="flex items-center gap-1.5"
                    ><UserPlus class="w-3.5 h-3.5 text-slate-400" /> Convites realizados</span
                  >
                  <span
                    class="text-xs font-semibold bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full"
                    >{{ usuarioStore.user.invites }}</span
                  >
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
          <span
            class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-800"
          ></span>
        </button>

        <RouterLink
          :to="{ name: 'configuracoes' }"
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
            <div
              class="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-lg z-20 py-1.5"
            >
              <RouterLink
                v-for="link in moreLinks"
                :key="link.routeName"
                :to="{ name: link.routeName }"
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

  <PerfilModal v-if="showProfileModal" @close="showProfileModal = false" />
</template>

<script lang="ts">
import { RouterLink } from 'vue-router'
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
import { Component, Vue } from 'vue-facing-decorator'
import { useUsuarioStore } from '@/stores/usuario'
import PerfilModal from '@/components/perfil/PerfilModal.vue'
import defaultAvatar from '@/assets/images/default-avatar.png'

@Component({
  components: {
    RouterLink,
    PerfilModal,
    Settings,
    MoreVertical,
    Bell,
    HelpCircle,
    Clock3,
    Flame,
    UserPlus,
    CalendarCheck,
  },
})
export default class NavegacaoTopo extends Vue {
  // public
  public defaultAvatar = defaultAvatar

  // public
  public moreLinks = [
    { routeName: 'painel', label: 'Dashboard', icon: LayoutDashboard },
    { routeName: 'pessoas', label: 'Pessoas', icon: Users },
    { routeName: 'cursos', label: 'Cursos', icon: BookOpen },
    { routeName: 'frequencia', label: 'Frequência', icon: CalendarCheck },
    { routeName: 'ranking', label: 'Competências e Ranking', icon: Trophy },
    { routeName: 'conteudos', label: 'Conteúdos', icon: FileText },
    { routeName: 'relatorios', label: 'Relatórios', icon: BarChart2 },
    { routeName: 'certificados', label: 'Certificados', icon: Award },
    { routeName: 'cartas', label: 'Cartas', icon: CreditCard },
  ]

  // public
  public showMore = false
  // public
  public showUserMenu = false
  // public
  public showProfileModal = false

  // public
  public usuarioStore = useUsuarioStore()

  // public
  public get joinedAtFormatted() {
    if (!this.usuarioStore.user.joinedAt) return ''
    return new Date(this.usuarioStore.user.joinedAt).toLocaleDateString('pt-BR')
  }

  // public
  public handleLogout() {
    this.usuarioStore.logout()
    this.$router.push({ name: 'cadastro' })
  }

  // public
  public openProfileModal() {
    this.showProfileModal = true
    this.showUserMenu = false
  }
}
</script>

<style></style>
