import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'
import vuetify from './plugins/vuetify'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@mdi/font/css/materialdesignicons.css'
import 'quill/dist/quill.snow.css'
import { loadConfig } from '@/config/Config'
import Keycloak from 'keycloak-js'

loadConfig().then((config) => {
  const keycloak = new Keycloak({
    url: config.keycloak.host,
    realm: config.keycloak.realm,
    clientId: config.keycloak.clientId,
    redirectUri: config.keycloak.redirectUri,
  })
  keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
    app.provide('keycloak', keycloak)
    if (!authenticated) {
      console.warn('not authenticated')
      window.location.reload()
    }
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
  const app = createApp(App)

  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)

  app.use(pinia)
  app.use(router)
  app.use(vuetify)
  app.use(VueApexCharts)
  app.mount('#app')
})
