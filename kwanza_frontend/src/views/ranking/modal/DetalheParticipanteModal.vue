<template>
  <modal :title="participant.name" max-width="36rem" @close="$emit('fechar')">
    <div class="sections">
      <div>
        <div class="rank-row">
          <span v-if="medal" class="medal">{{ medal }}</span>
          <span class="rank-label">{{ position }}º no ranking</span>
        </div>
        <div class="level-row">
          <p class="level-name">{{ levelFor(participant.score).name }}</p>
          <p class="score">{{ participant.score }} pontos</p>
        </div>
        <div class="track">
          <div class="fill" :style="{ width: levelProgress(participant.score) + '%' }" />
        </div>
        <p v-if="nextLevelFor(participant.score)" class="progress-text">
          {{ participant.score }} / {{ nextLevelFor(participant.score).xp }} pts para
          {{ nextLevelFor(participant.score).name }}
        </p>
        <p v-else class="progress-text">Nível máximo alcançado</p>
      </div>

      <hr class="divider" />

      <div>
        <p class="section-title">Competências</p>
        <ul class="list">
          <li v-for="c in competencyCountsFor(participant.name)" :key="c.competency" class="row">
            <span class="row-label">{{ c.competency }}</span>
            <span class="row-value">{{ c.count }}</span>
          </li>
          <li v-if="!competencyCountsFor(participant.name).length" class="empty-text">
            Nenhum registro ainda.
          </li>
        </ul>
      </div>

      <hr class="divider" />

      <div>
        <p class="section-title">Pontuação por categoria</p>
        <ul class="list">
          <li v-for="c in pointsByCategoryFor(participant.name)" :key="c.competency" class="row">
            <span class="row-label">{{ c.competency }}</span>
            <span class="row-value">{{ c.points }} pts</span>
          </li>
          <li v-if="!pointsByCategoryFor(participant.name).length" class="empty-text">
            Nenhum registro ainda.
          </li>
        </ul>
      </div>

      <hr class="divider" />

      <div v-if="!showHistory" class="footer-actions">
        <botao
          v-if="canEditScore"
          :acao="AcaoBotao.cancelar"
          descricao="+ Registrar competência"
          @click="$emit('registrarCompetencia', participant)"
        />
        <botao :acao="AcaoBotao.salvar" descricao="Ver histórico" @click="showHistory = true" />
      </div>

      <div v-else>
        <p class="section-title history-title"><trending-up class="history-icon" /> Histórico</p>
        <ul class="history-list">
          <li v-for="log in history" :key="log.id" class="history-row">
            <div class="history-head">
              <span class="history-date">{{ log.date }}</span>
              <span class="history-competency" :style="{ color: log.color }">{{
                log.competency
              }}</span>
            </div>
            <p class="history-description">{{ log.description }}</p>
          </li>
          <li v-if="!history.length" class="empty-text">Nenhum registro ainda.</li>
        </ul>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Botao from '@/components/botao/Botao.vue'
import Modal from '@/components/modal/Modal.vue'
import { AcaoBotao } from '@/enums/AcaoBotao'

@Component({
  components: { Modal, TrendingUp, Botao },
  emits: ['fechar', 'registrarCompetencia'],
})
export default class DetalheParticipanteModal extends Vue {
  // public
  public AcaoBotao = AcaoBotao
  // public
  @Prop({ type: Object, required: true })
  public participant!: any
  // public
  @Prop({ type: Number, required: true })
  public position!: number
  // public
  @Prop({ type: String, default: null })
  public medal!: string | null
  // public
  @Prop({ type: Array, required: true })
  public history!: any[]
  // public
  @Prop({ type: Boolean, required: true })
  public canEditScore!: boolean
  // public
  @Prop({ type: Function, required: true })
  public levelFor!: (score: number) => { name: string; xp: number }
  // public
  @Prop({ type: Function, required: true })
  public nextLevelFor!: (score: number) => { name: string; xp: number } | null
  // public
  @Prop({ type: Function, required: true })
  public levelProgress!: (score: number) => number
  // public
  @Prop({ type: Function, required: true })
  public competencyCountsFor!: (name: string) => Array<{ competency: string; count: number }>
  // public
  @Prop({ type: Function, required: true })
  public pointsByCategoryFor!: (name: string) => Array<{ competency: string; points: number }>

  // public
  public showHistory = false
}
</script>

<style scoped>
.sections {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.rank-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.medal {
  font-size: 1.125rem;
  line-height: 1;
}

.rank-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-muted);
}

.level-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.level-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.score {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-strong);
}

.track {
  height: 0.5rem;
  border-radius: 9999px;
  background-color: var(--surface-muted);
  overflow: hidden;
}

.fill {
  height: 100%;
  border-radius: 9999px;
  background-color: var(--accent);
}

.progress-text {
  font-size: 0.75rem;
  color: var(--text-faint);
  margin-top: 0.25rem;
}

.divider {
  border-color: var(--border-subtle);
}

.section-title {
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.history-title {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.history-icon {
  width: 1rem;
  height: 1rem;
  color: var(--accent);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
}

.row-label {
  color: var(--text-secondary);
}

.row-value {
  font-weight: 600;
  color: var(--text-strong);
}

.empty-text {
  font-size: 0.875rem;
  color: var(--text-faint);
}

.footer-actions {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}


.history-list {
  display: flex;
  flex-direction: column;
  max-height: 16rem;
  overflow-y: auto;
}

.history-row {
  padding: 0.625rem 0;
  border-top: 1px solid var(--border-subtle);
}
.history-row:first-child {
  border-top: none;
}

.history-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.history-date {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-faint);
  width: 3.5rem;
  flex-shrink: 0;
}

.history-competency {
  font-size: 0.875rem;
  font-weight: 600;
}

.history-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: 0.125rem;
  padding-left: 4rem;
}
</style>
