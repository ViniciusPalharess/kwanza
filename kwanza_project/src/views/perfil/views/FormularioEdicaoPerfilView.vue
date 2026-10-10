<template>
  <div class="card">
    <h2 class="title">Editar perfil</h2>
    <form class="form" @submit.prevent="$emit('salvar')">
      <div>
        <label class="label">Nome completo</label>
        <input v-model="form.name" type="text" class="input" />
      </div>
      <div>
        <label class="label">E-mail</label>
        <input v-model="form.email" type="email" class="input" />
      </div>
      <div>
        <label class="label">Telefone</label>
        <input v-model="form.phone" type="tel" class="input" />
      </div>
      <div>
        <label class="label">Data de nascimento</label>
        <input v-model="form.birthDate" type="date" class="input" />
      </div>
      <div>
        <label class="label">Sobre mim</label>
        <textarea v-model="form.bio" rows="3" class="input" />
      </div>
      <button type="submit" class="submit-button">Salvar alterações</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  emits: ['salvar'],
})
export default class FormularioEdicaoPerfilView extends Vue {
  // public
  @Prop({ type: Object, required: true })
  public form!: { name: string; email: string; phone: string; birthDate: string; bio: string }
}
</script>

<style scoped>
.card {
  background-color: var(--surface);
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid var(--border-subtle);
}

.title {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
  display: block;
  margin-bottom: 0.25rem;
  color: var(--text-secondary);
}

.input {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: var(--input-bg);
  color: var(--text-primary);
}
.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-brand-200);
}

.submit-button {
  width: 100%;
  background-color: var(--accent);
  color: #fff;
  font-weight: 600;
  padding: 0.625rem;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease;
}
.submit-button:hover {
  background-color: var(--accent-hover);
}
</style>
