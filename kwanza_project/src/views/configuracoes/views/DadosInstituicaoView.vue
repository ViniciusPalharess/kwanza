<template>
  <div class="card">
    <h2 class="title"><building-2 class="title-icon" /> Dados da instituição</h2>
    <div class="logo-row">
      <div class="logo-box">KC</div>
      <botao :acao="AcaoBotao.outro" descricao="Alterar logo">
        <template #icone><upload class="upload-icon" /></template>
      </botao>
    </div>
    <div class="fields">
      <campo-texto label="Nome" v-model="institution.name" />
      <campo-texto label="Projeto" v-model="institution.project" />
      <campo-texto label="E-mail de contato" v-model="institution.email" tipo="email" />
    </div>
  </div>
</template>

<script lang="ts">
import { Building2, Upload } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Botao from '@/components/botao/Botao.vue'
import CampoTexto from '@/components/campotexto/CampoTexto.vue'
import { AcaoBotao } from '@/enums/AcaoBotao'

@Component({
  components: { Building2, Upload, Botao, CampoTexto },
})
export default class DadosInstituicaoView extends Vue {
  // public
  public AcaoBotao = AcaoBotao
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

.upload-icon {
  width: 1rem;
  height: 1rem;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
