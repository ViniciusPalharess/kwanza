<template>
  <Modal :title="participant.name" max-width="max-w-xl" @close="$emit('fechar')">
    <div class="space-y-5">
      <div>
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {{ levelFor(participant.score).name }}
          </p>
          <p class="text-sm font-bold text-slate-800 dark:text-slate-100">
            {{ participant.score }} pontos
          </p>
        </div>
        <div class="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            class="h-full bg-brand-600 rounded-full"
            :style="{ width: levelProgress(participant.score) + '%' }"
          />
        </div>
        <p
          v-if="nextLevelFor(participant.score)"
          class="text-xs text-slate-400 dark:text-slate-500 mt-1"
        >
          {{ participant.score }} / {{ nextLevelFor(participant.score).xp }} pts para
          {{ nextLevelFor(participant.score).name }}
        </p>
        <p v-else class="text-xs text-slate-400 dark:text-slate-500 mt-1">Nível máximo alcançado</p>
      </div>

      <hr class="border-slate-100 dark:border-slate-700" />

      <div>
        <p class="text-sm font-bold text-slate-900 dark:text-white mb-2">Competências</p>
        <ul class="space-y-1.5">
          <li
            v-for="c in competencyCountsFor(participant.name)"
            :key="c.competency"
            class="flex items-center justify-between text-sm"
          >
            <span class="text-slate-600 dark:text-slate-300">{{ c.competency }}</span>
            <span class="font-semibold text-slate-800 dark:text-slate-100">{{ c.count }}</span>
          </li>
          <li
            v-if="!competencyCountsFor(participant.name).length"
            class="text-sm text-slate-400 dark:text-slate-500"
          >
            Nenhum registro ainda.
          </li>
        </ul>
      </div>

      <hr class="border-slate-100 dark:border-slate-700" />

      <div>
        <p class="text-sm font-bold text-slate-900 dark:text-white mb-2">Pontuação por categoria</p>
        <ul class="space-y-1.5">
          <li
            v-for="c in pointsByCategoryFor(participant.name)"
            :key="c.competency"
            class="flex items-center justify-between text-sm"
          >
            <span class="text-slate-600 dark:text-slate-300">{{ c.competency }}</span>
            <span class="font-semibold text-slate-800 dark:text-slate-100">{{ c.points }} pts</span>
          </li>
          <li
            v-if="!pointsByCategoryFor(participant.name).length"
            class="text-sm text-slate-400 dark:text-slate-500"
          >
            Nenhum registro ainda.
          </li>
        </ul>
      </div>

      <hr class="border-slate-100 dark:border-slate-700" />

      <div v-if="!showHistory" class="flex justify-center gap-2">
        <button
          v-if="canEditScore"
          type="button"
          class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-semibold text-slate-600 dark:text-slate-300"
          @click="$emit('registrarCompetencia', participant)"
        >
          + Registrar competência
        </button>
        <button
          type="button"
          class="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold"
          @click="showHistory = true"
        >
          Ver histórico
        </button>
      </div>

      <div v-else>
        <p class="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
          <TrendingUp class="w-4 h-4 text-brand-600" /> Histórico
        </p>
        <ul class="divide-y divide-slate-100 dark:divide-slate-700 max-h-64 overflow-y-auto">
          <li v-for="log in history" :key="log.id" class="py-2.5">
            <div class="flex items-center gap-2">
              <span
                class="text-xs font-semibold text-slate-400 dark:text-slate-500 w-14 shrink-0"
                >{{ log.date }}</span
              >
              <span class="text-sm font-semibold" :style="{ color: log.color }">{{
                log.competency
              }}</span>
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300 mt-0.5 pl-16">
              {{ log.description }}
            </p>
          </li>
          <li v-if="!history.length" class="py-4 text-sm text-slate-400 dark:text-slate-500">
            Nenhum registro ainda.
          </li>
        </ul>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { TrendingUp } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import Modal from '@/components/modal/Modal.vue'

@Component({
  components: { Modal, TrendingUp },
  emits: ['fechar', 'registrarCompetencia'],
})
export default class DetalheParticipanteModal extends Vue {
  // public
  @Prop({ type: Object, required: true })
  public participant!: any
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

<style></style>
