<script setup>
import { computed } from 'vue'

const props = defineProps({
  segments: { type: Array, required: true }, // [{ label, value, color }]
  donut: { type: Boolean, default: true },
})

const total = computed(() => props.segments.reduce((sum, s) => sum + s.value, 0))

const gradient = computed(() => {
  let acc = 0
  const stops = props.segments.map((s) => {
    const start = (acc / total.value) * 360
    acc += s.value
    const end = (acc / total.value) * 360
    return `${s.color} ${start}deg ${end}deg`
  })
  return `conic-gradient(${stops.join(', ')})`
})
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div class="relative w-[170px] h-[170px] rounded-full" :style="{ background: gradient }">
      <div v-if="donut" class="absolute inset-0 m-auto w-[84px] h-[84px] rounded-full bg-white" />
    </div>
    <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-500">
      <span v-for="s in segments" :key="s.label" class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: s.color }" />
        {{ s.label }}
      </span>
    </div>
  </div>
</template>
