<template>
  <div class="card">
    <h2 class="title">Editar perfil</h2>
    <form class="form" @submit.prevent="$emit('salvar')">
      <campo-texto label="Nome completo" v-model="form.name" />
      <campo-texto label="E-mail" v-model="form.email" tipo="email" />
      <campo-texto label="Telefone" v-model="form.phone" tipo="tel" />
      <campo-texto label="Data de nascimento" v-model="form.birthDate" tipo="date" />
      <campo-texto label="Sobre mim" v-model="form.bio" multilinha :linhas="3" />
      <botao :acao="AcaoBotao.salvar" tipo="submit" largura-total descricao="Salvar alterações" />
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Botao from '@/components/botao/Botao.vue'
import CampoTexto from '@/components/campotexto/CampoTexto.vue'
import { AcaoBotao } from '@/enums/AcaoBotao'

@Component({
  components: { Botao, CampoTexto },
  emits: ['salvar'],
})
export default class FormularioEdicaoPerfilView extends Vue {
  // public
  public AcaoBotao = AcaoBotao
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
</style>
