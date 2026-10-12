<template>
  <toast />
  <div v-if="isPublic" class="public-shell">
    <router-view />
  </div>
  <div v-else class="app-shell">
    <navegacao-topo />
    <main class="app-content">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import NavegacaoTopo from '@/components/navegacaotopo/NavegacaoTopo.vue'
import Toast from '@/components/toast/Toast.vue'

@Component({
  components: { NavegacaoTopo, Toast },
})
export default class App extends Vue {
  // public
  public get isPublic() {
    return this.$route.meta.public
  }
}
</script>

<style scoped>
.public-shell {
  min-height: 100vh;
}

.app-shell {
  height: 100vh;
  background-color: var(--surface-sunken);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}
@media (min-width: 640px) {
  .app-content {
    padding: 1.5rem;
  }
}
</style>
