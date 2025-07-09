import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { keycloak } from './auth/keycloak.js'
import VueApexCharts from 'vue3-apexcharts'
import vuetify from './plugins/vuetify'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@mdi/font/css/materialdesignicons.css'
import 'quill/dist/quill.snow.css'
import Config from './config/Config'

console.log('Config', Config)

keycloak
  .init({ onLoad: 'login-required' })
  .then((authenticated) => {
    if (!authenticated) {
      console.warn('User not authenticated, reloading...')
      window.location.reload()
      return
    }

    const app = createApp(App)

    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)

    app.use(pinia)
    app.use(router)
    app.use(vuetify)
    app.use(VueApexCharts)
    app.provide('keycloak', keycloak)
    app.mount('#app')

    // Optional: Refresh token tiap 60 detik
    setInterval(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            console.log('Token refreshed')
          } else {
            console.log('Token still valid')
          }
        })
        .catch(() => {
          console.error('Failed to refresh token')
        })
    }, 60000)
  })
  .catch((error) => {
    console.error('Keycloak init failed', error)
  })
