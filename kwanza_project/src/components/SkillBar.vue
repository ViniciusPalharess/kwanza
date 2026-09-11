<script setup>
defineProps({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  color: { type: String, default: 'bg-brand-600' },
})
</script>

<template>
  <div>
    <div class="flex justify-between text-sm mb-1">
      <span class="text-slate-600 dark:text-slate-300">{{ name }}</span>
      <span class="font-semibold text-slate-800 dark:text-slate-100">{{ value }}</span>
    </div>
    <div class="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
      <div class="h-full rounded-full" :class="color" :style="{ width: value + '%' }" />
    </div>
  </div>
</template>
