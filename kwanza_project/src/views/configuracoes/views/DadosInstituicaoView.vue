<template>
  <div class="card">
    <h2 class="title"><building-2 class="title-icon" /> Dados da instituição</h2>
    <div class="logo-row">
      <div class="logo-box">KC</div>
      <button type="button" class="upload-button">
        <upload class="upload-icon" /> Alterar logo
      </button>
    </div>
    <div class="fields">
      <div>
        <label class="label">Nome</label>
        <input v-model="institution.name" type="text" class="input" />
      </div>
      <div>
        <label class="label">Projeto</label>
        <input v-model="institution.project" type="text" class="input" />
      </div>
      <div>
        <label class="label">E-mail de contato</label>
        <input v-model="institution.email" type="email" class="input" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Building2, Upload } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  components: { Building2, Upload },
})
export default class DadosInstituicaoView extends Vue {
  // public
  @Prop({ type: Object, required: true })
  public institution!: { name: string; project: string; email: string }
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.title-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--accent);
}

.logo-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.logo-box {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
}

.upload-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
}

.upload-icon {
  width: 1rem;
  height: 1rem;
}

.fields {
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
</style>
