<script setup>
import { computed } from 'vue'

const props = defineProps({
  labels: { type: Array, required: true },
  values: { type: Array, required: true },
  color: { type: String, default: '#2563eb' },
  maxY: { type: Number, default: null },
})

const width = 600
const height = 220
const padding = { top: 10, right: 10, bottom: 24, left: 40 }
const innerW = width - padding.left - padding.right
const innerH = height - padding.top - padding.bottom

const maxValue = computed(() => props.maxY || Math.ceil(Math.max(...props.values, 1) / 25) * 25)
const barWidth = computed(() => (innerW / props.values.length) * 0.5)

function barX(i) {
  return padding.left + (i + 0.5) * (innerW / props.values.length) - barWidth.value / 2
}
function barY(v) {
  return padding.top + innerH - (v / maxValue.value) * innerH
}
function barH(v) {
  return (v / maxValue.value) * innerH
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
    >{{ label }}</text>
  </svg>
</template>
