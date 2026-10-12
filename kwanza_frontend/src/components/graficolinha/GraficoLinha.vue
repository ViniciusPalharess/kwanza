<template>
  <div>
    <svg :viewBox="`0 0 ${width} ${height}`" class="chart">
      <line
        v-for="line in gridLines"
        :key="line.value"
        :x1="padding.left"
        :x2="width - padding.right"
        :y1="line.y"
        :y2="line.y"
        class="grid-line"
        stroke-width="1"
      />
      <text
        v-for="line in gridLines"
        :key="'t-' + line.value"
        :x="padding.left - 8"
        :y="line.y + 3"
        text-anchor="end"
        font-size="9"
        class="axis-label"
      >
        {{ line.value }}
      </text>

      <polygon
        v-if="area"
        :points="areaFor(series[0].values)"
        :fill="series[0].color"
        opacity="0.12"
      />

      <polyline
        v-for="s in series"
        :key="s.name"
        :points="lineFor(s.values)"
        fill="none"
        :stroke="s.color"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <text
        v-for="(label, i) in labels"
        :key="'l-' + label"
        :x="padding.left + (i / (labels.length - 1 || 1)) * innerW"
        :y="height - 6"
        text-anchor="middle"
        font-size="9"
        class="axis-label"
      >
        {{ label }}
      </text>
    </svg>

    <div v-if="series.length > 1" class="legend">
      <span v-for="s in series" :key="'legend-' + s.name" class="legend-item">
        <span class="legend-dot" :style="{ backgroundColor: s.color }" />
        {{ s.name }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({})
export default class GraficoLinha extends Vue {
  // public
  @Prop({ type: Array, required: true })
  public labels!: string[]
  // public
  @Prop({ type: Array, required: true })
  public series!: Array<{ name: string; color: string; values: number[] }>
  // public
  @Prop({ type: Boolean, default: false })
  public area!: boolean
  // public
  @Prop({ type: Number, default: null })
  public maxY!: number | null

  // public
  public width = 600
  // public
  public height = 220
  // public
  public padding = { top: 10, right: 10, bottom: 24, left: 40 }

  // public
  public get innerW() {
    return this.width - this.padding.left - this.padding.right
  }

  // private
  private get innerH() {
    return this.height - this.padding.top - this.padding.bottom
  }

  // private
  private get maxValue() {
    if (this.maxY) return this.maxY
    const all = this.series.flatMap((s) => s.values)
    const rawMax = Math.max(...all, 1)
    return Math.ceil(rawMax / 500) * 500 || rawMax
  }

  // public
  public get gridLines() {
    const steps = 4
    return Array.from({ length: steps + 1 }, (_, i) => {
      const value = Math.round((this.maxValue / steps) * i)
      return { value, y: this.padding.top + this.innerH - (value / this.maxValue) * this.innerH }
    })
  }

  // public
  public lineFor(values: number[]) {
    return this.pointsFor(values)
      .map(([x, y]) => `${x},${y}`)
      .join(' ')
  }

  // public
  public areaFor(values: number[]) {
    const pts = this.pointsFor(values)
    const bottom = this.padding.top + this.innerH
    return (
      `${pts[0][0]},${bottom} ` +
      pts.map(([x, y]) => `${x},${y}`).join(' ') +
      ` ${pts[pts.length - 1][0]},${bottom}`
    )
  }

  // private
  private pointsFor(values: number[]) {
    return values.map((v, i) => {
      const x = this.padding.left + (i / (values.length - 1 || 1)) * this.innerW
      const y = this.padding.top + this.innerH - (v / this.maxValue) * this.innerH
      return [x, y]
    })
  }
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: auto;
}

.grid-line {
  stroke: var(--chart-grid);
}

.axis-label {
  fill: var(--text-faint);
}

.legend {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
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
