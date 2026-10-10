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

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({})
export default class BarraCompetencia extends Vue {
  // public
  @Prop({ type: String, required: true })
  public name!: string
  // public
  @Prop({ type: Number, required: true })
  public value!: number
  // public
  @Prop({ type: String, default: 'bg-brand-600' })
  public color!: string
}
</script>

<style></style>
