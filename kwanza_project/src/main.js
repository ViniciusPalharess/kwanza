import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useTemaStore } from './stores/tema'
import { useUsuarioStore } from './stores/usuario'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

useTemaStore().init()

useUsuarioStore()
  .init()
  .finally(() => {
    app.mount('#app')
  })
