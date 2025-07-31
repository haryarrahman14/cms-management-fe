import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import VueApexCharts from 'vue3-apexcharts'
import vuetify from './plugins/vuetify'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@mdi/font/css/materialdesignicons.css'
import 'quill/dist/quill.snow.css'
import { loadConfig } from '@/config/Config'
import Keycloak from 'keycloak-js'

loadConfig().then((config) => {
  const initOptions = {
    url: config.keycloak.host,
    realm: config.keycloak.realm,
    clientId: config.keycloak.clientId,
    redirectUri: config.keycloak.redirectUri,
  }

  window.keycloak = new Keycloak(initOptions)

  // const keycloak = new Keycloak({
  //   url: config.keycloak.host,
  //   realm: config.keycloak.realm,
  //   clientId: config.keycloak.clientId,
  //   redirectUri: config.keycloak.redirectUri,
  // })
  window.keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
    if (!authenticated) {
      console.warn('not authenticated')
      window.location.reload()
    }

    const { idToken } = window.keycloak

    axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`
    console.log('Keycloak initialized with token:', idToken)
    console.log('Keycloak token:', axios.defaults.headers.common['Authorization'])

    setInterval(() => {
      window.keycloak
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

  app.use(VueQueryPlugin)
  app.use(pinia)
  app.use(router)
  app.use(vuetify)
  app.provide('keycloak', window.keycloak)
  app.use(VueApexCharts)
  app.mount('#app')
})
