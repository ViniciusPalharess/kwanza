<script setup>
import { computed } from 'vue'

const props = defineProps({
  axes: { type: Array, required: true }, // [{ label, value }]
  maxValue: { type: Number, default: 100 },
  color: { type: String, default: '#2563eb' },
})

const size = 240
const center = size / 2
const radius = size / 2 - 34
const n = computed(() => props.axes.length)

function pointFor(i, value) {
  const angle = (i / n.value) * 2 * Math.PI - Math.PI / 2
  const r = (value / props.maxValue) * radius
  return [center + r * Math.cos(angle), center + r * Math.sin(angle)]
}

function labelPointFor(i) {
  const angle = (i / n.value) * 2 * Math.PI - Math.PI / 2
  const r = radius + 16
  return [center + r * Math.cos(angle), center + r * Math.sin(angle)]
}

const dataPolygon = computed(() =>
  props.axes.map((a, i) => pointFor(i, a.value).join(',')).join(' '),
)

const gridLevels = [0.25, 0.5, 0.75, 1]
function gridPolygon(scale) {
  return props.axes.map((_, i) => pointFor(i, props.maxValue * scale).join(',')).join(' ')
}
</script>

<template>
  <svg :viewBox="`0 0 ${size} ${size}`" class="w-full max-w-[260px] mx-auto">
    <polygon
      v-for="lvl in gridLevels"
      :key="lvl"
      :points="gridPolygon(lvl)"
      fill="none"
      class="stroke-slate-200 dark:stroke-slate-700"
      stroke-width="1"
    />
    <line
      v-for="(a, i) in axes"
      :key="'axis-' + i"
      :x1="center"
      :y1="center"
      :x2="pointFor(i, maxValue)[0]"
      :y2="pointFor(i, maxValue)[1]"
      class="stroke-slate-200 dark:stroke-slate-700"
      stroke-width="1"
    />
    <polygon :points="dataPolygon" :fill="color" fill-opacity="0.25" :stroke="color" stroke-width="2" />
    <text
      v-for="(a, i) in axes"
      :key="'label-' + i"
      :x="labelPointFor(i)[0]"
      :y="labelPointFor(i)[1]"
      text-anchor="middle"
      font-size="9"
      class="fill-slate-500 dark:fill-slate-400"
    >{{ a.label }}</text>
  </svg>
</template>
