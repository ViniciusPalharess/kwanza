<script setup>
import { computed } from 'vue'

const props = defineProps({
  labels: { type: Array, required: true },
  series: { type: Array, required: true }, // [{ name, color, values }]
  area: { type: Boolean, default: false },
  maxY: { type: Number, default: null },
})

const width = 600
const height = 220
const padding = { top: 10, right: 10, bottom: 24, left: 40 }
const innerW = width - padding.left - padding.right
const innerH = height - padding.top - padding.bottom

const maxValue = computed(() => {
  if (props.maxY) return props.maxY
  const all = props.series.flatMap((s) => s.values)
  const rawMax = Math.max(...all, 1)
  return Math.ceil(rawMax / 500) * 500 || rawMax
})

function pointsFor(values) {
  return values.map((v, i) => {
    const x = padding.left + (i / (values.length - 1 || 1)) * innerW
    const y = padding.top + innerH - (v / maxValue.value) * innerH
    return [x, y]
  })
}

function lineFor(values) {
  return pointsFor(values).map(([x, y]) => `${x},${y}`).join(' ')
}

function areaFor(values) {
  const pts = pointsFor(values)
  const bottom = padding.top + innerH
  return `${pts[0][0]},${bottom} ` + pts.map(([x, y]) => `${x},${y}`).join(' ') + ` ${pts[pts.length - 1][0]},${bottom}`
}

const gridLines = computed(() => {
  const steps = 4
  return Array.from({ length: steps + 1 }, (_, i) => {
    const value = Math.round((maxValue.value / steps) * i)
    return { value, y: padding.top + innerH - (value / maxValue.value) * innerH }
  })
})
</script>

<template>
  <div>
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
      >{{ line.value }}</text>

      <polygon v-if="area" :points="areaFor(series[0].values)" :fill="series[0].color" opacity="0.12" />

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
        class="fill-slate-400 dark:fill-slate-500"
      >{{ label }}</text>
    </svg>

    <div v-if="series.length > 1" class="flex items-center gap-4 mt-2 text-xs text-slate-500">
      <span v-for="s in series" :key="'legend-' + s.name" class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: s.color }" />
        {{ s.name }}
      </span>
    </div>
  </div>
</template>
