<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700"
  >
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-bold text-lg text-slate-900 dark:text-white">Calendário</h2>
      <div class="flex items-center gap-1">
        <button
          type="button"
          class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
          @click="$emit('mesAnterior')"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>
        <span class="text-sm font-medium text-slate-600 dark:text-slate-300 w-28 text-center">{{
          monthLabel
        }}</span>
        <button
          type="button"
          class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
          @click="$emit('mesSeguinte')"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>
    <div class="grid grid-cols-7 gap-1.5 text-center text-xs">
      <span v-for="(d, i) in weekDays" :key="'wd-' + i" class="text-slate-400 font-semibold py-1">{{
        d
      }}</span>
      <template v-for="(day, i) in days" :key="'d-' + i">
        <span v-if="day === null" />
        <button
          v-else
          type="button"
          class="w-8 h-8 flex items-center justify-center rounded-full mx-auto transition"
          :class="
            isDaySelected(day)
              ? 'bg-brand-600 text-white font-semibold'
              : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
          "
          @click="$emit('selecionarDia', day)"
        >
          {{ day }}
        </button>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  components: { ChevronLeft, ChevronRight },
  emits: ['mesAnterior', 'mesSeguinte', 'selecionarDia'],
})
export default class CalendarioFrequenciaView extends Vue {
  // public
  @Prop({ type: Array, required: true })
  public weekDays!: string[]
  // public
  @Prop({ type: Array, required: true })
  public days!: Array<number | null>
  // public
  @Prop({ type: String, required: true })
  public monthLabel!: string
  // public
  @Prop({ type: Number, required: true })
  public viewedYear!: number
  // public
  @Prop({ type: Number, required: true })
  public viewedMonth!: number
  // public
  @Prop({ type: Number, required: true })
  public selectedDay!: number
  // public
  @Prop({ type: Number, required: true })
  public selectedMonth!: number
  // public
  @Prop({ type: Number, required: true })
  public selectedYear!: number

  // public
  public isDaySelected(day: number) {
    return (
      day === this.selectedDay &&
      this.viewedMonth === this.selectedMonth &&
      this.viewedYear === this.selectedYear
    )
  }
}
</script>

<style></style>
