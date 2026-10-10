<template>
  <div class="card">
    <div class="header">
      <h2 class="title">Calendário</h2>
      <div class="nav">
        <button type="button" class="nav-button" @click="$emit('mesAnterior')">
          <chevron-left class="nav-icon" />
        </button>
        <span class="month-label">{{ monthLabel }}</span>
        <button type="button" class="nav-button" @click="$emit('mesSeguinte')">
          <chevron-right class="nav-icon" />
        </button>
      </div>
    </div>
    <div class="grid">
      <span v-for="(d, i) in weekDays" :key="'wd-' + i" class="weekday">{{ d }}</span>
      <template v-for="(day, i) in days" :key="'d-' + i">
        <span v-if="day === null" />
        <button
          v-else
          type="button"
          class="day"
          :class="{ 'day--selected': isDaySelected(day) }"
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

<style scoped>
.card {
  background-color: var(--surface);
  border-radius: 0.75rem;
  padding: 1.25rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border: 1px solid var(--border-subtle);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.title {
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-button {
  padding: 0.25rem;
  border-radius: 0.5rem;
  color: var(--text-muted);
}
.nav-button:hover {
  background-color: var(--surface-hover);
}

.nav-icon {
  width: 1rem;
  height: 1rem;
}

.month-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  width: 7rem;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.375rem;
  text-align: center;
  font-size: 0.75rem;
}

.weekday {
  color: var(--text-faint);
  font-weight: 600;
  padding: 0.25rem 0;
}

.day {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  margin: 0 auto;
  color: var(--text-strong);
  transition: background-color 0.15s ease;
}
.day:hover {
  background-color: var(--surface-hover);
}
.day--selected {
  background-color: var(--accent);
  color: #fff;
  font-weight: 600;
}
.day--selected:hover {
  background-color: var(--accent);
}
</style>
