<template>
  <div class="page">
    <div>
      <h1 class="title">Pessoas</h1>
      <p class="subtitle">{{ store.list.length }} pessoas no Projeto Kwanza</p>
    </div>

    <div class="card">
      <div class="toolbar">
        <div class="search-field">
          <search class="search-icon" />
          <input
            v-model="search"
            type="text"
            placeholder="Pesquisar por nome ou e-mail..."
            class="search-input"
          />
        </div>
        <button type="button" class="add-button" @click="openCreate">
          <user-plus class="add-icon" /> Adicionar pessoa
        </button>
      </div>

      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.label"
          type="button"
          class="tab"
          :class="{ 'tab--active': roleFilter === tab.label }"
          @click="selectRoleFilter(tab.label)"
        >
          {{ tab.label }}
          <span class="tab-count" :class="{ 'tab-count--active': roleFilter === tab.label }">{{
            tab.count
          }}</span>
        </button>
      </div>

      <lista-pessoas-view
        :pessoas="paged"
        :role-badge-class="roleBadgeClass"
        @visualizar="openView"
        @editar="openEdit"
        @excluir="askDelete"
      />
    </div>

    <div class="pagination">
      <span class="pagination-label">Página {{ page }} de {{ totalPages }}</span>
      <div class="pagination-actions">
        <button type="button" class="page-button" :disabled="page === 1" @click="goPrev">
          Anterior
        </button>
        <button type="button" class="page-button" :disabled="page === totalPages" @click="goNext">
          Próxima
        </button>
      </div>
    </div>

    <formulario-pessoa-modal
      v-if="showForm"
      :view-only="viewOnly"
      :editing-id="editingId"
      :form="form"
      :role-options="roleOptions"
      @fechar="showForm = false"
      @salvar="submitForm"
    />

    <dialogo-confirmacao
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
    Participante: 'role-badge--brand',
    Administrador: 'role-badge--amber',
    Professor: 'role-badge--emerald',
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

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.subtitle {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.card {
  background-color: var(--surface);
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid var(--border-subtle);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.toolbar {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
@media (min-width: 640px) {
  .toolbar {
    flex-direction: row;
  }
}

.search-field {
  position: relative;
  flex: 1;
}

.search-icon {
  width: 1rem;
  height: 1rem;
  color: var(--text-faint);
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
}

.search-input {
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.25rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  background-color: var(--input-bg);
  color: var(--text-primary);
  font-size: 0.875rem;
}
.search-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-brand-200);
}

.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--accent);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  flex-shrink: 0;
  transition: background-color 0.15s ease;
}
.add-button:hover {
  background-color: var(--accent-hover);
}

.add-icon {
  width: 1rem;
  height: 1rem;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tab {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  background-color: var(--surface-muted);
  transition: background-color 0.15s ease;
}
.tab:hover {
  background-color: var(--surface-hover);
}
.tab--active {
  background-color: var(--accent);
  color: #fff;
}

.tab-count {
  font-size: 0.75rem;
  padding: 0 0.375rem;
  border-radius: 9999px;
  background-color: var(--surface);
}
.tab-count--active {
  background-color: rgb(255 255 255 / 0.2);
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
}

.pagination-label {
  color: var(--text-muted);
}

.pagination-actions {
  display: flex;
  gap: 0.5rem;
}

.page-button {
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  color: var(--text-secondary);
}
.page-button:disabled {
  opacity: 0.4;
}
</style>
