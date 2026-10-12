<template>
  <div class="page">
    <div class="header">
      <div>
        <h1 class="title">Carta de Recomendação</h1>
        <p class="subtitle">Documento de destaque para vagas e oportunidades</p>
      </div>
      <campo-lista class="select" v-model.number="selectedId" :opcoes="opcoesParticipantes" />
    </div>

    <div v-if="selected" class="letter">
      <div class="letter-banner">
        <div>
          <p class="letter-brand">Kenia Club</p>
          <p class="letter-brand-sub">Projeto Kwanza</p>
        </div>
        <file-text class="letter-banner-icon" />
      </div>

      <div class="letter-body">
        <div class="person-row">
          <div class="person-avatar">{{ selected.initials }}</div>
          <div>
            <p class="person-name">{{ selected.name }}</p>
            <p class="person-meta">
              Nível {{ selected.level }} · {{ selected.levelName || 'Copa' }} · 120h de formação
            </p>
          </div>
        </div>

        <p class="letter-greeting">A quem possa interessar,</p>

        <p class="letter-text">
          É com grande satisfação que o <strong>Kenia Club</strong>, através do
          <strong>Projeto Kwanza</strong>, recomenda <strong>{{ selected.name }}</strong
          >, participante exemplar do nosso programa de desenvolvimento juvenil.
        </p>

        <p class="letter-text">
          Ao longo de sua jornada, demonstrou notável evolução, acumulando
          <strong>{{ selected.score }} pontos</strong>, uma frequência de
          <strong>{{ selected.attendance }}%</strong> e destacando-se pelas seguintes competências:
        </p>

        <div class="skills-row">
          <span v-for="skill in letterSkills" :key="skill.name" class="skill-chip">
            {{ skill.name }} · {{ skill.value }}
          </span>
        </div>

        <p class="letter-text">
          Trata-se de um(a) jovem comprometido(a), com forte espírito de liderança, comunicação
          clara e excelente trabalho em equipe. Recomendamos sem reservas para vagas de emprego,
          estágios e oportunidades de crescimento.
        </p>

        <div class="signature">
          <p class="signature-title">Coordenação · Projeto Kwanza</p>
          <p class="signature-date">Luanda, {{ dateLabel }}</p>
        </div>
      </div>

      <div class="letter-actions">
        <botao :acao="AcaoBotao.cancelar" descricao="Imprimir" @click="printLetter">
          <template #icone>
            <printer class="action-icon" />
          </template>
        </botao>
        <botao :acao="AcaoBotao.salvar" descricao="Gerar PDF" @click="printLetter">
          <template #icone>
            <download class="action-icon" />
          </template>
        </botao>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { FileText, Printer, Download } from 'lucide-vue-next'
import { Component, Vue } from 'vue-facing-decorator'
import { usePessoasStore } from '@/stores/pessoas'
import Botao from '@/components/botao/Botao.vue'
import CampoLista from '@/components/campolista/CampoLista.vue'
import { AcaoBotao } from '@/enums/AcaoBotao'

function skillsFor(person: any) {
  if (!person) return []
  const base = person.score % 100
  return [
    { name: 'Comunicação', value: 40 + (base % 40) },
    { name: 'Liderança', value: 35 + ((base + 10) % 40) },
    { name: 'Oratória', value: 30 + ((base + 20) % 40) },
    { name: 'Resolução de Conflitos', value: 33 + ((base + 5) % 40) },
  ]
}

@Component({
  components: { FileText, Printer, Download, Botao, CampoLista },
})
export default class CartasView extends Vue {
  // public
  public AcaoBotao = AcaoBotao
  // public
  public pessoasStore = usePessoasStore()
  // public
  public selectedId: number | string | null = this.pessoasStore.participants[0]?.id ?? null

  // public
  public get selected() {
    return this.pessoasStore.participants.find((p) => p.id === this.selectedId)
  }

  // public
  public get opcoesParticipantes() {
    return this.pessoasStore.participants.map((p) => ({ valor: p.id, texto: p.name }))
  }

  // public
  public get letterSkills() {
    return skillsFor(this.selected)
  }

  // public
  public get dateLabel() {
    const today = new Date()
    return `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`
  }

  // public
  public printLetter() {
    window.print()
  }
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
@media (min-width: 640px) {
  .header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
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

.select {
  min-width: 200px;
}

.letter {
  background-color: var(--surface);
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
  max-width: 48rem;
}

.letter-banner {
  height: 6rem;
  background: linear-gradient(
    to right,
    var(--color-brand-700),
    var(--color-brand-600),
    var(--color-brand-800)
  );
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
}

.letter-brand {
  color: #fff;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.25;
}

.letter-brand-sub {
  color: var(--color-brand-100);
  font-size: 0.875rem;
}

.letter-banner-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: rgb(255 255 255 / 0.7);
}

.letter-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.person-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.person-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background-color: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.person-name {
  font-weight: 700;
  color: var(--text-primary);
}

.person-meta {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.letter-greeting {
  font-weight: 700;
  color: var(--text-primary);
}

.letter-text {
  color: var(--text-secondary);
}

.skills-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-chip {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  background-color: var(--accent-subtle-bg);
  color: var(--accent-text-strong);
}

.signature {
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);
}

.signature-title {
  font-weight: 600;
  color: var(--text-strong);
}

.signature-date {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.letter-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 0 1.5rem 1.5rem;
}

.action-icon {
  width: 1rem;
  height: 1rem;
}
</style>
