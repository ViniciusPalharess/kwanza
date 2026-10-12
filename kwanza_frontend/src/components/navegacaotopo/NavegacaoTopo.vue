<template>
  <header class="header">
    <div class="bar">
      <router-link :to="{ name: 'painel' }" class="logo">
        <p class="logo-text">Projeto Kwanza</p>
      </router-link>

      <div class="actions">
        <!-- Menu do usuário -->
        <div class="user-menu" @mouseenter="showUserMenu = true" @mouseleave="showUserMenu = false">
          <botao :acao="AcaoBotao.texto" class="user-trigger" @click="showUserMenu = !showUserMenu">
            <template #icone>
              <img
                :src="usuarioStore.user.avatarUrl || defaultAvatar"
                alt="Foto de perfil"
                class="avatar"
              />
            </template>
            <p class="user-name">{{ usuarioStore.user.name }}</p>
          </botao>

          <template v-if="showUserMenu">
            <div class="dropdown">
              <div class="dropdown-header">
                <img
                  :src="usuarioStore.user.avatarUrl || defaultAvatar"
                  alt="Foto de perfil"
                  class="dropdown-avatar"
                />
                <div class="dropdown-info">
                  <p class="dropdown-name">{{ usuarioStore.user.name }}</p>
                  <p class="dropdown-actions">
                    <button type="button" class="link-action" @click="openProfileModal">
                      Meus Dados
                    </button>
                    <span class="separator"> | </span>
                    <button type="button" class="link-action" @click="handleLogout">Sair</button>
                  </p>
                  <p class="dropdown-email">{{ usuarioStore.user.email }}</p>
                </div>
                <div class="dropdown-score">
                  <p class="score-value">{{ usuarioStore.user.score }}</p>
                  <p class="score-label">pontos</p>
                </div>
              </div>

              <p class="joined-info">Usuário Kwanza desde {{ joinedAtFormatted }}</p>
              <p class="level-info">
                Nível {{ usuarioStore.user.level }} · {{ usuarioStore.user.levelName }}
                <help-circle class="level-info-icon" />
              </p>

              <hr class="divider" />

              <p class="section-title">Minha Experiência</p>
              <div class="stats-list">
                <div class="stat-row">
                  <span class="stat-label"><clock3 class="stat-icon" /> Horas acumuladas</span>
                  <span class="stat-value">{{ usuarioStore.user.hours }}h</span>
                </div>
                <router-link
                  :to="{ name: 'frequencia' }"
                  class="stat-row stat-row--link"
                  @click="showUserMenu = false"
                >
                  <span class="stat-label"><calendar-check class="stat-icon" /> Frequência</span>
                  <span class="stat-value">{{ usuarioStore.user.attendance }}%</span>
                </router-link>
                <div class="stat-row">
                  <span class="stat-label"><flame class="stat-icon" /> Sequência</span>
                  <span class="stat-value">{{ usuarioStore.user.streakDays }} dias</span>
                </div>
                <div class="stat-row">
                  <span class="stat-label"
                    ><user-plus class="stat-icon" /> Convites realizados</span
                  >
                  <span class="stat-value">{{ usuarioStore.user.invites }}</span>
                </div>
              </div>
            </div>
          </template>
        </div>

        <botao :acao="AcaoBotao.outro" somente-icone class="icon-button" title="Notificações">
          <template #icone>
            <bell class="icon" />
            <span class="notification-dot"></span>
          </template>
        </botao>

        <router-link
          :to="{ name: 'configuracoes' }"
          class="icon-button"
          active-class="icon-button--active"
          title="Configurações"
        >
          <settings class="icon" />
        </router-link>

        <!-- Opções de tela -->
        <div class="more-wrapper">
          <botao
            :acao="AcaoBotao.outro"
            somente-icone
            class="icon-button"
            title="Mais opções"
            @click="showMore = !showMore"
          >
            <template #icone>
              <more-vertical class="icon" />
            </template>
          </botao>

          <template v-if="showMore">
            <div class="backdrop" @click="showMore = false" />
            <div class="more-menu">
              <router-link
                v-for="link in moreLinks"
                :key="link.routeName"
                :to="{ name: link.routeName }"
                class="more-link"
                active-class="more-link--active"
                @click="showMore = false"
              >
                <component :is="link.icon" class="more-link-icon" />
                {{ link.label }}
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </div>
  </header>

  <perfil-modal v-if="showProfileModal" @close="showProfileModal = false" />
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
import Botao from '@/components/botao/Botao.vue'
import PerfilModal from '@/components/perfil/PerfilModal.vue'
import { AcaoBotao } from '@/enums/AcaoBotao'
import defaultAvatar from '@/assets/images/default-avatar.png'

