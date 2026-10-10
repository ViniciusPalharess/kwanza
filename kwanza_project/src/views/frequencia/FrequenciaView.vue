<template>
  <div class="page">
    <h1 class="title">Frequência</h1>

    <div class="layout">
      <calendario-frequencia-view
        :week-days="weekDays"
        :days="days"
        :month-label="monthLabel"
        :viewed-year="viewedYear"
        :viewed-month="viewedMonth"
        :selected-day="selectedDay"
        :selected-month="selectedMonth"
        :selected-year="selectedYear"
        @mes-anterior="prevMonth"
        @mes-seguinte="nextMonth"
        @selecionar-dia="selectDay"
      />

      <lista-presenca-view
        :has-data-for-selected="hasDataForSelected"
        :selected-date-label="selectedDateLabel"
        :selected-day-summary="selectedDaySummary"
        :itens="itensPresenca"
        @selecionar-participante="openParticipant"
        @marcar-presente="markPresent"
        @marcar-ausente="markAbsent"
      />
    </div>

    <detalhe-frequencia-modal
      v-if="selectedParticipant"
      :participant="selectedParticipant"
      :stats="participantStats"
      :rate="participantRate"
      :monthly="participantMonthly"
      :history="participantHistory"
      @fechar="selectedParticipant = null"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import { calendarMonth } from '@/data/dadosSimulados'
import { usePessoasStore } from '@/stores/pessoas'
import { useFrequenciaStore } from '@/stores/frequencia'
import CalendarioFrequenciaView from '@/views/frequencia/views/CalendarioFrequenciaView.vue'
import ListaPresencaView from '@/views/frequencia/views/ListaPresencaView.vue'
import DetalheFrequenciaModal from '@/views/frequencia/modal/DetalheFrequenciaModal.vue'

const MONTH_NAMES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

@Component({
  components: { CalendarioFrequenciaView, ListaPresencaView, DetalheFrequenciaModal },
})
export default class FrequenciaView extends Vue {
  // public
  public weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  // public
  public viewedYear = calendarMonth.year
  // public
  public viewedMonth = calendarMonth.month

  // public
  public selectedDay = calendarMonth.today
  // public
  public selectedMonth = calendarMonth.month
  // public
  public selectedYear = calendarMonth.year

  // public
  public selectedParticipant: any = null

  // private
  private pessoasStore = usePessoasStore()
  // private
  private frequenciaStore = useFrequenciaStore()

  // public
  public get monthLabel() {
    return `${MONTH_NAMES[this.viewedMonth]} ${this.viewedYear}`
  }

  // public
  public get daysInViewedMonth() {
    return new Date(this.viewedYear, this.viewedMonth + 1, 0).getDate()
  }

  // public
  public get firstWeekday() {
    return new Date(this.viewedYear, this.viewedMonth, 1).getDay()
  }

  // public
  public get days() {
    const cells: Array<number | null> = Array.from({ length: this.firstWeekday }, () => null)
    for (let d = 1; d <= this.daysInViewedMonth; d += 1) {
      cells.push(d)
    }
    return cells
  }

  // Só existem registros reais para dias de semana já ocorridos no mês mockado.
  // public
  public get hasDataForSelected() {
    if (this.selectedYear !== calendarMonth.year || this.selectedMonth !== calendarMonth.month)
      return false
    if (this.selectedDay > calendarMonth.today) return false
    const wd = this.weekdayOf(this.selectedYear, this.selectedMonth, this.selectedDay)
    return wd !== 0 && wd !== 6
  }

  // public
  public get selectedDaySummary() {
    return this.hasDataForSelected ? this.frequenciaStore.dailySummary(this.selectedDay) : null
  }

  // public
  public get selectedDateLabel() {
    return `${this.selectedDay} de ${MONTH_NAMES[this.selectedMonth].toLowerCase()}`
  }

  // public
  public get itensPresenca() {
    return this.pessoasStore.participants.map((person) => ({
      person,
      stats: this.frequenciaStore.presenceStats(person.id),
      presente: this.frequenciaStore.isPresent(this.selectedDay, person.id),
    }))
  }

  // public
  public get participantStats() {
    return this.selectedParticipant
      ? this.frequenciaStore.presenceStats(this.selectedParticipant.id)
      : null
  }

  // public
  public get participantRate() {
    return this.selectedParticipant
      ? this.frequenciaStore.cumulativeRate(this.selectedParticipant.id)
      : 0
  }

  // public
  public get participantMonthly() {
    return this.selectedParticipant
      ? this.frequenciaStore
          .monthlyBreakdown(this.selectedParticipant.id)
          .map((m) => ({ ...m, label: MONTH_NAMES[m.monthIndex] }))
      : []
  }

  // public
  public get participantHistory() {
    return this.selectedParticipant
      ? [...this.frequenciaStore.elapsedMeetingDays].reverse().map((d) => ({
          day: d,
          label: `${String(d).padStart(2, '0')}/${String(calendarMonth.month + 1).padStart(2, '0')}`,
          present: this.frequenciaStore.isPresent(d, this.selectedParticipant.id),
        }))
      : []
  }

  created() {
    this.frequenciaStore.init()
  }

  // public
  public prevMonth() {
    if (this.viewedMonth === 0) {
      this.viewedMonth = 11
      this.viewedYear -= 1
    } else {
      this.viewedMonth -= 1
    }
  }

  // public
  public nextMonth() {
    if (this.viewedMonth === 11) {
      this.viewedMonth = 0
      this.viewedYear += 1
    } else {
      this.viewedMonth += 1
    }
  }

  // public
  public selectDay(day: number) {
    this.selectedDay = day
    this.selectedMonth = this.viewedMonth
    this.selectedYear = this.viewedYear
  }

  // public
  public markPresent(personId: number | string) {
    this.frequenciaStore.setPresence(this.selectedDay, personId, true)
  }

  // public
  public markAbsent(personId: number | string) {
    this.frequenciaStore.setPresence(this.selectedDay, personId, false)
  }

  // public
  public openParticipant(person: any) {
    this.selectedParticipant = person
  }

  // private
  private weekdayOf(year: number, month: number, day: number) {
    return new Date(year, month, day).getDay()
  }
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
  align-items: start;
}
@media (min-width: 1024px) {
  .layout {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
