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

<style></style>
