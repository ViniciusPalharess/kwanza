<template>
  <div class="wrapper">
    <div class="icon-circle">
      <wrench class="icon" />
    </div>
    <h1 class="title">{{ title }}</h1>
    <p class="subtitle">Esta seção está em construção.</p>
  </div>
</template>

<script lang="ts">
import { Wrench } from 'lucide-vue-next'
import { Component, Prop, Vue } from 'vue-facing-decorator'

@Component({
  components: { Wrench },
})
export default class ConteudosView extends Vue {
  // public
  @Prop({ type: String, default: 'Em breve' })
  public title!: string
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 0;
  background-color: var(--surface);
  border-radius: 0.75rem;
  border: 1px solid var(--border-subtle);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.icon-circle {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 9999px;
  background-color: var(--accent-subtle-bg);
  color: var(--accent-text);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.subtitle {
  font-size: 0.875rem;
  color: var(--text-muted);
}
</style>
