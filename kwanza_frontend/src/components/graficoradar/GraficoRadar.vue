<template>
  <svg :viewBox="`0 0 ${size} ${size}`" class="chart">
    <polygon
      v-for="lvl in gridLevels"
      :key="lvl"
      :points="gridPolygon(lvl)"
      fill="none"
      class="grid-line"
      stroke-width="1"
    />
    <line
      v-for="(a, i) in axes"
      :key="'axis-' + i"
      :x1="center"
      :y1="center"
      :x2="pointFor(i, maxValue)[0]"
      :y2="pointFor(i, maxValue)[1]"
      class="grid-line"
      stroke-width="1"
    />
    <polygon
      :points="dataPolygon"
      :fill="color"
      fill-opacity="0.25"
      :stroke="color"
      stroke-width="2"
    />
    <text
      v-for="(a, i) in axes"
      :key="'label-' + i"
      :x="labelPointFor(i)[0]"
      :y="labelPointFor(i)[1]"
      text-anchor="middle"
      font-size="9"
      class="axis-label"
    >
      {{ a.label }}
    </text>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({})
export default class GraficoRadar extends Vue {
  // public
  @Prop({ type: Array, required: true })
  public axes!: Array<{ label: string; value: number }>
  // public
  @Prop({ type: Number, default: 100 })
  public maxValue!: number
  // public
  @Prop({ type: String, default: '#2563eb' })
  public color!: string

  // public
  public size = 240
  // public
  public gridLevels = [0.25, 0.5, 0.75, 1]

  // private
  private center = this.size / 2
  // private
  private radius = this.size / 2 - 34

  // private
  private get n() {
    return this.axes.length
  }

  // public
  public get dataPolygon() {
    return this.axes.map((a, i) => this.pointFor(i, a.value).join(',')).join(' ')
  }

  // public
  public pointFor(i: number, value: number) {
    const angle = (i / this.n) * 2 * Math.PI - Math.PI / 2
    const r = (value / this.maxValue) * this.radius
    return [this.center + r * Math.cos(angle), this.center + r * Math.sin(angle)]
  }

  // public
  public labelPointFor(i: number) {
    const angle = (i / this.n) * 2 * Math.PI - Math.PI / 2
    const r = this.radius + 16
    return [this.center + r * Math.cos(angle), this.center + r * Math.sin(angle)]
  }

  // public
  public gridPolygon(scale: number) {
    return this.axes.map((_, i) => this.pointFor(i, this.maxValue * scale).join(',')).join(' ')
  }
}
</script>

<style scoped>
.chart {
  width: 100%;
  max-width: 260px;
  margin: 0 auto;
  display: block;
}

.grid-line {
  stroke: var(--chart-grid);
}

.axis-label {
  fill: var(--text-muted);
}
</style>