@Component({
  components: {
    RouterLink,
    Botao,
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
  public AcaoBotao = AcaoBotao
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

<style scoped>
.header {
  z-index: 20;
  background-color: var(--surface);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-left: 1rem;
  padding-right: 0.5rem;
  height: 3rem;
}
@media (min-width: 640px) {
  .bar {
    padding-left: 1.5rem;
    padding-right: 0.75rem;
  }
}

.logo {
  flex-shrink: 0;
}

.logo-text {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--accent-text-strong);
  line-height: 1.25;
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-left: auto;
}

.user-menu {
  position: relative;
}

.user-trigger {
  gap: 0.5rem !important;
  padding: 0 0 0 0.25rem !important;
}

.avatar {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 9999px;
  object-fit: cover;
  flex-shrink: 0;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-strong);
  display: none;
}
@media (min-width: 640px) {
  .user-name {
    display: block;
  }
}

.dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  width: 24rem;
  background-color: var(--surface);
  border: 1px solid var(--border-subtle);
  border-radius: 0.75rem;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  z-index: 20;
  padding: 1rem;
}

.dropdown-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.dropdown-avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 9999px;
  object-fit: cover;
  flex-shrink: 0;
}

.dropdown-info {
  flex: 1;
  min-width: 0;
}

.dropdown-name {
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-actions {
  font-size: 0.75rem;
}

.link-action {
  color: var(--accent-text);
  font-weight: 600;
}
.link-action:hover {
  text-decoration: underline;
}

.separator {
  color: var(--text-placeholder);
}

.dropdown-email {
  font-size: 0.75rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0.125rem;
}

.dropdown-score {
  text-align: right;
  flex-shrink: 0;
}

.score-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--accent-text);
  line-height: 1;
}

.score-label {
  font-size: 0.6875rem;
  color: var(--text-faint);
}

.joined-info {
  font-size: 0.75rem;
  color: var(--text-faint);
  margin-top: 0.75rem;
}

.level-info {
  font-size: 0.75rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.125rem;
}

.level-info-icon {
  width: 0.875rem;
  height: 0.875rem;
  color: var(--text-placeholder);
}

.divider {
  margin: 0.75rem 0;
  border-color: var(--border-subtle);
}

.section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.375rem;
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.stat-row--link:hover {
  background-color: var(--surface-hover);
}

.stat-label {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.stat-icon {
  width: 0.875rem;
  height: 0.875rem;
  color: var(--text-faint);
}

.stat-value {
  font-size: 0.75rem;
  font-weight: 600;
  background-color: var(--surface-muted);
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
}

.icon-button {
  position: relative;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem !important;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-faint);
  transition:
    color 0.15s ease,
    background-color 0.15s ease;
}
.icon-button:hover {
  color: var(--text-secondary);
  background-color: var(--surface-hover);
}
.icon-button--active {
  color: var(--accent-text-strong);
  background-color: var(--accent-subtle-bg);
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

.notification-dot {
  position: absolute;
  top: 0.375rem;
  right: 0.375rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: var(--danger);
  box-shadow: 0 0 0 2px var(--surface);
}

.more-wrapper {
  position: relative;
}

.backdrop {
  position: fixed;
  inset: 0;
  z-index: 10;
}

.more-menu {
  position: absolute;
  right: 0;
  margin-top: 0.5rem;
  width: 13rem;
  background-color: var(--surface);
  border: 1px solid var(--border-subtle);
  border-radius: 0.75rem;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  z-index: 20;
  padding: 0.375rem 0;
}

.more-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}
.more-link:hover {
  background-color: var(--surface-hover);
}
.more-link--active {
  color: var(--accent-text-strong);
  background-color: var(--accent-subtle-bg);
}

.more-link-icon {
  width: 1rem;
  height: 1rem;
}
</style>
