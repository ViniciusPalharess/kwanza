<template>
  <Toast />
  <div v-if="isPublic" class="min-h-screen">
    <router-view />
  </div>
  <div v-else class="h-screen bg-slate-50 dark:bg-slate-900 flex flex-col overflow-hidden">
    <NavegacaoTopo />
    <main class="flex-1 overflow-y-auto p-4 sm:p-6">
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

<style></style>
