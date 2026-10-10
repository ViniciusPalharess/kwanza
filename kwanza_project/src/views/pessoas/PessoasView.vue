<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Pessoas</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        {{ store.list.length }} pessoas no Projeto Kwanza
      </p>
    </div>

    <div
      class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 space-y-4"
    >
      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            v-model="search"
            type="text"
            placeholder="Pesquisar por nome ou e-mail..."
            class="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <button
          type="button"
          class="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition shrink-0"
          @click="openCreate"
        >
          <UserPlus class="w-4 h-4" /> Adicionar pessoa
        </button>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.label"
          type="button"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition"
          :class="
            roleFilter === tab.label
              ? 'bg-brand-600 text-white'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
          "
          @click="selectRoleFilter(tab.label)"
        >
          {{ tab.label }}
          <span
            class="text-xs px-1.5 rounded-full"
            :class="roleFilter === tab.label ? 'bg-white/20' : 'bg-white dark:bg-slate-800'"
            >{{ tab.count }}</span
          >
        </button>
      </div>

      <ListaPessoasView
        :pessoas="paged"
        :role-badge-class="roleBadgeClass"
        @visualizar="openView"
        @editar="openEdit"
        @excluir="askDelete"
      />
    </div>

    <div class="flex items-center justify-between text-sm">
      <span class="text-slate-500 dark:text-slate-400">Página {{ page }} de {{ totalPages }}</span>
      <div class="flex gap-2">
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 disabled:opacity-40"
          :disabled="page === 1"
          @click="goPrev"
        >
          Anterior
        </button>
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 disabled:opacity-40"
          :disabled="page === totalPages"
          @click="goNext"
        >
          Próxima
        </button>
      </div>
    </div>

    <FormularioPessoaModal
      v-if="showForm"
      :view-only="viewOnly"
      :editing-id="editingId"
      :form="form"
      :role-options="roleOptions"
      @fechar="showForm = false"
      @salvar="submitForm"
    />

    <DialogoConfirmacao
      v-if="confirmDeleteId"
      :message="`Tem certeza que deseja excluir ${confirmDeleteName}? Essa ação não pode ser desfeita.`"
      @confirm="confirmDelete"
      @cancel="confirmDeleteId = null"
    />
  </div>
</template>

<script lang="ts">
import { UserPlus, Search } from 'lucide-vue-next'
import { Component, Vue } from 'vue-facing-decorator'
import { usePessoasStore } from '@/stores/pessoas'
import DialogoConfirmacao from '@/components/dialogoconfirmacao/DialogoConfirmacao.vue'
import ListaPessoasView from '@/views/pessoas/views/ListaPessoasView.vue'
import FormularioPessoaModal from '@/views/pessoas/modal/FormularioPessoaModal.vue'

const PAGE_SIZE = 8

const emptyForm = () => ({
  name: '',
  phone: '',
  role: 'Participante',
  level: 1,
  score: 0,
  attendance: 0,
  avatarUrl: '',
})

@Component({
  components: { DialogoConfirmacao, ListaPessoasView, FormularioPessoaModal, UserPlus, Search },
})
export default class PessoasView extends Vue {
  // public
  public roleOptions = ['Participante', 'Administrador', 'Professor']
  // public
  public roleBadgeClass: Record<string, string> = {
    Participante: 'bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300',
    Administrador: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600',
    Professor: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600',
  }

  // public
  public search = ''
  // public
  public roleFilter = 'Todos'
  // public
  public page = 1
  // public
  public showForm = false
  // public
  public viewOnly = false
  // public
  public editingId: number | string | null = null
  // public
  public form = emptyForm()
  // public
  public confirmDeleteId: number | string | null = null
  // public
  public confirmDeleteName = ''

  // public
  public store = usePessoasStore()

  // public
  public get tabs() {
    return [
      { label: 'Todos', count: this.store.list.length },
      ...this.roleOptions.map((role) => ({
        label: role,
        count: this.store.list.filter((p) => p.role === role).length,
      })),
    ]
  }

  // public
  public get filtered() {
    return this.store.list
      .filter((p) => this.roleFilter === 'Todos' || p.role === this.roleFilter)
      .filter((p) => p.name.toLowerCase().includes(this.search.toLowerCase()))
  }

  // public
  public get totalPages() {
    return Math.max(1, Math.ceil(this.filtered.length / PAGE_SIZE))
  }

  // public
  public get paged() {
    const start = (this.page - 1) * PAGE_SIZE
    return this.filtered.slice(start, start + PAGE_SIZE)
  }

  // public
  public selectRoleFilter(role: string) {
    this.roleFilter = role
    this.page = 1
  }

  // public
  public goPrev() {
    if (this.page > 1) this.page -= 1
  }

  // public
  public goNext() {
    if (this.page < this.totalPages) this.page += 1
  }

  // public
  public openCreate() {
    this.editingId = null
    this.viewOnly = false
    Object.assign(this.form, emptyForm())
    this.showForm = true
  }

  // public
  public openEdit(person: any) {
    this.editingId = person.id
    this.viewOnly = false
    Object.assign(this.form, {
      name: person.name,
      phone: person.phone,
      role: person.role,
      level: person.level,
      score: person.score,
      attendance: person.attendance,
      avatarUrl: person.avatarUrl || '',
    })
    this.showForm = true
  }

  // public
  public openView(person: any) {
    this.editingId = person.id
    this.viewOnly = true
    Object.assign(this.form, {
      name: person.name,
      phone: person.phone,
      role: person.role,
      level: person.level,
      score: person.score,
      attendance: person.attendance,
      avatarUrl: person.avatarUrl || '',
    })
    this.showForm = true
  }

  // public
  public submitForm() {
    const payload = {
      name: this.form.name,
      phone: this.form.phone,
      role: this.form.role,
      level: Number(this.form.level),
      score: Number(this.form.score),
      attendance: Number(this.form.attendance),
      avatarUrl: this.form.avatarUrl,
    }
    if (this.editingId) this.store.update(this.editingId, payload)
    else this.store.add(payload)
    this.showForm = false
  }

  // public
  public askDelete(person: any) {
    this.confirmDeleteId = person.id
    this.confirmDeleteName = person.name
  }

  // public
  public confirmDelete() {
    this.store.remove(this.confirmDeleteId)
    this.confirmDeleteId = null
  }
}
</script>

<style></style>
