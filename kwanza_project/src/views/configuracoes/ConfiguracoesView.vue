<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Configurações</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Gestão da instituição e da plataforma
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <DadosInstituicaoView :institution="store.institution" />

      <NiveisPontuacaoView
        :levels="store.levels"
        @criar="openCreateLevel"
        @editar="openEditLevel"
        @excluir="askDeleteLevel"
      />

      <UsuariosPermissoesView
        :users="store.users"
        :role-colors="roleColors"
        @criar="openCreateUser"
        @editar="openEditUser"
        @excluir="askDeleteUser"
      />

      <AparenciaView :dark="themeStore.dark" @alternar="themeStore.toggle()" />

      <PermissoesCategoriasView
        :permission-keys="permissionKeys"
        :permission-labels="permissionLabels"
        :permissions="store.permissions"
      />

      <BackupSegurancaView :last-backup="store.lastBackup" @fazer-backup="store.runBackup()" />
    </div>

    <FormularioNivelModal
      v-if="showLevelForm"
      :editing-level-id="editingLevelId"
      :form="levelForm"
      @fechar="showLevelForm = false"
      @salvar="submitLevel"
    />

    <FormularioUsuarioModal
      v-if="showUserForm"
      :editing-user-id="editingUserId"
      :form="userForm"
      :role-options="roleOptions"
      @fechar="showUserForm = false"
      @salvar="submitUser"
    />

    <DialogoConfirmacao
      v-if="confirmDeleteLevelId"
      message="Tem certeza que deseja excluir este nível?"
      @confirm="confirmDeleteLevel"
      @cancel="confirmDeleteLevelId = null"
    />
    <DialogoConfirmacao
      v-if="confirmDeleteUserId"
      message="Tem certeza que deseja remover este usuário?"
      @confirm="confirmDeleteUser"
      @cancel="confirmDeleteUserId = null"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import { useConfiguracoesStore } from '@/stores/configuracoes'
import { useTemaStore } from '@/stores/tema'
import DialogoConfirmacao from '@/components/dialogoconfirmacao/DialogoConfirmacao.vue'
import DadosInstituicaoView from '@/views/configuracoes/views/DadosInstituicaoView.vue'
import NiveisPontuacaoView from '@/views/configuracoes/views/NiveisPontuacaoView.vue'
import UsuariosPermissoesView from '@/views/configuracoes/views/UsuariosPermissoesView.vue'
import AparenciaView from '@/views/configuracoes/views/AparenciaView.vue'
import PermissoesCategoriasView from '@/views/configuracoes/views/PermissoesCategoriasView.vue'
import BackupSegurancaView from '@/views/configuracoes/views/BackupSegurancaView.vue'
import FormularioNivelModal from '@/views/configuracoes/modal/FormularioNivelModal.vue'
import FormularioUsuarioModal from '@/views/configuracoes/modal/FormularioUsuarioModal.vue'

const PERMISSION_LABELS: Record<string, string> = {
  cadastrarParticipantes: 'Cadastrar participantes',
  registrarPresenca: 'Registrar presença',
  emitirCertificados: 'Emitir certificados',
  gerarCartas: 'Gerar cartas de recomendação',
  editarPontuacao: 'Editar pontuação',
}

@Component({
  components: {
    DialogoConfirmacao,
    DadosInstituicaoView,
    NiveisPontuacaoView,
    UsuariosPermissoesView,
    AparenciaView,
    PermissoesCategoriasView,
    BackupSegurancaView,
    FormularioNivelModal,
    FormularioUsuarioModal,
  },
})
export default class ConfiguracoesView extends Vue {
  // public
  public roleOptions = ['Administrador', 'Coordenador', 'Professor', 'Monitor']
  // public
  public roleColors: Record<string, string> = {
    Administrador: 'bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300',
    Coordenador: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600',
    Professor: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600',
    Monitor: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
  }
  // public
  public permissionKeys = [
    'cadastrarParticipantes',
    'registrarPresenca',
    'emitirCertificados',
    'gerarCartas',
    'editarPontuacao',
  ]
  // public
  public permissionLabels = PERMISSION_LABELS

  // public
  public showLevelForm = false
  // public
  public editingLevelId: number | string | null = null
  // public
  public levelForm = { name: '', xp: 0 }
  // public
  public confirmDeleteLevelId: number | string | null = null

  // public
  public showUserForm = false
  // public
  public editingUserId: number | string | null = null
  // public
  public userForm = { name: '', role: this.roleOptions[0] }
  // public
  public confirmDeleteUserId: number | string | null = null

  // public
  public store = useConfiguracoesStore()
  // public
  public themeStore = useTemaStore()

  // public
  public openCreateLevel() {
    this.editingLevelId = null
    Object.assign(this.levelForm, { name: '', xp: 0 })
    this.showLevelForm = true
  }

  // public
  public openEditLevel(level: any) {
    this.editingLevelId = level.id
    Object.assign(this.levelForm, { name: level.name, xp: level.xp })
    this.showLevelForm = true
  }

  // public
  public submitLevel() {
    const payload = { name: this.levelForm.name, xp: Number(this.levelForm.xp) }
    if (this.editingLevelId) this.store.updateLevel(this.editingLevelId, payload)
    else this.store.addLevel(payload)
    this.showLevelForm = false
  }

  // public
  public askDeleteLevel(level: any) {
    this.confirmDeleteLevelId = level.id
  }

  // public
  public confirmDeleteLevel() {
    this.store.removeLevel(this.confirmDeleteLevelId)
    this.confirmDeleteLevelId = null
  }

  // public
  public openCreateUser() {
    this.editingUserId = null
    Object.assign(this.userForm, { name: '', role: this.roleOptions[0] })
    this.showUserForm = true
  }

  // public
  public openEditUser(user: any) {
    this.editingUserId = user.id
    Object.assign(this.userForm, { name: user.name, role: user.role })
    this.showUserForm = true
  }

  // public
  public submitUser() {
    if (this.editingUserId) this.store.updateUser(this.editingUserId, { ...this.userForm })
    else this.store.addUser({ ...this.userForm })
    this.showUserForm = false
  }

  // public
  public askDeleteUser(user: any) {
    this.confirmDeleteUserId = user.id
  }

  // public
  public confirmDeleteUser() {
    this.store.removeUser(this.confirmDeleteUserId)
    this.confirmDeleteUserId = null
  }
}
</script>

<style></style>
