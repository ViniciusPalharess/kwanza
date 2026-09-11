import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useThemeStore } from './stores/theme'
import { useUserStore } from './stores/user'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

useThemeStore().init()

useUserStore()
  .init()
  .finally(() => {
    app.mount('#app')
  })
