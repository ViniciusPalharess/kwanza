<template>
  <div class="card">
    <h2 class="title">Ranking</h2>

    <div v-if="podium[0]" class="podium">
      <botao
        v-for="(person, index) in podiumOrder"
        :key="person.id"
        :acao="AcaoBotao.texto"
        somente-icone
        class="person"
        @click="$emit('selecionarParticipante', person)"
      >
        <template #icone>
          <crown v-if="podiumRank[index] === 1" class="crown-icon" />
          <div class="avatar-wrapper">
            <div class="avatar" :class="{ 'avatar--first': podiumRank[index] === 1 }">
              {{ person.initials }}
            </div>
            <span class="rank-badge">{{ podiumRank[index] }}</span>
          </div>
          <p class="name">{{ person.name }}</p>
          <p class="level">{{ levelFor(person.score).name }}</p>
          <p class="score">{{ person.score }} pts</p>
          <div class="bar" :style="{ height: podiumHeights[index] }" />
        </template>
      </botao>
    </div>
    <p v-else class="empty-text">Nenhum participante pontuado ainda.</p>
  </div>
</template>

<script lang="ts">
import { Crown } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Botao from '@/components/botao/Botao.vue'
import { AcaoBotao } from '@/enums/AcaoBotao'

@Component({
  components: { Crown, Botao },
  emits: ['selecionarParticipante'],
})
export default class PodioRankingView extends Vue {
  // public
  public AcaoBotao = AcaoBotao
  // public
  @Prop({ type: Array, required: true })
  public podium!: any[]
  // public
  @Prop({ type: Array, required: true })
  public podiumOrder!: any[]
  // public
  @Prop({ type: Object, required: true })
  public podiumHeights!: Record<number, string>
  // public
  @Prop({ type: Object, required: true })
  public podiumRank!: Record<number, number>
  // public
  @Prop({ type: Function, required: true })
  public levelFor!: (score: number) => { name: string; xp: number }
}
</script>

<style scoped>
.card {
  background-color: var(--surface);
  border-radius: 0.75rem;
  border: 1px solid var(--border-subtle);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  padding: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.podium {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.person {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  width: auto !important;
  height: auto !important;
  padding: 0 !important;
  border-radius: 0 !important;
}

.crown-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-amber-400);
  margin-bottom: 0.25rem;
}

.avatar-wrapper {
  position: relative;
}

.avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background-color: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
}

.avatar--first {
  width: 4rem;
  height: 4rem;
  font-size: 1.125rem;
}

.rank-badge {
  position: absolute;
  bottom: -0.25rem;
  right: -0.25rem;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  background-color: var(--surface);
  border: 1px solid var(--border);
  font-size: 0.625rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}

.name {
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
  margin-top: 0.5rem;
  color: var(--text-strong);
}

.level {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.score {
  font-size: 0.75rem;
  color: var(--accent-text);
  font-weight: 700;
}

.bar {
  width: 4rem;
  border-radius: 0.5rem 0.5rem 0 0;
  background-image: linear-gradient(to bottom, var(--podium-bar-from), var(--podium-bar-to));
  margin-top: 0.5rem;
}

.empty-text {
  font-size: 0.875rem;
  color: var(--text-faint);
  text-align: center;
  padding: 1rem 0;
}
</style>
