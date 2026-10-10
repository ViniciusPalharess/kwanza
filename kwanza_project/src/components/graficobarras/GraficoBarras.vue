<template>
  <svg :viewBox="`0 0 ${width} ${height}`" class="w-full h-auto">
    <line
      v-for="line in gridLines"
      :key="line.value"
      :x1="padding.left"
      :x2="width - padding.right"
      :y1="line.y"
      :y2="line.y"
      class="stroke-slate-200 dark:stroke-slate-700"
      stroke-width="1"
    />
    <text
      v-for="line in gridLines"
      :key="'t-' + line.value"
      :x="padding.left - 8"
      :y="line.y + 3"
      text-anchor="end"
      font-size="9"
      class="fill-slate-400 dark:fill-slate-500"
    >
      {{ line.value }}
    </text>

    <rect
      v-for="(v, i) in values"
      :key="i"
      :x="barX(i)"
      :y="barY(v)"
      :width="barWidth"
      :height="Math.max(barH(v), 1)"
      :fill="color"
      rx="3"
    />

    <text
      v-for="(label, i) in labels"
      :key="'l-' + label"
      :x="barX(i) + barWidth / 2"
      :y="height - 6"
      text-anchor="middle"
      font-size="9"
      class="fill-slate-400 dark:fill-slate-500"
    >
      {{ label }}
    </text>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({})
export default class GraficoBarras extends Vue {
  // public
  @Prop({ type: Array, required: true })
  public labels!: string[]
  // public
  @Prop({ type: Array, required: true })
  public values!: number[]
  // public
  @Prop({ type: String, default: '#2563eb' })
  public color!: string
  // public
  @Prop({ type: Number, default: null })
  public maxY!: number | null

  // public
  public width = 600
  // public
  public height = 220
  // public
  public padding = { top: 10, right: 10, bottom: 24, left: 40 }

  // private
  private get innerW() {
    return this.width - this.padding.left - this.padding.right
  }

  // private
  private get innerH() {
    return this.height - this.padding.top - this.padding.bottom
  }

  // public
  public get maxValue() {
    return this.maxY || Math.ceil(Math.max(...this.values, 1) / 25) * 25
  }

  // public
  public get barWidth() {
    return (this.innerW / this.values.length) * 0.5
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
  public barX(i: number) {
    return this.padding.left + (i + 0.5) * (this.innerW / this.values.length) - this.barWidth / 2
  }

  // public
  public barY(v: number) {
    return this.padding.top + this.innerH - (v / this.maxValue) * this.innerH
  }

  // public
  public barH(v: number) {
    return (v / this.maxValue) * this.innerH
  }
}
</script>

<style></style>
