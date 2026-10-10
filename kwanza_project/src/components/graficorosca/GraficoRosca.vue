<template>
  <div class="wrapper">
    <div class="ring" :style="{ background: gradient }">
      <div v-if="donut" class="hole" />
    </div>
    <div class="legend">
      <span v-for="s in segments" :key="s.label" class="legend-item">
        <span class="legend-dot" :style="{ backgroundColor: s.color }" />
        {{ s.label }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({})
export default class GraficoRosca extends Vue {
  // public
  @Prop({ type: Array, required: true })
  public segments!: Array<{ label: string; value: number; color: string }>
  // public
  @Prop({ type: Boolean, default: true })
  public donut!: boolean

  // private
  private get total() {
    return this.segments.reduce((sum, s) => sum + s.value, 0)
  }

  // public
  public get gradient() {
    let acc = 0
    const stops = this.segments.map((s) => {
      const start = (acc / this.total) * 360
      acc += s.value
      const end = (acc / this.total) * 360
      return `${s.color} ${start}deg ${end}deg`
    })
    return `conic-gradient(${stops.join(', ')})`
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.ring {
  position: relative;
  width: 170px;
  height: 170px;
  border-radius: 9999px;
}

.hole {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 84px;
  height: 84px;
  border-radius: 9999px;
  background-color: #fff;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;
  row-gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--color-slate-500);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.legend-dot {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 9999px;
}
</style>
